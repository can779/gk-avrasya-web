// Bağımlılıksız derleme: public/ → dist/, env.js ortam değişkeninden üretilir.
// Yollar fileURLToPath + path ile kurulur: Windows sürücü harfleri ve boşluk içeren klasörler doğru çözülür.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpSync, rmSync, writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const ENV_FILE = path.join(ROOT, '.env');

if (!existsSync(PUBLIC_DIR)) {
  console.error('public/ klasörü bulunamadı: ' + PUBLIC_DIR);
  process.exit(1);
}

if (existsSync(ENV_FILE)) {
  for (const line of readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const key = (process.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();

rmSync(DIST_DIR, { recursive: true, force: true });
mkdirSync(DIST_DIR, { recursive: true });
cpSync(PUBLIC_DIR, DIST_DIR, { recursive: true });
writeFileSync(path.join(DIST_DIR, 'env.js'), 'window.GK_ENV = ' + JSON.stringify({ VITE_GOOGLE_MAPS_API_KEY: key }) + ';\n');

const required = ['index.html', 'support.js', 'env.js', 'vendor/react.production.min.js', 'vendor/react-dom.production.min.js', 'assets/hero-film.mp4'];
const missing = required.filter(f => !existsSync(path.join(DIST_DIR, f)));
if (missing.length) {
  console.error('Eksik dosyalar: ' + missing.join(', '));
  process.exit(1);
}

console.log('dist/ hazır → ' + DIST_DIR);
console.log('Google Maps anahtarı: ' + (key ? 'tanımlı' : 'YOK (anahtarsız gömme harita kullanılacak)'));
