/* ============================================================
   Delta — moteur de cartes, croquis, frises et graphiques.
   Une figure = une liste d'operations :
     ['t', x, y, texte, taille, ancre, couleur, graisse]
     ['l', x1,y1,x2,y2, couleur, epaisseur, tirets]
     ['r', x,y,w,h, remplissage, contour, rayon]
     ['c', x,y,r, remplissage, contour]
     ['poly', [[x,y],...], remplissage, contour, epaisseur]
     ['path', d, remplissage, contour, epaisseur]
     ['a', x1,y1,x2,y2, couleur, legende, epaisseur]      fleche droite
     ['ca', x1,y1,x2,y2, courbure, couleur, legende]      fleche courbe (flux)
     ['hatch', [[x,y],...], couleur, angle]               aplat hachure
     ['sym', x,y, genre, couleur, taille]                 figure ponctuelle
     ['key', x,y, [[genre, couleur, texte],...], titre]   legende
     ['map', nom, x,y, echelle, options]                  fond de carte
     ['frise', x,y,w, debut,fin, [[annee,texte,couleur,cote],...], options]
     ['bars', x,y,w,h, [[etiquette,valeur],...], options]
     ['courbe', x,y,w,h, [[x,y],...], options]
     ['box', x,y,w,h, titre, couleur]                     cartouche d'organigramme
     ['rose', x,y,r]                                      rose des vents
   Les couleurs sont des jetons de theme : 'i' encre, 'h' histoire, 'g' geo,
   'e' emc, 'b' marque, 'k' rouge, 'o' vert, 'w' ambre, 'c' or, 'm' gris,
   'f' gris clair, 'S' surface, 'S2' surface secondaire, 'mer' bleu mer.
   Un suffixe ':NN' donne un aplat : 'h:20' = 20 % d'histoire sur la surface.
   ============================================================ */

const PAL = {
  i: 'var(--ink)', i2: 'var(--ink2)', m: 'var(--muted)', f: 'var(--faint)',
  b: 'var(--brand)', bi: 'var(--brand-ink)', h: 'var(--hist)', g: 'var(--geo)', e: 'var(--emc)',
  k: 'var(--bad)', o: 'var(--ok)', w: 'var(--warn)', c: 'var(--coin)',
  S: 'var(--surface)', S2: 'var(--surface2)', l: 'var(--line)', l2: 'var(--line2)',
  mer: 'color-mix(in srgb, #4E8FB8 34%, var(--surface))',
  terre: 'color-mix(in srgb, #8A9A5B 26%, var(--surface))',
  none: 'none'
};
function col(spec) {
  if (spec == null || spec === '') return 'none';
  const s = String(spec);
  if (s.indexOf(':') > 0) {
    const p = s.split(':');
    const base = PAL[p[0]] || p[0];
    return 'color-mix(in srgb, ' + base + ' ' + p[1] + '%, var(--surface))';
  }
  return PAL[s] || s;
}
let FIGN = 0;
const fnum = v => Math.round(v * 100) / 100;
const ptsStr = pts => pts.map(p => fnum(p[0]) + ',' + fnum(p[1])).join(' ');

/* ---------- primitives ---------- */
function opText(o) {
  const [, x, y, txt, sz, anc, c, wt] = o;
  const fill = col(c || 'i');
  const halo = (c === 'S' || c === 'S2') ? '' : 'paint-order:stroke;stroke:var(--surface);stroke-width:3.2px;stroke-linejoin:round;';
  return '<text x="' + fnum(x) + '" y="' + fnum(y) + '" font-size="' + (sz || 9) + '" text-anchor="' + (anc || 'start') +
    '" fill="' + fill + '" style="' + halo + 'font-family:var(--ff-m);font-weight:' + (wt || 400) + '">' + esc(txt) + '</text>';
}
function opLine(o) {
  const [, x1, y1, x2, y2, c, w, d] = o;
  return '<line x1="' + fnum(x1) + '" y1="' + fnum(y1) + '" x2="' + fnum(x2) + '" y2="' + fnum(y2) +
    '" stroke="' + col(c || 'i') + '" stroke-width="' + (w || 1) + '" stroke-linecap="round"' +
    (d ? ' stroke-dasharray="' + d + '"' : '') + '/>';
}
function opRect(o) {
  const [, x, y, w, h, f, s, r] = o;
  return '<rect x="' + fnum(x) + '" y="' + fnum(y) + '" width="' + fnum(w) + '" height="' + fnum(h) +
    '" rx="' + (r || 0) + '" fill="' + col(f) + '"' + (s ? ' stroke="' + col(s) + '" stroke-width="1"' : '') + '/>';
}
function opCirc(o) {
  const [, x, y, r, f, s] = o;
  return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + fnum(r) + '" fill="' + col(f) + '"' +
    (s ? ' stroke="' + col(s) + '" stroke-width="1.1"' : '') + '/>';
}
function opPoly(o) {
  const [, pts, f, s, w] = o;
  return '<polygon points="' + ptsStr(pts) + '" fill="' + col(f) + '"' +
    (s ? ' stroke="' + col(s) + '" stroke-width="' + (w || 1) + '" stroke-linejoin="round"' : '') + '/>';
}
function opPath(o) {
  const [, d, f, s, w] = o;
  return '<path d="' + d + '" fill="' + col(f) + '"' +
    (s ? ' stroke="' + col(s) + '" stroke-width="' + (w || 1) + '" stroke-linejoin="round" stroke-linecap="round"' : '') + '/>';
}
function head(x1, y1, x2, y2, c, sz) {
  const a = Math.atan2(y2 - y1, x2 - x1), s = sz || 4.2;
  const p1 = [x2, y2], p2 = [x2 - s * Math.cos(a - .42), y2 - s * Math.sin(a - .42)], p3 = [x2 - s * Math.cos(a + .42), y2 - s * Math.sin(a + .42)];
  return '<polygon points="' + ptsStr([p1, p2, p3]) + '" fill="' + col(c) + '"/>';
}
function opArrow(o) {
  const [, x1, y1, x2, y2, c, lab, w] = o;
  const cc = c || 'i', a = Math.atan2(y2 - y1, x2 - x1), sz = 3.4 + (w || 1.4);
  const ex = x2 - sz * .8 * Math.cos(a), ey = y2 - sz * .8 * Math.sin(a);
  let s = '<line x1="' + fnum(x1) + '" y1="' + fnum(y1) + '" x2="' + fnum(ex) + '" y2="' + fnum(ey) +
    '" stroke="' + col(cc) + '" stroke-width="' + (w || 1.4) + '" stroke-linecap="round"/>' + head(x1, y1, x2, y2, cc, sz);
  if (lab) s += opText(['t', (x1 + x2) / 2, (y1 + y2) / 2 - 3.5, lab, 7.5, 'middle', cc, 600]);
  return s;
}
function opCurve(o) {
  const [, x1, y1, x2, y2, bend, c, lab, w] = o;
  const cc = c || 'i', mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const cx = mx - dy / len * (bend || 12), cy = my + dx / len * (bend || 12);
  const t = .93, qx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2, qy = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
  let s = '<path d="M' + fnum(x1) + ' ' + fnum(y1) + ' Q' + fnum(cx) + ' ' + fnum(cy) + ' ' + fnum(qx) + ' ' + fnum(qy) +
    '" fill="none" stroke="' + col(cc) + '" stroke-width="' + (w || 1.6) + '" stroke-linecap="round"/>' +
    head(qx, qy, x2, y2, cc, 4.6 + (w || 1.6));
  if (lab) s += opText(['t', cx, cy - 3, lab, 7.5, 'middle', cc, 600]);
  return s;
}
function opHatch(o) {
  const [, pts, c, ang] = o;
  const id = 'hx' + (FIGN++);
  return '<defs><pattern id="' + id + '" width="6" height="6" patternTransform="rotate(' + (ang == null ? 45 : ang) + ')" patternUnits="userSpaceOnUse">' +
    '<line x1="0" y1="0" x2="0" y2="6" stroke="' + col(c || 'i') + '" stroke-width="1.5"/></pattern></defs>' +
    '<polygon points="' + ptsStr(pts) + '" fill="url(#' + id + ')" stroke="' + col(c || 'i') + '" stroke-width=".8"/>';
}

/* ---------- figures ponctuelles ---------- */
function sym(x, y, kind, c, sz) {
  const s = sz || 4, cc = col(c || 'i');
  switch (kind) {
    case 'ville': return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + s * .45 + '" fill="' + cc + '"/>';
    case 'metropole': return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + s * .8 + '" fill="' + cc + '" stroke="var(--surface)" stroke-width="1"/>';
    case 'capitale': return '<polygon points="' + ptsStr(star(x, y, s * 1.25, s * .55, 5)) + '" fill="' + cc + '"/>';
    case 'carre': return '<rect x="' + fnum(x - s * .7) + '" y="' + fnum(y - s * .7) + '" width="' + s * 1.4 + '" height="' + s * 1.4 + '" fill="' + cc + '"/>';
    case 'triangle': return '<polygon points="' + ptsStr([[x, y - s], [x + s * .9, y + s * .7], [x - s * .9, y + s * .7]]) + '" fill="' + cc + '"/>';
    case 'port': return '<path d="M' + fnum(x) + ' ' + fnum(y - s) + 'v' + (s * 1.7) + 'M' + fnum(x - s * .8) + ' ' + fnum(y - s * .5) + 'h' + (s * 1.6) +
      'M' + fnum(x - s * .9) + ' ' + fnum(y + s * .2) + 'q' + fnum(s * .9) + ' ' + fnum(s * 1.1) + ' ' + fnum(s * 1.8) + ' 0" fill="none" stroke="' + cc + '" stroke-width="1.2" stroke-linecap="round"/>';
    case 'avion': return '<path d="M' + fnum(x) + ' ' + fnum(y - s) + 'l' + fnum(s * .35) + ' ' + fnum(s * .9) + 'l' + fnum(s * .95) + ' ' + fnum(s * .45) +
      'v' + fnum(s * .35) + 'l' + fnum(-s * 1.3) + ' ' + fnum(-s * .2) + 'l' + fnum(-.1 * s) + ' ' + fnum(s * .8) + 'l' + fnum(s * .45) + ' ' + fnum(s * .35) + 'v' + fnum(s * .25) +
      'l' + fnum(-s * .8) + ' ' + fnum(-s * .2) + 'l' + fnum(-s * .8) + ' ' + fnum(s * .2) + 'v' + fnum(-s * .25) + 'l' + fnum(s * .45) + ' ' + fnum(-s * .35) +
      'l' + fnum(-.1 * s) + ' ' + fnum(-s * .8) + 'l' + fnum(-s * 1.3) + ' ' + fnum(s * .2) + 'v' + fnum(-s * .35) + 'l' + fnum(s * .95) + ' ' + fnum(-s * .45) + 'z" fill="' + cc + '"/>';
    case 'usine': return '<path d="M' + fnum(x - s) + ' ' + fnum(y + s * .8) + 'v' + fnum(-s * 1.1) + 'l' + fnum(s * .7) + ' ' + fnum(s * .55) + 'v' + fnum(-s * .55) +
      'l' + fnum(s * .7) + ' ' + fnum(s * .55) + 'v' + fnum(-s * 1.3) + 'h' + fnum(s * .6) + 'v' + fnum(s * 1.85) + 'z" fill="' + cc + '"/>';
    case 'croix': return '<path d="M' + fnum(x - s * .8) + ' ' + fnum(y - s * .8) + 'l' + fnum(s * 1.6) + ' ' + fnum(s * 1.6) + 'M' + fnum(x + s * .8) + ' ' + fnum(y - s * .8) + 'l' + fnum(-s * 1.6) + ' ' + fnum(s * 1.6) + '" stroke="' + cc + '" stroke-width="1.6" stroke-linecap="round"/>';
    case 'bataille': return '<path d="M' + fnum(x - s) + ' ' + fnum(y - s) + 'l' + fnum(s * 2) + ' ' + fnum(s * 2) + 'M' + fnum(x + s) + ' ' + fnum(y - s) + 'l' + fnum(-s * 2) + ' ' + fnum(s * 2) + '" stroke="' + cc + '" stroke-width="2" stroke-linecap="round"/>';
    case 'nuke': return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + s + '" fill="none" stroke="' + cc + '" stroke-width="1.3"/>' +
      '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + s * .28 + '" fill="' + cc + '"/>' +
      '<path d="M' + fnum(x) + ' ' + fnum(y) + 'l' + fnum(s * .95) + ' ' + fnum(-s * .3) + 'a' + s + ' ' + s + ' 0 0 0 ' + fnum(-s * .55) + ' ' + fnum(-s * .82) + 'z" fill="' + cc + '"/>';
    case 'etoile': return '<polygon points="' + ptsStr(star(x, y, s, s * .45, 5)) + '" fill="' + cc + '"/>';
    case 'monument': return '<path d="M' + fnum(x - s) + ' ' + fnum(y + s * .8) + 'h' + fnum(s * 2) + 'l' + fnum(-s) + ' ' + fnum(-s * 1.9) + 'z" fill="none" stroke="' + cc + '" stroke-width="1.3"/>';
    default: return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + s * .5 + '" fill="' + cc + '"/>';
  }
}
function star(x, y, R, r, n) {
  const p = [];
  for (let i = 0; i < n * 2; i++) {
    const a = -Math.PI / 2 + i * Math.PI / n, rr = i % 2 ? r : R;
    p.push([x + rr * Math.cos(a), y + rr * Math.sin(a)]);
  }
  return p;
}
function opSym(o) { return sym(o[1], o[2], o[3], o[4], o[5]); }

/* ---------- legende ---------- */
function opKey(o) {
  const [, x, y, items, titre] = o;
  const lh = 11.5, pad = 6;
  const w = Math.max(72, 26 + Math.max.apply(null, items.map(i => String(i[2]).length * 4.5)), titre ? 14 + titre.length * 4.8 : 0);
  const h = pad * 2 + (titre ? 12 : 0) + items.length * lh;
  let s = '<rect x="' + fnum(x) + '" y="' + fnum(y) + '" width="' + fnum(w) + '" height="' + fnum(h) +
    '" rx="3" fill="var(--surface)" fill-opacity=".93" stroke="' + col('l') + '" stroke-width=".9"/>';
  let cy = y + pad + 8;
  if (titre) { s += opText(['t', x + pad, cy, titre, 8, 'start', 'i', 600]); cy += 12; }
  items.forEach(it => {
    const kind = it[0], c = it[1], lab = it[2];
    if (kind === 'f') s += '<rect x="' + fnum(x + pad) + '" y="' + fnum(cy - 5.5) + '" width="9" height="7" fill="' + col(c) + '" stroke="' + col('l') + '" stroke-width=".7"/>';
    else if (kind === 'h') s += opHatch(['hatch', [[x + pad, cy - 5.5], [x + pad + 9, cy - 5.5], [x + pad + 9, cy + 1.5], [x + pad, cy + 1.5]], c, 45]);
    else if (kind === 'l') s += opLine(['l', x + pad, cy - 2, x + pad + 9, cy - 2, c, 1.8]);
    else if (kind === 'd') s += opLine(['l', x + pad, cy - 2, x + pad + 9, cy - 2, c, 1.6, '3 2']);
    else if (kind === 'a') s += opArrow(['a', x + pad, cy - 2, x + pad + 10, cy - 2, c, '', 1.4]);
    else s += sym(x + pad + 4.5, cy - 2, kind, c, 3.6);
    s += opText(['t', x + pad + 13, cy, lab, 7.6, 'start', 'i2']);
    cy += lh;
  });
  return s;
}

/* ---------- rose des vents & echelle ---------- */
function opRose(o) {
  const [, x, y, r] = o, R = r || 9;
  return '<circle cx="' + fnum(x) + '" cy="' + fnum(y) + '" r="' + R + '" fill="var(--surface)" fill-opacity=".8" stroke="' + col('l') + '" stroke-width=".8"/>' +
    '<polygon points="' + ptsStr([[x, y - R * .95], [x + R * .3, y], [x, y + R * .5], [x - R * .3, y]]) + '" fill="' + col('i') + '"/>' +
    opText(['t', x, y - R - 1.5, 'N', 7.5, 'middle', 'i', 700]);
}

/* ---------- annotations ancrees sur des lieux reels ----------
   Les fonds portent un dictionnaire `pt` de lieux projetes comme la carte.
   On place donc symboles, fleches et bandes par NOM DE LIEU, jamais a l'oeil.
     ['ancre', fond, x, y, echelle, [[lieu, genre, couleur, taille, texte, ancre, dx, dy, tailleTexte], …]]
     ['flux',  fond, x, y, echelle, [[depuis, vers, courbure, couleur, texte, epaisseur], …]]
     ['bande', fond, x, y, echelle, [lieu, …], couleur, epaisseur, texte]
   ------------------------------------------------------------ */
function ancreDe(nom, ox, oy, s) {
  const base = CARTES_BASE[nom] || {}, pt = base.pt || {};
  return function (lieu) {
    if (Array.isArray(lieu)) return [lieu[0], lieu[1]];   // point libre de la figure
    const p = pt[lieu];
    if (!p) { console.warn('ancre inconnue : ' + nom + '/' + lieu); return [ox, oy]; }
    return [ox + p[0] * s, oy + p[1] * s];
  };
}
function opAncre(o) {
  const [, nom, ox, oy, s, items] = o;
  const at = ancreDe(nom, ox, oy, s);
  let out = '';
  (items || []).forEach(it => {
    const lieu = it[0], genre = it[1], c = it[2] || 'i', taille = it[3] || 4;
    const texte = it[4], anc = it[5] || 'start', dx = it[6], dy = it[7], ts = it[8] || 7.5;
    const p = at(lieu);
    if (genre && genre !== 'none') out += sym(p[0], p[1], genre, c, taille);
    if (texte) {
      const ex = dx == null ? (anc === 'start' ? taille + 2 : anc === 'end' ? -(taille + 2) : 0) : dx;
      const ey = dy == null ? (anc === 'middle' ? -(taille + 3) : 2.6) : dy;
      out += opText(['t', p[0] + ex, p[1] + ey, texte, ts, anc, c, 600]);
    }
  });
  return out;
}
function opFlux(o) {
  const [, nom, ox, oy, s, items] = o;
  const at = ancreDe(nom, ox, oy, s);
  return (items || []).map(it => {
    const p = at(it[0]), q = at(it[1]);
    return opCurve(['ca', p[0], p[1], q[0], q[1], it[2] || 0, it[3] || 'k', it[4] || '', it[5] || 1.6]);
  }).join('');
}
/* ['aire', fond, x, y, echelle, [[lieu, rayonX, rayonY, angle], ...], couleur, opacite]
   Une tache ovale posee sur un lieu : massifs, bassins, zones d'influence. */
function opAire(o) {
  const [, nom, ox, oy, s, items, c, opac] = o;
  const at = ancreDe(nom, ox, oy, s);
  return (items || []).map(it => {
    const p = at(it[0]);
    const rx = (it[1] == null ? 8 : it[1]) * s, ry = (it[2] == null ? 5 : it[2]) * s, ang = it[3] || 0;
    return '<ellipse cx="0" cy="0" rx="' + fnum(rx) + '" ry="' + fnum(ry) + '" fill="' + col(c || 'm') +
      '" opacity="' + (opac == null ? .38 : opac) + '" transform="translate(' + fnum(p[0]) + ' ' + fnum(p[1]) +
      ') rotate(' + ang + ')"/>';
  }).join('');
}
function opBande(o) {
  const [, nom, ox, oy, s, lieux, c, ep, texte, opac] = o;
  const at = ancreDe(nom, ox, oy, s);
  const pts = (lieux || []).map(at);
  if (pts.length < 2) return '';
  const d = pts.map((p, i) => (i ? 'L' : 'M') + fnum(p[0]) + ' ' + fnum(p[1])).join(' ');
  let out = '<path d="' + d + '" fill="none" stroke="' + col(c || 'b') + '" stroke-width="' + (ep || 8) +
    '" stroke-linecap="round" stroke-linejoin="round" opacity="' + (opac == null ? .38 : opac) + '"/>';
  if (texte) {
    const m = pts[Math.floor((pts.length - 1) / 2)];
    out += opText(['t', m[0], m[1] - ((ep || 8) / 2 + 3.5), texte, 7.5, 'middle', c || 'b', 700]);
  }
  return out;
}

/* ---------- trace d'un fond de carte ---------- */
function opMap(o) {
  const [, nom, ox, oy, sc, opt] = o;
  const base = CARTES_BASE[nom]; if (!base) return '';
  const O = opt || {}, s = sc || 1;
  const X = v => ox + v * s, Y = v => oy + v * s;
  let out = '';
  if (base.mer && O.mer !== false) out += '<rect x="' + fnum(ox) + '" y="' + fnum(oy) + '" width="' + fnum((base.w || 100) * s) + '" height="' + fnum((base.h || 100) * s) + '" fill="' + col('mer') + '" rx="3"/>';
  (base.extra || []).forEach(e => {
    if (e[0] === 'poly') out += opPoly(['poly', e[1].map(p => [X(p[0]), Y(p[1])]), e[2], e[3], (e[4] || 1)]);
  });
  base.z.forEach(z => {
    const f = (O.fill && (O.fill[z.c] || (z.g && O.fill[z.g]))) || O.base || 'terre';
    z.p.forEach(r => {
      out += opPoly(['poly', r.map(p => [X(p[0]), Y(p[1])]), f, O.trait || 'l', O.tw || 1.05]);
    });
  });
  if (O.hatch) for (const c in O.hatch) {
    base.z.filter(q => q.c === c || q.g === c).forEach(z => {
      z.p.forEach(r => { out += opHatch(['hatch', r.map(p => [X(p[0]), Y(p[1])]), O.hatch[c], 45]); });
    });
  }
  if (O.noms) {
    const only = Array.isArray(O.noms) ? O.noms : null;
    const sz = O.ns || 7;
    base.z.forEach(z => {
      if (only && only.indexOf(z.c) < 0 && only.indexOf(z.g) < 0) return;
      if (!z.lab) return;
      const lignes = String(z.sn || z.n).split('|');
      lignes.forEach((L, i) => {
        out += opText(['t', X(z.lab[0]), Y(z.lab[1]) + (i - (lignes.length - 1) / 2) * (sz * 1.15),
          L, sz, 'middle', O.nc || 'i2', 600]);
      });
    });
  }
  if (O.villes) {
    const only = Array.isArray(O.villes) ? O.villes : null;
    (base.villes || []).forEach(v => {
      if (only && only.indexOf(v[0]) < 0) return;
      out += sym(X(v[1]), Y(v[2]), v[3], O.vc || 'i', (O.vs || 3.4));
      out += opText(['t', X(v[1]) + 4.5, Y(v[2]) + 2.5, v[0], (O.vt || 7), 'start', O.vc || 'i', 500]);
    });
  }
  return out;
}
/* pour les mini-jeux : les contours cliquables d'un fond */
function mapZones(nom, ox, oy, sc) {
  const base = CARTES_BASE[nom]; if (!base) return [];
  const s = sc || 1;
  return base.z.map(z => ({
    c: z.c, n: z.n,
    contours: z.p.map(r => ptsStr(r.map(p => [ox + p[0] * s, oy + p[1] * s]))),
    pts: ptsStr(z.p[0].map(p => [ox + p[0] * s, oy + p[1] * s])),
    lab: z.lab ? [ox + z.lab[0] * s, oy + z.lab[1] * s] : null
  }));
}

/* ============================================================
   FRISE CHRONOLOGIQUE
   ['frise', x, y, w, debut, fin, [[annee, texte, couleur, cote],...], opts]
   cote : 1 = au-dessus (defaut), -1 = en dessous.
   opts : {periodes:[[a,b,texte,couleur]], graduation:n, hauteur:n}
   ============================================================ */
/* Etiquette de frise : on calcule sa position ET l'intervalle qu'elle occupe.
   Pres des bords, l'ancrage bascule pour que le texte reste dans la figure ;
   le calcul des collisions travaille donc sur les intervalles REELS. */
const FRISE_CAR = 4.6;
function friseBoite(X, txt, gauche, droite) {
  const lw = Math.max(20, String(txt).length * FRISE_CAR);
  if (X - lw / 2 < gauche) return { x: gauche, anc: 'start', a: gauche, b: gauche + lw };
  if (X + lw / 2 > droite) return { x: droite, anc: 'end', a: droite - lw, b: droite };
  return { x: X, anc: 'middle', a: X - lw / 2, b: X + lw / 2 };
}
function opFrise(o) {
  const [, x, y, w, a0, a1, evs, opt] = o;
  const O = opt || {}, span = (a1 - a0) || 1;
  const px = an => x + (an - a0) / span * w;
  let out = '';
  (O.periodes || []).forEach((p, i) => {
    const xa = px(p[0]), xb = px(p[1]);
    out += '<rect x="' + fnum(xa) + '" y="' + fnum(y - 7) + '" width="' + fnum(Math.max(1, xb - xa)) + '" height="14" rx="2" fill="' + col((p[3] || 'b') + ':18') + '" stroke="' + col(p[3] || 'b') + '" stroke-width=".8"/>';
    /* le nom de la periode ne doit jamais deborder de sa bande */
    if (p[2]) {
      const ts = Math.min(8, (xb - xa - 4) / (String(p[2]).length * 0.56));
      if (ts >= 5) out += opText(['t', (xa + xb) / 2, y + ts * 0.36, p[2], Math.round(ts * 10) / 10, 'middle', p[3] || 'b', 700]);
    }
  });
  out += opLine(['l', x, y, x + w, y, 'i', 1.6]);
  out += head(x + w - 6, y, x + w + 5, y, 'i', 5);
  const step = O.graduation || Math.ceil(span / 10 / 5) * 5;
  for (let an = Math.ceil(a0 / step) * step; an <= a1; an += step) {
    out += opLine(['l', px(an), y - 3, px(an), y + 3, 'f', .9]);
    out += opText(['t', px(an), y + 12.5, String(an), 7.4, 'middle', 'm']);
  }
  const H = O.hauteur || 24;
  const used = { 1: [], '-1': [] };
  const gauche = 1, droite = x + w + 6;
  (evs || []).forEach(e => {
    const [an, txt, c, cote] = e, side = cote === -1 ? -1 : 1, cc = c || 'h';
    const X = px(an);
    const boite = friseBoite(X, txt, gauche, droite);
    let lvl = 0, arr = used[side];
    while (arr.some(u => u.lvl === lvl && u.a < boite.b + 8 && boite.a < u.b + 8)) lvl++;
    arr.push({ lvl: lvl, a: boite.a, b: boite.b });
    const yTip = y - side * (10 + lvl * H);
    out += opLine(['l', X, y - side * 3, X, yTip, cc, 1]);
    out += '<circle cx="' + fnum(X) + '" cy="' + fnum(y) + '" r="2.4" fill="' + col(cc) + '"/>';
    out += '<circle cx="' + fnum(X) + '" cy="' + fnum(yTip) + '" r="1.6" fill="' + col(cc) + '"/>';
    /* une annee fractionnaire sert a placer le point dans l'annee : on n'affiche que l'annee */
    const lab = Math.floor(an);
    const posA = friseBoite(X, String(lab), gauche, droite);
    out += opText(['t', posA.x, yTip - side * 6.5 + (side === 1 ? 0 : 3.5), lab, 8.4, posA.anc, cc, 700]);
    out += opText(['t', boite.x, yTip - side * 6.5 + (side === 1 ? -9.5 : 13), txt, 8, boite.anc, 'i2', 500]);
  });
  return out;
}

/* ---------- graphiques ---------- */
function opBars(o) {
  const [, x, y, w, h, data, opt] = o;
  const O = opt || {}, max = O.max || Math.max.apply(null, data.map(d => d[1])) * 1.1;
  const n = data.length, bw = w / n * .62, gap = w / n;
  let out = opLine(['l', x, y + h, x + w, y + h, 'i', 1.2]) + opLine(['l', x, y, x, y + h, 'i', 1.2]);
  (O.grille || [0, .25, .5, .75, 1]).forEach(g => {
    const gy = y + h - g * h;
    out += opLine(['l', x, gy, x + w, gy, 'l2', .7, '3 3']);
    if (O.axe !== false) out += opText(['t', x - 3, gy + 2.5, String(Math.round(max * g * 10) / 10), 6.5, 'end', 'f']);
  });
  data.forEach((d, i) => {
    const bh = Math.max(0, d[1] / max * h), bx = x + i * gap + (gap - bw) / 2;
    out += opRect(['r', bx, y + h - bh, bw, bh, (d[2] || O.c || 'b') + ':70', d[2] || O.c || 'b', 1.5]);
    out += opText(['t', bx + bw / 2, y + h - bh - 3, O.fmt ? O.fmt(d[1]) : String(d[1]), 6.8, 'middle', d[2] || O.c || 'b', 600]);
    out += opText(['t', bx + bw / 2, y + h + 9, d[0], 6.8, 'middle', 'm']);
  });
  if (O.titre) out += opText(['t', x + w / 2, y - 5, O.titre, 8, 'middle', 'i', 600]);
  return out;
}
function opCourbe(o) {
  const [, x, y, w, h, series, opt] = o;
  const O = opt || {};
  const xs = [].concat.apply([], series.map(s => s.d.map(p => p[0])));
  const ys = [].concat.apply([], series.map(s => s.d.map(p => p[1])));
  const x0 = O.x0 != null ? O.x0 : Math.min.apply(null, xs), x1 = O.x1 != null ? O.x1 : Math.max.apply(null, xs);
  const y0 = O.y0 != null ? O.y0 : 0, y1 = O.y1 != null ? O.y1 : Math.max.apply(null, ys) * 1.1;
  const PX = v => x + (v - x0) / ((x1 - x0) || 1) * w, PY = v => y + h - (v - y0) / ((y1 - y0) || 1) * h;
  let out = '';
  (O.grille || [0, .25, .5, .75, 1]).forEach(g => {
    const gy = y + h - g * h;
    out += opLine(['l', x, gy, x + w, gy, 'l2', .7, '3 3']);
    out += opText(['t', x - 3, gy + 2.5, String(Math.round((y0 + (y1 - y0) * g) * 10) / 10), 6.5, 'end', 'f']);
  });
  (O.xticks || [x0, (x0 + x1) / 2, x1]).forEach(t => {
    out += opLine(['l', PX(t), y + h, PX(t), y + h + 3, 'f', .8]);
    out += opText(['t', PX(t), y + h + 10, String(t), 6.8, 'middle', 'm']);
  });
  out += opLine(['l', x, y + h, x + w, y + h, 'i', 1.2]) + opLine(['l', x, y, x, y + h, 'i', 1.2]);
  series.forEach(s => {
    const d = s.d.map((p, i) => (i ? 'L' : 'M') + fnum(PX(p[0])) + ' ' + fnum(PY(p[1]))).join(' ');
    out += '<path d="' + d + '" fill="none" stroke="' + col(s.c || 'b') + '" stroke-width="' + (s.w || 1.8) + '" stroke-linejoin="round" stroke-linecap="round"' + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + '/>';
    if (s.n) {
      const last = s.d[s.d.length - 1];
      out += opText(['t', PX(last[0]) + 3, PY(last[1]) + 2.5, s.n, 7, 'start', s.c || 'b', 600]);
    }
    if (s.pts !== false) s.d.forEach(p => { out += '<circle cx="' + fnum(PX(p[0])) + '" cy="' + fnum(PY(p[1])) + '" r="1.7" fill="' + col(s.c || 'b') + '"/>'; });
  });
  if (O.titre) out += opText(['t', x + w / 2, y - 5, O.titre, 8, 'middle', 'i', 600]);
  return out;
}
/* cartouche d'organigramme */
function opBox(o) {
  const [, x, y, w, h, titre, c, sous] = o;
  const cc = c || 'b';
  let out = opRect(['r', x, y, w, h, cc + ':14', cc, 3]);
  const lines = String(titre).split('|');
  const tot = lines.length + (sous ? 1 : 0);
  lines.forEach((L, i) => {
    out += opText(['t', x + w / 2, y + h / 2 + 2.8 - (tot - 1) * 4.4 + i * 8.8, L, 7.8, 'middle', cc, 700]);
  });
  if (sous) out += opText(['t', x + w / 2, y + h / 2 + 2.8 - (tot - 1) * 4.4 + lines.length * 8.8, sous, 6.8, 'middle', 'm', 400]);
  return out;
}

/* ---------- assemblage ---------- */
const OPS = {
  t: opText, l: opLine, r: opRect, c: opCirc, poly: opPoly, path: opPath,
  a: opArrow, ca: opCurve, hatch: opHatch, sym: opSym, key: opKey, rose: opRose,
  map: opMap, frise: opFrise, bars: opBars, courbe: opCourbe, box: opBox,
  ancre: opAncre, flux: opFlux, bande: opBande, aire: opAire
};
function figSVG(ops, w, h) {
  let body = '';
  for (const o of ops) {
    const f = OPS[o[0]];
    if (f) { try { body += f(o); } catch (e) { console.warn('op', o[0], e.message); } }
  }
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" xmlns="http://www.w3.org/2000/svg">' + body + '</svg>';
}
function fig(ops, w, h, cap) {
  const disp = Math.min(900, Math.round(w * 2.35));
  return '<figure class="figure"><div class="figbox" style="max-width:' + disp + 'px">' +
    figSVG(ops, w, h) + '</div>' + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>';
}
