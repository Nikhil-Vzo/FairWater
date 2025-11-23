import { Zone } from "@shared/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Droplet, Gauge, AlertTriangle, CheckCircle } from "lucide-react";

interface ZoneDetailProps {
    zone: Zone;
}

export function ZoneDetail({ zone }: ZoneDetailProps) {
    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Gauge className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Avg Pressure</p>
                            <p className="text-2xl font-bold text-primary">
                                {zone.pressure.toFixed(1)} <span className="text-sm font-normal">bar</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <Droplet className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Flow</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {zone.flow} <span className="text-sm font-normal">L/min</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pipeline Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-muted-foreground" />
                        Pipeline Network Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {zone.pipelines.map((pipeline) => (
                        <div key={pipeline.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="font-medium text-sm">{pipeline.name}</p>
                                    <p className="text-xs text-muted-foreground">ID: {pipeline.id}</p>
                                </div>
                                <Badge
                                    variant={pipeline.status === "Normal" ? "outline" : "destructive"}
                                    className={
                                        pipeline.status === "Normal"
                                            ? "bg-green-50 text-green-700 border-green-200"
                                            : "bg-red-50 text-red-700 border-red-200"
                                    }
                                >
                                    {pipeline.status === "Normal" ? (
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                    ) : (
                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                    )}
                                    {pipeline.status}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Pressure</span>
                                        <span>{pipeline.pressure.toFixed(1)} bar</span>
                                    </div>
                                    <Progress
                                        value={(pipeline.pressure / 5) * 100}
                                        className="h-1.5"
                                    // indicatorClassName={pipeline.pressure < 1.5 || pipeline.pressure > 4 ? "bg-red-500" : "bg-primary"} 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Flow</span>
                                        <span>{pipeline.flow} L/m</span>
                                    </div>
                                    <Progress value={(pipeline.flow / 1000) * 100} className="h-1.5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
