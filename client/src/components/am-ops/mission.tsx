import { motion } from "framer-motion";
import { Target, TrendingUp, ShieldCheck } from "lucide-react";

const missions = [
  {
    icon: Target,
    title: "Structural Weekly Planning",
    desc: "We don't react to Monday; we engineer it. Our framework defines primary targets and secures fallback corridors, ensuring your fleet is locked into performance before the wheels turn.",
    tags: ["ENGINEERED", "SECURED", "LOCKED"]
  },
  {
    icon: TrendingUp,
    title: "Strategic Rate Leverage",
    desc: "Market context is power. We leverage AI-backed analysis to identify true lane value, enabling aggressive negotiation that captures the ceiling, not just the floor.",
    tags: ["AGGRESSIVE", "AI-DRIVEN", "ELITE"]
  },
  {
    icon: ShieldCheck,
    title: "Compliance-Level Execution",
    desc: "In freight, discipline is the only true currency. We maintain high-accountability standards that build elite broker trust, granting you access to lanes that remain closed to the masses.",
    tags: ["DISCIPLINED", "TRUSTED", "EXCLUSIVE"]
  }
];

export function Mission() {
  return (
    <section id="mission" className="py-32 border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">The Standard</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter leading-tight">
            Stop reacting. <br/>Start operating.
          </h2>
          <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
            Most carriers survive on luck. AM Operations Group partners with those who demand structural stability and repeatable execution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="glass-panel p-10 rounded-3xl group transition-all duration-700 hover:border-white/20"
            >
              <div className="h-14 w-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                <item.icon className="text-white w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-light group-hover:text-white/60 transition-colors">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/20 border border-white/5 px-3 py-1.5 rounded-full bg-black/40 group-hover:text-white/40 group-hover:border-white/10 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
