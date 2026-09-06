import { Link } from "react-router-dom";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe, Wrench, Shield } from "lucide-react";

export const CitizenHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shadow-xs">
            FW
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Raipur Smart Water Grievance & Quality System
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="cg">छत्तीसगढ़ी (Chhattisgarhi)</option>
            </select>
          </div>

          <Link
            to="/field"
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all text-xs font-semibold flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-slate-500" />
            <span>Field Engineers</span>
          </Link>

          <Link
            to="/admin"
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all text-xs font-semibold shadow-xs flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
