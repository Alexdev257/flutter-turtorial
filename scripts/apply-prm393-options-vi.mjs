/**
 * Merges scripts/prm393-option-en-vi.json into quiz-data.json as options_vi per PRM393 question.
 * Run after fetch-prm393-option-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const mapPath = path.join(__dirname, 'prm393-option-en-vi.json');
const quizPath = path.join(root, 'quiz-data.json');

if (!fs.existsSync(mapPath)) {
  console.error('Missing', mapPath, '— run node scripts/fetch-prm393-option-translations.mjs first');
  process.exit(1);
}

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
const prm = data.modules.find((m) => m.id === 'PRM393');
if (!prm) {
  console.error('PRM393 not found');
  process.exit(1);
}

let n = 0;
for (const q of prm.questions) {
  const opts = q.options;
  if (!Array.isArray(opts)) continue;
  const vi = opts.map((en) => {
    if (map[en] != null) return map[en];
    console.warn('Missing translation for:', en);
    return en;
  });
  q.options_vi = vi;
  n++;
}
console.log('Set options_vi on', n, 'questions');
fs.writeFileSync(quizPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
