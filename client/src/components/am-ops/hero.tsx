import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, { stiffness: 40, damping: 20, restDelta: 0.001 });
  
  const y1 = useTransform(smoothY, [0, 500], [0, 100]);
  const opacity = useTransform(smoothY, [0, 300], [1, 0]);
  const scale = useTransform(smoothY, [0, 500], [1, 0.98]);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 md:pt-32 relative overflow-hidden">
      {/* Dynamic background element for mobile feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80%] aspect-square bg-white rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 md:gap-16 items-center pb-24 md:pb-32 relative z-10">
        <motion.div style={{ y: y1, opacity, scale }} className="lg:col-span-8 space-y-10 md:space-y-16">
          <div className="space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 md:px-5 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80"></span>
              </span>
              <span className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] md:tracking-[0.4em]">System Status: Synchronized</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display text-6xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] md:leading-[0.85] text-white"
            >
              Revenue <br />
              <span className="text-premium-gradient italic font-light">Stability.</span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/30 max-w-2xl font-light leading-relaxed md:leading-snug text-balance tracking-tight"
          >
            Engineering weekly performance through AI-backed dispatch and enterprise-grade operational discipline.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="flex flex-wrap gap-3 md:gap-6"
          >
            {["Lane Strategy", "Broker Leverage", "AI Rate Context", "Deadhead Control"].map((tag, i) => (
              <motion.span 
                key={tag}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.9 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="px-5 md:px-6 py-3 md:py-3 border border-white/[0.06] rounded-full text-[9px] md:text-[11px] font-mono text-white/30 bg-white/[0.02] backdrop-blur-md transition-all cursor-default uppercase tracking-[0.2em]"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="lg:col-span-4"
        >
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] space-y-8 md:space-y-12 border-white/[0.05] relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex justify-between items-center relative z-10">
              <h3 className="text-[9px] md:text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Optimization Engine</h3>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 md:w-4 md:h-4 border border-white/10 rounded-sm" 
              />
            </div>

            <div className="space-y-6 md:space-y-10 relative z-10">
              {[
                { label: "Weekly Target", val: "$6k - $9k+", color: "text-white" },
                { label: "Deadhead Cap", val: "< 12%", color: "text-white/40" },
                { label: "Active Nodes", val: "1,000+", color: "text-white/40" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-baseline group/item border-b border-white/[0.03] pb-5"
                >
                  <span className="text-white/20 text-[10px] md:text-[11px] font-light tracking-[0.1em] uppercase">{item.label}</span>
                  <span className={`font-mono text-xl md:text-2xl ${item.color} tracking-tighter tabular-nums`}>{item.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 md:pt-8 relative z-10">
              <div className="h-[3px] w-full bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "91.4%" }}
                  transition={{ duration: 4, ease: [0.16, 1, 0.3, 1], delay: 2 }}
                  className="h-full bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-[8px] md:text-[9px] font-mono text-white/10 uppercase tracking-[0.2em]">Matrix Load</span>
                <span className="text-[8px] md:text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">91.4% Efficiency</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 2 }}
        className="absolute bottom-12 left-8 text-white/10 hidden md:flex items-center gap-8"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.8em] font-light">System Architecture</span>
        <motion.div 
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
