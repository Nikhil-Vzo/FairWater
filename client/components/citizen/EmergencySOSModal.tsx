import React, { useState } from "react";
import { AlertTriangle, Truck, CheckCircle2, PhoneCall, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function EmergencySOSModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [form, setForm] = useState({
    zone: "Zone 1 (Civil Lines)",
    type: "Contamination / Foul Smell",
    contact: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  return (
    <>
      {/* SOS Trigger Banner */}
      <div className="glass-panel border border-red-500/30 bg-red-950/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/20 rounded-xl text-red-400 animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-red-200">{t("emergency_sos")}</h4>
            <p className="text-xs text-red-300/80">{t("emergency_desc")}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOpen(true);
            setSubmitted(false);
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all hover:scale-[1.02]"
        >
          <Truck className="w-4 h-4" />
          {t("request_tanker")}
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel border border-red-500/30 max-w-lg w-full rounded-2xl p-6 relative bg-slate-900/90 text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <div>
                    <h3 className="text-lg font-bold text-red-200">Emergency Relief Request</h3>
                    <p className="text-xs text-slate-400">Immediate municipal dispatch for critical outages</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Impacted Zone</label>
                  <select
                    value={form.zone}
                    onChange={(e) => setForm({ ...form, zone: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 p-2.5 text-sm text-slate-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="Zone 1 (Civil Lines / Telibandha)">Zone 1 (Civil Lines / Telibandha)</option>
                    <option value="Zone 2 (Pandri / Shankar Nagar)">Zone 2 (Pandri / Shankar Nagar)</option>
                    <option value="Zone 3 (Mowa / Tatibandh)">Zone 3 (Mowa / Tatibandh)</option>
                    <option value="Zone 4 (Gondra / Devendra Nagar)">Zone 4 (Gondra / Devendra Nagar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Emergency Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 p-2.5 text-sm text-slate-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="Contamination / Severe Smell">Contamination / Severe Odor</option>
                    <option value="Complete Pipeline Breakdown">Complete Pipeline Breakdown</option>
                    <option value="Hospital / Care Home Outage">Hospital / Care Facility Outage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXXXXXXX"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 p-2.5 text-sm text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Delivery Address & Landmark</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Near Community Center, Street 4"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-lg bg-slate-800/80 border border-slate-700 p-2.5 text-sm text-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium shadow-md shadow-red-900/40"
                  >
                    Dispatch SOS Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Emergency Dispatch Initiated</h3>
                <p className="text-sm text-slate-300">
                  Municipal Tanker Unit <span className="font-semibold text-amber-400">CG-04-WT-8821</span> has been routed to your address.
                </p>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs font-mono text-cyan-300">
                  SOS Tracking Reference: {ticketId}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <PhoneCall className="w-4 h-4 text-green-400" />
                  <span>Control Room Contact: +91 771-228-4400</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm mt-4"
                >
                  Close & Track Dispatch
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
