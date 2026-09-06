import { CitizenHeader } from "@/components/citizen/CitizenHeader";
import { InfoMap } from "@/components/citizen/InfoMap";
import { ReportForm } from "@/components/citizen/ReportForm";
import { ReportTracker } from "@/components/citizen/ReportTracker";
import { EmergencySOSModal } from "@/components/citizen/EmergencySOSModal";
import { WaterQualityCard } from "@/components/citizen/WaterQualityCard";
import { useLanguage } from "@/context/LanguageContext";
import { Droplets, Scan, ArrowRight } from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      <CitizenHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Hero, SOS, WQI, Live Map, AI Analysis */}
          <div className="lg:col-span-7 space-y-6">

            {/* Title Badge & Hero Heading */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>{t("title")}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                {t("hero_headline")}{" "}
                <span className="text-blue-600">
                  {t("hero_instantly")}
                </span>
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                {t("hero_sub")}
              </p>
            </div>

            {/* Emergency SOS Banner Modal */}
            <EmergencySOSModal />

            {/* Public Water Quality Index Card */}
            <WaterQualityCard />

            {/* Live Distribution Map */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t("live_status")}
                </h3>
                <span className="text-xs font-medium text-slate-500">Updated Real-Time</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <InfoMap />
              </div>
            </div>

            {/* AI Image Leak Analysis Teaser */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm rounded-2xl p-5 relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scan className="w-5 h-5 text-blue-600" />
                    {t("ai_pipeline")}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md">
                    {t("ai_desc")}
                  </p>
                </div>

                <a
                  href="/analysis"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                >
                  <span>{t("try_now")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Grievance Submission Form & Status Tracker */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
              <ReportForm />
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sm:p-6">
              <ReportTracker />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
