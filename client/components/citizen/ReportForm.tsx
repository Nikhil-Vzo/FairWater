import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReportSchema, InsertReport } from "@shared/schema";
import { AlertTriangle, MapPin, FileText, Image, X, CheckCircle2 } from "lucide-react";

const ISSUE_TYPES = [
  "No Water Supply",
  "Low Pressure",
  "Contaminated Water",
  "Leakage",
  "Billing Issue",
  "Other",
];

export function ReportForm() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InsertReport>({
    resolver: zodResolver(insertReportSchema),
    defaultValues: {
      zoneId: "",
      issueType: "",
      description: "",
      address: "",
      imageUrl: "",
    },
  });

  const uploadImage = async (file: File) => {
    // In a real app, this would upload to a storage bucket
    // For this demo, we'll simulate an upload and return a fake URL
    // or use a base64 string if the backend supports it
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const mutation = useMutation({
    mutationFn: async (data: InsertReport) => {
      const payload = { ...data };
      if (selectedImage) {
        const imageUrl = await uploadImage(selectedImage);
        payload.imageUrl = imageUrl;
      }

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit report");
      }

      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Report Submitted",
        description: "We've received your report and will investigate shortly.",
      });
      // Reset after delay
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
        setSelectedImage(null);
        setPreviewUrl(null);
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Report Submitted!</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Thank you for helping us maintain the water network. Your ticket ID has been generated.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-6"
        >
          Submit Another Report
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="issueType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-foreground/80">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  Issue Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-accent/50">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ISSUE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zoneId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-foreground/80">
                  <MapPin className="w-4 h-4 text-accent" />
                  Zone
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-accent/50">
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={`z${i + 1}`}>
                        Zone {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-foreground/80">
                <MapPin className="w-4 h-4 text-accent" />
                Location / Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter specific location or landmark"
                  className="bg-white/5 border-white/10 focus:ring-accent/50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-foreground/80">
                <FileText className="w-4 h-4 text-accent" />
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  className="min-h-[100px] bg-white/5 border-white/10 focus:ring-accent/50 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel className="flex items-center gap-2 text-foreground/80">
            <Image className="w-4 h-4 text-accent" />
            Photo Evidence (Optional)
          </FormLabel>

          {!previewUrl ? (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Image className="w-8 h-8 mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-accent">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-white/10 group">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Remove Photo
                </Button>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
          variant="gradient"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting Report..." : "Submit Report"}
        </Button>
      </form>
    </Form>
  );
}