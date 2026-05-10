import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "@assets/AM_Operations_Group_Logo_white_transparent_1771290119687.png";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingSubmit } from "@/hooks/useBookingSubmit";

export function Footer() {
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

  const openBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowBooking(true);
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
      <footer className="border-t border-white/[0.05] bg-black pt-32 pb-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 mb-32">
            <div className="space-y-10">
              <h2 className="font-display font-bold text-2xl tracking-[0.2em] uppercase text-white/90">AM Operations Group</h2>
              <p className="text-3xl text-white/60 font-light max-w-lg leading-tight tracking-tight text-balance">
                Revenue stability engineered at the operations level. <span className="text-white">The new standard in capacity optimization.</span>
              </p>
            </div>
            
            <div className="flex flex-col lg:items-end justify-center group">
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] mb-4">Inquiries</span>
              <button 
                onClick={openBooking}
                className="text-3xl md:text-5xl font-display font-bold text-white transition-all duration-700 hover:tracking-tighter inline-flex items-center gap-6 outline-none"
              >
                Book a call <span className="text-white/20 group-hover:text-white transition-colors">→</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/[0.02] gap-8">
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">© 2026 AM Operations Group. Structural Discipline Guaranteed.</div>
            <div className="flex gap-12">
              {['Privacy', 'Terms', 'Status: Active'].map((item, i) => (
                <span key={i} className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] hover:text-white/60 transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
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
