import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

const VOLATILITY_DATA = [
  { month: 'Nov', spot: 2.25, contract: 2.42, load_ratio: 4.8 },
  { month: 'Dec', spot: 2.85, contract: 2.40, load_ratio: 9.9 },
  { month: 'Jan', spot: 2.94, contract: 2.41, load_ratio: 8.5 },
  { month: 'Feb', spot: 3.12, contract: 2.43, load_ratio: 10.2 },
  { month: 'Mar', spot: 3.42, contract: 2.45, load_ratio: 11.4 },
];

const METRICS = [
  { id: 'volatility', label: 'Market Volatility', value: '+31.8%', sub: 'March Peak' },
  { id: 'ratio', label: 'Load-to-Truck', value: '11.4:1', sub: 'Extreme Crunch' },
  { id: 'margin', label: 'Booking Margin', value: '$0.72', sub: 'vs Market Avg' },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('volatility');
  const sectionRef = useRef(null);

  return (
    <section id="dashboard" className="py-24 md:py-32 border-t border-white/5 bg-black relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-4 space-y-10 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">The Data Advantage</span>
              <h2 className="font-display text-4xl font-bold text-white mb-6 tracking-tighter leading-tight">Leverage the <br/>Volatility.</h2>
              <p className="text-white/40 font-light leading-relaxed text-base md:text-lg">
                Most owner-operators are crushed by market shifts. Our proprietary optimization engine identifies high-yield windows and engineers lane stability when the market turns reactive.
              </p>
            </motion.div>

            {/* Redesigned Tab Section with enhanced mobile smoothness */}
            <div className="flex flex-col gap-3 relative">
              {METRICS.map((m) => (
                <button 
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className="relative text-left w-full group outline-none"
                  data-testid={`tab-${m.id}`}
                >
                  <motion.div 
                    className={`
                      relative z-10 p-5 md:p-6 rounded-2xl border transition-all duration-500 overflow-hidden
                      ${activeTab === m.id 
                        ? 'border-white/20 bg-white/[0.04]' 
                        : 'border-white/5 bg-transparent hover:border-white/10'}
                    `}
                  >
                    {/* Active Background Glow - Enhanced for smoothness */}
                    <AnimatePresence>
                      {activeTab === m.id && (
                        <motion.div
                          layoutId="active-glow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between items-center mb-2 relative z-10">
                      <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${activeTab === m.id ? 'text-white' : 'text-white/30'}`}>
                        {m.label}
                      </span>
                      {activeTab === m.id && (
                        <motion.div 
                          layoutId="active-indicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
                        />
                      )}
                    </div>
                    
                    <div className="flex justify-between items-baseline relative z-10">
                      <span className={`text-2xl md:text-3xl font-display font-bold tracking-tighter transition-colors duration-500 ${activeTab === m.id ? 'text-white' : 'text-white/60'}`}>
                        {m.value}
                      </span>
                      <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-widest transition-colors duration-500 ${activeTab === m.id ? 'text-emerald-400' : 'text-white/20'}`}>
                        {m.sub}
                      </span>
                    </div>
                  </motion.div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] h-[400px] md:h-[550px] flex flex-col relative overflow-hidden border-white/[0.08]"
            >
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <div className="flex gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">Spot Index</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">Contract</span>
                  </div>
                </div>
                <div className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <span className="text-[7px] md:text-[9px] font-mono text-white/60 tracking-widest uppercase">INTEL_SYSTEM_V4.2</span>
                </div>
              </div>

              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  {activeTab === 'volatility' ? (
                    <AreaChart data={VOLATILITY_DATA}>
                      <defs>
                        <linearGradient id="colorSpot" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fff" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#333" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}
                      />
                      <Area type="monotone" dataKey="spot" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorSpot)" />
                      <Line type="monotone" dataKey="contract" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                  ) : activeTab === 'ratio' ? (
                    <BarChart data={VOLATILITY_DATA}>
                      <XAxis dataKey="month" stroke="#333" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Bar dataKey="load_ratio" radius={[6, 6, 0, 0]}>
                        {VOLATILITY_DATA.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 4 ? '#fff' : 'rgba(255,255,255,0.1)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  ) : (
                    <LineChart data={VOLATILITY_DATA}>
                      <XAxis dataKey="month" stroke="#333" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                      <Line type="stepAfter" dataKey="spot" stroke="#fff" strokeWidth={3} dot={{ fill: '#fff', r: 4 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5"
                >
                  <div className="flex gap-3 md:gap-4 items-start">
                    <div className="w-1 h-10 md:h-12 bg-emerald-500/40 rounded-full shrink-0" />
                    <p className="font-mono text-[9px] md:text-xs text-white/50 leading-relaxed uppercase tracking-widest">
                      {activeTab === 'volatility' && "Peak divergence detected: Spot rates climbing 31.8% above contract baseline. March data confirms immediate high-yield acquisition window."}
                      {activeTab === 'ratio' && "Load-to-truck ratio hit 11.4:1. Extreme capacity crunch. March optimization protocols prioritize direct capture for maximum leverage."}
                      {activeTab === 'margin' && "Systematic booking discipline capturing $0.72/mile margin above market median. March execution model remains fully active."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
