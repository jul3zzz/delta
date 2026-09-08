/* ============================================================
   Delta — tirage de fiches et collection.
   ============================================================ */
const PRIX_TIRAGE = 100, PRIX_TIRAGE10 = 900;
const PITIE = 30;        // un Monument garanti tous les 30 tirages
const PITIE_DEL = 150;   // une fiche Delta garantie tous les 150 tirages

function tirerRarete() {
  S.pity = (S.pity || 0) + 1; S.pityDel = (S.pityDel || 0) + 1;
  if (S.pityDel >= PITIE_DEL) { S.pityDel = 0; S.pity = 0; return 'del'; }
  if (S.pity >= PITIE) { S.pity = 0; return pick(['mon', 'mon', 'mon', 'leg']); }
  let r = Math.random() * 100, acc = 0;
  for (const x of RARETES) { acc += x.p; if (r < acc) { if (x.id === 'mon' || x.id === 'leg' || x.id === 'del') S.pity = 0; if (x.id === 'del') S.pityDel = 0; return x.id; } }
  return 'tra';
}
function tirerUne() {
  const rid = tirerRarete();
  const pool = CARTES.filter(c => c.r === rid);
  const c = pick(pool.length ? pool : CARTES);
  const neuf = !S.cards[c.id];
  S.cards[c.id] = (S.cards[c.id] || 0) + 1;
  S.rolls = (S.rolls || 0) + 1;
  const R = RAR(rid);
  const coins = neuf ? 0 : Math.round(R.coins * .5);
  S.coins += coins; S.xp += R.xp;
  commit();
  return { carte: c, neuf: neuf, rar: R, coins: coins };
}

function ficheHTML(c, poss, dup) {
  const R = RAR(c.r);
  return '<button class="fiche ' + R.cls + (poss ? '' : ' locked') + '" data-c="' + c.id + '">' +
    '<span class="band"><span class="code">' + c.id.toUpperCase() + '</span>' +
    '<span class="rname">' + esc(R.n) + '</span></span>' +
    (dup > 1 ? '<span class="dup">×' + dup + '</span>' : '') +
    '<span class="plate">' + figSVG(c.s, 200, 150) + '</span>' +
    '<span class="foot"><h4>' + (poss ? esc(c.n) : '???') + '</h4>' +
    '<span class="sub">' + MAT[c.m].n + '</span></span></button>';
}

function ficheDetail(c) {
  const R = RAR(c.r), poss = !!S.cards[c.id];
  modal('<div class="sheet ' + R.cls + '">' +
    '<div><div class="figure" style="margin:0">' + figSVG(c.s, 200, 150) + '</div>' +
    '<dl class="kv"><dt>Rareté</dt><dd style="color:var(--rc);font-weight:600">' + esc(R.n) + ' (' + R.p + ' %)</dd>' +
    '<dt>Matière</dt><dd>' + MAT[c.m].n + '</dd>' +
    '<dt>Exemplaires</dt><dd>' + (S.cards[c.id] || 0) + '</dd></dl></div>' +
    '<div><div class="eyebrow">' + esc(R.n) + '</div><h2 style="margin:4px 0 10px">' + esc(c.n) + '</h2>' +
    '<p class="small muted" style="font-family:var(--ff-b);font-size:15px;margin-bottom:12px">' + esc(c.d) + '</p>' +
    (poss ? '<div class="desc"><p>' + c.e + '</p></div>' +
      '<div class="keep" style="margin-top:14px"><b>Le point clé</b>' + esc(c.k) + '</div>'
      : '<div class="callout"><b>Fiche non débloquée</b>Fais un tirage pour découvrir son contenu.</div>') +
    '</div></div>');
}

/* ============================================================
   TIRAGE
   ============================================================ */
VIEWS.tirage = function (host) {
  const total = CARTES.length, poss = Object.keys(S.cards).length;
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Tirage</div>' +
    '<h1>Tirage de repères</h1>' +
    '<p>Chaque fiche raconte un repère du programme : un lieu, un objet, un personnage, un événement. Six raretés, de la simple Trace à la fiche Delta.</p></div>' +
    '<div class="stack" style="gap:6px;align-items:flex-end">' +
    '<span class="stat coin"><b>' + nfmt(S.coins) + '</b> δ</span>' +
    '<span class="small muted">' + poss + ' / ' + total + ' fiches · ' + (S.rolls || 0) + ' tirage(s)</span></div></div>' +

    '<div class="grid g2" style="margin-bottom:18px">' +
    '<div class="panel center"><div class="eyebrow">Tirage simple</div>' +
    '<p class="muted small" style="font-family:var(--ff-b);margin:8px 0 12px">Une fiche au hasard.</p>' +
    '<button class="btn p big wide" id="t1">Tirer — ' + PRIX_TIRAGE + ' δ</button></div>' +
    '<div class="panel center"><div class="eyebrow">Tirage multiple</div>' +
    '<p class="muted small" style="font-family:var(--ff-b);margin:8px 0 12px">Dix fiches d’un coup, une remise de 100 δ.</p>' +
    '<button class="btn big wide" id="t10">Tirer ×10 — ' + PRIX_TIRAGE10 + ' δ</button></div></div>' +

    '<div class="panel" style="margin-bottom:18px"><div class="row" style="margin-bottom:10px"><b>Taux d’apparition</b>' +
    '<span class="grow"></span><span class="small muted">Monument garanti dans ' + (PITIE - (S.pity || 0)) + ' tirage(s) · Delta dans ' + (PITIE_DEL - (S.pityDel || 0)) + '</span></div>' +
    '<div class="grid g3">' + RARETES.map(r => {
      const n = CARTES.filter(c => c.r === r.id).length;
      const eu = CARTES.filter(c => c.r === r.id && S.cards[c.id]).length;
      return '<div class="' + r.cls + '" style="padding:10px 12px;border:1px solid color-mix(in srgb,var(--rc) 40%,transparent);border-radius:8px;background:color-mix(in srgb,var(--rc) 8%,var(--surface))">' +
        '<b style="color:var(--rc);font-size:13.5px">' + esc(r.n) + '</b>' +
        '<div class="mono small muted">' + r.p + ' % · ' + eu + '/' + n + ' obtenues</div></div>';
    }).join('') + '</div></div>' +
    '<div id="res"></div>';

  $('#t1').onclick = () => { if (!spend(PRIX_TIRAGE)) return; animUn(tirerUne()); };
  $('#t10').onclick = () => {
    if (!spend(PRIX_TIRAGE10)) return;
    const lot = Array.from({ length: 10 }, tirerUne);
    checkSucces();
    const meilleur = lot.reduce((a, b) => RARETES.findIndex(r => r.id === b.carte.r) > RARETES.findIndex(r => r.id === a.carte.r) ? b : a);
    $('#res').innerHTML = '<div class="panel"><div class="row" style="margin-bottom:12px"><b>Résultat du tirage ×10</b>' +
      '<span class="grow"></span><span class="small muted">' + lot.filter(l => l.neuf).length + ' nouvelle(s) · +' + lot.reduce((a, b) => a + b.coins, 0) + ' δ de doublons</span></div>' +
      '<div class="grid g4">' + lot.map(l => ficheHTML(l.carte, true, S.cards[l.carte.id])).join('') + '</div></div>';
    $$('[data-c]').forEach(b => b.onclick = () => ficheDetail(CARTES.find(c => c.id === b.dataset.c)));
    scrollTo({ top: 400, behavior: 'smooth' });
    if (['mon', 'leg', 'del'].indexOf(meilleur.carte.r) >= 0) burstAt(innerWidth / 2, 300, 80);
    paintBar();
  };
};

/* animation d'un tirage simple */
function animUn(res) {
  const R = res.rar, c = res.carte;
  const host = $('#res');
  host.innerHTML = '<div class="stage ' + R.cls + '" id="stage">' +
    (['mon', 'leg', 'del'].indexOf(c.r) >= 0 ? '<div class="rays"></div>' : '') +
    '<canvas id="fxc"></canvas><div class="orb"></div><div class="flare"></div>' +
    '<button class="btn ghost sm" id="skip" style="position:absolute;right:12px;top:12px">Passer</button></div>';
  scrollTo({ top: 300, behavior: 'smooth' });
  let fini = false;
  const reveal = () => {
    if (fini) return; fini = true;
    const st = $('#stage'); if (!st) return;
    st.innerHTML = (['mon', 'leg', 'del'].indexOf(c.r) >= 0 ? '<div class="rays"></div>' : '') +
      '<canvas id="fxc"></canvas>' +
      '<div class="reveal">' + ficheHTML(c, true, S.cards[c.id]) + '</div>' +
      '<div style="position:absolute;bottom:14px;left:0;right:0;text-align:center">' +
      '<span class="pill" style="color:var(--rc);border-color:var(--rc);background:color-mix(in srgb,var(--rc) 12%,var(--surface))">' + esc(R.n) + '</span> ' +
      (res.neuf ? '<span class="pill t-ok">nouvelle fiche</span>' : '<span class="pill t-neutral">doublon · +' + res.coins + ' δ</span>') +
      '</div>';
    $$('[data-c]', st).forEach(b => b.onclick = () => ficheDetail(c));
    if (['arc', 'mon', 'leg', 'del'].indexOf(c.r) >= 0) {
      const cv = $('#fxc'); if (cv) fxBurst(cv, c.r);
      burstAt(innerWidth / 2, 320, c.r === 'del' ? 120 : 60);
    }
    checkSucces(); paintBar();
  };
  const t = setTimeout(reveal, 1450);
  $('#skip').onclick = () => { clearTimeout(t); reveal(); };
}
function fxBurst(cv, rid) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const box = cv.parentElement.getBoundingClientRect();
  cv.width = box.width; cv.height = box.height;
  const g = cv.getContext('2d');
  const cols = { arc: ['#2F5CB8', '#6E8FE4'], mon: ['#A9761A', '#DDA945'], leg: ['#9E2B7E', '#DC63B9'], del: ['#C2410C', '#CA8A04', '#0EA5A5'] }[rid] || ['#7A6A56'];
  const P = [];
  for (let i = 0; i < 70; i++) P.push({ x: cv.width / 2, y: cv.height / 2, vx: (Math.random() - .5) * 12, vy: (Math.random() - .5) * 12, r: 1.5 + Math.random() * 3, c: pick(cols), a: 1 });
  let t = 0;
  (function loop() {
    t++; g.clearRect(0, 0, cv.width, cv.height);
    for (const p of P) { p.x += p.vx; p.y += p.vy; p.vx *= .96; p.vy *= .96; p.a -= .015; g.globalAlpha = Math.max(0, p.a); g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill(); }
    if (t < 80 && cv.isConnected) requestAnimationFrame(loop);
  })();
}

/* ============================================================
   COLLECTION
   ============================================================ */
VIEWS.collection = function (host, args) {
  const f = args[0] || 'tout';
  let list = CARTES;
  if (MAT[f]) list = CARTES.filter(c => c.m === f);
  else if (RARETES.some(r => r.id === f)) list = CARTES.filter(c => c.r === f);
  else if (f === 'manquantes') list = CARTES.filter(c => !S.cards[c.id]);

  const poss = CARTES.filter(c => S.cards[c.id]).length;
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Collection</div>' +
    '<h1>Collection de repères</h1>' +
    '<p>' + poss + ' fiches sur ' + CARTES.length + '. Chaque fiche débloquée révèle un texte complet : une anecdote, un lieu ou un document du programme.</p>' +
    '<div class="bar" style="margin-top:10px;max-width:340px"><i style="width:' + Math.round(100 * poss / CARTES.length) + '%"></i></div></div>' +
    '<button class="btn p" onclick="go(\'tirage\')">Faire un tirage</button></div>' +
    '<div class="tabs" style="margin-bottom:18px">' +
    [['tout', 'Tout'], ['hist', 'Histoire'], ['geo', 'Géographie'], ['emc', 'EMC'], ['manquantes', 'Manquantes']]
      .concat(RARETES.map(r => [r.id, r.n]))
      .map(x => '<button data-f="' + x[0] + '" class="' + (f === x[0] ? 'on' : '') + '">' + esc(x[1]) + '</button>').join('') + '</div>' +
    (list.length ? '<div class="grid g3">' + list.map(c => ficheHTML(c, !!S.cards[c.id], S.cards[c.id])).join('') + '</div>'
      : '<div class="panel center"><p style="font-family:var(--ff-b)">Rien à afficher ici — collection complète pour ce filtre !</p></div>');

  $$('[data-f]').forEach(b => b.onclick = () => go('collection/' + b.dataset.f));
  $$('[data-c]').forEach(b => {
    const c = CARTES.find(x => x.id === b.dataset.c);
    b.onclick = () => ficheDetail(c);
  });
};
