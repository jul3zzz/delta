/* ============================================================
   Delta — noyau : stockage, comptes, economie, Elo, routeur.
   ============================================================ */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { const c = a.slice(); for (let i = c.length - 1; i > 0; i--) { const j = rnd(i + 1); const t = c[i]; c[i] = c[j]; c[j] = t; } return c; };
const today = () => new Date().toISOString().slice(0, 10);
const nfmt = n => Number(n).toLocaleString('fr-FR');
const norm = s => String(s || '')
  .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’ʼ]/g, "'").replace(/[‐-―]/g, '-')
  .replace(/[.,;:!?()"]/g, ' ').replace(/\s+/g, ' ').trim();

const MAT = {
  hist: { n: 'Histoire', c: 'var(--hist)', cls: 't-hist', ic: '◆' },
  geo: { n: 'Géographie', c: 'var(--geo)', cls: 't-geo', ic: '◉' },
  emc: { n: 'EMC', c: 'var(--emc)', cls: 't-emc', ic: '⚖' }
};

/* ---------- stockage ---------- */
const KEY = 'delta_save_v1';
let DB = { v: 1, users: {}, last: null, theme: null };
function dbLoad() {
  try { const r = localStorage.getItem(KEY); if (r) DB = Object.assign(DB, JSON.parse(r)); } catch (e) { }
}
function dbSave() { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { } }
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }

function blankSave() {
  return {
    coins: 250, xp: 0, elo: 800, eloPeak: 800, rolls: 0, pity: 0, pityDel: 0,
    streak: { n: 0, last: '', best: 0 },
    cours: {}, exos: {}, cards: {}, succes: {}, games: {}, brevets: [], reperes: {},
    bio: '', shop: {
      owned: ['th-atlas', 'av-boussole', 'ba-graticule', 'ca-simple', 'ti-debut', 'do-quadrille'],
      eq: { theme: 'th-atlas', avatar: 'av-boussole', banner: 'ba-graticule', frame: 'ca-simple', title: 'ti-debut', back: 'do-quadrille' }
    },
    stats: { exoOk: 0, exoTot: 0, lecons: 0, jeux: 0, brevet: 0 },
    created: Date.now()
  };
}
let USER = null;               // pseudo courant
let S = null;                  // raccourci vers DB.users[USER].save
function commit() { dbSave(); }

function login(pseudo) { USER = pseudo; S = DB.users[pseudo].save; DB.last = pseudo; migrate(S); commit(); }
function migrate(s) {
  const b = blankSave();
  for (const k in b) if (!(k in s)) s[k] = b[k];
  for (const k in b.shop.eq) if (!(k in s.shop.eq)) s.shop.eq[k] = b.shop.eq[k];
  for (const k in b.stats) if (!(k in s.stats)) s.stats[k] = b.stats[k];
}
function logout() { USER = null; S = null; DB.last = null; commit(); location.hash = ''; renderApp(); }

/* ---------- economie, XP, niveaux ---------- */
const LVL = n => Math.floor(40 * Math.pow(n, 1.55));          // XP cumule requis pour le niveau n
function levelOf(xp) { let n = 1; while (xp >= LVL(n + 1)) n++; return n; }
function levelInfo() {
  const n = levelOf(S.xp), a = LVL(n), b = LVL(n + 1);
  return { n: n, a: a, b: b, pct: Math.round(100 * (S.xp - a) / (b - a)) };
}
function gain(coins, xp, ev) {
  const before = levelOf(S.xp);
  if (coins) S.coins += coins;
  if (xp) S.xp += xp;
  commit();
  if (ev) floatGain(ev, (coins ? '+' + coins + ' δ' : '') + (coins && xp ? '  ' : '') + (xp ? '+' + xp + ' XP' : ''));
  const after = levelOf(S.xp);
  if (after > before) { toast('Niveau ' + after + ' atteint', 'win'); burstAt(innerWidth / 2, 120, 60); }
  paintBar();
}
function spend(n) { if (S.coins < n) { toast('Il te manque ' + (n - S.coins) + ' δ'); return false; } S.coins -= n; commit(); paintBar(); return true; }

/* ---------- Elo ---------- */
const RANGS = [
  { e: 0, n: 'Curieux d’archives', g: 'ι' },
  { e: 900, n: 'Archiviste', g: 'κ' },
  { e: 1020, n: 'Cartographe', g: 'λ' },
  { e: 1140, n: 'Chroniqueur', g: 'μ' },
  { e: 1260, n: 'Historien', g: 'ν' },
  { e: 1380, n: 'Géographe confirmé', g: 'ξ' },
  { e: 1500, n: 'Conservateur', g: 'π' },
  { e: 1650, n: 'Lauréat Delta', g: 'Δ' }
];
function rang(e) { let r = RANGS[0]; for (let i = 0; i < RANGS.length; i++) if (e >= RANGS[i].e) r = RANGS[i]; return r; }
function rangNext(e) { for (let i = 0; i < RANGS.length; i++) if (e < RANGS[i].e) return RANGS[i]; return null; }
function elo(diff, win, k) {
  const R = S.elo, D = 700 + diff * 190;                       // difficulte 0..5 -> 700..1650
  const exp = 1 / (1 + Math.pow(10, (D - R) / 400));
  const d = Math.round((k || 22) * ((win ? 1 : 0) - exp));
  S.elo = Math.max(100, R + d);
  if (S.elo > S.eloPeak) S.eloPeak = S.elo;
  commit(); paintBar();
  return d;
}
function eloTag(d) {
  return '<span class="pill ' + (d >= 0 ? 't-ok' : 't-bad') + '">' + (d >= 0 ? '+' : '') + d + ' Elo</span>';
}

/* ---------- serie quotidienne ---------- */
function touchStreak() {
  const t = today(); if (S.streak.last === t) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  S.streak.n = (S.streak.last === y) ? S.streak.n + 1 : 1;
  S.streak.last = t; S.streak.best = Math.max(S.streak.best || 0, S.streak.n);
  const bonus = 20 + Math.min(S.streak.n, 10) * 10;
  S.coins += bonus; commit();
  setTimeout(() => toast('Jour ' + S.streak.n + ' d’affilée : +' + bonus + ' δ', 'win'), 500);
}

/* ---------- retours visuels ---------- */
function toast(msg, cls) {
  const h = $('#toast'); if (!h) return;
  const d = document.createElement('div'); d.className = 'toast' + (cls ? ' ' + cls : ''); d.textContent = msg;
  h.appendChild(d);
  setTimeout(() => { d.style.transition = 'opacity .3s'; d.style.opacity = '0'; setTimeout(() => d.remove(), 320); }, 2300);
}
function floatGain(ev, txt) {
  if (!txt) return;
  const node = (ev && (ev.currentTarget || ev.target)) || document.body;
  const r = node.getBoundingClientRect ? node.getBoundingClientRect() : { left: innerWidth / 2, top: 120, width: 0 };
  const d = document.createElement('div'); d.className = 'gain'; d.textContent = txt;
  d.style.left = (r.left + r.width / 2 - 30) + 'px'; d.style.top = (r.top - 6) + 'px';
  document.body.appendChild(d); setTimeout(() => d.remove(), 1000);
}
function burstAt(x, y, n, colors) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:950';
  cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
  const g = cv.getContext('2d'), C = colors || ['#2C5F8A', '#9A3B2E', '#1C7A5E', '#976F10', '#6E4A9E'];
  const P = [];
  for (let i = 0; i < (n || 40); i++) P.push({ x: x, y: y, vx: (Math.random() - .5) * 9, vy: -Math.random() * 9 - 2, r: 2 + Math.random() * 3, c: pick(C), a: 1 });
  let t = 0;
  (function loop() {
    t++; g.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) { p.x += p.vx; p.y += p.vy; p.vy += .32; p.a -= .016; g.globalAlpha = Math.max(0, p.a); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill(); }
    if (t < 70) requestAnimationFrame(loop); else cv.remove();
  })();
}

/* ---------- modale ---------- */
function modal(inner, after) {
  const host = $('#modalhost');
  host.innerHTML = '<div class="scrim" data-close><div class="modal" role="dialog" aria-modal="true">' +
    '<button class="btn ghost sm x" data-close aria-label="Fermer">✕</button>' + inner + '</div></div>';
  host.querySelector('.scrim').addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closeModal(); });
  $$('[data-close]', host).forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', escClose);
  if (after) after(host);
}
function escClose(e) { if (e.key === 'Escape') closeModal(); }
function closeModal() { $('#modalhost').innerHTML = ''; document.removeEventListener('keydown', escClose); }

/* ---------- routeur ---------- */
const VIEWS = {};
let CUR = '';
function go(p) { location.hash = '#/' + p; }
function route() {
  if (!USER) { renderApp(); return; }
  const h = (location.hash || '#/accueil').replace(/^#\//, '') || 'accueil';
  CUR = h;
  const parts = h.split('/');
  const fn = VIEWS[parts[0]] || VIEWS.accueil;
  const host = $('#view');
  if (!host) { renderApp(); return; }
  host.innerHTML = '';
  try { fn(host, parts.slice(1)); }
  catch (err) { host.innerHTML = '<div class="panel"><b>Erreur d’affichage</b><p class="small muted">' + esc(err.message) + '</p></div>'; console.error(err); }
  paintNav(); scrollTo(0, 0);
  $$('.rail').forEach(r => r.classList.remove('open'));
  $$('.railscrim').forEach(r => r.remove());
}
