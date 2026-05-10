import { motion } from "framer-motion";
import { Network, Cpu, Briefcase } from "lucide-react";

export function Advantage() {
  return (
    <section id="advantage" className="py-32 border-t border-white/5 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">The Competitive Moat</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Engineered for the elite.</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            While others scramble for loads on public boards, our partners leverage private networks and AI-driven precision to secure the market's most valuable freight.
          </p>
        </motion.div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {[
            {
              icon: Network,
              title: "Institutional Broker Network",
              subtitle: "1,000+ Direct relationships beyond the boards.",
              desc: "We don't follow the herd. We source freight through a decade of private broker leverage, giving you priority access to high-service lanes that never hit the public load board."
            },
            {
              icon: Cpu,
              title: "Proprietary Tech Intelligence",
              subtitle: "AI-assisted rate modeling & predictive tracking.",
              desc: "Our technology layer analyzes historical volatility and real-time lane density, allowing us to forecast rate peaks and lock in revenue stability before the market shifts."
            },
            {
              icon: Briefcase,
              title: "Operations Command Center",
              subtitle: "Compliance-level execution. No exceptions.",
              desc: "We understand that performance is the ultimate leverage. Our disciplined approach to on-time execution and risk mitigation makes your fleet the most desirable asset for top-tier shippers."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-10 md:p-12 rounded-[2.5rem] transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-white/0 group-hover:bg-white/40 transition-all duration-700" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                <div className="h-20 w-20 rounded-3xl bg-white/[0.02] flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 group-hover:border-white/20 transition-all duration-500">
                  <item.icon className="text-white w-8 h-8" strokeWidth={1} />
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="font-display text-3xl font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-white/60 font-medium text-lg italic">{item.subtitle}</p>
                  <p className="text-white/30 text-base max-w-3xl leading-relaxed font-light group-hover:text-white/50 transition-colors">
                    {item.desc}
                  </p>
                </div>

                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-10 group-hover:translate-x-0">
                  <span className="text-[10px] font-mono border border-white/20 px-4 py-2 rounded-full text-white/60 tracking-widest uppercase">Structural Lead</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
