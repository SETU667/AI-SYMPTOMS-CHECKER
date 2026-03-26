import { Activity, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground">AI SYMPTOMS CHECKER</span>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-md">
            ⚕️ <strong>Disclaimer:</strong> This application provides informational medical guidance only and does not replace professional medical advice, diagnosis, or treatment.
          </p>

          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-brand-rose" /> AI SYMPTOMS CHECKER © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
