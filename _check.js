/* _check.js — verifications de coherence sur les sources de Delta.
   Usage : node _check.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, 'src');
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.js')).sort();

let err = 0, warn = 0;
const KO = m => { console.log('  ✗ ' + m); err++; };
const OK = m => console.log('  ✓ ' + m);
const WARN = m => { console.log('  ! ' + m); warn++; };

/* ---------- 1. syntaxe ---------- */
console.log('\n1. Syntaxe des ' + files.length + ' fichiers');
files.forEach(f => {
  const code = fs.readFileSync(path.join(SRC, f), 'utf8');
  try { new vm.Script(code, { filename: f }); }
  catch (e) { KO(f + ' — ' + e.message); }
});
if (!err) OK('tous les fichiers sont syntaxiquement valides');

/* ---------- 2. execution dans un bac a sable ---------- */
console.log('\n2. Chargement des donnees');
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
try {
  files.forEach(f => {
    if (f === '90-boot.js') return;             // le boot touche au DOM
    vm.runInContext(fs.readFileSync(path.join(SRC, f), 'utf8'), ctx, { filename: f });
  });
  OK('toutes les donnees se chargent sans erreur');
} catch (e) {
  KO('erreur d’execution : ' + e.message);
  console.log(e.stack.split('\n').slice(0, 4).join('\n'));
  process.exit(1);
}
const NOMS = ['COURS','EXOS','CARTES','RARETES','BREVETS','JEUX','SHOP','SUCCES','VIEWS','MAT','CARTES_BASE','ATLAS','OPS','POOL_DATES'];
const G = vm.runInContext('({' + NOMS.join(',') + '})', ctx);
const { COURS, EXOS, CARTES, RARETES, BREVETS, JEUX, SHOP, SUCCES, VIEWS, MAT, CARTES_BASE, ATLAS, OPS, POOL_DATES } = G;

/* ---------- 3. cours ---------- */
console.log('\n3. Cours (' + COURS.length + ')');
const idsC = new Set();
const TYPES_SEC = ['p', 'h', 'ul', 'ol', 'def', 'anec', 'note', 'callout', 'keep', 'doc', 'fig', 'atlas', 'chiffres', 'tab', 'rep'];
COURS.forEach(c => {
  if (idsC.has(c.id)) KO('id de cours en double : ' + c.id);
  idsC.add(c.id);
  if (!MAT[c.m]) KO(c.id + ' — matiere inconnue : ' + c.m);
  ['t', 'd', 'th'].forEach(k => { if (!c[k]) KO(c.id + ' — champ manquant : ' + k); });
  if (!Array.isArray(c.sec) || !c.sec.length) KO(c.id + ' — pas de sections');
  (c.sec || []).forEach((s, i) => {
    if (TYPES_SEC.indexOf(s[0]) < 0) KO(c.id + ' section ' + i + ' — type inconnu : ' + s[0]);
    if (s[0] === 'fig' && (!Array.isArray(s[1]) || !s[2] || !s[3])) KO(c.id + ' section ' + i + ' — figure mal formee');
    if (s[0] === 'atlas' && !ATLAS.some(x => x.id === s[1])) KO(c.id + ' section ' + i + ' — planche d’atlas inconnue : ' + s[1]);
    if (s[0] === 'tab' && (!Array.isArray(s[1]) || !Array.isArray(s[2]))) KO(c.id + ' section ' + i + ' — tableau mal forme');
    if (s[0] === 'tab') s[2].forEach((r, j) => { if (r.length !== s[1].length) KO(c.id + ' tableau ligne ' + j + ' : ' + r.length + ' cellules pour ' + s[1].length + ' colonnes'); });
  });
  if (!c.sec.some(s => s[0] === 'keep')) WARN(c.id + ' — pas d’encadre « a retenir »');
  if (!c.sec.some(s => s[0] === 'anec')) WARN(c.id + ' — pas d’anecdote');
});
['hist', 'geo', 'emc'].forEach(m => {
  const n = COURS.filter(c => c.m === m).length;
  OK(MAT[m].n + ' : ' + n + ' chapitres');
});

/* ---------- 4. exercices ---------- */
console.log('\n4. Exercices (' + EXOS.length + ')');
const idsE = new Set();
EXOS.forEach(e => {
  if (idsE.has(e.id)) KO('id d’exercice en double : ' + e.id);
  idsE.add(e.id);
  if (!idsC.has(e.c)) KO(e.id + ' — reference un cours inexistant : ' + e.c);
  if (!MAT[e.m]) KO(e.id + ' — matiere inconnue');
  if (typeof e.d !== 'number' || e.d < 0 || e.d > 5) KO(e.id + ' — difficulte hors bornes');
  if (!e.q) KO(e.id + ' — pas de question');
  if (!e.w) WARN(e.id + ' — pas d’explication');
  if (e.ty === 'qcm') {
    if (!Array.isArray(e.o) || e.o.length < 2) KO(e.id + ' — moins de deux options');
    else if (typeof e.r !== 'number' || e.r < 0 || e.r >= e.o.length) KO(e.id + ' — bonne reponse hors bornes');
  } else if (e.ty === 'vf') {
    if (!Array.isArray(e.o) || !Array.isArray(e.r) || e.o.length !== e.r.length) KO(e.id + ' — vrai/faux mal forme');
    else if (e.r.every(x => x === e.r[0])) WARN(e.id + ' — toutes les affirmations ont la meme valeur');
  } else if (e.ty === 'txt') {
    if (!Array.isArray(e.r) || !e.r.length) KO(e.id + ' — pas de reponse attendue');
    else e.r.forEach(a => { if (a !== a.toLowerCase() || /[éèêàçôûîï]/.test(a)) KO(e.id + ' — reponse non normalisee : « ' + a + ' »'); });
  } else if (e.ty === 'date') {
    if (typeof e.r !== 'number') KO(e.id + ' — annee attendue manquante');
  } else if (e.ty === 'ord') {
    if (!Array.isArray(e.o) || e.o.length < 3) KO(e.id + ' — remise en ordre trop courte');
  } else KO(e.id + ' — type inconnu : ' + e.ty);
});
const sansExo = COURS.filter(c => !EXOS.some(e => e.c === c.id));
if (sansExo.length) WARN(sansExo.length + ' chapitre(s) sans exercice : ' + sansExo.map(c => c.id).join(', '));
else OK('chaque chapitre a au moins un exercice');
['qcm', 'vf', 'txt', 'date', 'ord'].forEach(t => OK(t + ' : ' + EXOS.filter(e => e.ty === t).length));

/* ---------- 5. collection ---------- */
console.log('\n5. Collection (' + CARTES.length + ' fiches)');
const idsK = new Set();
CARTES.forEach(c => {
  if (idsK.has(c.id)) KO('id de fiche en double : ' + c.id);
  idsK.add(c.id);
  if (!RARETES.some(r => r.id === c.r)) KO(c.id + ' — rarete inconnue : ' + c.r);
  if (!MAT[c.m]) KO(c.id + ' — matiere inconnue');
  ['n', 'd', 'e', 'k'].forEach(k => { if (!c[k]) KO(c.id + ' — champ manquant : ' + k); });
  if (!Array.isArray(c.s) || !c.s.length) KO(c.id + ' — pas de dessin');
});
const somme = RARETES.reduce((a, r) => a + r.p, 0);
if (Math.abs(somme - 100) > 0.01) KO('les taux de rarete font ' + somme + ' % au lieu de 100');
else OK('taux de rarete = 100 %');
RARETES.forEach(r => {
  const n = CARTES.filter(c => c.r === r.id).length;
  if (!n) KO('aucune fiche pour la rarete « ' + r.n + ' »');
  else OK(r.n + ' (' + r.p + ' %) : ' + n + ' fiche(s)');
});

/* ---------- 6. figures ---------- */
console.log('\n6. Figures et dessins');
let nfig = 0, badOps = new Set();
const verifOps = (ops, where) => {
  nfig++;
  ops.forEach(o => {
    if (!Array.isArray(o)) { KO(where + ' — operation qui n’est pas un tableau'); return; }
    if (!OPS[o[0]]) badOps.add(o[0] + ' (' + where + ')');
    if (o[0] === 'ancre' || o[0] === 'flux' || o[0] === 'bande' || o[0] === 'aire') {
      const base = CARTES_BASE[o[1]];
      if (!base) { KO(where + ' — ' + o[0] + ' : fond inconnu ' + o[1]); return; }
      const pts = base.pt || {};
      let lieux = [];
      if (o[0] === 'ancre' || o[0] === 'aire') lieux = (o[5] || []).map(x => x[0]);
      else if (o[0] === 'flux') lieux = [].concat.apply([], (o[5] || []).map(x => [x[0], x[1]]));
      else lieux = o[5] || [];
      lieux.forEach(l => { if (!Array.isArray(l) && !pts[l]) KO(where + ' — lieu inconnu dans ' + o[1] + ' : ' + l); });
    }
    if (o[0] === 'map') {
      const base = CARTES_BASE[o[1]];
      if (!base) { KO(where + ' — fond de carte inconnu : ' + o[1]); return; }
      const codes = new Set(base.z.map(z => z.c));
      base.z.forEach(z => { if (z.g) codes.add(z.g); });   // un groupe (continent) est aussi une cible valide
      const O = o[5] || {};
      ['fill', 'hatch'].forEach(k => {
        if (O[k]) Object.keys(O[k]).forEach(c => { if (!codes.has(c)) KO(where + ' — ' + k + ' vers une zone inconnue : ' + c + ' (' + o[1] + ')'); });
      });
      if (Array.isArray(O.noms)) O.noms.forEach(c => { if (!codes.has(c)) KO(where + ' — noms : zone inconnue ' + c); });
      if (Array.isArray(O.villes)) {
        const vn = new Set((base.villes || []).map(v => v[0]));
        O.villes.forEach(v => { if (!vn.has(v)) KO(where + ' — ville inconnue dans ' + o[1] + ' : ' + v); });
      }
    }
  });
};
const largeurKey = o => {
  const items = o[3] || [], titre = o[4];
  return Math.max(72, 26 + Math.max.apply(null, items.map(i => String(i[2]).length * 4.5)), titre ? 14 + titre.length * 4.8 : 0);
};
const hauteurKey = o => 12 + ((o[4]) ? 12 : 0) + (o[3] || []).length * 11.5;
/* rejoue la mise en page d'une frise pour verifier qu'aucun texte ne deborde */
function bornesFrise(o) {
  const [, x, y, lw, a0, a1, evs, opt] = o;
  const O = opt || {}, span = (a1 - a0) || 1, H = O.hauteur || 24;
  const px = an => x + (an - a0) / span * lw;
  const used = { 1: [], '-1': [] };
  const gauche = 1, droite = x + lw + 6;
  const boite = (X, txt) => {
    const l = Math.max(20, String(txt).length * 4.6);
    if (X - l / 2 < gauche) return { a: gauche, b: gauche + l };
    if (X + l / 2 > droite) return { a: droite - l, b: droite };
    return { a: X - l / 2, b: X + l / 2 };
  };
  let haut = y - 7, bas = y + 15;                       // periodes + graduations
  (evs || []).forEach(e => {
    const side = e[3] === -1 ? -1 : 1, X = px(e[0]), txt = String(e[1]);
    const bo = boite(X, txt);
    let lvl = 0; const arr = used[side];
    while (arr.some(u => u.lvl === lvl && u.a < bo.b + 8 && bo.a < u.b + 8)) lvl++;
    arr.push({ lvl: lvl, a: bo.a, b: bo.b });
    const yTip = y - side * (10 + lvl * H);
    if (side === 1) haut = Math.min(haut, yTip - 22.5);
    else bas = Math.max(bas, yTip + 22);
  });
  return { haut: haut, bas: bas, d: x + lw + 6 };
}
function verifCadre(ops, w, h, where) {
  ops.forEach(o => {
    if (o[0] === 't') {                                  // un texte ne doit pas sortir du cadre
      const txt = String(o[3] || ''), sz = o[4] || 9, anc = o[5] || 'start';
      const lw = txt.length * sz * 0.56;
      const a = anc === 'middle' ? o[1] - lw / 2 : anc === 'end' ? o[1] - lw : o[1];
      if (a < -2) KO(where + ' — texte hors cadre a gauche (' + Math.round(a) + ') : « ' + txt.slice(0, 34) + ' »');
      if (a + lw > w + 2) KO(where + ' — texte hors cadre a droite (' + Math.round(a + lw) + ' > ' + w + ') : « ' + txt.slice(0, 34) + ' »');
      if (o[2] > h + 2) KO(where + ' — texte sous le cadre (' + o[2] + ' > ' + h + ') : « ' + txt.slice(0, 34) + ' »');
      return;
    }
    if (o[0] === 'ancre') {                              // etiquettes posees sur un lieu
      const base = CARTES_BASE[o[1]], pts = (base && base.pt) || {};
      (o[5] || []).forEach(it => {
        const txt = it[4]; if (!txt) return;
        const pt = pts[it[0]]; if (!pt) return;
        const taille = it[3] || 4, anc = it[5] || 'start', ts = it[8] || 7.5;
        const X = o[2] + pt[0] * o[4];
        const ex = it[6] == null ? (anc === 'start' ? taille + 2 : anc === 'end' ? -(taille + 2) : 0) : it[6];
        const lw = String(txt).length * ts * 0.56, x = X + ex;
        const a = anc === 'middle' ? x - lw / 2 : anc === 'end' ? x - lw : x;
        if (a < -2) KO(where + ' — etiquette « ' + txt + ' » sort a gauche (' + Math.round(a) + ')');
        if (a + lw > w + 2) KO(where + ' — etiquette « ' + txt + ' » sort a droite (' + Math.round(a + lw) + ' > ' + w + ')');
      });
      return;
    }
    if (o[0] === 'frise') {
      const b = bornesFrise(o);
      if (b.haut < -.5) KO(where + ' — frise : le haut deborde de ' + Math.round(-b.haut) + ' unites');
      if (b.bas > h + .5) KO(where + ' — frise : le bas deborde (' + Math.round(b.bas) + ' > ' + h + ')');
      if (b.d > w + .5) KO(where + ' — frise plus large que la figure (' + Math.round(b.d) + ' > ' + w + ')');
      return;
    }
    if (o[0] !== 'key') return;
    const kw = largeurKey(o), kh = hauteurKey(o);
    if (o[1] + kw > w + .5) KO(where + ' — legende trop large : ' + Math.round(o[1] + kw) + ' > ' + w);
    if (o[2] + kh > h + .5) KO(where + ' — legende trop haute : ' + Math.round(o[2] + kh) + ' > ' + h);
  });
}
COURS.forEach(c => c.sec.forEach((s, i) => {
  if (s[0] === 'fig') { verifOps(s[1], c.id + '#' + i); verifCadre(s[1], s[2], s[3], c.id + '#' + i); }
}));
CARTES.forEach(c => { verifOps(c.s, 'fiche ' + c.id); verifCadre(c.s, 200, 150, 'fiche ' + c.id); });
ATLAS.forEach(a => { verifOps(a.ops, 'atlas ' + a.id); verifCadre(a.ops, a.w, a.h, 'atlas ' + a.id); });
SHOP.avatar.forEach(a => verifOps(a.ops, 'avatar ' + a.id));
BREVETS.forEach(b => b.ex.forEach(ex => (ex.docs || []).forEach(d => { if (d.fig) verifOps(d.fig, 'brevet ' + b.id); })));
if (badOps.size) badOps.forEach(o => KO('operation de dessin inconnue : ' + o));
else OK(nfig + ' figures, toutes les operations sont connues');
Object.keys(CARTES_BASE).forEach(k => {
  const b = CARTES_BASE[k];
  let npts = 0;
  b.z.forEach(z => {
    if (!Array.isArray(z.p) || !z.p.length) { KO('fond ' + k + ' / ' + z.c + ' : aucun contour'); return; }
    z.p.forEach(r => {
      if (!Array.isArray(r) || r.length < 3) { KO('fond ' + k + ' / ' + z.c + ' : contour de moins de 3 points'); return; }
      npts += r.length;
      r.forEach(p => { if (p[0] < -2 || p[0] > 102 || p[1] < -2 || p[1] > 102) KO('fond ' + k + ' / ' + z.c + ' : point hors du carre 0-100'); });
    });
    if (!z.lab || z.lab[0] < -2 || z.lab[0] > 102 || z.lab[1] < -6 || z.lab[1] > 106) KO('fond ' + k + ' / ' + z.c + ' : etiquette hors cadre');
  });
  const cods = new Set(); b.z.forEach(z => { if (cods.has(z.c)) KO('fond ' + k + ' : code en double ' + z.c); cods.add(z.c); });
  OK('fond de carte ' + k + ' : ' + b.z.length + ' zones, ' + npts + ' points');
});

/* ---------- 7. brevets ---------- */
console.log('\n7. Brevets blancs (' + BREVETS.length + ')');
BREVETS.forEach(b => {
  let tot = 0;
  b.ex.forEach(ex => {
    const s = ex.qs.reduce((a, q) => a + q.p, 0);
    if (s !== ex.pts) KO(b.id + ' / ' + ex.n + ' : bareme des questions = ' + s + ' au lieu de ' + ex.pts);
    tot += ex.pts;
    if (!MAT[ex.disc]) KO(b.id + ' / ' + ex.n + ' : discipline inconnue');
    ex.qs.forEach((q, i) => {
      const w = b.id + ' ' + ex.n + ' Q' + (i + 1);
      if (q.ty === 'qcm' && (typeof q.r !== 'number' || q.r < 0 || q.r >= q.o.length)) KO(w + ' — bonne reponse hors bornes');
      if (q.ty === 'txt' && (!Array.isArray(q.r) || !q.r.length)) KO(w + ' — pas de reponse attendue');
      if (q.ty === 'red' && (!Array.isArray(q.mod) || q.mod.length < 3)) KO(w + ' — corrige type trop court');
      if (q.ty === 'carte') {
        if (!CARTES_BASE[q.map]) KO(w + ' — fond de carte inconnu');
        else q.items.forEach(it => { if (!CARTES_BASE[q.map].z.some(z => z.c === it[1])) KO(w + ' — zone inconnue : ' + it[1]); });
      }
      if (['qcm', 'txt', 'red', 'carte', 'ord'].indexOf(q.ty) < 0) KO(w + ' — type inconnu : ' + q.ty);
    });
  });
  if (tot !== b.total) KO(b.id + ' : total = ' + tot + ' au lieu de ' + b.total);
  else OK(b.t + ' : ' + tot + ' points, ' + b.ex.reduce((a, e) => a + e.qs.length, 0) + ' questions');
});

/* ---------- 8. jeux ---------- */
console.log('\n8. Mini-jeux (' + JEUX.length + ')');
JEUX.forEach(j => {
  if (!MAT[j.m]) KO(j.id + ' — matiere inconnue');
  let r;
  try { r = j.gen(); } catch (e) { KO(j.id + ' — le generateur plante : ' + e.message); return; }
  if (!Array.isArray(r) || !r.length) { KO(j.id + ' — aucune manche generee'); return; }
  r.forEach((m, i) => {
    const w = j.id + ' manche ' + i;
    if (['choice', 'order', 'map', 'slider'].indexOf(m.ty) < 0) KO(w + ' — type inconnu : ' + m.ty);
    if (m.ty === 'choice' && (typeof m.r !== 'number' || m.r < 0 || m.r >= m.o.length)) KO(w + ' — bonne reponse hors bornes');
    if (m.ty === 'map') {
      if (!CARTES_BASE[m.map]) KO(w + ' — fond inconnu');
      else if (!CARTES_BASE[m.map].z.some(z => z.c === m.code)) KO(w + ' — zone inconnue : ' + m.code);
    }
    if (m.ty === 'slider' && (m.r < m.min || m.r > m.max)) KO(w + ' — annee hors bornes');
    if (m.ty === 'order' && m.o.length < 3) KO(w + ' — remise en ordre trop courte');
  });
  OK(j.n + ' : ' + r.length + ' manches');
});

/* ---------- 9. boutique et succes ---------- */
console.log('\n9. Boutique et succes');
const defauts = ['th-atlas', 'av-boussole', 'ba-graticule', 'ca-simple', 'ti-debut', 'do-quadrille'];
Object.keys(SHOP).forEach(cat => {
  const ids = new Set();
  SHOP[cat].forEach(o => {
    if (ids.has(o.id)) KO('boutique ' + cat + ' — id en double : ' + o.id);
    ids.add(o.id);
    if (typeof o.prix !== 'number') KO(o.id + ' — prix manquant');
  });
  const gratuit = SHOP[cat].filter(o => o.prix === 0);
  if (gratuit.length !== 1) WARN(cat + ' : ' + gratuit.length + ' objet(s) gratuit(s) (1 attendu)');
  OK(cat + ' : ' + SHOP[cat].length + ' objets');
});
defauts.forEach(d => {
  if (!Object.keys(SHOP).some(cat => SHOP[cat].some(o => o.id === d))) KO('equipement par defaut introuvable en boutique : ' + d);
});
SHOP.theme.forEach(t => {
  if (!t.vars) return;
  ['light', 'dark'].forEach(mode => {
    if (!t.vars[mode]) { KO('theme ' + t.id + ' — variante ' + mode + ' manquante'); return; }
    Object.keys(t.vars[mode]).forEach(k => {
      const v = t.vars[mode][k];
      if (!/^(#[0-9A-Fa-f]{3,8}|rgba?\(|color-mix\(|var\()/.test(v)) KO('theme ' + t.id + ' ' + mode + ' — couleur suspecte : ' + k + ' = ' + v);
    });
  });
});
const idsS = new Set();
SUCCES.forEach(a => {
  if (idsS.has(a.id)) KO('succes en double : ' + a.id);
  idsS.add(a.id);
  if (typeof a.f !== 'function') KO(a.id + ' — pas de condition');
  if (typeof a.r !== 'number' || a.r <= 0) KO(a.id + ' — recompense invalide');
});
OK(SUCCES.length + ' succes, ' + SUCCES.reduce((a, b) => a + b.r, 0) + ' δ au total');

/* ---------- 10. reperes et vues ---------- */
console.log('\n10. Reperes et routeur');
const dbl = {};
POOL_DATES.forEach(d => { const k = d[0] + '|' + d[1]; if (dbl[k]) KO('repere en double : ' + k); dbl[k] = 1; });
POOL_DATES.forEach(d => { if (d[0] < 1700 || d[0] > 2030) KO('annee suspecte : ' + d[0]); });
OK(POOL_DATES.length + ' reperes chronologiques');
['accueil', 'cours', 'exos', 'reperes', 'atlas', 'jeux', 'tirage', 'collection', 'brevet', 'profil', 'boutique', 'succes']
  .forEach(v => { if (typeof VIEWS[v] !== 'function') KO('vue manquante : ' + v); });
OK(Object.keys(VIEWS).length + ' vues enregistrees');

/* ---------- bilan ---------- */
console.log('\n' + '─'.repeat(52));
console.log(err ? '✗ ' + err + ' erreur(s), ' + warn + ' avertissement(s)' : '✓ Aucune erreur (' + warn + ' avertissement(s))');
console.log('  ' + COURS.length + ' cours · ' + EXOS.length + ' exercices · ' + CARTES.length + ' fiches · ' +
  BREVETS.length + ' brevets · ' + JEUX.length + ' jeux · ' + nfig + ' figures');
process.exit(err ? 1 : 0);
