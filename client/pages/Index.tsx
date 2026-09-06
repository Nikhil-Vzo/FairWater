import { useState } from "react";
import { CitizenHeader } from "@/components/citizen/CitizenHeader";
import { InfoMap } from "@/components/citizen/InfoMap";
import { ReportForm } from "@/components/citizen/ReportForm";
import { ReportTracker } from "@/components/citizen/ReportTracker";
import { EmergencySOSModal } from "@/components/citizen/EmergencySOSModal";
import { WaterQualityCard } from "@/components/citizen/WaterQualityCard";
import { useLanguage } from "@/context/LanguageContext";
import {
  Droplets,
  Scan,
  ArrowRight,
  ShieldCheck,
  Activity,
  Zap,
  Radio,
  Truck,
  Users,
  CheckCircle2,
  Cpu,
  Sparkles,
  BarChart3,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Index() {
  const { t } = { t: (key: string) => key }; // Fallback helper if needed
  const { t: langT } = useLanguage();
  const [activeTab, setActiveTab] = useState<"report" | "quality" | "map">("report");

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      <CitizenHeader />

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle Background Accent Glows (Light White/Blue) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Status Badge Ticker */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs hover:border-slate-300 transition-all cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-600 font-medium">Raipur Municipal Smart Water System</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-600 font-bold flex items-center gap-1">
              v2.4 Live Grid <Sparkles className="w-3 h-3" />
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
            Next-Gen Water Governance & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">Real-Time Quality</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Empowering 1.2M Raipur citizens with AI leak detection, transparent quality verification, field engineer dispatches, and emergency tanker SOS.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#portal-actions"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 group"
            >
              <span>Report Issue & Track</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#sos-section"
              className="px-6 py-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-rose-600" />
              <span>Emergency Tanker SOS</span>
            </a>

            <a
              href="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-slate-600" />
              <span>Admin Dashboard</span>
            </a>
          </div>
        </div>

        {/* Floating Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16">
          <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Water Quality</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">98.4%</div>
            <div className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> BIS 10500 Compliant
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">SOS Response</span>
              <Truck className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">&lt; 14 Mins</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Average Dispatch Speed</div>
          </div>

          <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sensory Grid</span>
              <Radio className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">2,480 Km</div>
            <div className="text-xs font-medium text-blue-600 mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> IoT Pipeline Monitoring
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 shadow-xs rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Citizens Served</span>
              <Users className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">1.2M+</div>
            <div className="text-xs font-medium text-slate-500 mt-1">Across 8 Municipal Zones</div>
          </div>
        </div>
      </section>

      {/* Emergency SOS Quick Banner */}
      <section id="sos-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <EmergencySOSModal />
      </section>

      {/* Interactive Main Citizen Experience Section */}
      <section id="portal-actions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              <Zap className="w-3.5 h-3.5" /> Citizen Portal Actions
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Submit Grievance or Verify Quality
            </h2>
          </div>

          {/* Segmented Control Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
            <button
              onClick={() => setActiveTab("report")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "report"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Report & Track Ticket
            </button>
            <button
              onClick={() => setActiveTab("quality")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quality"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Public Water Quality (WQI)
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Live Pipeline Map
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content Display */}
        {activeTab === "report" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                <ReportForm />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8">
                <ReportTracker />
              </div>
              {/* AI Teaser Card */}
              <div className="bg-gradient-to-br from-blue-50/80 via-cyan-50/50 to-white border border-blue-200/80 shadow-xs rounded-3xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                      <Scan className="w-3.5 h-3.5" /> AI Computer Vision
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Upload Photo for Automatic Leak Severity Scan
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our neural network estimates pipe rupture diameter, contamination index, and automatically dispatches nearest field crew.
                    </p>
                  </div>
                  <a
                    href="/analysis"
                    className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shrink-0 shadow-xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="space-y-8">
            <WaterQualityCard />
          </div>
        )}

        {activeTab === "map" && (
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Raipur Municipal Live Pipeline Grid
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time status of main arterial pipelines, acoustic sensor nodes, and repair work orders.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-[480px]">
              <InfoMap />
            </div>
          </div>
        )}
      </section>

      {/* Awwwards Feature Showcase Grid */}
      <section className="bg-slate-50/60 border-y border-slate-200/80 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
              <Cpu className="w-4 h-4" /> System Architecture & Equity
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Engineered for Precision & Public Trust
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Modern municipal water distribution backed by predictive AI models, IoT pressure wave analytics, and geofenced field operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                AI Demand & Pumping Optimization
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Neural forecasting models predict hourly consumption across all 8 zones, optimizing reservoir pumping schedules to save electricity and prevent pressure bursts.
              </p>
              <a href="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                View Forecast Models <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Acoustic IoT Leak Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sub-surface acoustic wave sensors continuously monitor main supply arteries to pinpoint micro-cracks before cataclysmic pipeline blowouts occur.
              </p>
              <a href="/dashboard" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:text-cyan-700">
                Inspect Sensor Streams <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Field Worker Mobile Dispatch
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Field engineers receive automated work orders, update repair statuses, and record GPS verified photo proof directly from their mobile portal.
              </p>
              <a href="/field" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700">
                Open Field Worker Portal <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Municipal Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs">
                FW
              </div>
              <span className="font-extrabold text-slate-900 text-base">
                Raipur Smart Water System
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Official Water Quality & Public Grievance Infrastructure Platform • Raipur Municipal Corporation
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <a href="/" className="hover:text-blue-600 transition-colors">Citizen Portal</a>
            <a href="/dashboard" className="hover:text-blue-600 transition-colors">Admin Dashboard</a>
            <a href="/field" className="hover:text-blue-600 transition-colors">Field Engineer Console</a>
            <a href="/analysis" className="hover:text-blue-600 transition-colors">AI Analysis</a>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Operational Grid • 99.98% Uptime</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
