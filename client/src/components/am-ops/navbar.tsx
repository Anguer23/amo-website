import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import logo from "@assets/AM_Operations_Group_Logo_white_transparent_1771290119687.png";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useBookingSubmit } from "@/hooks/useBookingSubmit";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = () => {
    setShowBooking(true);
    setIsOpen(false);
    setStep(1);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
    setFormData({ name: '', email: '', capacity: '' });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.capacity) {
      return;
    }

    try {
      await submitBooking({
        fleetOperatorName: formData.name,
        email: formData.email,
        fleetCapacity: formData.capacity,
        selectedDate,
        selectedTime,
        tier: 'Consultation',
      });
      setStep(3);
    } catch (err) {
      // Error is already set in the hook
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "h-20 bg-black/60 border-b border-white/10" : "h-24 bg-transparent border-b border-transparent"
        } backdrop-blur-3xl`}
      >
        <div className="container mx-auto px-6 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex items-center"
            >
              <img 
                src={logo} 
                alt="AM Operations Group" 
                className="h-8 md:h-12 w-auto brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
              />
            </motion.div>
            <div className="h-6 w-[1px] bg-white/[0.08] hidden sm:block mx-2" />
            <span className="font-display font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase hidden sm:block text-white/40">
              AM Operations Group
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">
            {["Mission", "Services", "Reach", "Dashboard", "Tiers"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-all duration-700 relative group overflow-hidden"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={openBooking}
              className="hidden sm:flex bg-white/[0.02] border-white/10 hover:bg-white text-white hover:text-black transition-all duration-700 font-mono text-[10px] uppercase tracking-[0.3em] px-8 h-11 rounded-full border shadow-2xl"
            >
              Book a call
            </Button>
            
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white/60 hover:text-white transition-colors active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-0 z-[45] lg:hidden bg-black/40 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 top-0 z-[46] lg:hidden bg-[#050505] border-b border-white/10 pt-24 pb-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
              >
                <div className="container mx-auto px-8 flex flex-col gap-1 items-center">
                  {["Mission", "Services", "Reach", "Dashboard", "Tiers"].map((item, i) => (
                    <motion.a 
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.2 }}
                      href={`#${item.toLowerCase()}`} 
                      className="text-[14px] font-mono uppercase tracking-[0.5em] text-white/40 hover:text-white transition-all py-4 w-full text-center border-b border-white/[0.03] last:border-0"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full mt-8 max-w-xs"
                  >
                    <Button 
                      variant="outline" 
                      onClick={openBooking}
                      className="w-full bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] rounded-full py-7 shadow-[0_0_30px_rgba(255,255,255,0.1)] border-0"
                    >
                      Book a call
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Booking Modal (Shared with Tiers logic) */}
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
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block mb-2">Sync Request</span>
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
    </>
  );
}
