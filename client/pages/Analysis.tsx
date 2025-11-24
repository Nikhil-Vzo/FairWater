import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Activity, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
    corrosion_level: number;
    estimated_life_months: number;
    status: string;
    recommendation: string;
}

export default function Analysis() {
    const { toast } = useToast();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setResult(null); // Reset result on new image
        }
    };

    const mutation = useMutation({
        mutationFn: async () => {
            // In a real app, we'd send the file. Here we just trigger the endpoint.
            const res = await fetch("/api/analyze", {
                method: "POST",
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Analysis failed");
            }

            return res.json();
        },
        onSuccess: (data) => {
            setResult(data);
            toast({
                title: "Analysis Complete",
                description: "Pipeline assessment generated successfully.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Analysis Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    return (
        <div className="min-h-screen w-full bg-background text-foreground p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Pipeline Analysis
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        AI-powered corrosion detection and lifespan estimation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <Card className="glass border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="w-5 h-5 text-accent" />
                                Upload Image
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer border-white/20 bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-semibold text-accent">Click to upload</span> pipeline image
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                    />
                                </label>
                            </div>

                            <Button
                                className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20"
                                variant="gradient"
                                disabled={!selectedImage || mutation.isPending}
                                onClick={() => mutation.mutate()}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    "Run Analysis"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {result ? (
                            <Card className="glass border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-accent" />
                                        Analysis Results
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                            <p className="text-sm text-muted-foreground mb-1">Corrosion Level</p>
                                            <div className="flex items-end gap-2">
                                                <span className={`text-3xl font-bold ${result.corrosion_level > 50 ? "text-red-400" : "text-green-400"
                                                    }`}>
                                                    {result.corrosion_level}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                            <p className="text-sm text-muted-foreground mb-1">Est. Life</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-3xl font-bold text-blue-400">
                                                    {result.estimated_life_months}
                                                </span>
                                                <span className="text-sm text-muted-foreground mb-1">months</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                        <div className="flex items-center gap-2">
                                            {result.status === "Critical" ? (
                                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                            ) : result.status === "Warning" ? (
                                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                            ) : (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            )}
                                            <span className="font-semibold text-lg">{result.status}</span>
                                        </div>
                                        <p className="text-muted-foreground">{result.recommendation}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-xl text-muted-foreground">
                                <p>Upload an image and run analysis to see results</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
