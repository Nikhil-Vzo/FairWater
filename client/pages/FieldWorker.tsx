import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, CheckCircle2, MapPin, UserCheck, ArrowLeft, ShieldCheck, Camera, Radio } from "lucide-react";

interface FieldTask {
  id: string;
  zone: string;
  issue: string;
  location: string;
  priority: "High" | "Medium" | "Critical";
  status: "Assigned" | "On Site" | "Repaired" | "Verified";
  assignedEngineer: string;
  updatedAt: string;
}

const initialTasks: FieldTask[] = [
  {
    id: "FW-1001",
    zone: "Zone 1 (Civil Lines)",
    issue: "Underground main line pressure leak (1.2 bar drop)",
    location: "G.E. Road near Telegraph Office",
    priority: "High",
    status: "On Site",
    assignedEngineer: "Er. Ramesh Verma",
    updatedAt: "10 mins ago",
  },
  {
    id: "FW-1002",
    zone: "Zone 3 (Tatibandh)",
    issue: "Water quality turbidity spike (>8.5 NTU)",
    location: "Mowa Sector 2 Booster Pump Station",
    priority: "Critical",
    status: "Assigned",
    assignedEngineer: "Er. Ramesh Verma",
    updatedAt: "25 mins ago",
  },
  {
    id: "FW-1003",
    zone: "Zone 2 (Pandri)",
    issue: "Valve actuator fault at secondary feeder",
    location: "Pandri Cloth Market Gate 3",
    priority: "Medium",
    status: "Repaired",
    assignedEngineer: "Er. Ramesh Verma",
    updatedAt: "1 hour ago",
  },
];

export default function FieldWorker() {
  const [tasks, setTasks] = useState<FieldTask[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string>("FW-1001");
  const [repairNotes, setRepairNotes] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || tasks[0];

  const handleUpdateStatus = (newStatus: FieldTask["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === activeTaskId ? { ...t, status: newStatus, updatedAt: "Just now" } : t))
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Field Engineer Header */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-slate-900">
                <Wrench className="w-5 h-5 text-blue-600" />
                Field Operations Console
              </h1>
              <p className="text-xs text-slate-500 font-medium">Raipur Smart Water Engineer Mobile Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-emerald-700 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Er. Ramesh Verma (Zone Lead)</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-6">
        {/* Task List - Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
            Assigned Work Orders ({tasks.length})
          </h2>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  task.id === activeTaskId
                    ? "bg-blue-50/50 border-blue-500 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-blue-600">{task.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      task.priority === "Critical"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : task.priority === "High"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{task.issue}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {task.location}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-xs">
                  <span
                    className={`font-semibold ${
                      task.status === "Verified"
                        ? "text-emerald-600"
                        : task.status === "Repaired"
                        ? "text-blue-600"
                        : task.status === "On Site"
                        ? "text-amber-600"
                        : "text-slate-500"
                    }`}
                  >
                    ● Status: {task.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{task.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Management Panel - Right Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-600 font-bold">{activeTask.id}</span>
                <h2 className="text-xl font-bold text-slate-900">{activeTask.issue}</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {activeTask.location} ({activeTask.zone})
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Current Stage</span>
                <span className="text-sm font-bold text-blue-600">{activeTask.status}</span>
              </div>
            </div>

            {/* Workflow Progress Tracker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Update Field Resolution Progress</label>
              <div className="grid grid-cols-4 gap-2">
                {(["Assigned", "On Site", "Repaired", "Verified"] as const).map((stage) => {
                  const isCurrent = activeTask.status === stage;
                  return (
                    <button
                      key={stage}
                      onClick={() => handleUpdateStatus(stage)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isCurrent
                          ? "bg-blue-600 text-white border-blue-600 font-bold shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {stage}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo & Sensor Verification */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-600" />
                Proof of Repair Photo & AI Verification
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setImageUploaded(true)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    imageUploaded
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs"
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  {imageUploaded ? "Photo Uploaded ✓" : "Capture Repair Image"}
                </button>

                {imageUploaded && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>AI Model Verified: Seal Intact (98.4% Confidence)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Engineer Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Field Logs & Repair Observations</label>
              <textarea
                rows={3}
                placeholder="Log valve settings, pressure checks, or replacement part serial numbers..."
                value={repairNotes}
                onChange={(e) => setRepairNotes(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => handleUpdateStatus("Verified")}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Finalize & Submit Work Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
