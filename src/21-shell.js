/* ============================================================
   Delta — coquille : ecran de compte, rail, barre d'etat, themes.
   ============================================================ */
const NAV = [
  ['Apprendre', [
    ['accueil', 'Tableau de bord', '◧'],
    ['cours', 'Cours', '▤'],
    ['reperes', 'Repères & dates', '⌖'],
    ['exos', 'Exercices', '✎']
  ]],
  ['S’entraîner', [
    ['brevet', 'Brevet blanc', '⏱'],
    ['jeux', 'Mini-jeux', '◈'],
    ['atlas', 'Atlas', '⬡']
  ]],
  ['Collectionner', [
    ['tirage', 'Tirage', '◉'],
    ['collection', 'Collection', '▦']
  ]],
  ['Compte', [
    ['profil', 'Profil', '☰'],
    ['boutique', 'Boutique', '✦'],
    ['succes', 'Succès', '★']
  ]]
];

/* ---------- theme clair / sombre ---------- */
function effTheme() {
  const t = document.documentElement.getAttribute('data-theme');
  if (t) return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(t) {
  if (t) document.documentElement.setAttribute('data-theme', t);
  else document.documentElement.removeAttribute('data-theme');
  DB.theme = t || null; commit(); applySkin();
  const b = $('#themebtn'); if (b) b.textContent = effTheme() === 'dark' ? '☾' : '☀';
}
function applySkin() {
  const st = document.documentElement.style;
  ['--brand', '--brand-ink', '--brand-soft', '--paper', '--paper2', '--surface', '--surface2', '--ink', '--ink2', '--muted', '--line', '--line2', '--grid', '--grid2', '--faint'].forEach(k => st.removeProperty(k));
  if (!S || typeof SHOP === 'undefined') return;
  const th = SHOP.theme.find(x => x.id === S.shop.eq.theme);
  if (!th || !th.vars) return;
  const v = th.vars[effTheme()];
  if (v) for (const k in v) st.setProperty(k, v[k]);
}

/* ---------- ecran de compte ---------- */
function authScreen() {
  const names = Object.keys(DB.users);
  return '<div class="auth"><div class="authbox">' +
    '<div class="row" style="gap:12px;margin-bottom:18px"><div class="delta" style="width:54px;height:54px;font-size:34px;border-radius:15px">δ</div>' +
    '<div><b style="font-family:var(--ff-d);font-size:26px;display:block;line-height:1.1;font-variation-settings:&quot;SOFT&quot; 30,&quot;WONK&quot; 1">Delta</b>' +
    '<span class="eyebrow">Histoire · Géographie · EMC — 3ᵉ</span></div></div>' +
    '<p class="small muted" style="font-family:var(--ff-b);font-size:15px;margin-bottom:18px">L’atlas de poche qui révise le brevet avec toi. Des cours complets bourrés d’anecdotes, des cartes dessinées à la main, une dizaine de mini-jeux, et une collection de repères à faire tomber au tirage.</p>' +
    '<div class="tabs" style="margin-bottom:16px"><button id="tb-in" class="on">Se connecter</button><button id="tb-up">Créer un compte</button></div>' +
    '<form id="authform" autocomplete="off">' +
    '<div class="field"><label for="au-p">Pseudo</label><input id="au-p" maxlength="18" required placeholder="ex. Camille"></div>' +
    '<div class="field"><label for="au-w">Mot de passe</label><input id="au-w" type="password" maxlength="40" required placeholder="4 caractères minimum"></div>' +
    '<div class="field" id="cf" hidden><label for="au-c">Confirme le mot de passe</label><input id="au-c" type="password" maxlength="40"></div>' +
    '<p class="err" id="au-err" hidden></p>' +
    '<button class="btn p wide big" id="au-go" type="submit">Ouvrir l’atlas</button>' +
    '</form>' +
    (names.length ? '<p class="small muted" style="margin-top:14px">Comptes sur cet appareil : ' + names.map(n => '<button class="btn sm" data-quick="' + esc(n) + '" style="margin:3px 3px 0 0">' + esc(n) + '</button>').join('') + '</p>' : '') +
    '<p class="small muted" style="margin-top:16px;font-size:12px">Les comptes sont enregistrés uniquement dans ce navigateur (localStorage). Rien n’est envoyé sur Internet : n’utilise pas un vrai mot de passe important.</p>' +
    '</div></div>';
}
function wireAuth() {
  let mode = 'in';
  const err = m => { const e = $('#au-err'); e.textContent = m; e.hidden = !m; };
  $('#tb-in').onclick = () => { mode = 'in'; $('#tb-in').classList.add('on'); $('#tb-up').classList.remove('on'); $('#cf').hidden = true; $('#au-go').textContent = 'Ouvrir l’atlas'; err(''); };
  $('#tb-up').onclick = () => { mode = 'up'; $('#tb-up').classList.add('on'); $('#tb-in').classList.remove('on'); $('#cf').hidden = false; $('#au-go').textContent = 'Créer mon compte'; err(''); };
  $$('[data-quick]').forEach(b => b.onclick = () => { $('#au-p').value = b.dataset.quick; $('#au-w').focus(); });
  $('#authform').onsubmit = e => {
    e.preventDefault();
    const p = $('#au-p').value.trim(), w = $('#au-w').value;
    if (p.length < 2) return err('Choisis un pseudo d’au moins 2 caractères.');
    if (w.length < 4) return err('Le mot de passe doit faire au moins 4 caractères.');
    if (mode === 'up') {
      if (DB.users[p]) return err('Ce pseudo existe déjà sur cet appareil.');
      if ($('#au-c').value !== w) return err('Les deux mots de passe ne sont pas identiques.');
      DB.users[p] = { pw: hash(w), save: blankSave() };
      login(p); touchStreak();
      renderApp(); go('accueil');
      setTimeout(() => { toast('Bienvenue, ' + p + ' — 250 δ pour démarrer', 'win'); burstAt(innerWidth / 2, 160, 70); }, 250);
    } else {
      const u = DB.users[p];
      if (!u) return err('Aucun compte à ce pseudo. Passe par « Créer un compte ».');
      if (u.pw !== hash(w)) return err('Mot de passe incorrect.');
      login(p); touchStreak(); renderApp(); go('accueil'); route();
    }
  };
}

/* ---------- coquille ---------- */
function renderApp() {
  const app = $('#app');
  if (!USER) { app.innerHTML = authScreen(); wireAuth(); return; }
  applySkin();
  app.innerHTML =
    '<div class="shell">' +
    '<aside class="rail" id="rail">' +
    '<a class="brand" href="#/accueil"><span class="delta">δ</span><span><b>Delta</b><span>Histoire · Géo · EMC</span></span></a>' +
    NAV.map(g => '<div class="navsec">' + g[0] + '</div>' + g[1].map(n =>
      '<a class="nav" data-path="' + n[0] + '" href="#/' + n[0] + '"><i>' + n[2] + '</i>' + n[1] + '</a>').join('')).join('') +
    '<div style="margin-top:auto;padding-top:18px" class="stack">' +
    '<div class="bar" style="margin-bottom:6px"><i id="xpbar" style="width:0%"></i></div>' +
    '<div class="row small" style="justify-content:space-between"><span class="mono" id="lvltxt">Niv. 1</span>' +
    '<button class="btn ghost sm" id="logout">Quitter</button></div></div>' +
    '</aside>' +
    '<div class="main">' +
    '<header class="topbar">' +
    '<button class="btn ghost sm" id="burger" aria-label="Menu">☰</button>' +
    '<strong id="crumb">Tableau de bord</strong>' +
    '<span class="grow"></span>' +
    '<span class="stat elo" title="Classement Elo"><span id="elotxt">800</span></span>' +
    '<span class="stat coin" title="Deltas"><b id="cointxt">0</b> δ</span>' +
    '<button class="btn ghost sm" id="themebtn" aria-label="Thème clair ou sombre">☀</button>' +
    '</header>' +
    '<div class="wrap" id="view"></div></div></div>';

  $('#logout').onclick = () => { if (confirm('Se déconnecter ? Ta progression reste enregistrée sur cet appareil.')) logout(); };
  $('#themebtn').onclick = () => setTheme(effTheme() === 'dark' ? 'light' : 'dark');
  $('#burger').onclick = () => {
    const r = $('#rail'); r.classList.add('open');
    const sc = document.createElement('div'); sc.className = 'railscrim';
    sc.onclick = () => { r.classList.remove('open'); sc.remove(); };
    document.body.appendChild(sc);
  };
  $('#themebtn').textContent = effTheme() === 'dark' ? '☾' : '☀';
  paintBar(); route();
}
function paintBar() {
  if (!S) return;
  const li = levelInfo();
  const b = $('#xpbar'); if (b) b.style.width = li.pct + '%';
  const l = $('#lvltxt'); if (l) l.textContent = 'Niv. ' + li.n + ' · ' + (S.xp - li.a) + '/' + (li.b - li.a) + ' XP';
  const c = $('#cointxt'); if (c) c.textContent = nfmt(S.coins);
  const e = $('#elotxt'); if (e) e.textContent = rang(S.elo).g + ' ' + S.elo;
}
function paintNav() {
  const p = CUR.split('/')[0];
  $$('.nav').forEach(a => a.classList.toggle('on', a.dataset.path === p));
  const found = NAV.reduce((acc, g) => acc || g[1].find(n => n[0] === p), null);
  const c = $('#crumb'); if (c) c.textContent = found ? found[1] : 'Delta';
}
