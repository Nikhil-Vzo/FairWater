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

const INITIAL_RESULTS: OptimizationSchedule[] = [
  { zone: "Z1", minutes: 10, highlighted: false, area: "Civil Lines" },
  { zone: "Z2", minutes: 20, highlighted: false, area: "Pandri" },
  { zone: "Z3", minutes: 35, highlighted: true, area: "Mowa" },
  { zone: "Z4", minutes: 18, highlighted: false, area: "Gondra" },
  { zone: "Z5", minutes: 24, highlighted: false, area: "Ramnagar" },
  { zone: "Z6", minutes: 15, highlighted: false, area: "Jai Stambh" },
  { zone: "Z7", minutes: 28, highlighted: false, area: "Lisner" },
  { zone: "Z8", minutes: 32, highlighted: false, area: "Kota" },
];

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
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs flex flex-col h-full">
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="h-4 w-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900 tracking-tight">AI Pumping Schedule Optimization</h3>
        </div>
        <p className="text-xs text-slate-500">
          Compute equitable reservoir pumping duration based on pressure loss and citizen equity metrics.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4">
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          {isOptimizing ? (
            <>
              <Zap className="h-4 w-4 animate-spin text-cyan-200" />
              Calculating Optimization Grid...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-cyan-200" />
              Recalculate AI Pumping Schedule
            </>
          )}
        </Button>

        {mutation.isError && (
          <div className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200 font-medium">
            Error: {mutation.error.message}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 overflow-hidden flex-1 max-h-[300px] overflow-y-auto">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow className="border-slate-200">
                <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Zone</TableHead>
                <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Area</TableHead>
                <TableHead className="text-right text-[11px] font-bold text-slate-600 uppercase">Pumping Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.zone} className="border-slate-100 hover:bg-slate-50/60">
                  <TableCell className="font-bold text-xs text-slate-900 py-2.5">{result.zone}</TableCell>
                  <TableCell className="text-slate-600 text-xs py-2.5">{result.area}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-extrabold text-xs text-blue-600">{result.minutes}m</span>
                      {result.highlighted && (
                        <Badge className="h-4 px-1.5 text-[10px] bg-amber-100 text-amber-800 border-amber-200">
                          Priority
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
  );
};
