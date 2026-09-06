import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, ShieldCheck, Sparkles, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const WaterQualityCard: React.FC = () => {
  const { language } = useLanguage();

  const titleText = language === "hi"
    ? "सार्वजनिक जल गुणवत्ता सूचकांक (WQI)"
    : language === "cg"
    ? "सार्वजनिक पानी गुणवत्ता (WQI)"
    : "Public Water Quality Index (WQI)";

  const subtitleText = language === "hi"
    ? "रायपुर नगर निगम प्रयोगशालाओं द्वारा real-time में सत्यापित पीएच, क्लोरीनेशन और टर्बिडिटी मानक।"
    : language === "cg"
    ? "नगर निगम ले रियल टाइम पानी जांच रिपोट।"
    : "Live laboratory verification of pH, residual chlorine, and turbidity levels across municipal supply zones.";

  const zonesQuality = [
    { zone: "Central Zone (Civil Lines)", wqi: 94, status: "EXCELLENT", ph: "7.4", chlorine: "1.2 mg/L", turbidity: "0.8 NTU", tds: "185 ppm" },
    { zone: "West Zone (Amanaka)", wqi: 88, status: "GOOD", ph: "7.1", chlorine: "0.9 mg/L", turbidity: "1.2 NTU", tds: "210 ppm" },
    { zone: "East Zone (Telibandha)", wqi: 92, status: "EXCELLENT", ph: "7.3", chlorine: "1.1 mg/L", turbidity: "0.9 NTU", tds: "172 ppm" },
    { zone: "North Zone (Bhanpuri)", wqi: 81, status: "FAIR", ph: "6.8", chlorine: "0.7 mg/L", turbidity: "2.1 NTU", tds: "280 ppm" },
  ];

  return (
    <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/30 to-teal-50/20 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              {titleText}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              {subtitleText}
            </CardDescription>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 flex items-center gap-1 text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> BIS 10500 Compliant
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {zonesQuality.map((item) => (
            <div key={item.zone} className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-xs text-slate-800">{item.zone}</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  WQI {item.wqi} / 100
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center bg-slate-50 p-2 rounded-lg text-[11px]">
                <div>
                  <div className="text-slate-400 text-[9px] uppercase">pH</div>
                  <div className="font-semibold text-slate-700">{item.ph}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[9px] uppercase">Cl₂</div>
                  <div className="font-semibold text-slate-700">{item.chlorine}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[9px] uppercase">Turb.</div>
                  <div className="font-semibold text-slate-700">{item.turbidity}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[9px] uppercase">TDS</div>
                  <div className="font-semibold text-slate-700">{item.tds}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
