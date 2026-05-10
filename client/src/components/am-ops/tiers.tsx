import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, X, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingSubmit } from "@/hooks/useBookingSubmit";

const TIERS = [
  {
    name: "First Load Free",
    price: "0%",
    priceSub: "First Load",
    description: "Experience the full AM Operations difference on your first load—zero commission, full service. RC audits, detention negotiation, payment protection, everything.",
    features: [
      "Complete rate confirmation audit",
      "Detention pre-negotiated upfront",
      "Real-time payment monitoring",
      "24/7 operations team support",
      "Zero commission on first load"
    ],
    cta: "Book Consultation",
    highlight: false,
    commitment: "No Commitment"
  },
  {
    name: "Enterprise Pro",
    price: "10%",
    priceSub: "Gross Revenue",
    description: "Full operational partnership. Rate optimization, load intelligence, payment protection, broker access, crisis support—everything we offer. Month-to-month, cancel anytime.",
    features: [
      "Priority INTEL_SYSTEM Access",
      "RC clause audits on every load",
      "Detention negotiation + tracking",
      "Direct broker relationship leverage",
      "24/7 payment verification & disputes",
      "Crisis support + roadside coordination",
      "Weekly performance analytics"
    ],
    cta: "Start Enterprise Pro",
    highlight: true,
    commitment: "No Commitment"
  },
  {
    name: "Custom Matrix",
    price: "Custom",
    priceSub: "Negotiated",
    description: "Bespoke operational architecture for large-scale fleets. Dedicated management, custom rate structures, volume leverage, and white-glove support.",
    features: [
      "Full operational integration",
      "Dedicated account management",
      "Custom rate negotiation",
      "Volume broker leverage",
      "Executive-level reporting",
      "Compliance & audit management",
      "Unlimited fleet scaling"
    ],
    cta: "Contact Sales",
    highlight: false,
    commitment: "No Commitment"
  }
];

export function Tiers() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    capacity: '',
  });
  const { submitBooking, isSubmitting, error } = useBookingSubmit();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const openBooking = (tierName: string) => {
    setSelectedTier(tierName);
    setShowBooking(true);
    setStep(1);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSelectedTier(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
    setFormData({ name: '', email: '', capacity: '' });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.capacity || !selectedTier) {
      return;
    }

    try {
      await submitBooking({
        fleetOperatorName: formData.name,
        email: formData.email,
        fleetCapacity: formData.capacity,
        selectedDate,
        selectedTime,
        tier: selectedTier,
      });
      setStep(3);
    } catch (err) {
      // Error is already set in the hook
    }
  };

  return (
    <section id="tiers" className="py-24 md:py-32 border-t border-white/5 bg-black relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-[0.5em] block mb-6">Pricing Model</span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
              Pick your entry point.
            </h2>
            <p className="text-white/40 font-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              We're so confident in what we deliver that you can walk away anytime. No lock-ins. No contracts. No commitments.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-10">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`
                  relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-700 group overflow-hidden backdrop-blur-md
                  ${tier.highlight 
                    ? 'bg-white/[0.04] border-white/20 shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] hover:bg-white/[0.06] hover:border-white/30' 
                    : 'bg-white/[0.01] border-white/5 hover:border-white/15 hover:bg-white/[0.03]'}
                `}
              >
                {tier.highlight && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-70" />
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-black text-[9px] font-mono uppercase tracking-[0.3em] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] z-20 whitespace-nowrap" style={{ marginTop: '16px' }}>
                    Most Popular
                  </div>
                )}

                <div className="mb-8 md:mb-10 relative z-10">
                  <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] mb-4 group-hover:text-white/60 transition-colors duration-500">{tier.name}</h3>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">{tier.price}</span>
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{tier.priceSub}</span>
                  </div>
                  <p className="text-white/40 font-light text-sm leading-relaxed mb-6 group-hover:text-white/60 transition-colors duration-500 min-h-[100px]">{tier.description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full group-hover:border-white/20 transition-colors duration-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${tier.name === 'Enterprise Pro' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'bg-white/40'}`}></span>
                    <span className={`text-[9px] font-mono uppercase tracking-[0.2em] ${tier.name === 'Enterprise Pro' ? 'text-emerald-400' : 'text-white/60'}`}>{tier.commitment}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4 mb-10 md:mb-12 relative z-10">
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-6" />
                  {tier.features.map((feature, idx) => (
                    <div key={feature} className="flex items-start gap-4 group/feature">
                      <div className={`mt-0.5 p-1 rounded-full flex-shrink-0 transition-colors duration-300 ${tier.highlight ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 group-hover/feature:text-white/80 group-hover/feature:bg-white/10'}`}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-light text-white/50 tracking-wide group-hover/feature:text-white/80 transition-colors duration-300 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => openBooking(tier.name)}
                  className={`
                    w-full h-14 md:h-16 px-4 rounded-xl md:rounded-2xl font-mono text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-wider md:tracking-widest transition-all duration-500 relative z-10 overflow-hidden flex items-center justify-center whitespace-nowrap
                    ${tier.highlight 
                      ? 'bg-white text-black hover:bg-white/90 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]' 
                      : 'bg-[#111] text-white hover:bg-white/10 hover:scale-[1.02] border border-white/5 hover:border-white/20'}
                  `}
                >
                  <span className="relative z-10 text-center w-full">{tier.cta}</span>
                  {tier.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-xl rounded-[2.5rem] overflow-hidden relative border-white/10"
            >
              <button 
                onClick={closeBooking}
                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="p-10">
                <div className="mb-10">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-2">Sync Request: {selectedTier}</span>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {step === 1 ? "Select Operational Window" : step === 2 ? "Finalize Synchronization" : "Request Submitted"}
                  </h3>
                </div>

                {step === 1 && (
                  <div className="space-y-8">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-display font-bold text-white text-sm uppercase tracking-widest">March 2026</span>
                        <div className="flex gap-2">
                          <ChevronLeft size={16} className="text-white/20" />
                          <ChevronRight size={16} className="text-white/20" />
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center mb-4">
                        {['S','M','T','W','T','F','S'].map(d => (
                          <span key={d} className="text-[9px] font-mono text-white/20">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {days.map(d => (
                          <button
                            key={d}
                            onClick={() => setSelectedDate(d)}
                            className={`aspect-square rounded-lg text-[10px] font-mono transition-all duration-300 ${selectedDate === d ? 'bg-white text-black' : 'text-white/40 hover:bg-white/10'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {times.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 rounded-xl border font-mono text-[9px] transition-all duration-300 ${selectedTime === t ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/5 text-white/30 hover:border-white/10'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <Button 
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep(2)}
                      className="w-full py-6 rounded-2xl bg-white text-black font-mono text-[10px] uppercase tracking-widest disabled:opacity-20"
                    >
                      Confirm Window
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <CalendarIcon className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white font-light tracking-wide">March {selectedDate}, 2026</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-white/40" />
                          <span className="text-sm text-white font-light tracking-wide">{selectedTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="FLEET OPERATOR NAME" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white font-mono text-[10px] outline-none focus:border-white/20 transition-all uppercase tracking-widest" 
                      />
                      <input 
                        type="email" 
                        placeholder="SECURE CONTACT EMAIL" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white font-mono text-[10px] outline-none focus:border-white/20 transition-all uppercase tracking-widest" 
                      />
                      <textarea 
                        placeholder="FLEET CAPACITY / EQUIPMENT TYPE" 
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-white font-mono text-[10px] outline-none focus:border-white/20 transition-all uppercase tracking-widest h-24 resize-none" 
                      />
                    </div>

                    {error && <div className="text-red-400 text-[10px] font-mono text-center">{error}</div>}

                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-2xl bg-white text-black font-mono text-[10px] uppercase tracking-widest disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Initialize Link'}
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="py-12 text-center space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto">
                      <Check className="text-emerald-400 w-8 h-8" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-display text-xl font-bold mb-2">Request Transmitted</h4>
                      <p className="text-white/40 text-sm font-light leading-relaxed">
                        Our intelligence team is reviewing your fleet profile. <br/>A secure calendar invite has been dispatched.
                      </p>
                    </div>
                    <Button onClick={closeBooking} className="w-full py-6 rounded-2xl bg-white/5 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white/10">
                      Close Terminal
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
