import React, { useState } from "react";
import { AlertTriangle, Truck, CheckCircle2, PhoneCall, ShieldAlert, X } from "lucide-react";
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
      <div className="bg-red-50 border border-red-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-100 rounded-xl text-red-600 font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-red-900">{t("emergency_sos")}</h4>
            <p className="text-xs text-red-700 font-medium">{t("emergency_desc")}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsOpen(true);
            setSubmitted(false);
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Truck className="w-4 h-4" />
          {t("request_tanker")}
        </button>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-lg w-full rounded-2xl p-6 relative shadow-xl text-slate-900">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Emergency Relief Request</h3>
                    <p className="text-xs text-slate-500 font-medium">Immediate municipal dispatch for critical outages</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Impacted Zone</label>
                  <select
                    value={form.zone}
                    onChange={(e) => setForm({ ...form, zone: e.target.value })}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  >
                    <option value="Zone 1 (Civil Lines / Telibandha)">Zone 1 (Civil Lines / Telibandha)</option>
                    <option value="Zone 2 (Pandri / Shankar Nagar)">Zone 2 (Pandri / Shankar Nagar)</option>
                    <option value="Zone 3 (Mowa / Tatibandh)">Zone 3 (Mowa / Tatibandh)</option>
                    <option value="Zone 4 (Gondra / Devendra Nagar)">Zone 4 (Gondra / Devendra Nagar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  >
                    <option value="Contamination / Severe Smell">Contamination / Severe Odor</option>
                    <option value="Complete Pipeline Breakdown">Complete Pipeline Breakdown</option>
                    <option value="Hospital / Care Home Outage">Hospital / Care Facility Outage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXXXXXXX"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address & Landmark</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. Near Community Center, Street 4"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-xl bg-white border border-slate-200 p-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Dispatch SOS Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Emergency Dispatch Initiated</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Municipal Tanker Unit <span className="font-bold text-slate-900">CG-04-WT-8821</span> has been routed to your address.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono font-bold text-blue-600">
                  SOS Tracking Reference: {ticketId}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-2">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Control Room Contact: +91 771-228-4400</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs mt-4"
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
