import { motion } from "framer-motion";
import { useState } from "react";
import mapImage from "@assets/a08f72902a0c839ca6fa20f6933ed4b1_1771290952265.jpg";

// Real-world DAT/Market data (March 2026 targets)
const REGIONS = {
  west: {
    name: "Pacific Corridor",
    kpis: { 
      rpm: "$2.96", 
      deadhead: "6.8%", 
      density: "High",
      market_heat: "Rising",
      avg_gross: "$8,800" 
    },
    style: { top: "30%", left: "15%", width: "25%", height: "40%" }
  },
  central: {
    name: "Midwest Grid",
    kpis: { 
      rpm: "$3.34", 
      deadhead: "8.8%", 
      density: "Peak",
      market_heat: "Extreme",
      avg_gross: "$9,500"
    },
    style: { top: "25%", left: "40%", width: "25%", height: "50%" }
  },
  east: {
    name: "Atlantic Matrix",
    kpis: { 
      rpm: "$3.98", 
      deadhead: "8.2%", 
      density: "V.High",
      market_heat: "Stable",
      avg_gross: "$9,100"
    },
    style: { top: "20%", left: "65%", width: "25%", height: "50%" }
  }
};

export function Reach() {
  const [activeRegion, setActiveRegion] = useState<keyof typeof REGIONS | null>(null);

  return (
    <section id="reach" className="py-24 md:py-32 border-t border-white/5 relative bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        <div className="lg:col-span-4 space-y-10 md:space-y-12">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter leading-tight">Nationwide <br/>Influence.</h2>
            <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
              We engineer lane stability across every major corridor. Our system tracks regional volatility in real-time, providing a structural advantage over reactive dispatch.
            </p>
          </motion.div>

          <div className="space-y-4 md:space-y-6">
            <motion.div 
              key={activeRegion || 'default'}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 md:p-8 rounded-2xl border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-700" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-3">Operational Intelligence</span>
              <div className="flex justify-between items-end">
                <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  {activeRegion ? REGIONS[activeRegion].name : "National Fleet"}
                </span>
                <span className="text-white font-mono text-lg md:text-xl tabular-nums">
                  {activeRegion ? REGIONS[activeRegion].kpis.rpm : "$3.42"}
                </span>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Deadhead %", val: activeRegion ? REGIONS[activeRegion].kpis.deadhead : "7.4%" },
                { label: "Market Heat", val: activeRegion ? REGIONS[activeRegion].kpis.market_heat : "CRITICAL" }
              ].map((kpi, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel p-4 md:p-6 rounded-2xl bg-white/[0.01] border-white/5"
                >
                  <span className="text-[8px] md:text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">{kpi.label}</span>
                  <div className="text-lg md:text-xl font-bold text-white mt-2 tracking-tighter tabular-nums">
                    {kpi.val}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 rounded-2xl bg-white/[0.01] border-white/5"
            >
              <span className="text-[8px] md:text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Estimated Weekly Gross</span>
              <div className="text-xl md:text-2xl font-bold text-emerald-400 mt-2 tracking-tighter tabular-nums">
                {activeRegion ? REGIONS[activeRegion].kpis.avg_gross : "$8,200 - $10,500"}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-8 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/10] glass-panel rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden p-4 md:p-8 flex items-center justify-center bg-[#020202] border-white/[0.03] group"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={mapImage} 
                alt="Accurate US Map" 
                className="w-full h-full object-contain invert grayscale brightness-150 transition-all duration-1000 opacity-20 group-hover:opacity-40" 
              />
              
              <div className="absolute inset-0">
                {Object.entries(REGIONS).map(([key, region]) => (
                  <motion.div
                    key={key}
                    className="absolute cursor-pointer border border-transparent hover:border-white/20 hover:bg-white/[0.02] rounded-xl transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
                    style={region.style}
                    onHoverStart={() => setActiveRegion(key as any)}
                    onHoverEnd={() => setActiveRegion(null)}
                    onClick={() => setActiveRegion(activeRegion === key ? null : key as any)}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full blur-sm" 
                       />
                       <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full mx-auto" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 md:gap-4">
              <div className="h-[1px] w-8 md:w-12 bg-white/10" />
              <span className="text-[7px] md:text-[9px] font-mono text-white/30 tracking-[0.5em] uppercase">INTEL_SYSTEM Active</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
