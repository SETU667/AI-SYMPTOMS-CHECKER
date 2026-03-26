import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Loader2, Hospital, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HospitalInfo {
  name: string;
  lat: number;
  lon: number;
  distance?: number;
  address?: string;
}

export default function HospitalLocator() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
        setLocation(coords);

        try {
          // Reverse geocode
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`,
            { headers: { "Accept-Language": "en" } }
          );
          const geoData = await geoRes.json();
          const city = geoData.address?.city || geoData.address?.town || geoData.address?.village || geoData.address?.county || "";
          const state = geoData.address?.state || "";
          const country = geoData.address?.country || "";
          setLocationName([city, state, country].filter(Boolean).join(", "));

          // Find nearby hospitals using Overpass API
          const overpassQuery = `[out:json][timeout:15];(node["amenity"="hospital"](around:15000,${coords.lat},${coords.lon});way["amenity"="hospital"](around:15000,${coords.lat},${coords.lon});relation["amenity"="hospital"](around:15000,${coords.lat},${coords.lon}););out center body;`;
          const hospitalRes = await fetch(
            `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
          );
          const hospitalData = await hospitalRes.json();

          const found: HospitalInfo[] = hospitalData.elements
            .filter((el: any) => el.tags?.name)
            .map((el: any) => {
              const hLat = el.lat || el.center?.lat;
              const hLon = el.lon || el.center?.lon;
              const dist = getDistanceKm(coords.lat, coords.lon, hLat, hLon);
              const street = el.tags["addr:street"] || "";
              const hCity = el.tags["addr:city"] || "";
              return {
                name: el.tags.name,
                lat: hLat,
                lon: hLon,
                distance: dist,
                address: [street, hCity].filter(Boolean).join(", ") || undefined,
              };
            })
            .sort((a: HospitalInfo, b: HospitalInfo) => (a.distance || 0) - (b.distance || 0))
            .slice(0, 10);

          setHospitals(found);
        } catch {
          setError("Could not fetch nearby hospitals. Please try again.");
        }
        setLoading(false);
      },
      (err) => {
        if (err.code === 1) {
          setError("Location access denied. Please enable location permissions in your browser settings.");
        } else if (err.code === 2) {
          setError("Location unavailable. Please check your device's location settings.");
        } else {
          setError("Location request timed out. Please try again.");
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-cyan-light flex items-center justify-center">
              <Hospital className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground text-lg">Nearby Hospitals</h3>
              {locationName && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-primary" /> {locationName}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={getLocation}
            disabled={loading}
            variant={location ? "outline" : "default"}
            size="sm"
            className={!location ? "bg-gradient-hero text-primary-foreground rounded-xl shadow-sm" : "rounded-xl"}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            ) : location ? (
              <RefreshCw className="w-4 h-4 mr-1.5" />
            ) : (
              <Navigation className="w-4 h-4 mr-1.5" />
            )}
            {location ? "Refresh" : "Detect Location"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mx-6 mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Map */}
      {location && (
        <div className="mx-6 mb-4 rounded-xl overflow-hidden border border-border">
          <iframe
            title="Hospital Map"
            width="100%"
            height="280"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lon - 0.1}%2C${location.lat - 0.08}%2C${location.lon + 0.1}%2C${location.lat + 0.08}&layer=mapnik&marker=${location.lat}%2C${location.lon}`}
          />
        </div>
      )}

      {/* Hospital list */}
      {hospitals.length > 0 && (
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {hospitals.length} hospitals found within 15km
          </p>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {hospitals.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-muted/60 hover:bg-muted transition-colors border border-transparent hover:border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{h.name}</p>
                    {h.address && <p className="text-xs text-muted-foreground">{h.address}</p>}
                    <p className="text-xs text-primary font-semibold mt-0.5">{h.distance?.toFixed(1)} km away</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium shrink-0"
                >
                  Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {location && hospitals.length === 0 && !loading && !error && (
        <div className="px-6 pb-6">
          <p className="text-sm text-muted-foreground text-center py-4">No hospitals found within 15km radius.</p>
        </div>
      )}

      {!location && !loading && (
        <div className="px-6 pb-6">
          <div className="text-center py-8 rounded-xl bg-muted/40 border border-dashed border-border">
            <MapPin className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click "Detect Location" to find nearby hospitals
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
