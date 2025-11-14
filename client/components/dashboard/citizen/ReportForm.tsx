import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Zone, ZoneStatusResponse } from "@shared/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, UploadCloud } from "lucide-react";

// Fetch zones for the dropdown
const fetchZoneStatus = async (): Promise<ZoneStatusResponse> => {
  const res = await fetch("/api/zonestatus");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const ReportForm = () => {
  const [issueType, setIssueType] = React.useState("");
  const [zoneId, setZoneId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch zones for the dropdown
  const { data, isLoading } = useQuery({
    queryKey: ["zoneStatusSimple"],
    queryFn: fetchZoneStatus,
    staleTime: 60000, // Cache for 1 minute
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueType || !zoneId || !description) {
      setError("Please fill out all required fields.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      // We are not uploading the image in this step,
      // but you would use FormData for a real implementation.
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueType,
          zoneId,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit report.");
      }

      // Success
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Message UI
  if (isSubmitted) {
    return (
      <Card className="w-full bg-green-50 border border-green-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-green-900">
              Report Submitted!
            </h2>
            <p className="text-green-800 mt-2">
              Thank you. Your report has been submitted successfully and our team
              has been notified.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Form UI
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Submit a New Complaint</CardTitle>
        <CardDescription>
          Please provide details about the water issue you are facing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Type */}
          <div className="space-y-2">
            <Label htmlFor="issue-type">Issue Type</Label>
            <Select onValueChange={setIssueType} value={issueType}>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder="Select an issue..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Water Shortage">Water Shortage</SelectItem>
                <SelectItem value="Leakage">Leakage</SelectItem>
                <SelectItem value="Irregular Supply">
                  Irregular Supply
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Zone Selection */}
          <div className="space-y-2">
            <Label htmlFor="zone">Select Your Zone</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select onValueChange={setZoneId} value={zoneId}>
                <SelectTrigger id="zone">
                  <SelectValue placeholder="Select your zone..." />
                </SelectTrigger>
                <SelectContent>
                  {data?.zones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name} - {zone.area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Explain the shortage or leak you’re experiencing..."
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Photo (optional)</Label>
            {imagePreview ? (
              <div className="relative w-32 h-32">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full h-7 w-7 p-0"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  &times;
                </Button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};