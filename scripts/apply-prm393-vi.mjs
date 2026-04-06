/**
 * Adds q_vi + explain_vi to PRM393 in quiz-data.json (options stay EN unless options_vi exists).
 * Run: node scripts/apply-prm393-vi.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { qviA } from './prm393-qvi-a.mjs';
import { qviB } from './prm393-qvi-b.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const quizPath = path.join(root, 'quiz-data.json');

const EXPLAIN_VI = 'Theo bài kiểm tra tiến độ trong FE.docx (PRM393).';

const qvi = { ...qviA, ...qviB };

const data = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
const prm = data.modules.find((m) => m.id === 'PRM393');
if (!prm) {
  console.error('PRM393 module missing');
  process.exit(1);
}

let n = 0;
for (const [ks, text] of Object.entries(qvi)) {
  const i = +ks;
  if (!prm.questions[i]) {
    console.error('Bad index', i);
    process.exit(1);
  }
  prm.questions[i].q_vi = text;
  prm.questions[i].explain_vi = EXPLAIN_VI;
  n++;
}
console.log('Applied', n, 'Vietnamese question stems to PRM393');
fs.writeFileSync(quizPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
