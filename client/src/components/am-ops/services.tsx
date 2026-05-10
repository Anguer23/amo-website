import { motion } from "framer-motion";
import { FileText, Zap, Users, AlertCircle } from "lucide-react";

const SERVICES = [
  {
    id: "load-intelligence",
    icon: FileText,
    title: "Load Intelligence",
    subtitle: "Rate Confirmation Audits + Detention Negotiation",
    description: "Before a single wheel turns, we read every clause in the rate confirmation. Every. Line. If the language is wrong or the rate is off, you don't move. We negotiate 2 extra hours of detention on every single load—built into the rate upfront, not fought for after delivery.",
    features: [
      "Rate confirmation clause-by-clause review",
      "2 hours detention pre-negotiated per load",
      "Direct broker relationship leverage",
      "Loads from private channels (never hit DAT)"
    ]
  },
  {
    id: "payment-protection",
    icon: Zap,
    title: "Payment Protection",
    subtitle: "Real-Time Monitoring + Dispute Resolution",
    description: "We check your payment before you do. If it's short, we file a written dispute within 24 hours—no exceptions. Our backend team operates 24/7, catching issues human error would miss. The money hits right. You never chase anyone.",
    features: [
      "Real-time payment verification",
      "24-hour short pay dispute filing",
      "24/7 backend team monitoring",
      "AI agents running around the clock"
    ]
  },
  {
    id: "broker-access",
    icon: Users,
    title: "Broker Access",
    subtitle: "Direct Lines + First-Look Loads",
    description: "We don't bid on DAT like everyone else. Brokers call us first because our team spent years on the broker side—we know how margin works, what language games exist, and how to negotiate before the load hits the board. You get first access to the best rates.",
    features: [
      "Direct broker relationship network",
      "Loads before public boards",
      "Broker-side market intelligence",
      "Expert negotiators with broker background"
    ]
  },
  {
    id: "crisis-support",
    icon: AlertCircle,
    title: "Crisis Support",
    subtitle: "Breakdowns + Roadside + Personal Escalation",
    description: "When the road goes sideways—tire blowout, mechanical failure, trailer damage on a broker's equipment—we handle it. We find the service, compare prices, and make sure you're not overpaying because you're stranded. If something doesn't resolve in 48 hours, our leadership team gets on the phone personally. That's not a promise. That's policy.",
    features: [
      "Roadside service coordination",
      "Price comparison for emergency repairs",
      "Trailer damage liability management",
      "Personal escalation to leadership"
    ]
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 border-t border-white/5 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-28"
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-6">The Full Picture</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
            We're not just a rate engine.
          </h2>
          <p className="text-white/40 font-light text-lg md:text-xl leading-relaxed">
            You get rate optimization <span className="text-white">plus</span> 24/7 operational management, dispute resolution, broker relationships, and crisis support. The full system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col h-full"
              >
                <div className="glass-panel p-8 md:p-10 rounded-[2rem] border-white/[0.05] hover:border-white/20 transition-all duration-700 flex flex-col h-full">
                  {/* Icon + Title */}
                  <div className="mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block mb-6"
                    >
                      <Icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
                    </motion.div>
                    
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-[11px] md:text-xs font-mono text-emerald-400/80 uppercase tracking-[0.3em]">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-white/40 font-light leading-relaxed text-base mb-8 flex-grow">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-8 border-t border-white/[0.05]">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-emerald-500/60 mt-1.5 flex-shrink-0">•</span>
                        <span className="text-[13px] md:text-sm text-white/50 font-light">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom insight box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 md:mt-24 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/10 bg-white/[0.02]">
            <div className="flex gap-4 md:gap-6">
              <div className="w-1 h-16 bg-gradient-to-b from-emerald-500/50 to-transparent rounded-full flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-3">Why This Matters</span>
                <p className="text-base md:text-lg font-light text-white/60 leading-relaxed">
                  Most dispatchers are transactional. They book a load, take their commission, disappear. We operate like a full partner. We're in the details before, during, and after every load. While you're driving, our team is fighting for your money, protecting your MC, and making sure nothing falls through the cracks.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
