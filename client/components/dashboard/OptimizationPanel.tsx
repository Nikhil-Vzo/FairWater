import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { OptimizationSchedule, OptimizationResponse } from "@shared/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, BrainCircuit } from "lucide-react";

// This is now just the *initial* state before optimizing
const INITIAL_RESULTS: OptimizationSchedule[] = [
  { zone: "Z1", minutes: 10, highlighted: false, area: "Civil Lines" },
  { zone: "Z2", minutes: 20, highlighted: false, area: "Pandri" },
  { zone: "Z3", minutes: 35, highlighted: true, area: "Mowa" },
  { zone: "Z4", minutes: 18, highlighted: false, area: "Gondra" },
  { zone: "Z5", minutes: 24, highlighted: false, area: "Ramnagar" },
  { zone: "Z6", minutes: 15, highlighted: false, area: "Jai Stambh" },
  { zone: "Z7", minutes: 28, highlighted: false, area: "Lisner" },
  { zone: "Z8", minutes: 32, highlighted: false, area: "Kota" },
  { zone: "Z9", minutes: 26, highlighted: false, area: "Risali" },
  { zone: "Z10", minutes: 30, highlighted: false, area: "New Raipur" },
];

// API call function
const fetchOptimization = async (): Promise<OptimizationResponse> => {
  const res = await fetch("/api/optimize", {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Optimization API failed");
  }
  return res.json();
};

export const OptimizationPanel = () => {
  const mutation = useMutation<OptimizationResponse, Error>({
    mutationFn: fetchOptimization,
  });

  const handleOptimize = () => {
    mutation.mutate();
  };

  const results = mutation.data || INITIAL_RESULTS;
  const isOptimizing = mutation.isPending;

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="h-5 w-5 text-accent" />
          <h3 className="font-bold tracking-tight">AI Optimization</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Generate fair pumping schedules based on real-time demand.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4 min-h-0">
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing}
          variant="gradient"
          className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {isOptimizing ? (
            <>
              <Zap className="mr-2 h-4 w-4 animate-spin" />
              Optimizing Network...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Run AI Schedule Optimization
            </>
          )}
        </Button>

        {mutation.isError && (
          <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
            Error: {mutation.error.message}
          </div>
        )}

        <div className="rounded-xl border border-white/5 bg-white/5 flex-1 overflow-hidden flex flex-col">
          <div className="overflow-auto custom-scrollbar">
            <Table>
              <TableHeader className="bg-white/5 sticky top-0 backdrop-blur-sm z-10">
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Zone</TableHead>
                  <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Area</TableHead>
                  <TableHead className="text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.zone} className="hover:bg-white/5 border-white/5 transition-colors">
                    <TableCell className="font-medium py-3">{result.zone}</TableCell>
                    <TableCell className="text-muted-foreground text-xs py-3">
                      {result.area}
                    </TableCell>
                    <TableCell className="text-right py-3">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-bold font-mono text-primary">{result.minutes}m</span>
                        {result.highlighted && (
                          <Badge variant="destructive" className="h-5 px-1.5 text-[10px] shadow-sm shadow-red-500/20">
                            Boost
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};