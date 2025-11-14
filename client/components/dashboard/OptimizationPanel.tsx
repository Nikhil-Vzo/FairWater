import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { OptimizationSchedule, OptimizationResponse } from "@shared/api";

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
  // Use useMutation to handle the API call, loading, and result states
  const mutation = useMutation<OptimizationResponse, Error>({
    mutationFn: fetchOptimization,
  });

  const handleOptimize = () => {
    mutation.mutate();
  };

  // The results are either the data from the API or the initial default
  const results = mutation.data || INITIAL_RESULTS;
  const isOptimizing = mutation.isPending;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          AI Pump Schedule Optimization
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Generate a fair pumping schedule based on real-time sensor data and
          citizen complaints.
        </p>
      </div>

      <div className="p-6 border-b border-gray-100">
        <Button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {isOptimizing ? "Optimizing..." : "Optimize Pumping Schedule"}
        </Button>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Allocation Results
        </h3>
        {mutation.isError && (
          <p className="text-sm text-red-600 mb-4">
            Error: {mutation.error.message}
          </p>
        )}
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">
                  Zone
                </th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">
                  Area
                </th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">
                  Minutes
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.zone}
                  className={`border-b border-gray-100 transition-colors ${
                    result.highlighted ? "bg-red-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-3 text-sm font-semibold text-gray-900">
                    {result.zone}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-600">
                    {result.area}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-900">
                        {result.minutes}
                      </div>
                      {result.highlighted && (
                        <span className="text-xs font-semibold px-1.5 py-0.5 bg-red-200 text-red-800 rounded">
                          Boost
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};