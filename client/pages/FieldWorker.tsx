import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, CheckCircle2, Clock, MapPin, UserCheck, ArrowLeft, ShieldCheck, Camera, Radio } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Field Engineer Header */}
      <header className="bg-slate-900/90 border-b border-white/10 p-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-cyan-400">
                <Wrench className="w-5 h-5" />
                Field Operations Portal
              </h1>
              <p className="text-xs text-slate-400">Raipur Smart Water Engineer Mobile Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-medium">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Er. Ramesh Verma (Zone 1-3 Lead)</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-6">
        {/* Task List - Left Column */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            Assigned Work Orders ({tasks.length})
          </h2>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  task.id === activeTaskId
                    ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40"
                    : "bg-slate-900/50 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">{task.id}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      task.priority === "Critical"
                        ? "bg-red-500/20 text-red-300 border-red-500/30"
                        : task.priority === "High"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-200 line-clamp-1">{task.issue}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {task.location}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-xs">
                  <span
                    className={`font-medium ${
                      task.status === "Verified"
                        ? "text-emerald-400"
                        : task.status === "Repaired"
                        ? "text-cyan-400"
                        : task.status === "On Site"
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  >
                    ● Status: {task.status}
                  </span>
                  <span className="text-[10px] text-slate-500">{task.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Management Panel - Right Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{activeTask.id}</span>
                <h2 className="text-xl font-bold text-slate-100">{activeTask.issue}</h2>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {activeTask.location} ({activeTask.zone})
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block">Current Stage</span>
                <span className="text-sm font-bold text-cyan-400">{activeTask.status}</span>
              </div>
            </div>

            {/* Workflow Progress Tracker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Update Field Resolution Progress</label>
              <div className="grid grid-cols-4 gap-2">
                {(["Assigned", "On Site", "Repaired", "Verified"] as const).map((stage) => {
                  const isCurrent = activeTask.status === stage;
                  return (
                    <button
                      key={stage}
                      onClick={() => handleUpdateStatus(stage)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                        isCurrent
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/50"
                          : "bg-slate-800/80 text-slate-300 border-white/10 hover:border-cyan-500/50"
                      }`}
                    >
                      {stage}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo & Sensor Verification */}
            <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                Proof of Repair Photo & AI Verification
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setImageUploaded(true)}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                    imageUploaded
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600"
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  {imageUploaded ? "Photo Uploaded ✓" : "Capture Repair Image"}
                </button>

                {imageUploaded && (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span>AI Model Verified: Seal Intact (98.4% Confidence)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Engineer Notes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Field Logs & Repair Observations</label>
              <textarea
                rows={3}
                placeholder="Log valve settings, pressure checks, or replacement part serial numbers..."
                value={repairNotes}
                onChange={(e) => setRepairNotes(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={() => handleUpdateStatus("Verified")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2"
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
