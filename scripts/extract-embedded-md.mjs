import fs from 'fs';
const h = fs.readFileSync('index.html', 'utf8');
const start = h.indexOf('id="embedded-md-json"');
const gt = h.indexOf('>', start) + 1;
const end = h.indexOf('</script>', gt);
const s = JSON.parse(h.slice(gt, end));
fs.writeFileSync('docs-vi.md', s, 'utf8');
console.log('Wrote docs-vi.md', s.length, 'chars');
