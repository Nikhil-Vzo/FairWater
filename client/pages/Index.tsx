import { CitizenHeader } from "@/components/citizen/CitizenHeader";
import { InfoMap } from "@/components/citizen/InfoMap";
import { ReportForm } from "@/components/citizen/ReportForm";
import { Droplets } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-secondary/20 rounded-full blur-[100px] animate-float" />
      </div>

      <CitizenHeader />

      <main className="relative z-10 container max-w-6xl px-4 py-12 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Hero Content - Left Side */}
          <div className="lg:col-span-7 space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-foreground text-sm font-medium animate-fade-in">
              <Droplets className="w-4 h-4 text-accent" />
              <span>Raipur Smart Water Initiative</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Report Water Issues <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-shimmer bg-[length:200%_100%]">
                Instantly.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Help us maintain fair water distribution. Report leaks, shortages, or quality issues directly to the administration with real-time tracking.
            </p>

            <div className="glass-panel p-6 rounded-2xl mt-12">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Network Status
              </h3>
              <InfoMap />
            </div>
          </div>

          {/* Form Section - Right Side */}
          <div className="lg:col-span-5 relative">
            {/* Decorative blob behind form */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl transform rotate-3 scale-105 -z-10 rounded-3xl" />

            <div className="glass-panel rounded-3xl p-1 shadow-2xl">
              <ReportForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}