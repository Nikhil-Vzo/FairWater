import { CitizenHeader } from "@/components/citizen/CitizenHeader";
import { InfoMap } from "@/components/citizen/InfoMap";
import { ReportForm } from "@/components/citizen/ReportForm";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CitizenHeader />

      <main className="py-8 sm:py-12">
        <div className="container max-w-2xl px-4">
          {/* 1. Form Section */}
          <ReportForm />

          {/* 2. Additional Info Map Section */}
          <InfoMap />
        </div>
      </main>
    </div>
  );
}