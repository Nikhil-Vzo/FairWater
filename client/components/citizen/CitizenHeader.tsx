import { Link } from "react-router-dom";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe, Wrench } from "lucide-react";

export const CitizenHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="relative bg-slate-900/90 backdrop-blur-md border-b border-white/10 p-4 sm:p-6 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {t("hero_sub")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-white/10">
            <Globe className="w-4 h-4 text-cyan-400 ml-2" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
              <option value="cg" className="bg-slate-900 text-white">छत्तीसगढ़ी (Chhattisgarhi)</option>
            </select>
          </div>

          <Link
            to="/field"
            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all text-xs font-medium flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Field Portal</span>
          </Link>

          <Link
            to="/admin"
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all text-xs font-medium shadow-md shadow-blue-900/30"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </header>
  );
};
