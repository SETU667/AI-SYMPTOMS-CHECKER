import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, AlertTriangle, ArrowRight, Mic, MicOff, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SYMPTOMS, SYMPTOM_CATEGORIES, formatSymptom, predictDisease, type Symptom, type PredictionResult } from "@/lib/medicalData";
import PredictionCard from "@/components/PredictionCard";
import AnalysisChart from "@/components/AnalysisChart";
import HospitalLocator from "@/components/HospitalLocator";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export default function SymptomCheckerPage() {
  const [selected, setSelected] = useState<Symptom[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PredictionResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(true);

  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) setSearch(transcript);
  }, [transcript]);

  const filtered = SYMPTOMS.filter(
    s => s.includes(search.toLowerCase().replace(/ /g, "_")) && !selected.includes(s)
  );

  const toggle = (s: Symptom) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    setResults(null);
  };

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => {
      const predictions = predictDisease(selected);
      setResults(predictions);
      setLoading(false);

      if (predictions.length > 0) {
        const history = JSON.parse(localStorage.getItem("mediscan_history") || "[]");
        history.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          symptoms: selected,
          topResult: predictions[0].disease,
          probability: predictions[0].probability,
          results: predictions.map(p => ({ disease: p.disease, probability: p.probability })),
        });
        localStorage.setItem("mediscan_history", JSON.stringify(history.slice(0, 50)));
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative">
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="container mx-auto max-w-4xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" /> AI Symptom Analysis
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Symptom Checker</h1>
          <p className="text-muted-foreground max-w-md mx-auto">Select your symptoms below and our AI engine will analyze potential conditions</p>
        </motion.div>

        {/* Search + Symptoms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl shadow-card border border-border/50 p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={isListening ? "🎤 Listening..." : "Search symptoms or speak..."}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-14 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            {isSupported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-3 top-2.5 p-2 rounded-xl transition-all ${
                  isListening
                    ? "bg-destructive text-destructive-foreground shadow-lg animate-pulse"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/10"
                }`}
                title={isListening ? "Stop listening" : "Search by voice"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Selected */}
          {selected.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Selected Symptoms ({selected.length})</p>
              <div className="flex flex-wrap gap-2">
                {selected.map(s => (
                  <button
                    key={s}
                    onClick={() => toggle(s)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-hero text-primary-foreground text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
                  >
                    {formatSymptom(s)}
                    <X className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category toggle */}
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            {search ? "Search Results" : "Browse by Category"}
            {!search && (showCategories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
          </button>

          {search ? (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s}
                  onClick={() => toggle(s)}
                  className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                >
                  {formatSymptom(s)}
                </button>
              ))}
              {filtered.length === 0 && <p className="text-sm text-muted-foreground">No symptoms match your search.</p>}
            </div>
          ) : showCategories ? (
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => {
                const available = symptoms.filter(s => !selected.includes(s));
                if (available.length === 0) return null;
                return (
                  <div key={category}>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {available.map(s => (
                        <button
                          key={s}
                          onClick={() => toggle(s)}
                          className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                        >
                          {formatSymptom(s)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {filtered.map(s => (
                <button
                  key={s}
                  onClick={() => toggle(s)}
                  className="px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                >
                  {formatSymptom(s)}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Predict button */}
        <div className="text-center mb-10">
          <Button
            onClick={handlePredict}
            disabled={selected.length === 0 || loading}
            size="lg"
            className="bg-gradient-hero text-primary-foreground shadow-hero hover:opacity-90 transition-all px-12 py-6 text-base rounded-xl group"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                Predict Disease
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results !== null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {results.length === 0 ? (
                <div className="bg-card rounded-2xl shadow-card border border-border/50 p-10 text-center">
                  <AlertTriangle className="w-14 h-14 text-brand-coral mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">No Match Found</h3>
                  <p className="text-muted-foreground">Try selecting more symptoms or different combinations for better results.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Prediction Results
                  </h2>

                  <AnalysisChart results={results} selectedSymptoms={selected} />

                  {results.map((result, i) => (
                    <PredictionCard key={result.disease} result={result} rank={i + 1} />
                  ))}

                  <HospitalLocator />

                  <div className="bg-brand-amber-light rounded-xl p-5 flex items-start gap-3 border border-brand-amber/20">
                    <AlertTriangle className="w-5 h-5 text-brand-amber mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground">
                      <strong>Disclaimer:</strong> These predictions are for informational purposes only. Always consult a qualified healthcare professional for accurate diagnosis and treatment.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
