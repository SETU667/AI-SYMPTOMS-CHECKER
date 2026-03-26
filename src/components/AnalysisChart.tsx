import { motion } from "framer-motion";
import { BarChart3, Activity, TrendingUp, Brain } from "lucide-react";
import { type PredictionResult, formatSymptom } from "@/lib/medicalData";

interface Props {
  results: PredictionResult[];
  selectedSymptoms: string[];
}

const barColors = [
  "from-primary to-brand-cyan",
  "from-brand-violet to-brand-cyan",
  "from-brand-coral to-brand-amber",
  "from-brand-amber to-primary",
  "from-brand-cyan to-brand-violet",
];

export default function AnalysisChart({ results, selectedSymptoms }: Props) {
  const severityCounts = { low: 0, medium: 0, high: 0 };
  results.forEach(r => severityCounts[r.entry.severity]++);

  const symptomHits: Record<string, number> = {};
  results.forEach(r => {
    r.matchedSymptoms.forEach(s => {
      symptomHits[s] = (symptomHits[s] || 0) + 1;
    });
  });
  const sortedSymptomHits = Object.entries(symptomHits).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card border border-border/50 p-6 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-brand-violet-light flex items-center justify-center">
          <Brain className="w-5 h-5 text-brand-violet" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">AI Analysis Report</h3>
          <p className="text-xs text-muted-foreground">{results.length} conditions analyzed • {selectedSymptoms.length} symptoms evaluated</p>
        </div>
      </div>

      {/* Probability bars */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Disease Match Comparison
        </h4>
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={r.disease}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-foreground font-medium truncate mr-2">{r.disease}</span>
                <span className="text-primary font-bold shrink-0">{r.probability}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.probability}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${barColors[i % barColors.length]}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Severity distribution */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-coral" />
          Severity Distribution
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {(["low", "medium", "high"] as const).map(sev => {
            const colors = {
              low: { bg: "bg-brand-emerald-light", text: "text-primary", border: "border-primary/20" },
              medium: { bg: "bg-brand-amber-light", text: "text-brand-amber", border: "border-brand-amber/20" },
              high: { bg: "bg-brand-coral-light", text: "text-brand-coral", border: "border-brand-coral/20" },
            };
            const c = colors[sev];
            return (
              <div key={sev} className={`text-center p-4 rounded-xl ${c.bg} border ${c.border}`}>
                <p className={`font-display text-3xl font-bold ${c.text}`}>{severityCounts[sev]}</p>
                <p className="text-xs text-muted-foreground capitalize mt-1">{sev} Severity</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Symptom influence */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Symptom Influence Map</h4>
        <p className="text-xs text-muted-foreground mb-3">How many diseases each symptom is linked to</p>
        <div className="flex flex-wrap gap-2">
          {sortedSymptomHits.map(([symptom, count]) => (
            <span
              key={symptom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/15"
            >
              {formatSymptom(symptom)}
              <span className="bg-gradient-hero text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                {count}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-brand-violet/5 rounded-xl p-5 border border-primary/10">
        <p className="text-sm text-foreground leading-relaxed">
          <strong className="text-gradient-hero">AI Summary:</strong> Based on {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""}, 
          we identified {results.length} potential condition{results.length !== 1 ? "s" : ""}. 
          {results.length > 0 && (
            <> The strongest match is <strong className="text-primary">{results[0].disease}</strong> at {results[0].probability}% confidence.
            {results[0].entry.severity === "high" && " ⚠️ This condition has high severity — please consult a doctor promptly."}</>
          )}
        </p>
      </div>
    </motion.div>
  );
}
