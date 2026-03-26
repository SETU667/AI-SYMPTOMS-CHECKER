import { motion } from "framer-motion";
import { Clock, Trash2, Activity, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { formatSymptom } from "@/lib/medicalData";
import { Button } from "@/components/ui/button";

interface HistoryEntry {
  id: number;
  date: string;
  symptoms: string[];
  topResult: string;
  probability: number;
  results: { disease: string; probability: number }[];
}

export default function DashboardPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mediscan_history") || "[]");
    setHistory(data);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("mediscan_history");
    setHistory([]);
  };

  const deleteEntry = (id: number) => {
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem("mediscan_history", JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="container mx-auto max-w-4xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" /> Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Your symptom check history and health records</p>
          </div>
          {history.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory} className="text-destructive rounded-xl border-destructive/30">
              <Trash2 className="w-4 h-4 mr-1" /> Clear All
            </Button>
          )}
        </motion.div>

        {history.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl shadow-card border border-border/50 p-16 text-center">
            <Activity className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No History Yet</h3>
            <p className="text-muted-foreground">Your symptom check results will appear here after your first prediction.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl shadow-card border border-border/50 p-5 hover:shadow-card-hover transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg">{entry.topResult}</h3>
                    <p className="text-sm text-primary font-bold">{entry.probability}% match</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {entry.symptoms.map(s => (
                        <span key={s} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-xs text-primary font-medium border border-primary/15">
                          {formatSymptom(s)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => deleteEntry(entry.id)} className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
