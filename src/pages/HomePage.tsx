import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, Search, Shield, ArrowRight, Stethoscope, Pill, FileText, MapPin, Mic, Brain, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "Smart Symptom Search",
    description: "Search or speak your symptoms with AI-powered voice recognition and smart matching.",
    gradient: "from-primary to-brand-cyan",
    bg: "bg-brand-emerald-light",
  },
  {
    icon: Brain,
    title: "ML Disease Detection",
    description: "Advanced machine learning algorithm identifies the most probable conditions instantly.",
    gradient: "from-brand-violet to-brand-cyan",
    bg: "bg-brand-violet-light",
  },
  {
    icon: Pill,
    title: "Medicine & Dosage",
    description: "Get recommended medicines with dosage info, precautions, and health advice.",
    gradient: "from-brand-coral to-brand-amber",
    bg: "bg-brand-coral-light",
  },
  {
    icon: MapPin,
    title: "Hospital Locator",
    description: "Find nearby hospitals with live geolocation, distance tracking, and directions.",
    gradient: "from-brand-cyan to-primary",
    bg: "bg-brand-cyan-light",
  },
  {
    icon: Mic,
    title: "Voice Search",
    description: "Speak your symptoms naturally — our speech engine converts your voice to text instantly.",
    gradient: "from-brand-amber to-brand-coral",
    bg: "bg-brand-amber-light",
  },
  {
    icon: FileText,
    title: "Health Dashboard",
    description: "Track your symptom history, past reports, and health trends in a personal dashboard.",
    gradient: "from-primary to-brand-violet",
    bg: "bg-brand-emerald-light",
  },
];

const stats = [
  { value: "60+", label: "Symptoms", icon: Activity },
  { value: "22+", label: "Diseases", icon: Stethoscope },
  { value: "95%", label: "Accuracy", icon: Zap },
  { value: "Instant", label: "Results", icon: Heart },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pattern-dots" />
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-gradient-hero opacity-[0.07] rounded-full blur-[120px] animate-gradient" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-accent opacity-[0.07] rounded-full blur-[100px]" />
        <div className="absolute top-40 left-1/4 w-3 h-3 rounded-full bg-primary/30 animate-float" />
        <div className="absolute top-60 right-1/3 w-2 h-2 rounded-full bg-brand-violet/30 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 rounded-full bg-brand-cyan/20 animate-float" style={{ animationDelay: "4s" }} />

        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-semibold mb-6 border border-primary/20"
            >
              <Shield className="w-4 h-4" />
              AI-Powered Health Analysis
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
              <span className="text-foreground">Your Health,</span>
              <br />
              <span className="text-gradient-hero">Intelligently Analyzed</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Enter symptoms, get instant AI disease predictions with medicine recommendations, nearby hospital locations, and personalized health advice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/symptom-checker">
                <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-hero hover:opacity-90 transition-all text-base px-8 py-6 rounded-xl group">
                  Start Symptom Check
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl border-2">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="text-center p-5 rounded-2xl glass-card-strong shadow-card hover:shadow-card-hover transition-all cursor-default"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-display text-2xl md:text-3xl font-bold text-gradient-hero">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Powerful AI-driven health tools designed to give you quick, accurate medical insights</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all border border-border/50"
              >
                <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-hero rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-5">
                Ready to check your symptoms?
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">
                Get instant disease predictions, medicine recommendations, and find nearby hospitals in seconds.
              </p>
              <Link to="/symptom-checker">
                <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-lg group">
                  Launch Symptom Checker
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
