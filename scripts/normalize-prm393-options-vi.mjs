/**
 * Keeps English for code-like options; fixes known bad machine translations.
 * Run: node scripts/normalize-prm393-options-vi.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const quizPath = path.join(__dirname, '..', 'quiz-data.json');

/** Options that are clearly API / code — show English in both locales */
function keepEnglish(en) {
  const t = en.trim();
  if (!t) return false;
  if (t.includes('`')) return true;
  if (/\([^)]*\)/.test(t)) return true;
  if (/^[A-Za-z0-9_$]+(\.[A-Za-z0-9_$]+)*$/.test(t) && t.length <= 48) return true;
  return false;
}

/** Curated fixes for MyMemory garbage or wrong sense */
const VI_OVERRIDE = {
  'State management': 'Quản lý state',
  'API calls': 'Gọi API',
  'Theme management': 'Quản lý theme',
  'Screen navigation': 'Điều hướng màn hình',
  'Disposes provider': 'Hủy (dispose) provider',
  'Creates provider': 'Tạo provider',
  'Listens to changes': 'Lắng nghe thay đổi',
  'Reads value without listening': 'Đọc giá trị mà không lắng nghe',
};

const data = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
const prm = data.modules.find((m) => m.id === 'PRM393');
if (!prm) process.exit(1);

let n = 0;
for (const q of prm.questions) {
  if (!Array.isArray(q.options) || !Array.isArray(q.options_vi)) continue;
  q.options_vi = q.options.map((en, i) => {
    if (keepEnglish(en)) return en;
    if (VI_OVERRIDE[en]) return VI_OVERRIDE[en];
    let vi = q.options_vi[i];
    if (typeof vi !== 'string') return en;
    if (/MYMEMORY|^\s*$| left$/i.test(vi)) return VI_OVERRIDE[en] || en;
    return vi;
  });
  n++;
}

fs.writeFileSync(quizPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Normalized options_vi for', n, 'questions');
