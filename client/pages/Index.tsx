import { CitizenHeader } from "@/components/citizen/CitizenHeader";
import { InfoMap } from "@/components/citizen/InfoMap";
import { ReportForm } from "@/components/citizen/ReportForm";
import { ReportTracker } from "@/components/citizen/ReportTracker";
import { EmergencySOSModal } from "@/components/citizen/EmergencySOSModal";
import { useLanguage } from "@/context/LanguageContext";
import { Droplets, Scan } from "lucide-react";

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px] animate-float" />
      </div>

      <CitizenHeader />

      <main className="relative z-10 container max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Hero Content - Left Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-foreground text-sm font-medium animate-fade-in">
              <Droplets className="w-4 h-4 text-accent" />
              <span>{t("title")}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              {t("hero_headline")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-shimmer bg-[length:200%_100%]">
                {t("hero_instantly")}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t("hero_sub")}
            </p>

            {/* Emergency SOS Banner */}
            <EmergencySOSModal />

            <div className="glass-panel p-6 rounded-2xl mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t("live_status")}
              </h3>
              <InfoMap />
            </div>

            {/* AI Analysis Card */}
            <div className="glass-panel p-6 rounded-2xl mt-8 relative overflow-hidden group cursor-pointer transition-all hover:bg-white/5 border border-white/10 hover:border-accent/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                    <Scan className="w-5 h-5 text-cyan-400" />
                    {t("ai_pipeline")}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {t("ai_desc")}
                  </p>
                </div>

                <a
                  href="/analysis"
                  className="px-4 py-2 rounded-lg bg-accent/20 text-accent font-medium hover:bg-accent/30 transition-colors flex items-center gap-2"
                >
                  {t("try_now")}
                </a>
              </div>
            </div>
          </div>

          {/* Form Section - Right Side */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="glass-panel rounded-3xl p-6 shadow-2xl">
              <ReportForm />
            </div>

            {/* Tracker Component */}
            <ReportTracker />
          </div>
        </div>
      </main>
    </div>
  );
}
