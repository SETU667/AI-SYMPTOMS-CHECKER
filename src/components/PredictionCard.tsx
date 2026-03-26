import { motion } from "framer-motion";
import { Pill, Shield, HeartPulse, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { type PredictionResult, formatSymptom } from "@/lib/medicalData";

const severityConfig = {
  low: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", label: "Low" },
  medium: { bg: "bg-brand-amber/10", text: "text-brand-amber", border: "border-brand-amber/20", label: "Medium" },
  high: { bg: "bg-brand-coral/10", text: "text-brand-coral", border: "border-brand-coral/20", label: "High" },
};

const rankGradients = [
  "bg-gradient-hero",
  "from-brand-violet to-brand-cyan bg-gradient-to-r",
  "from-brand-coral to-brand-amber bg-gradient-to-r",
  "from-brand-cyan to-primary bg-gradient-to-r",
  "from-brand-amber to-brand-coral bg-gradient-to-r",
];

export default function PredictionCard({ result, rank }: { result: PredictionResult; rank: number }) {
  const [expanded, setExpanded] = useState(rank === 1);
  const { entry } = result;
  const sev = severityConfig[entry.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-2xl ${rankGradients[(rank - 1) % rankGradients.length]} flex items-center justify-center text-primary-foreground font-display font-bold text-sm`}>
            #{rank}
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">{result.disease}</h3>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm text-primary font-bold">{result.probability}% match</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${sev.bg} ${sev.text} border ${sev.border}`}>
                {sev.label} severity
              </span>
              <span className="text-xs text-muted-foreground">
                {result.matchedSymptoms.length}/{result.totalSymptoms} symptoms
              </span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {/* Progress */}
      <div className="px-5 pb-3">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.probability}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`h-full rounded-full ${rankGradients[(rank - 1) % rankGradients.length]}`}
          />
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pb-6"
        >
          {/* Matched symptoms */}
          <div className="mt-3 mb-5">
            <p className="text-sm font-semibold text-foreground mb-2">Matched Symptoms</p>
            <div className="flex flex-wrap gap-2">
              {result.matchedSymptoms.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/15">
                  {formatSymptom(s)}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-brand-emerald-light rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <Pill className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm text-foreground">Suggested Medicines</h4>
              </div>
              <ul className="space-y-2">
                {entry.medicines.map((m, i) => (
                  <li key={i} className="text-sm">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.dosage}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-amber-light rounded-xl p-4 border border-brand-amber/10">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-brand-amber" />
                <h4 className="font-semibold text-sm text-foreground">Precautions</h4>
              </div>
              <ul className="space-y-1.5">
                {entry.precautions.map((p, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                    <span className="text-brand-amber mt-1">•</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand-cyan-light rounded-xl p-4 border border-brand-cyan/10">
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="w-4 h-4 text-brand-cyan" />
                <h4 className="font-semibold text-sm text-foreground">Health Advice</h4>
              </div>
              <ul className="space-y-1.5">
                {entry.advice.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                    <span className="text-brand-cyan mt-1">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
