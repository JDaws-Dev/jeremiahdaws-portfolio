import { getAllAssets } from '../lib/portfolio.ts';
const all = getAllAssets();
const byLane = {};
for (const a of all) byLane[a.lane] = (byLane[a.lane] || 0) + 1;
console.log('total:', all.length);
console.log(byLane);
const yt = all.filter(a => a.source === 'youtube' && a.lane === 'making');
console.log('making/youtube:', yt.length);
