/**
 * Merges quiz-locale-en-m1m12.json and quiz-locale-vi-prm393.json into ../quiz-data.json
 * Run: node scripts/merge-quiz-locale.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const quizPath = path.join(root, 'quiz-data.json');
const enPath = path.join(root, 'quiz-locale-en-m1m12.json');
const viPrmPath = path.join(root, 'quiz-locale-vi-prm393.json');

const data = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

if (fs.existsSync(enPath)) {
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  for (const id of Object.keys(en)) {
    const mod = data.modules.find((m) => m.id === id);
    if (!mod || !mod.questions) continue;
    const patches = en[id];
    if (!Array.isArray(patches)) continue;
    patches.forEach((patch, i) => {
      if (mod.questions[i] && patch) Object.assign(mod.questions[i], patch);
    });
  }
}

if (fs.existsSync(viPrmPath)) {
  const viPatches = JSON.parse(fs.readFileSync(viPrmPath, 'utf8'));
  const prm = data.modules.find((m) => m.id === 'PRM393');
  if (prm && prm.questions && Array.isArray(viPatches)) {
    viPatches.forEach((patch, i) => {
      if (prm.questions[i] && patch) Object.assign(prm.questions[i], patch);
    });
  }
}

fs.writeFileSync(quizPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Merged locale patches into quiz-data.json');
