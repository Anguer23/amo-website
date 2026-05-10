const fs = require('fs');
const file = './client/src/components/am-ops/tiers.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<p className="text-white\/40 font-light text-base md:text-lg max-w-2xl mx-auto">\s*Try any tier. If we're not delivering, you're done. We don't need contracts—<span className="text-emerald-400">we need results<\/span>.\s*<\/p>/g, '');
fs.writeFileSync(file, content);
