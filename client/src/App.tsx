import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Hero } from "./components/am-ops/hero";
import { Mission } from "./components/am-ops/mission";
import { Services } from "./components/am-ops/services";
import { Advantage } from "./components/am-ops/advantage";
import { Reach } from "./components/am-ops/reach";
import { Dashboard } from "./components/am-ops/dashboard";
import { Tiers } from "./components/am-ops/tiers";
import { Footer } from "./components/am-ops/footer";
import { Navbar } from "./components/am-ops/navbar";
import logo from "@assets/AM_Operations_Group_Logo_white_transparent_1771290119687.png";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen selection:bg-white/20 selection:text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              {/* Logo Reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <img 
                  src={logo} 
                  alt="AM Operations" 
                  className="h-20 md:h-24 w-auto brightness-125 contrast-125 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                />
                
                {/* Minimal surgical scanning line across logo */}
                <motion.div 
                  initial={{ top: "-10%", opacity: 0 }}
                  animate={{ top: "110%", opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[-10%] right-[-10%] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16 flex flex-col items-center gap-4"
              >
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[1em] pl-[1em]">
                  Optimizing Operations
                </span>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 h-1 bg-white/40 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Background atmospheric pulse */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.05, scale: 1.1 }}
              transition={{ duration: 2.4, ease: "easeOut" }}
              className="absolute w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none"
            />
          </motion.div>
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <Hero />
            <Mission />
            <Services />
            <Advantage />
            <Reach />
            <Dashboard />
            <Tiers />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
