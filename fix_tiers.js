const fs = require('fs');
let content = fs.readFileSync('client/src/components/am-ops/tiers.tsx', 'utf-8');

// Fix the price display
content = content.replace(
  '<div className="flex items-baseline gap-3 mb-6">\n                    <span className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left">{tier.price}</span>\n                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{tier.priceSub}</span>\n                  </div>',
  '<div className="flex flex-wrap xl:flex-nowrap items-baseline gap-2 xl:gap-3 mb-6">\n                    <span className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold text-white tracking-tighter group-hover:scale-105 transition-transform duration-500 origin-left whitespace-nowrap">{tier.price}</span>\n                    <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest whitespace-nowrap">{tier.priceSub}</span>\n                  </div>'
);

// Fix the container spacing
content = content.replace(
  '<div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto relative z-10">',
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto relative z-10">'
);

// Fix padding inside the cards
content = content.replace(
  'relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-700 group overflow-hidden backdrop-blur-md',
  'relative flex flex-col p-6 lg:p-8 xl:p-10 rounded-[2.5rem] border transition-all duration-700 group overflow-hidden backdrop-blur-md'
);

fs.writeFileSync('client/src/components/am-ops/tiers.tsx', content);
