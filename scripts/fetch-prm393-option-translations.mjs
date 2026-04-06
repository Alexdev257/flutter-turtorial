/**
 * Builds scripts/prm393-option-en-vi.json (en -> vi) via MyMemory API.
 * Resume-safe. Run: node scripts/fetch-prm393-option-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uniquePath = path.join(__dirname, 'prm393-options-unique.txt');
const outPath = path.join(__dirname, 'prm393-option-en-vi.json');
const delayMs = 450;

const unique = fs.readFileSync(uniquePath, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

let map = {};
if (fs.existsSync(outPath)) {
  try {
    map = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  } catch (_) {
    map = {};
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translate(en) {
  const url =
    'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(en) + '&langpair=en|vi';
  const r = await fetch(url);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const j = await r.json();
  const t = j.responseData?.translatedText;
  if (!t || typeof t !== 'string') throw new Error('Bad response');
  return t;
}

let done = 0;
for (const en of unique) {
  if (map[en]) {
    done++;
    continue;
  }
  try {
    map[en] = await translate(en);
    done++;
    if (done % 25 === 0) {
      fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
      console.log(done + '/' + unique.length);
    }
  } catch (e) {
    console.error('Fail:', en.slice(0, 60), e.message || e);
    fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
    process.exit(1);
  }
  await sleep(delayMs);
}

fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
console.log('Wrote', Object.keys(map).length, 'entries to', outPath);
