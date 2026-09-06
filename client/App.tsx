import { Routes, Route, BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Analysis from "@/pages/Analysis";
import FieldWorker from "@/pages/FieldWorker";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/field" element={<FieldWorker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;