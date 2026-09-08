/* ============================================================
   _fonds.js — genere src/24-fonds.js a partir de vraies donnees
   geographiques (contours officiels), projetees et simplifiees.

   Sources telechargees une fois dans data/ :
     regions.geojson   — France, 18 regions (france-geojson, IGN)
     ne50.geojson      — Natural Earth 1:50m, pays du monde
     ne110.geojson     — Natural Earth 1:110m, pays du monde

   Usage : node _fonds.js
   ============================================================ */
const fs = require('fs'), path = require('path'), https = require('https');

const DATA = path.join(__dirname, 'data');
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);

const SOURCES = {
  'regions.geojson': 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson',
  'ne50.geojson': 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson',
  'ne110.geojson': 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
};

function get(url, dest) {
  return new Promise((res, rej) => {
    const f = fs.createWriteStream(dest);
    https.get(url, r => {
      if (r.statusCode === 302 || r.statusCode === 301) return get(r.headers.location, dest).then(res, rej);
      if (r.statusCode !== 200) return rej(new Error(url + ' -> ' + r.statusCode));
      r.pipe(f); f.on('finish', () => f.close(res));
    }).on('error', rej);
  });
}

/* ---------------- projections ---------------- */
const D = Math.PI / 180;
/* Lambert conforme conique — la projection des cartes scolaires francaises */
function lcc(lat0, lon0, p1, p2) {
  const φ1 = p1 * D, φ2 = p2 * D, φ0 = lat0 * D, λ0 = lon0 * D;
  const m = φ => Math.cos(φ) / Math.sqrt(1 - 0);
  const t = φ => Math.tan(Math.PI / 4 - φ / 2);
  const n = Math.abs(φ1 - φ2) < 1e-9 ? Math.sin(φ1)
    : Math.log(m(φ1) / m(φ2)) / Math.log(t(φ1) / t(φ2));
  const F = m(φ1) / (n * Math.pow(t(φ1), n));
  const ρ0 = F * Math.pow(t(φ0), n);
  return (lon, lat) => {
    const φ = Math.max(-89.9, Math.min(89.9, lat)) * D, λ = lon * D;
    const ρ = F * Math.pow(t(φ), n);
    const θ = n * (λ - λ0);
    /* y vers le bas comme en SVG : le nord doit donner un y plus petit */
    return [ρ * Math.sin(θ), ρ * Math.cos(θ) - ρ0];
  };
}
/* Miller cylindrique — le rendu classique des planispheres scolaires */
function miller() {
  return (lon, lat) => {
    const φ = Math.max(-84, Math.min(84, lat)) * D;
    return [lon * D, -1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * φ))];
  };
}

/* Boite projetee d'un rectangle lon/lat. En projection conique, les 4 coins
   ne suffisent pas : on echantillonne tout le perimetre. */
function boiteProj(proj, box, n) {
  n = n || 120;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const add = (lon, lat) => {
    const p = proj(lon, lat);
    x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]);
    y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]);
  };
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    add(box[0] + (box[2] - box[0]) * t, box[1]);
    add(box[0] + (box[2] - box[0]) * t, box[3]);
    add(box[0], box[1] + (box[3] - box[1]) * t);
    add(box[2], box[1] + (box[3] - box[1]) * t);
  }
  return [x0, y0, x1, y1];
}

/* ---------------- geometrie ---------------- */
function ringArea(r) {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] * r[i][1] - r[i][0] * r[j][1]);
  return Math.abs(a / 2);
}
function dp(pts, tol) {                       // Douglas-Peucker
  if (pts.length < 3) return pts.slice();
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    let dmax = 0, idx = -1;
    const [x1, y1] = pts[a], [x2, y2] = pts[b];
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      let d;
      if (L2 === 0) d = Math.hypot(px - x1, py - y1);
      else {
        let t = ((px - x1) * dx + (py - y1) * dy) / L2;
        t = Math.max(0, Math.min(1, t));
        d = Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
      }
      if (d > dmax) { dmax = d; idx = i; }
    }
    if (dmax > tol && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const snap = (pts, g) => pts.map(p => [Math.round(p[0] / g) * g, Math.round(p[1] / g) * g]);
function dedupe(pts) {
  const o = [];
  for (const p of pts) if (!o.length || o[o.length - 1][0] !== p[0] || o[o.length - 1][1] !== p[1]) o.push(p);
  if (o.length > 1 && o[0][0] === o[o.length - 1][0] && o[0][1] === o[o.length - 1][1]) o.pop();
  return o;
}
function rings(geom) {                        // -> tableau d'anneaux exterieurs
  if (!geom) return [];
  if (geom.type === 'Polygon') return [geom.coordinates[0]];
  if (geom.type === 'MultiPolygon') return geom.coordinates.map(p => p[0]);
  return [];
}

/* Construit un fond : projette, simplifie, garde les iles significatives,
   puis normalise l'ensemble dans le carre 0-100 en gardant les proportions. */
function fond(features, opts) {
  const proj = opts.proj, tol = opts.tol, grille = opts.grille || 0;
  const minPart = opts.minPart == null ? 0.02 : opts.minPart;   // part de l'aire max
  const zones = [];
  features.forEach(f => {
    let rs = rings(f.geom).map(r => r.map(c => proj(c[0], c[1])));
    if (opts.filtreRing) rs = rs.filter(opts.filtreRing);
    if (!rs.length) return;
    const aires = rs.map(ringArea);
    const amax = Math.max.apply(null, aires);
    let gardees = rs.filter((r, i) => aires[i] >= amax * minPart);
    gardees = gardees.slice(0, opts.maxRings || 8);
    const simp = gardees.map(r => {
      /* un petit pays ne doit pas disparaitre : la tolerance suit sa taille */
      let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
      r.forEach(p => { a = Math.min(a, p[0]); c = Math.max(c, p[0]); b = Math.min(b, p[1]); d = Math.max(d, p[1]); });
      const diag = Math.hypot(c - a, d - b);
      const t = Math.min(tol, diag * 0.045);
      let p = grille ? snap(r, Math.min(grille, t / 2)) : r;
      p = dedupe(p);
      p = dp(p, t);
      return dedupe(p);
    }).filter(r => r.length >= 3);
    if (!simp.length) return;
    zones.push({ c: f.c, g: f.g, n: f.n, sn: f.sn, p: simp, lab: f.lab || null });
  });

  /* normalisation commune */
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const box = opts.cadre;                                        // [lonmin,latmin,lonmax,latmax] optionnel
  if (box) {
    const b = boiteProj(proj, box);
    x0 = b[0]; y0 = b[1]; x1 = b[2]; y1 = b[3];
  } else {
    zones.forEach(z => z.p.forEach(r => r.forEach(p => {
      x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]);
      y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]);
    })));
  }
  const pad = opts.pad == null ? 2 : opts.pad;
  const s = (100 - 2 * pad) / Math.max(x1 - x0, y1 - y0);
  /* pas de centrage : le fond part du coin haut-gauche et garde ses vraies
     proportions dans bw x bh — plus de carre de mer inutile autour */
  const ox = pad, oy = pad;
  const bw = Math.round((pad * 2 + (x1 - x0) * s) * 100) / 100;
  const bh = Math.round((pad * 2 + (y1 - y0) * s) * 100) / 100;
  const N = p => [
    Math.round((ox + (p[0] - x0) * s) * 100) / 100,
    Math.round((oy + (p[1] - y0) * s) * 100) / 100
  ];
  zones.forEach(z => {
    z.p = z.p.map(r => r.map(N));
    if (!z.lab) {
      const big = z.p.reduce((a, b) => ringArea(a) > ringArea(b) ? a : b);
      z.lab = poleAccess(big);
    } else z.lab = N(proj(z.lab[0], z.lab[1]));
  });
  return { zones: zones, w: bw, h: bh, proj: p => N(proj(p[0], p[1])) };
}

/* point interieur « le plus au large » — pour poser une etiquette */
function poleAccess(ring) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  ring.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
  const dedans = (px, py) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  };
  const dBord = (px, py) => {
    let m = Infinity;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x1_, y1_] = ring[i], [x2_, y2_] = ring[j];
      const dx = x2_ - x1_, dy = y2_ - y1_, L2 = dx * dx + dy * dy;
      let t = L2 ? ((px - x1_) * dx + (py - y1_) * dy) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      m = Math.min(m, Math.hypot(px - (x1_ + t * dx), py - (y1_ + t * dy)));
    }
    return m;
  };
  let best = null, bd = -1;
  const N = 22;
  for (let i = 1; i < N; i++) for (let j = 1; j < N; j++) {
    const px = x0 + (x1 - x0) * i / N, py = y0 + (y1 - y0) * j / N;
    if (!dedans(px, py)) continue;
    const d = dBord(px, py);
    if (d > bd) { bd = d; best = [px, py]; }
  }
  const c = best || [(x0 + x1) / 2, (y0 + y1) / 2];
  return [Math.round(c[0] * 100) / 100, Math.round(c[1] * 100) / 100];
}

/* ---------------- assemblage ---------------- */
(async function main() {
  for (const f in SOURCES) {
    const p = path.join(DATA, f);
    if (!fs.existsSync(p)) { process.stdout.write('telechargement ' + f + '… '); await get(SOURCES[f], p); console.log('ok'); }
  }
  const REG = JSON.parse(fs.readFileSync(path.join(DATA, 'regions.geojson'), 'utf8'));
  const NE50 = JSON.parse(fs.readFileSync(path.join(DATA, 'ne50.geojson'), 'utf8'));
  const NE110 = JSON.parse(fs.readFileSync(path.join(DATA, 'ne110.geojson'), 'utf8'));
  const prop = (f, k) => f.properties[k] !== undefined ? f.properties[k] : f.properties[k.toUpperCase()];

  /* ---------- FRANCE METROPOLITAINE : 13 regions ---------- */
  const CODES_FR = {
    '32': ['hdf', 'Hauts-de-France', 'Hauts-de-|France'],
    '44': ['ge', 'Grand Est', 'Grand|Est'],
    '28': ['nor', 'Normandie', 'Norman-|die'],
    '53': ['bre', 'Bretagne', 'Bretagne'],
    '52': ['pdl', 'Pays de la Loire', 'Pays de|la Loire'],
    '24': ['cvl', 'Centre-Val de Loire', 'Centre-|Val de Loire'],
    '11': ['idf', 'Île-de-France', 'Île-de-|France'],
    '27': ['bfc', 'Bourgogne-Franche-Comté', 'Bourgogne-|Franche-Comté'],
    '75': ['naq', 'Nouvelle-Aquitaine', 'Nouvelle-|Aquitaine'],
    '76': ['occ', 'Occitanie', 'Occitanie'],
    '84': ['ara', 'Auvergne-Rhône-Alpes', 'Auvergne-|Rhône-Alpes'],
    '93': ['pac', 'Provence-Alpes-Côte d’Azur', 'Provence-|Alpes-|Côte d’Azur'],
    '94': ['cor', 'Corse', 'Corse']
  };
  const featFR = REG.features.filter(f => CODES_FR[prop(f, 'code')]).map(f => {
    const m = CODES_FR[prop(f, 'code')];
    return { c: m[0], n: m[1], sn: m[2], geom: f.geometry };
  });
  const projFR = lcc(46.5, 3, 44, 49);
  const FR = fond(featFR, { proj: projFR, tol: 0.00075, grille: 0.0003, minPart: 0.05, maxRings: 3, pad: 2 });

  const VILLES_FR = [
    ['Paris', 2.35, 48.86, 'metropole'], ['Lyon', 4.84, 45.76, 'metropole'],
    ['Marseille', 5.37, 43.30, 'metropole'], ['Toulouse', 1.44, 43.60, 'ville'],
    ['Lille', 3.06, 50.63, 'ville'], ['Bordeaux', -0.58, 44.84, 'ville'],
    ['Nantes', -1.55, 47.22, 'ville'], ['Strasbourg', 7.75, 48.57, 'ville'],
    ['Rennes', -1.68, 48.11, 'ville'], ['Montpellier', 3.88, 43.61, 'ville'],
    ['Nice', 7.26, 43.70, 'ville'], ['Le Havre', 0.11, 49.49, 'ville'],
    ['Dunkerque', 2.38, 51.03, 'ville'], ['Clermont-Fd', 3.09, 45.78, 'ville'],
    ['Dijon', 5.04, 47.32, 'ville'], ['Brest', -4.49, 48.39, 'ville'],
    ['Grenoble', 5.72, 45.19, 'ville']
  ].map(v => { const p = FR.proj([v[1], v[2]]); return [v[0], p[0], p[1], v[3]]; });

  /* ---------- EUROPE ---------- */
  const EU = {
    FRA: ['fr', 'France'], DEU: ['de', 'Allemagne'], ESP: ['es', 'Espagne'], PRT: ['pt', 'Portugal'],
    ITA: ['it', 'Italie'], GBR: ['uk', 'Royaume-Uni'], IRL: ['ie', 'Irlande'], BEL: ['be', 'Belgique'],
    NLD: ['nl', 'Pays-Bas'], LUX: ['lu', 'Lux.'], CHE: ['ch', 'Suisse'], AUT: ['at', 'Autriche'],
    DNK: ['dk', 'Danemark'], NOR: ['no', 'Norvège'], SWE: ['se', 'Suède'], FIN: ['fi', 'Finlande'],
    ISL: ['is', 'Islande'], POL: ['pl', 'Pologne'], CZE: ['cz', 'Tchéquie'], SVK: ['sk', 'Slovaquie'],
    HUN: ['hu', 'Hongrie'], ROU: ['ro', 'Roumanie'], BGR: ['bg', 'Bulgarie'], GRC: ['gr', 'Grèce'],
    HRV: ['hr', 'Croatie'], SVN: ['si', 'Slovénie'], BIH: ['ba', 'Bosnie'], SRB: ['rs', 'Serbie'],
    MNE: ['me', 'Mont.'], MKD: ['mk', 'Mac.'], ALB: ['al', 'Albanie'], EST: ['ee', 'Estonie'],
    LVA: ['lv', 'Lettonie'], LTU: ['lt', 'Lituanie'], BLR: ['by', 'Biélorussie'], UKR: ['ua', 'Ukraine'],
    MDA: ['md', 'Mold.'], RUS: ['ru', 'Russie'], TUR: ['tr', 'Turquie'], CYP: ['cy', 'Chypre'],
    MLT: ['mt', 'Malte'], KOS: ['xk', 'Kosovo']
  };
  const projEUR = lcc(52, 12, 40, 62);
  const CADRE_EUR = [-13, 33.5, 46, 71.5];
  const featEUR = NE50.features.filter(f => EU[prop(f, 'ADM0_A3') || prop(f, 'adm0_a3')]).map(f => {
    const m = EU[prop(f, 'ADM0_A3') || prop(f, 'adm0_a3')];
    return { c: m[0], n: m[1], geom: f.geometry };
  });
  const EUR = fond(featEUR, {
    proj: projEUR, tol: 0.0060, grille: 0.0024, minPart: 0.012, maxRings: 6, pad: 1,
    /* on ecarte les territoires lointains (Guyane, Acores, Siberie…) */
    filtreRing: (() => {
      const b = boiteProj(projEUR, [CADRE_EUR[0] - 8, CADRE_EUR[1] - 4, CADRE_EUR[2] + 10, CADRE_EUR[3] + 4]);
      return r => {
        const cx = r.reduce((a, p) => a + p[0], 0) / r.length, cy = r.reduce((a, p) => a + p[1], 0) / r.length;
        return cx > b[0] && cx < b[2] && cy > b[1] && cy < b[3];
      };
    })()
  });
  const VILLES_EUR = [
    ['Paris', 2.35, 48.86, 'capitale'], ['Berlin', 13.4, 52.52, 'capitale'], ['Londres', -0.13, 51.51, 'capitale'],
    ['Madrid', -3.70, 40.42, 'capitale'], ['Rome', 12.5, 41.9, 'capitale'], ['Bruxelles', 4.35, 50.85, 'capitale'],
    ['Varsovie', 21.0, 52.23, 'capitale'], ['Moscou', 37.6, 55.75, 'capitale'], ['Kyiv', 30.5, 50.45, 'capitale'],
    ['Vienne', 16.37, 48.21, 'capitale'], ['Athènes', 23.73, 37.98, 'capitale'], ['Stockholm', 18.07, 59.33, 'capitale'],
    ['Lisbonne', -9.14, 38.72, 'capitale'], ['Prague', 14.42, 50.08, 'capitale'], ['Budapest', 19.04, 47.5, 'capitale'],
    ['Strasbourg', 7.75, 48.57, 'ville'], ['Francfort', 8.68, 50.11, 'ville']
  ].map(v => { const p = EUR.proj([v[1], v[2]]); return [v[0], p[0], p[1], v[3]]; });

  /* ---------- MONDE : les pays groupes par continent ---------- */
  const CONT = {
    'North America': ['na', 'Amérique du Nord'],
    'South America': ['sa', 'Amérique du Sud'],
    'Europe': ['eu', 'Europe'],
    'Africa': ['af', 'Afrique'],
    'Asia': ['as', 'Asie'],
    'Oceania': ['oc', 'Océanie'],
    'Seven seas (open ocean)': null, 'Antarctica': null
  };
  /* Un pays = une zone, qui porte le code de son continent comme GROUPE.
     On peut donc colorier un pays precis (fill: { deu: ... }) ou tout un
     continent (fill: { af: ... }) avec le meme fond de carte. */
  const projM = miller();
  const featM = [];
  NE110.features.forEach(f => {
    const cont = prop(f, 'CONTINENT') || prop(f, 'continent');
    const m = CONT[cont]; if (!m) return;
    const a3 = (prop(f, 'ADM0_A3') || prop(f, 'adm0_a3') || '').toLowerCase();
    if (!a3) return;
    featM.push({ c: a3, g: m[0], n: prop(f, 'NAME_FR') || prop(f, 'NAME') || a3, geom: f.geometry });
  });
  const MONDE = fond(featM, {
    proj: projM, tol: 0.015, grille: 0.006, minPart: 0.02, maxRings: 12,
    cadre: [-180, -57, 180, 83.7], pad: 0
  });
  const VILLES_MONDE = [
    ['Washington', -77.0, 38.9, 'capitale'], ['Moscou', 37.6, 55.75, 'capitale'], ['Pékin', 116.4, 39.9, 'capitale'],
    ['Paris', 2.35, 48.86, 'capitale'], ['New York', -74.0, 40.7, 'ville'], ['Tokyo', 139.7, 35.7, 'ville'],
    ['Shanghai', 121.5, 31.2, 'ville'], ['Mumbai', 72.9, 19.1, 'ville'], ['São Paulo', -46.6, -23.5, 'ville'],
    ['Lagos', 3.4, 6.5, 'ville'], ['Sydney', 151.2, -33.9, 'ville'], ['Le Caire', 31.2, 30.0, 'ville']
  ].map(v => { const p = MONDE.proj([v[1], v[2]]); return [v[0], p[0], p[1], v[3]]; });

  /* ---------- OUTRE-MER : une vignette par territoire ---------- */
  /* une case par territoire : quatre en haut, trois en bas */
  const OM = [
    { c: 'gp', n: 'Guadeloupe', src: 'reg', code: '01', box: [2, 6, 24, 30] },
    { c: 'mq', n: 'Martinique', src: 'reg', code: '02', box: [28, 6, 50, 30] },
    { c: 'gf', n: 'Guyane', src: 'reg', code: '03', box: [54, 4, 76, 32] },
    { c: 're', n: 'La Réunion', src: 'reg', code: '04', box: [80, 6, 99, 30] },
    { c: 'yt', n: 'Mayotte', src: 'reg', code: '06', box: [2, 50, 24, 74] },
    { c: 'nc', n: 'Nouvelle-Calédonie', src: 'ne', a3: 'NCL', box: [30, 48, 58, 76] },
    { c: 'pf', n: 'Polynésie française', src: 'ne', a3: 'PYF', box: [64, 48, 99, 76], skip: true }
  ];
  const zonesOM = [];
  OM.forEach(t => {
    if (t.skip) return;
    let geom = null;
    if (t.src === 'reg') { const f = REG.features.find(f => prop(f, 'code') === t.code); geom = f && f.geometry; }
    else { const f = NE50.features.find(f => (prop(f, 'ADM0_A3') || prop(f, 'adm0_a3')) === t.a3); geom = f && f.geometry; }
    if (!geom) { console.log('  ! outre-mer introuvable : ' + t.n); return; }
    let rs = rings(geom).map(r => r.map(c => [c[0] * Math.cos(c[1] * D), -c[1]]));
    const aires = rs.map(ringArea), amax = Math.max.apply(null, aires);
    rs = rs.filter((r, i) => aires[i] >= amax * 0.08).slice(0, 4)
      .map(r => {
        let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
        r.forEach(p => { a = Math.min(a, p[0]); c = Math.max(c, p[0]); b = Math.min(b, p[1]); d = Math.max(d, p[1]); });
        return dedupe(dp(dedupe(r), Math.hypot(c - a, d - b) * 0.02));
      }).filter(r => r.length >= 3);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    rs.forEach(r => r.forEach(p => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }));
    const bw = t.box[2] - t.box[0], bh = t.box[3] - t.box[1];
    const s = Math.min(bw / (x1 - x0 || 1), bh / (y1 - y0 || 1)) * 0.86;
    const ox = t.box[0] + (bw - (x1 - x0) * s) / 2, oy = t.box[1] + (bh - (y1 - y0) * s) / 2;
    const N = p => [Math.round((ox + (p[0] - x0) * s) * 100) / 100, Math.round((oy + (p[1] - y0) * s) * 100) / 100];
    const P = rs.map(r => r.map(N));
    const big = P.reduce((a, b) => ringArea(a) > ringArea(b) ? a : b);
    zonesOM.push({ c: t.c, n: t.n, p: P, lab: [Math.round((t.box[0] + t.box[2]) / 2 * 100) / 100, Math.round((t.box[3] + 3.5) * 100) / 100] });
  });
  /* la Polynesie est un semis d'atolls : on la figure par ses cinq archipels */
  zonesOM.push({
    c: 'pf', n: 'Polynésie française',
    p: [[[67, 54], [71, 52], [74, 55], [71, 58], [67, 57]], [[79, 51], [83, 50], [84, 53], [80, 54]],
    [[88, 56], [92, 55], [93, 58], [89, 59]], [[70, 63], [74, 62], [75, 65], [71, 66]],
    [[81, 61], [85, 60], [86, 63], [82, 64]], [[88, 67], [92, 66], [93, 69], [89, 70]]],
    lab: [81, 79]
  });


  /* ---------- points de repere : lieux reels, projetes comme le fond ---------- */
  const PT_FR = {
    paris: [2.35, 48.86], lyon: [4.84, 45.76], marseille: [5.37, 43.30], toulouse: [1.44, 43.60],
    lille: [3.06, 50.63], bordeaux: [-0.58, 44.84], nantes: [-1.55, 47.22], strasbourg: [7.75, 48.57],
    rennes: [-1.68, 48.11], montpellier: [3.88, 43.61], nice: [7.26, 43.70], lehavre: [0.11, 49.49],
    dunkerque: [2.38, 51.03], clermont: [3.09, 45.78], dijon: [5.04, 47.32], brest: [-4.49, 48.39],
    grenoble: [5.72, 45.19], rouen: [1.10, 49.44], caen: [-0.36, 49.18], amiens: [2.30, 49.89],
    reims: [4.03, 49.26], metz: [6.18, 49.12], nancy: [6.18, 48.69], orleans: [1.90, 47.90],
    tours: [0.69, 47.39], angers: [-0.55, 47.47], poitiers: [0.34, 46.58], limoges: [1.26, 45.83],
    larochelle: [-1.15, 46.16], bayonne: [-1.47, 43.49], perpignan: [2.90, 42.70], nimes: [4.36, 43.84],
    avignon: [4.81, 43.95], toulon: [5.93, 43.12], valence: [4.89, 44.93], stetienne: [4.39, 45.44],
    annecy: [6.13, 45.90], calais: [1.85, 50.95], valenciennes: [3.52, 50.36], stnazaire: [-2.21, 47.28],
    verdun: [5.38, 49.16], barleduc: [5.16, 48.77], vichy: [3.43, 46.13], ajaccio: [8.74, 41.93],
    fos: [4.87, 43.44], millau: [3.08, 44.10], lacanau: [-1.20, 44.98], montsaintmichel: [-1.51, 48.64],
    lens: [2.83, 50.43], creutzwald: [6.69, 49.20], sophia: [7.05, 43.62], saclay: [2.17, 48.72],
    ardennes: [4.80, 49.70], langres: [5.33, 47.87], massifcentral: [2.90, 45.20], landes: [-0.60, 44.05],
    pyrenees: [0.50, 42.85], alpes: [6.60, 45.20], jura: [6.05, 46.70], vosges: [6.90, 48.20],
    beauce: [1.80, 48.20], armorique: [-3.00, 48.30], cotedazur: [6.90, 43.50], arcachon: [-1.17, 44.66],
    biarritz: [-1.56, 43.48], stmalo: [-2.03, 48.65], cherbourg: [-1.61, 49.63], mulhouse: [7.34, 47.75],
    besancon: [6.02, 47.24], belfort: [6.86, 47.64], arles: [4.63, 43.68], agen: [0.62, 44.20],
    nevers: [3.16, 46.99], roanne: [4.07, 46.04], albi: [2.15, 43.93], pau: [-0.37, 43.30],
    troyes: [4.07, 48.30], chartres: [1.49, 48.45], laval: [-0.77, 48.07], niort: [-0.46, 46.32],
    beziers: [3.22, 43.34], cannes: [7.02, 43.55], ajaccio2: [8.74, 41.93], bastia: [9.45, 42.70]
  };
  const PT_EUR = {
    paris: [2.35, 48.86], berlin: [13.40, 52.52], londres: [-0.13, 51.51], madrid: [-3.70, 40.42],
    rome: [12.50, 41.90], bruxelles: [4.35, 50.85], varsovie: [21.00, 52.23], moscou: [37.60, 55.75],
    kyiv: [30.50, 50.45], vienne: [16.37, 48.21], athenes: [23.73, 37.98], stockholm: [18.07, 59.33],
    lisbonne: [-9.14, 38.72], prague: [14.42, 50.08], budapest: [19.04, 47.50], strasbourg: [7.75, 48.57],
    francfort: [8.68, 50.11], stettin: [14.55, 53.43], trieste: [13.77, 45.65], rotterdam: [4.48, 51.92],
    anvers: [4.40, 51.22], hambourg: [10.00, 53.55], milan: [9.19, 45.46], munich: [11.58, 48.14],
    zurich: [8.54, 47.37], sarajevo: [18.41, 43.86], srebrenica: [19.30, 44.11], dantzig: [18.65, 54.35],
    geneve: [6.14, 46.20], bale: [7.59, 47.56], luxembourg: [6.13, 49.61], lyon: [4.84, 45.76],
    barcelone: [2.17, 41.39], naples: [14.27, 40.85], istanbul: [28.98, 41.01], minsk: [27.57, 53.90],
    bucarest: [26.10, 44.43], sofia: [23.32, 42.70], helsinki: [24.94, 60.17], oslo: [10.75, 59.91],
    copenhague: [12.57, 55.68], dublin: [-6.26, 53.35], amsterdam: [4.90, 52.37], reykjavik: [-21.94, 64.15],
    hof: [11.92, 50.31], passau: [13.46, 48.57], lubeck: [10.69, 53.87], nuremberg: [11.08, 49.45],
    dusseldorf: [6.77, 51.23], turin: [7.69, 45.07], seville: [-5.98, 37.39], gdansk: [18.65, 54.35]
  };
  const PT_MONDE = {
    washington: [-77.0, 38.9], newyork: [-74.0, 40.7], moscou: [37.6, 55.75], pekin: [116.4, 39.9],
    tokyo: [139.7, 35.7], paris: [2.35, 48.86], londres: [-0.13, 51.51], shanghai: [121.5, 31.2],
    mumbai: [72.9, 19.1], delhi: [77.2, 28.6], saopaulo: [-46.6, -23.5], lagos: [3.4, 6.5],
    lecaire: [31.2, 30.0], sydney: [151.2, -33.9], bandung: [107.6, -6.9], kourou: [-52.65, 5.16],
    guadeloupe: [-61.53, 16.24], martinique: [-61.07, 14.60], guyane: [-53.0, 4.0],
    reunion: [55.45, -20.88], mayotte: [45.23, -12.78], noumea: [166.45, -22.28], papeete: [-149.57, -17.54],
    hiroshima: [132.46, 34.39], pearlharbor: [-157.95, 21.35], berlin: [13.4, 52.5], alger: [3.06, 36.75],
    dakar: [-17.44, 14.69], rotterdam: [4.48, 51.92], singapour: [103.8, 1.35], panama: [-79.5, 9.0],
    suez: [32.55, 29.97], hanoi: [105.8, 21.0], seoul: [127.0, 37.5], lahavane: [-82.4, 23.1],
    stalingrad: [44.5, 48.7], newdelhi: [77.2, 28.6], johannesburg: [28.0, -26.2], mexico: [-99.1, 19.4],
    buenosaires: [-58.4, -34.6], jakarta: [106.8, -6.2], teheran: [51.4, 35.7], istanbul: [28.98, 41.01],
    dubai: [55.3, 25.3], nairobi: [36.8, -1.3], kinshasa: [15.3, -4.3], bogota: [-74.1, 4.6],
    vancouver: [-123.1, 49.3], losangeles: [-118.2, 34.1], lima: [-77.0, -12.0], santiago: [-70.7, -33.5],
    kaboul: [69.2, 34.5], bagdad: [44.4, 33.3], jerusalem: [35.2, 31.8], addis: [38.7, 9.0],
    abidjan: [-4.0, 5.3], casablanca: [-7.6, 33.6], canberra: [149.1, -35.3], wellington: [174.8, -41.3],
    ottawa: [-75.7, 45.4], brasilia: [-47.9, -15.8], pretoria: [28.2, -25.7], rabat: [-6.8, 34.0]
  };
  const ptDe = (dict, f) => {
    const o = {};
    Object.keys(dict).forEach(k => { const p = f(dict[k]); o[k] = [p[0], p[1]]; });
    return o;
  };
  const fmtPt = o => Object.keys(o).map(k => '  ' + k + ': [' + o[k][0] + ',' + o[k][1] + ']').join(',' + String.fromCharCode(10));

  /* ---------------- ecriture ---------------- */
  const fmtRing = r => '[' + r.map(p => '[' + p[0] + ',' + p[1] + ']').join(',') + ']';
  const fmtZone = z => '  { c: \'' + z.c + '\'' + (z.g ? ', g: \'' + z.g + '\'' : '') + ', n: ' + JSON.stringify(z.n) +
    (z.sn ? ', sn: ' + JSON.stringify(z.sn) : '') +
    ', lab: [' + z.lab[0] + ',' + z.lab[1] + '],\n    p: [' + z.p.map(fmtRing).join(',\n       ') + '] }';
  const fmtVilles = v => v.map(x => '  [' + JSON.stringify(x[0]) + ',' + x[1] + ',' + x[2] + ',\'' + x[3] + '\']').join(',\n');

  const out = '/* ============================================================\n' +
    '   Delta — FONDS DE CARTE. Fichier GENERE par `node _fonds.js`.\n' +
    '   Ne pas editer a la main.\n' +
    '   Contours reels, simplifies et projetes :\n' +
    '     FR    — 13 regions (source IGN via france-geojson), Lambert conique\n' +
    '     EUR   — 42 pays (Natural Earth 1:50m), Lambert conique\n' +
    '     MONDE — pays groupes par continent (Natural Earth 1:110m), Miller\n' +
    '     DROM  — vignettes des territoires ultramarins\n' +
    '   Chaque zone : { c, n, sn?, lab:[x,y], p:[anneau, …] }, anneaux dans 0-100.\n' +
    '   ============================================================ */\n' +
    'const CARTES_BASE = {};\n\n' +
    'CARTES_BASE.FR = { mer: true, w: ' + FR.w + ', h: ' + FR.h + ', pt: {\n' + fmtPt(ptDe(PT_FR, FR.proj)) + '\n}, villes: [\n' + fmtVilles(VILLES_FR) + '\n], z: [\n' + FR.zones.map(fmtZone).join(',\n') + '\n] };\n\n' +
    'CARTES_BASE.EUR = { mer: true, w: ' + EUR.w + ', h: ' + EUR.h + ', pt: {\n' + fmtPt(ptDe(PT_EUR, EUR.proj)) + '\n}, villes: [\n' + fmtVilles(VILLES_EUR) + '\n], z: [\n' + EUR.zones.map(fmtZone).join(',\n') + '\n] };\n\n' +
    'CARTES_BASE.MONDE = { mer: true, w: ' + MONDE.w + ', h: ' + MONDE.h + ', pt: {\n' + fmtPt(ptDe(PT_MONDE, MONDE.proj)) + '\n}, villes: [\n' + fmtVilles(VILLES_MONDE) + '\n], z: [\n' + MONDE.zones.map(fmtZone).join(',\n') + '\n] };\n\n' +
    'CARTES_BASE.DROM = { mer: false, w: 100, h: 86, villes: [], z: [\n' + zonesOM.map(fmtZone).join(',\n') + '\n] };\n';

  fs.writeFileSync(path.join(__dirname, 'src', '24-fonds.js'), out);
  const pts = f => f.reduce((a, z) => a + z.p.reduce((b, r) => b + r.length, 0), 0);
  console.log('src/24-fonds.js : ' + (out.length / 1024).toFixed(0) + ' Ko');
  console.log('  FR    ' + FR.zones.length + ' zones, ' + pts(FR.zones) + ' points');
  console.log('  EUR   ' + EUR.zones.length + ' zones, ' + pts(EUR.zones) + ' points');
  console.log('  MONDE ' + MONDE.zones.length + ' zones, ' + pts(MONDE.zones) + ' points');
  console.log('  DROM  ' + zonesOM.length + ' zones, ' + pts(zonesOM) + ' points');
})().catch(e => { console.error(e); process.exit(1); });
