/* _planche.js — sort une page legere pour relire les dessins.
   node _planche.js            -> planche.html : les 4 fonds de carte + l'atlas
   node _planche.js fiches     -> planche.html : les 67 dessins de fiches
   node _planche.js cours      -> planche.html : toutes les figures des cours */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, 'src');
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js') && f !== '90-boot.js').sort();

const sandbox = {
  console: console, Math: Math, Date: Date, JSON: JSON, Object: Object, Array: Array,
  String: String, Number: Number, Boolean: Boolean, Set: Set, isNaN: isNaN, parseInt: parseInt,
  document: { querySelector: () => null, querySelectorAll: () => [], documentElement: { style: { removeProperty() { }, setProperty() { } }, getAttribute: () => null }, createElement: () => ({ style: {}, classList: { add() { } }, appendChild() { } }), addEventListener() { } },
  window: {}, localStorage: { getItem: () => null, setItem() { } },
  addEventListener() { }, matchMedia: () => ({ matches: false, addEventListener() { } }),
  location: { hash: '' }, setTimeout: () => 0, requestAnimationFrame: () => 0, innerWidth: 1000, innerHeight: 800,
  btoa: s => s, atob: s => s, escape: s => s, unescape: s => s, encodeURIComponent: s => s, decodeURIComponent: s => s,
  scrollTo() { }, confirm: () => false, getComputedStyle: () => ({})
};
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(SRC, f), 'utf8'), ctx, { filename: f }));
const G = vm.runInContext('({figSVG, CARTES_BASE, ATLAS, CARTES, COURS, SHOP, OPS})', ctx);

const mode = (process.argv[2] || 'cartes');
const blocs = [];

if (mode === 'cartes') {
  const seul = process.argv[3];
  Object.keys(G.CARTES_BASE).filter(k => !seul || k === seul).forEach(k => {
    blocs.push(['Fond ' + k + ' — zones nommées',
      G.figSVG([['map', k, 6, 6, 2.6, { base: 'terre', trait: 'i', tw: 1.1, noms: true, ns: 6.4 }]], 280, 280)]);
    blocs.push(['Fond ' + k + ' — villes',
      G.figSVG([['map', k, 6, 6, 2.6, { base: 'terre', trait: 'l', villes: true, vs: 4, vt: 7.5 }]], 280, 280)]);
  });
  if (!seul) {
    G.ATLAS.forEach(a => blocs.push([a.n, G.figSVG(a.ops, a.w, a.h)]));
    G.SHOP.avatar.forEach(a => blocs.push(['avatar ' + a.id, G.figSVG(a.ops, 64, 64)]));
  }
} else if (mode === 'atlas') {
  const seul = process.argv[3];
  const cibles = seul ? seul.split(",") : null;
  G.ATLAS.filter(a => !cibles || cibles.some(c => a.id.indexOf(c) >= 0)).forEach(a => blocs.push([a.n, G.figSVG(a.ops, a.w, a.h)]));
} else if (mode === 'fiches') {
  G.CARTES.forEach(c => blocs.push([c.id + ' — ' + c.n, G.figSVG(c.s, 200, 150)]));
} else {
  const filtre = process.argv[3];
  G.COURS.forEach(c => c.sec.forEach((s, i) => {
    if (s[0] !== 'fig') return;
    if (filtre === 'frises' && !s[1].some(o => o[0] === 'frise')) return;
    if (filtre === 'cartes' && !s[1].some(o => o[0] === 'map')) return;
    if (filtre && filtre !== 'frises' && filtre !== 'cartes' && c.id !== filtre) return;
    blocs.push([c.id + ' — ' + (s[4] || ''), G.figSVG(s[1], s[2], s[3])]);
  }));
}

const css = fs.readFileSync(path.join(SRC, '00-head.html'), 'utf8').match(/<style>([\s\S]*)<\/style>/)[1];
const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1"><title>Planche — ' + mode + '</title>' +
  '<style>' + css + '\n.pl{display:grid;grid-template-columns:repeat(auto-fill,minmax(' + (blocs.length <= 3 ? 700 : 320) + 'px,1fr));gap:18px;padding:22px}' +
  '.pl figure{margin:0}.pl h4{font-size:12px;font-family:var(--ff-m);color:var(--muted);margin:0 0 6px}</style>' +
  '</head><body><div class="pl">' +
  blocs.map(b => '<div><h4>' + b[0] + '</h4><div class="figure">' + b[1] + '</div></div>').join('') +
  '</div></body></html>';
fs.writeFileSync(path.join(__dirname, 'planche.html'), html);
console.log('planche.html : ' + blocs.length + ' dessins (' + (html.length / 1024).toFixed(0) + ' Ko) — mode ' + mode);
