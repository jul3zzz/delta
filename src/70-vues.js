/* ============================================================
   Delta — vues : accueil, cours, exercices, reperes, atlas, jeux.
   ============================================================ */
const coursById = id => COURS.find(c => c.id === id);
const coursDe = m => COURS.filter(c => c.m === m);
const exosDe = cid => EXOS.filter(e => e.c === cid);

/* ---------- rendu d'un cours ---------- */
function secHTML(s) {
  const t = s[0];
  switch (t) {
    case 'p': return '<p>' + s[1] + '</p>';
    case 'h': return '<h2 id="s' + hash(s[1]) + '">' + esc(s[1]) + '</h2>';
    case 'ul': return '<ul>' + s[1].map(x => '<li>' + x + '</li>').join('') + '</ul>';
    case 'ol': return '<ol style="margin:12px 0;padding-left:22px">' + s[1].map(x => '<li style="margin:7px 0">' + x + '</li>').join('') + '</ol>';
    case 'def': return '<div class="defs">' + s[1].map(d => '<div><b>' + esc(d[0]) + '</b> — ' + d[1] + '</div>').join('') + '</div>';
    case 'anec': return '<div class="anec"><b>Anecdote — ' + esc(s[1]) + '</b>' + s[2] + '</div>';
    case 'note': case 'callout': return '<div class="callout"><b>À noter</b>' + s[1] + '</div>';
    case 'keep': return '<div class="keep"><b>À retenir</b><ul>' + s[1].map(x => '<li>' + x + '</li>').join('') + '</ul></div>';
    case 'doc': return '<div class="docsrc"><div class="dt">' + esc(s[1]) + '</div><blockquote>' + esc(s[2]) + '</blockquote>' +
      (s[3] ? '<div class="src">' + esc(s[3]) + '</div>' : '') + '</div>';
    case 'fig': return fig(s[1], s[2], s[3], s[4]);
    case 'atlas': {                       // une planche de l'atlas, reprise telle quelle
      const pl = ATLAS.find(x => x.id === s[1]);
      if (!pl) return '';
      return fig(pl.ops, pl.w, pl.h, s[2] || (pl.n + '.'));
    }
    case 'chiffres': return '<div class="figs">' + s[1].map(c => '<div><b>' + esc(c[0]) + '</b><span>' + esc(c[1]) + '</span></div>').join('') + '</div>';
    case 'tab': return '<table class="tab"><thead><tr>' + s[1].map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
      s[2].map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody>' +
      (s[3] ? '<caption>' + esc(s[3]) + '</caption>' : '') + '</table>';
    case 'rep': return '<div class="rep">' + s[1].map(r => '<div><b>' + esc(r[0]) + '</b><span>' + r[1] + '</span></div>').join('') + '</div>';
    default: return '';
  }
}

/* ---------- rendu d'un exercice ---------- */
function exoHTML(e, idx) {
  const lab = ['qcm', 'vf', 'txt', 'date', 'ord'];
  let body = '<p class="q">' + e.q + '</p>';
  if (e.ty === 'qcm') body += '<div class="opts">' + e.o.map((o, k) => '<button class="opt" data-k="' + k + '"><span class="mk">' + 'ABCDE'[k] + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>';
  else if (e.ty === 'vf') body += '<div class="opts">' + e.o.map((o, k) =>
    '<div class="opt" style="cursor:default;align-items:center"><span style="flex:1">' + esc(o) + '</span>' +
    '<button class="btn sm vf" data-k="' + k + '" data-v="1">Vrai</button>' +
    '<button class="btn sm vf" data-k="' + k + '" data-v="0">Faux</button></div>').join('') +
    '</div><button class="btn p" id="vfgo" style="align-self:flex-start">Valider</button>';
  else if (e.ty === 'txt') body += '<div class="numin"><input class="txtin" id="ti" placeholder="Ta réponse…" autocomplete="off"><button class="btn p" id="tgo">Valider</button></div>';
  else if (e.ty === 'date') body += '<div class="numin"><input class="txtin" id="ti" inputmode="numeric" style="max-width:150px" placeholder="année" autocomplete="off"><button class="btn p" id="tgo">Valider</button></div>';
  else if (e.ty === 'ord') body += '<p class="small muted">Clique sur les propositions dans le bon ordre.</p>' +
    '<div class="friserow" id="opool">' + shuffle(e.o.map((x, k) => [x, k])).map(p => '<button class="frisecard" data-k="' + p[1] + '">' + esc(p[0]) + '</button>').join('') + '</div>' +
    '<div class="slotrow" id="ochosen" style="min-height:40px"></div>';
  return '<div class="exo" data-id="' + e.id + '">' +
    '<div class="row" style="gap:8px"><span class="pill ' + MAT[e.m].cls + '">' + MAT[e.m].n + '</span>' +
    '<span class="pill t-neutral">' + ['très facile', 'facile', 'moyen', 'difficile', 'costaud', 'expert'][e.d] + '</span>' +
    (S.exos[e.id] && S.exos[e.id].ok ? '<span class="pill t-ok">réussi</span>' : '') +
    '<span class="grow"></span><span class="eyebrow">' + (idx != null ? '#' + (idx + 1) : '') + '</span></div>' +
    body + '<div class="fbz"></div></div>';
}

function wireExo(node, e, onDone) {
  const fbz = $('.fbz', node);
  const done = (good) => {
    const prev = S.exos[e.id] || { ok: false, n: 0 };
    S.exos[e.id] = { ok: prev.ok || good, n: prev.n + 1 };
    S.stats.exoTot++; if (good) S.stats.exoOk++;
    const d = elo(e.d, good, 14);
    if (good) gain(8 + e.d * 4, 5 + e.d * 3);
    commit(); checkSucces();
    fbz.innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '"><b>' + (good ? '✓ Bonne réponse' : '✕ Pas tout à fait') + '</b>' +
      '<span class="why">' + (e.w || '') + ' ' + eloTag(d) + '</span></div>';
    if (good) burstAt(innerWidth / 2, 220, 24);
    if (onDone) onDone(good);
  };

  if (e.ty === 'qcm') {
    $$('.opt', node).forEach(b => b.onclick = () => {
      const k = +b.dataset.k, good = k === e.r;
      $$('.opt', node).forEach((o, j) => { o.disabled = true; if (j === e.r) o.classList.add('good'); else if (j === k) o.classList.add('wrong'); });
      done(good);
    });
  } else if (e.ty === 'vf') {
    const rep = {};
    $$('.vf', node).forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      rep[k] = b.dataset.v === '1';
      $$('.vf', node).forEach(o => { if (+o.dataset.k === k) o.classList.remove('p'); });
      b.classList.add('p');
    });
    $('#vfgo', node).onclick = () => {
      if (Object.keys(rep).length < e.o.length) return toast('Réponds à chaque affirmation.');
      const good = e.r.every((v, k) => rep[k] === v);
      $$('.opt', node).forEach((o, k) => o.classList.add(rep[k] === e.r[k] ? 'good' : 'wrong'));
      $$('.vf', node).forEach(b => b.disabled = true);
      $('#vfgo', node).disabled = true;
      done(good);
    };
  } else if (e.ty === 'txt' || e.ty === 'date') {
    const go = () => {
      const v = $('#ti', node).value.trim();
      if (!v) return;
      const good = e.ty === 'date' ? (parseInt(v, 10) === e.r) : e.r.some(a => norm(a) === norm(v));
      $('#ti', node).disabled = true; $('#tgo', node).disabled = true;
      done(good);
    };
    $('#tgo', node).onclick = go;
    $('#ti', node).onkeydown = ev => { if (ev.key === 'Enter') go(); };
  } else if (e.ty === 'ord') {
    const chosen = [], pool = $('#opool', node), slot = $('#ochosen', node);
    $$('.frisecard', pool).forEach(b => b.onclick = () => {
      b.style.display = 'none'; chosen.push(+b.dataset.k);
      slot.innerHTML = chosen.map((k, p) => '<span class="frisecard on"><span class="yr">' + (p + 1) + '</span>' + esc(e.o[k]) + '</span>').join('');
      if (chosen.length === e.o.length) {
        const good = chosen.every((k, p) => k === p);
        $$('.frisecard', slot).forEach((el, p) => el.classList.add(chosen[p] === p ? 'good' : 'wrong'));
        done(good);
      }
    });
  }
}

/* ============================================================
   ACCUEIL
   ============================================================ */
VIEWS.accueil = function (host) {
  const li = levelInfo(), r = rang(S.elo), rn = rangNext(S.elo);
  const nc = Object.keys(S.cours).length, ne = Object.keys(S.exos).filter(k => S.exos[k].ok).length;
  const prog = m => {
    const l = coursDe(m); const f = l.filter(c => S.cours[c.id]).length;
    return { f: f, t: l.length, p: Math.round(100 * f / l.length) };
  };
  const suite = COURS.find(c => !S.cours[c.id]);
  const dernier = S.brevets.length ? S.brevets[S.brevets.length - 1] : null;

  host.innerHTML =
    '<div class="pagehead"><div class="grow"><div class="eyebrow">Bonjour ' + esc(USER) + '</div>' +
    '<h1>Tableau de bord</h1>' +
    '<p>Histoire, géographie et EMC pour la 3ᵉ. Tout ce qu’il te faut pour le brevet, et de quoi t’amuser en le révisant.</p></div>' +
    '<div class="stack" style="gap:6px;align-items:flex-end">' +
    '<span class="stat elo">' + r.g + ' ' + esc(r.n) + ' · ' + S.elo + '</span>' +
    '<span class="small muted">' + (rn ? (rn.e - S.elo) + ' points avant « ' + esc(rn.n) + ' »' : 'Rang maximal atteint') + '</span></div></div>' +

    '<div class="grid g4" style="margin-bottom:18px">' +
    '<div class="panel center"><div class="eyebrow">Niveau</div><b style="font-family:var(--ff-m);font-size:26px">' + li.n + '</b>' +
    '<div class="bar" style="margin-top:8px"><i style="width:' + li.pct + '%"></i></div></div>' +
    '<div class="panel center"><div class="eyebrow">Chapitres lus</div><b style="font-family:var(--ff-m);font-size:26px">' + nc + ' <span class="muted" style="font-size:15px">/ ' + COURS.length + '</span></b></div>' +
    '<div class="panel center"><div class="eyebrow">Exercices réussis</div><b style="font-family:var(--ff-m);font-size:26px">' + ne + ' <span class="muted" style="font-size:15px">/ ' + EXOS.length + '</span></b></div>' +
    '<div class="panel center"><div class="eyebrow">Série</div><b style="font-family:var(--ff-m);font-size:26px">' + (S.streak.n || 0) + ' <span class="muted" style="font-size:15px">j</span></b>' +
    '<div class="small muted">record : ' + (S.streak.best || 0) + '</div></div>' +
    '</div>' +

    '<div class="grid g2" style="margin-bottom:18px">' +
    ['hist', 'geo', 'emc'].map(m => {
      const p = prog(m);
      return '<a class="panel" href="#/cours/' + m + '" style="text-decoration:none;color:inherit;display:block">' +
        '<div class="row" style="margin-bottom:10px"><span class="pill ' + MAT[m].cls + '">' + MAT[m].ic + ' ' + MAT[m].n + '</span>' +
        '<span class="grow"></span><span class="mono small muted">' + p.f + '/' + p.t + '</span></div>' +
        '<div class="bar ' + m + '"><i style="width:' + p.p + '%"></i></div>' +
        '<p class="small muted" style="margin-top:8px;font-family:var(--ff-b)">' + p.p + ' % du programme parcouru</p></a>';
    }).join('') +
    '</div>' +

    '<div class="grid g2">' +
    '<div class="panel"><div class="eyebrow">Continuer</div>' +
    (suite ? '<h3 style="margin:8px 0 4px">' + esc(suite.t) + '</h3><p class="small muted" style="font-family:var(--ff-b);margin-bottom:12px">' + esc(suite.d) + '</p>' +
      '<button class="btn p" id="go-suite">Lire ce chapitre</button>'
      : '<p style="margin:10px 0;font-family:var(--ff-b)">Tu as lu les ' + COURS.length + ' chapitres. Passe aux annales et aux mini-jeux.</p>' +
      '<button class="btn p" onclick="go(\'brevet\')">Brevet blanc</button>') + '</div>' +

    '<div class="panel"><div class="eyebrow">Au programme aujourd’hui</div>' +
    '<div class="stack" style="gap:8px;margin-top:10px">' +
    '<button class="btn wide" onclick="go(\'exos\')">✎ Une série d’exercices</button>' +
    '<button class="btn wide" onclick="go(\'jeux\')">◈ Un mini-jeu</button>' +
    '<button class="btn wide" onclick="go(\'tirage\')">◉ Un tirage de fiche</button>' +
    '<button class="btn wide" onclick="go(\'reperes\')">⌖ Réviser les repères</button>' +
    '</div></div></div>' +

    (dernier ? '<div class="panel" style="margin-top:18px"><div class="eyebrow">Dernier brevet blanc</div>' +
      '<div class="row" style="margin-top:8px"><b style="font-size:22px;font-family:var(--ff-m)">' + dernier.note + ' / 50</b>' +
      '<span class="muted small">' + esc((BREVETS.find(b => b.id === dernier.id) || {}).t || '') + '</span>' +
      '<span class="grow"></span><button class="btn sm" onclick="go(\'brevet\')">Recommencer</button></div></div>' : '');

  if (suite) $('#go-suite').onclick = () => go('cours/' + suite.m + '/' + suite.id);
};

/* ============================================================
   COURS
   ============================================================ */
VIEWS.cours = function (host, args) {
  if (args[1]) return lecteur(host, args[1]);
  const m = args[0] && MAT[args[0]] ? args[0] : null;
  const list = m ? coursDe(m) : COURS;
  const themes = [];
  list.forEach(c => { if (!themes.some(t => t[0] === c.th)) themes.push([c.th, []]); themes.find(t => t[0] === c.th)[1].push(c); });

  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Cours</div>' +
    '<h1>' + (m ? MAT[m].n : 'Tout le programme') + '</h1>' +
    '<p>' + list.filter(c => S.cours[c.id]).length + ' chapitre(s) terminé(s) sur ' + list.length + '. Chaque chapitre contient des anecdotes, des cartes et un « à retenir ».</p></div></div>' +
    '<div class="tabs" style="margin-bottom:18px">' +
    '<button data-m="" class="' + (m ? '' : 'on') + '">Tout</button>' +
    ['hist', 'geo', 'emc'].map(k => '<button data-m="' + k + '" class="' + (m === k ? 'on' : '') + '">' + MAT[k].n + '</button>').join('') +
    '</div>' +
    themes.map(t => '<div class="navsec" style="padding-left:0">' + esc(t[0]) + '</div><div class="grid" style="margin-bottom:16px">' +
      t[1].map((c, k) => '<button class="chap' + (S.cours[c.id] ? ' is-done' : '') + '" data-id="' + c.id + '">' +
        '<span class="num">' + c.id.toUpperCase() + '</span>' +
        '<span style="flex:1"><h3>' + esc(c.t) + '</h3><p>' + esc(c.d) + '</p>' +
        '<span class="row" style="gap:6px;margin-top:6px"><span class="pill ' + MAT[c.m].cls + '">' + MAT[c.m].n + '</span>' +
        '<span class="pill t-neutral">' + exosDe(c.id).length + ' exercices</span></span></span>' +
        (S.cours[c.id] ? '<span class="done">✓</span>' : '') + '</button>').join('') + '</div>').join('');

  $$('[data-m]').forEach(b => b.onclick = () => go('cours' + (b.dataset.m ? '/' + b.dataset.m : '')));
  $$('.chap').forEach(b => b.onclick = () => { const c = coursById(b.dataset.id); go('cours/' + c.m + '/' + c.id); });
};

function lecteur(host, id) {
  const c = coursById(id);
  if (!c) { host.innerHTML = '<div class="panel">Chapitre introuvable.</div>'; return; }
  const same = coursDe(c.m), pos = same.indexOf(c);
  const acc = c.m === 'hist' ? 'var(--hist)' : c.m === 'geo' ? 'var(--geo)' : 'var(--emc)';
  const titres = c.sec.filter(s => s[0] === 'h').map(s => s[1]);

  host.innerHTML = '<div style="--acc:' + acc + '">' +
    '<div class="pagehead"><div class="grow">' +
    '<div class="row" style="gap:8px;margin-bottom:6px"><span class="pill ' + MAT[c.m].cls + '">' + MAT[c.m].n + '</span>' +
    '<span class="eyebrow">' + esc(c.th) + '</span></div>' +
    '<h1>' + esc(c.t) + '</h1><p>' + esc(c.d) + '</p>' +
    '<div class="row" style="gap:6px;margin-top:10px">' + (c.mo || []).map(k => '<span class="pill t-neutral">' + esc(k) + '</span>').join('') + '</div>' +
    '</div><button class="btn ghost" id="back">← Tous les cours</button></div>' +
    (titres.length > 2 ? '<div class="panel" style="margin-bottom:18px"><div class="eyebrow" style="margin-bottom:6px">Sommaire</div>' +
      titres.map(t => '<a href="#s' + hash(t) + '" style="display:inline-block;margin:3px 10px 3px 0;font-size:13.5px">' + esc(t) + '</a>').join('') + '</div>' : '') +
    '<div class="lesson">' + c.sec.map(secHTML).join('') + '</div>' +
    '<div class="lessnav">' +
    (pos > 0 ? '<button class="btn" id="prev">← ' + esc(same[pos - 1].t) + '</button>' : '') +
    '<span class="grow"></span>' +
    (S.cours[c.id] ? '<span class="pill t-ok">chapitre terminé</span>' : '<button class="btn p" id="done">J’ai lu ce chapitre</button>') +
    (pos < same.length - 1 ? '<button class="btn" id="next">' + esc(same[pos + 1].t) + ' →</button>' : '') +
    '</div>' +
    (exosDe(c.id).length ? '<div class="panel" style="margin-top:22px"><div class="row"><b>S’entraîner sur ce chapitre</b>' +
      '<span class="grow"></span><span class="small muted">' + exosDe(c.id).length + ' exercices</span></div>' +
      '<button class="btn p" id="toexos" style="margin-top:10px">Faire les exercices</button></div>' : '') +
    '</div>';

  $('#back').onclick = () => go('cours/' + c.m);
  if ($('#prev')) $('#prev').onclick = () => go('cours/' + c.m + '/' + same[pos - 1].id);
  if ($('#next')) $('#next').onclick = () => go('cours/' + c.m + '/' + same[pos + 1].id);
  if ($('#toexos')) $('#toexos').onclick = () => go('exos/' + c.id);
  if ($('#done')) $('#done').onclick = ev => {
    S.cours[c.id] = Date.now(); S.stats.lecons++;
    gain(35, 25, ev); commit(); checkSucces();
    toast('Chapitre terminé — +35 δ', 'win');
    route();
  };
}

/* ============================================================
   EXERCICES
   ============================================================ */
VIEWS.exos = function (host, args) {
  const filtre = args[0] || '';
  let list;
  if (filtre && coursById(filtre)) list = exosDe(filtre);
  else if (MAT[filtre]) list = EXOS.filter(e => e.m === filtre);
  else list = EXOS;

  const titre = coursById(filtre) ? coursById(filtre).t : (MAT[filtre] ? MAT[filtre].n : 'Tous les exercices');
  const ok = list.filter(e => S.exos[e.id] && S.exos[e.id].ok).length;

  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Exercices</div>' +
    '<h1>' + esc(titre) + '</h1><p>' + ok + ' réussi(s) sur ' + list.length + '. Chaque bonne réponse rapporte des δ, de l’XP et des points Elo.</p></div>' +
    '<div class="stack" style="gap:8px;align-items:flex-end">' +
    '<button class="btn p" id="serie">Série aléatoire de 10</button>' +
    (filtre ? '<button class="btn sm" id="all">Voir tous les exercices</button>' : '') + '</div></div>' +
    '<div class="tabs" style="margin-bottom:18px"><button data-f="" class="' + (filtre ? '' : 'on') + '">Tout</button>' +
    ['hist', 'geo', 'emc'].map(k => '<button data-f="' + k + '" class="' + (filtre === k ? 'on' : '') + '">' + MAT[k].n + '</button>').join('') + '</div>' +
    '<div class="grid" id="lst"></div>';

  const lst = $('#lst');
  list.forEach((e, k) => {
    const d = document.createElement('div');
    d.innerHTML = exoHTML(e, k);
    const node = d.firstChild; lst.appendChild(node); wireExo(node, e);
  });
  $$('[data-f]').forEach(b => b.onclick = () => go('exos' + (b.dataset.f ? '/' + b.dataset.f : '')));
  if ($('#all')) $('#all').onclick = () => go('exos');
  $('#serie').onclick = () => serieExos(host, shuffle(list).slice(0, 10));
};

function serieExos(host, list) {
  let i = 0, ok = 0;
  function draw() {
    if (i >= list.length) {
      host.innerHTML = '<div class="board center"><div class="eyebrow">Série terminée</div>' +
        '<div class="score" style="margin:12px 0;color:' + (ok >= list.length * .6 ? 'var(--ok)' : 'var(--bad)') + '">' + ok + ' / ' + list.length + '</div>' +
        '<div class="row" style="justify-content:center"><button class="btn p" id="again">Nouvelle série</button>' +
        '<button class="btn" id="back">Retour</button></div></div>';
      $('#again').onclick = () => serieExos(host, shuffle(EXOS).slice(0, 10));
      $('#back').onclick = () => go('exos');
      if (ok >= list.length * .8) burstAt(innerWidth / 2, 200, 60);
      return;
    }
    const e = list[i];
    host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Série d’exercices</div>' +
      '<h1>Question ' + (i + 1) + ' / ' + list.length + '</h1></div>' +
      '<div class="bar" style="width:180px"><i style="width:' + Math.round(100 * i / list.length) + '%"></i></div></div>' +
      '<div id="slot"></div>';
    const d = document.createElement('div'); d.innerHTML = exoHTML(e);
    const node = d.firstChild; $('#slot').appendChild(node);
    wireExo(node, e, good => {
      if (good) ok++;
      const b = document.createElement('button');
      b.className = 'btn p'; b.textContent = 'Question suivante'; b.style.marginTop = '12px';
      b.onclick = () => { i++; draw(); };
      $('.fbz', node).appendChild(b);
    });
  }
  draw();
}

/* ============================================================
   REPERES CHRONOLOGIQUES
   ============================================================ */
VIEWS.reperes = function (host) {
  const groupes = [
    ['Avant 1914', POOL_DATES.filter(d => d[0] < 1914)],
    ['1914-1945 : les guerres totales', POOL_DATES.filter(d => d[0] >= 1914 && d[0] <= 1945)],
    ['1945-1991 : le monde bipolaire', POOL_DATES.filter(d => d[0] > 1945 && d[0] <= 1991)],
    ['Depuis 1991', POOL_DATES.filter(d => d[0] > 1991)]
  ];
  const vus = Object.keys(S.reperes || {}).length;

  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Repères</div>' +
    '<h1>Repères & dates</h1><p>Les ' + POOL_DATES.length + ' repères attendus au brevet. Clique sur une carte pour la retourner : coche celles que tu connais vraiment.</p></div>' +
    '<div class="stack" style="align-items:flex-end;gap:6px"><span class="stat">' + vus + ' / ' + POOL_DATES.length + ' validés</span>' +
    '<button class="btn p" id="quiz">Se tester</button></div></div>' +
    '<div class="figure" style="margin-bottom:24px">' + figSVG([
      ['frise', 20, 96, 420, 1900, 2030, [
        [1914, '1914', 'h', 1], [1929, '1929', 'w', -1], [1939, '1939', 'h', 1], [1945, '1945', 'b', -1],
        [1958, '1958', 'g', 1], [1962, '1962', 'e', -1], [1975, '1975', 'g', 1], [1989, '1989', 'o', -1],
        [1992, '1992', 'b', 1], [2002, '2002', 'c', -1], [2020, '2020', 'k', 1]
      ], {
        graduation: 10, hauteur: 18,
        periodes: [[1914, 1945, 'guerres totales', 'h'], [1947, 1991, 'guerre froide', 'b'], [1991, 2025, 'monde multipolaire', 'g']]
      }]
    ], 460, 150) + '</div>' +
    groupes.map(g => '<div class="navsec" style="padding-left:0">' + esc(g[0]) + '</div>' +
      '<div class="grid g3" style="margin-bottom:16px">' + g[1].map(d => {
        const k = d[0] + '|' + d[1];
        const on = (S.reperes || {})[k];
        return '<button class="chap' + (on ? ' is-done' : '') + '" data-k="' + esc(k) + '" style="flex-direction:column;align-items:flex-start;gap:4px">' +
          '<span class="mono" style="font-size:19px;font-weight:600;color:var(--brand)">' + d[0] + '</span>' +
          '<span style="font-family:var(--ff-b);font-size:14px">' + esc(d[1]) + '</span>' +
          '<span class="small muted">' + (on ? '✓ validé' : 'clique pour valider') + '</span></button>';
      }).join('') + '</div>').join('');

  $$('[data-k]').forEach(b => b.onclick = ev => {
    S.reperes = S.reperes || {};
    const k = b.dataset.k;
    if (S.reperes[k]) delete S.reperes[k];
    else { S.reperes[k] = 1; gain(4, 3, ev); }
    commit(); checkSucces(); route();
  });
  $('#quiz').onclick = () => runGame(host, jeuById('j-date'));
};

/* ============================================================
   ATLAS
   ============================================================ */
const ATLAS = [
  {
    id: 'a-fr-reg', n: 'Les 13 régions de France métropolitaine', m: 'geo',
    d: 'Le fond de carte de base, à connaître pour tout croquis sur la France.',
    ops: [['map', 'FR', 34, 8, 1.72, { base: 'terre', trait: 'i', tw: 1.3, noms: true, ns: 6.6 }], ['rose', 20, 24, 10]],
    w: 218, h: 184
  },
  {
    id: 'a-fr-reseaux', n: 'Les réseaux urbains français', m: 'geo',
    d: 'Sept systèmes de villes qui structurent le territoire, du réseau polarisé parisien au chapelet méditerranéen.',
    ops: [
      ['map', 'FR', 44, 8, 2.05, { base: 'terre', trait: 'l', tw: .9 }],
      /* les liaisons entre villes d'un meme reseau */
      ['bande', 'FR', 44, 8, 2.05, ['lehavre', 'rouen', 'paris'], '#D9A404', 5, '', .55],
      ['bande', 'FR', 44, 8, 2.05, ['caen', 'rouen'], '#D9A404', 5, '', .55],
      ['bande', 'FR', 44, 8, 2.05, ['amiens', 'paris'], '#D9A404', 5, '', .55],
      ['bande', 'FR', 44, 8, 2.05, ['reims', 'paris'], '#D9A404', 5, '', .55],
      ['bande', 'FR', 44, 8, 2.05, ['paris', 'orleans', 'tours'], '#D9A404', 5, '', .55],
      ['bande', 'FR', 44, 8, 2.05, ['dunkerque', 'lille'], '#2BA3C7', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['calais', 'lille'], '#2BA3C7', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['lille', 'valenciennes'], '#2BA3C7', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['metz', 'nancy'], '#2A3F9E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['metz', 'strasbourg'], '#2A3F9E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['nancy', 'strasbourg'], '#2A3F9E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['brest', 'rennes', 'angers', 'nantes'], '#D6453C', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['stnazaire', 'nantes', 'poitiers'], '#D6453C', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['rennes', 'nantes'], '#D6453C', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['bayonne', 'bordeaux', 'toulouse'], '#2E9E5B', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['larochelle', 'bordeaux'], '#2E9E5B', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['limoges', 'bordeaux'], '#2E9E5B', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['toulouse', 'perpignan'], '#2E9E5B', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['clermont', 'lyon', 'annecy'], '#C4479E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['dijon', 'lyon', 'grenoble'], '#C4479E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['stetienne', 'lyon', 'valence'], '#C4479E', 5, '', .6],
      ['bande', 'FR', 44, 8, 2.05, ['perpignan', 'montpellier', 'nimes', 'avignon', 'marseille', 'toulon', 'nice'], '#E8801F', 5, '', .6],
      /* les villes, dimensionnees selon leur poids */
      ['ancre', 'FR', 44, 8, 2.05, [
        ['paris', 'metropole', '#D9A404', 9, 'Paris', 'middle', 0, -13, 8],
        ['rouen', 'ville', '#D9A404', 5, 'Rouen', 'start', null, null, 6.6],
        ['lehavre', 'ville', '#D9A404', 5, 'Le Havre', 'end', null, null, 6.6],
        ['caen', 'ville', '#D9A404', 5, 'Caen', 'end', null, null, 6.6],
        ['amiens', 'ville', '#D9A404', 5, 'Amiens', 'end', null, -4, 6.6],
        ['reims', 'ville', '#D9A404', 5, 'Reims', 'start', null, 5, 6.6],
        ['orleans', 'ville', '#D9A404', 5, 'Orléans', 'start', null, 5, 6.6],
        ['tours', 'ville', '#D9A404', 5, 'Tours', 'start', null, null, 6.6],
        ['lille', 'metropole', '#2BA3C7', 6.5, 'Lille', 'start', null, null, 7],
        ['dunkerque', 'ville', '#2BA3C7', 4.5, 'Dunkerque', 'end', null, -3, 6.6],
        ['calais', 'ville', '#2BA3C7', 4.5, 'Calais', 'end', null, 6, 6.6],
        ['valenciennes', 'ville', '#2BA3C7', 4.5, 'Valenciennes', 'start', null, 4, 6.6],
        ['strasbourg', 'metropole', '#2A3F9E', 6, 'Strasbourg', 'start', null, null, 7],
        ['metz', 'ville', '#2A3F9E', 5, 'Metz', 'start', null, -3, 6.6],
        ['nancy', 'ville', '#2A3F9E', 5, 'Nancy', 'end', null, 8, 6.6],
        ['nantes', 'metropole', '#D6453C', 6.5, 'Nantes', 'end', null, -3, 7],
        ['rennes', 'metropole', '#D6453C', 6, 'Rennes', 'end', null, -3, 7],
        ['brest', 'ville', '#D6453C', 5, 'Brest', 'end', null, null, 6.6],
        ['stnazaire', 'ville', '#D6453C', 4.5, 'St-Nazaire', 'end', null, 9, 6.6],
        ['angers', 'ville', '#D6453C', 5, 'Angers', 'end', null, -4, 6.6],
        ['poitiers', 'ville', '#D6453C', 5, 'Poitiers', 'start', null, null, 6.6],
        ['bordeaux', 'metropole', '#2E9E5B', 6.5, 'Bordeaux', 'end', null, null, 7],
        ['toulouse', 'metropole', '#2E9E5B', 6.5, 'Toulouse', 'middle', 0, -10, 7],
        ['bayonne', 'ville', '#2E9E5B', 4.5, 'Bayonne', 'end', null, null, 6.6],
        ['larochelle', 'ville', '#2E9E5B', 4.5, 'La Rochelle', 'end', null, null, 6.6],
        ['limoges', 'ville', '#2E9E5B', 5, 'Limoges', 'start', null, null, 6.6],
        ['perpignan', 'ville', '#2E9E5B', 4.5, 'Perpignan', 'end', null, 9, 6.6],
        ['lyon', 'metropole', '#C4479E', 8, 'Lyon', 'middle', 0, -12, 8],
        ['stetienne', 'ville', '#C4479E', 5, 'St-Étienne', 'end', null, 8, 6.6],
        ['grenoble', 'ville', '#C4479E', 5, 'Grenoble', 'start', null, 4, 6.6],
        ['annecy', 'ville', '#C4479E', 4.5, 'Annecy', 'start', null, 4, 6.6],
        ['clermont', 'ville', '#C4479E', 5, 'Clermont-Fd', 'end', null, null, 6.6],
        ['dijon', 'ville', '#C4479E', 5, 'Dijon', 'start', null, -3, 6.6],
        ['valence', 'ville', '#C4479E', 4.5, 'Valence', 'end', null, 4, 6.6],
        ['marseille', 'metropole', '#E8801F', 7, 'Marseille', 'end', null, 10, 7],
        ['montpellier', 'ville', '#E8801F', 5, 'Montpellier', 'end', null, -4, 6.6],
        ['nimes', 'ville', '#E8801F', 4.5, 'Nîmes', 'end', null, 8, 6.6],
        ['avignon', 'ville', '#E8801F', 4.5, 'Avignon', 'start', null, -3, 6.6],
        ['toulon', 'ville', '#E8801F', 4.5, 'Toulon', 'start', null, 9, 6.6],
        ['nice', 'ville', '#E8801F', 5, 'Nice', 'start', null, -3, 6.6]
      ]],
      ['key', 258, 20, [
        ['metropole', '#D9A404', 'Polarisé intégral (Paris)'],
        ['metropole', '#2E9E5B', 'Bipolaire Bordeaux-Toulouse'],
        ['metropole', '#D6453C', 'Articulé du Grand Ouest'],
        ['metropole', '#2A3F9E', 'Articulé du Nord-Est'],
        ['metropole', '#C4479E', 'Articulé lyonnais'],
        ['metropole', '#2BA3C7', 'Articulé lillois'],
        ['metropole', '#E8801F', 'Linéaire méditerranéen']
      ], 'Les sept réseaux urbains'],
      ['rose', 268, 150, 11]
    ],
    w: 428, h: 214
  },
  {
    id: 'a-fr-urbain', n: 'Le réseau urbain et la macrocéphalie parisienne', m: 'geo',
    d: 'Métropoles, dynamiques régionales et domination de l’aire parisienne.',
    ops: [
      ['map', 'FR', 38, 8, 1.6, {
        base: 'terre', trait: 'l',
        fill: { idf: 'k:34', ara: 'h:22', pac: 'h:22', occ: 'g:18', naq: 'g:18', pdl: 'g:18', bre: 'g:18', hdf: 'b:16', ge: 'b:16', nor: 'b:16', cvl: 'b:16', bfc: 'b:16', cor: 'b:16' }
      }],
      ['ancre', 'FR', 38, 8, 1.6, [
        ['paris', 'metropole', 'k', 9, 'Paris 13,1 M', 'start', null, -6, 7.5],
        ['lyon', 'metropole', 'h', 6, 'Lyon 2,3 M', 'start', null, null, 7],
        ['marseille', 'metropole', 'h', 5.5, 'Marseille 1,8 M', 'start', null, 6, 7],
        ['toulouse', 'metropole', 'g', 5, 'Toulouse 1,5 M', 'end', null, null, 7],
        ['bordeaux', 'metropole', 'g', 5, 'Bordeaux 1,3 M', 'end', null, null, 7],
        ['lille', 'metropole', 'b', 5, 'Lille 1,5 M', 'start', null, null, 7],
        ['nantes', 'metropole', 'g', 4.6, 'Nantes 1,0 M', 'end', null, null, 7],
        ['rennes', 'metropole', 'g', 4.2, 'Rennes', 'end', null, -4, 6.8],
        ['strasbourg', 'metropole', 'b', 4.2, 'Strasbourg', 'start', null, null, 6.8],
        ['montpellier', 'metropole', 'g', 4.2, 'Montpellier', 'end', null, 6, 6.8]
      ]],
      ['key', 214, 22, [
        ['metropole', 'k', 'Aire de Paris (13,1 M hab.)'],
        ['metropole', 'h', 'Métropoles > 1,5 M hab.'],
        ['metropole', 'g', 'Métropoles régionales dynamiques'],
        ['f', 'g:18', 'Régions attractives (Sud, Ouest)'],
        ['f', 'b:16', 'Croissance faible ou nulle']
      ], 'Le réseau urbain'],
      ['rose', 228, 150, 10]
    ],
    w: 392, h: 168
  },
  {
    id: 'a-fr-prod', n: 'Les espaces productifs', m: 'geo',
    d: 'Industrie, technopôles, zones industrialo-portuaires et reconversions.',
    ops: [
      ['map', 'FR', 38, 8, 1.6, { base: 'terre', trait: 'l', hatch: { hdf: 'm', ge: 'm' } }],
      ['ancre', 'FR', 38, 8, 1.6, [
        ['toulouse', 'usine', 'g', 6, 'Toulouse', 'end', null, null, 7],
        ['grenoble', 'usine', 'g', 5.5, 'Grenoble', 'start', null, null, 7],
        ['sophia', 'usine', 'g', 5.5, 'Sophia-Antipolis', 'start', null, 8, 7],
        ['saclay', 'usine', 'b', 5, 'Saclay', 'start', null, -5, 7],
        ['lyon', 'usine', 'g', 5.5, 'Lyon', 'start', null, null, 7],
        ['fos', 'port', 'b', 6, 'Marseille-Fos', 'end', null, 8, 7],
        ['lehavre', 'port', 'b', 6, 'Le Havre', 'end', null, null, 7],
        ['dunkerque', 'port', 'b', 5.5, 'Dunkerque', 'start', null, null, 7],
        ['bordeaux', 'port', 'b', 5, 'Bordeaux', 'end', null, null, 7],
        ['lens', 'none', 'm', 0, 'bassin minier', 'end', -4, -8, 6.8],
        ['creutzwald', 'none', 'm', 0, 'Lorraine', 'start', 4, -8, 6.8]
      ]],
      ['key', 182, 22, [
        ['h', 'm', 'Anciennes régions industrielles'],
        ['usine', 'g', 'Technopôles et industries de pointe'],
        ['port', 'b', 'Zones industrialo-portuaires']
      ], 'Espaces productifs'],
      ['rose', 196, 150, 10]
    ],
    w: 372, h: 178
  },
  {
    id: 'a-fr-vichy', n: 'La France sous l’Occupation', m: 'hist',
    d: 'Zone occupée, zone libre, Alsace-Moselle annexée.',
    ops: [
      ['map', 'FR', 38, 8, 1.6, { base: 'terre', mer: false, fill: { hdf: 'k:30', nor: 'h:26', bre: 'h:26', pdl: 'h:26', cvl: 'h:26', idf: 'h:26', ge: 'e:30', naq: 'h:26', occ: 'b:20', ara: 'b:20', pac: 'b:20', bfc: 'h:26', cor: 'b:20' } }],
      ['ancre', 'FR', 38, 8, 1.6, [
        ['vichy', 'etoile', 'i', 5, 'Vichy', 'start', null, null, 7.5],
        ['paris', 'metropole', 'i', 4.5, 'Paris', 'end', null, null, 7.5]
      ]],
      ['key', 182, 22, [
        ['f', 'h:26', 'Zone occupée par l’Allemagne'],
        ['f', 'b:20', 'Zone libre jusqu’en nov. 1942'],
        ['f', 'e:30', 'Alsace-Moselle annexée au Reich'],
        ['f', 'k:30', 'Nord rattaché au commandement de Bruxelles']
      ], 'France 1940-1942']
    ],
    w: 402, h: 166
  },
  {
    id: 'a-eur-ue', n: 'Les élargissements de l’Union européenne', m: 'geo',
    d: 'De six à vingt-sept, en sept vagues.',
    ops: [
      ['map', 'EUR', 6, 6, 1.6, {
        base: 'terre', trait: 'l',
        fill: { fr: 'b:34', de: 'b:34', it: 'b:34', be: 'b:34', nl: 'b:34', lu: 'b:34', dk: 'g:28', ie: 'g:28', gr: 'w:26', es: 'w:26', pt: 'w:26', at: 'e:26', se: 'e:26', fi: 'e:26', pl: 'h:26', cz: 'h:26', sk: 'h:26', hu: 'h:26', si: 'h:26', ee: 'h:26', lv: 'h:26', lt: 'h:26', mt: 'w:26', cy: 'h:26', ro: 'k:20', bg: 'k:20', hr: 'k:20', uk: 'm:16' }
      }],
      ['key', 168, 20, [
        ['f', 'b:34', '1957 : les six fondateurs'],
        ['f', 'g:28', '1973 : Danemark, Irlande, R.-U.'],
        ['f', 'w:26', '1981-1986 : Grèce, Espagne, Portugal'],
        ['f', 'e:26', '1995 : Autriche, Suède, Finlande'],
        ['f', 'h:26', '2004 : élargissement à l’Est'],
        ['f', 'k:20', '2007-2013 : Roumanie, Bulgarie, Croatie'],
        ['f', 'm:16', 'Sorti de l’UE (Brexit, 2020)']
      ], 'Les élargissements successifs']
    ],
    w: 376, h: 172
  },
  {
    id: 'a-eur-froide', n: 'L’Europe de la guerre froide', m: 'hist',
    d: 'Les deux blocs, les neutres et le rideau de fer.',
    ops: [
      ['map', 'EUR', 6, 6, 1.6, {
        base: 'terre', trait: 'l',
        fill: { fr: 'b:26', uk: 'b:26', it: 'b:26', es: 'm:14', pt: 'm:14', be: 'b:26', nl: 'b:26', lu: 'b:26', de: 'b:26', dk: 'b:26', no: 'b:26', is: 'b:26', gr: 'b:26', tr: 'b:26', ru: 'h:30', pl: 'h:30', cz: 'h:30', sk: 'h:30', hu: 'h:30', ro: 'h:30', bg: 'h:30', by: 'h:30', ua: 'h:30', ee: 'h:30', lv: 'h:30', lt: 'h:30', md: 'h:30', al: 'h:24', rs: 'w:22', hr: 'w:22', ba: 'w:22', si: 'w:22', mk: 'w:22', me: 'w:22', at: 'g:18', ch: 'g:18', se: 'g:18', fi: 'g:18', ie: 'g:18' }
      }],
      ['bande', 'EUR', 6, 6, 1.6, ['stettin', 'hof', 'passau', 'vienne', 'trieste'], 'k', 3.4, '', .95],
      ['ancre', 'EUR', 6, 6, 1.6, [
        ['berlin', 'etoile', 'k', 5, 'Berlin', 'start', null, null, 7.5],
        ['stettin', 'none', 'k', 0, 'RIDEAU DE FER', 'start', 6, -6, 8],
        ['moscou', 'capitale', 'i', 4.5, 'Moscou', 'start', null, null, 7.5]
      ]],
      ['key', 168, 20, [
        ['f', 'b:26', 'Bloc de l’Ouest (OTAN)'],
        ['f', 'h:30', 'Bloc de l’Est (pacte de Varsovie)'],
        ['f', 'g:18', 'Pays neutres'],
        ['f', 'w:22', 'Yougoslavie non alignée'],
        ['l', 'k', 'Rideau de fer']
      ], 'Europe 1947-1989']
    ],
    w: 350, h: 172
  },
  {
    id: 'a-monde-om', n: 'La France dans le monde', m: 'geo',
    d: 'Territoires ultramarins et zone économique exclusive.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.4, { base: 'terre', fill: { eu: 'b:26' } }],
      ['flux', 'MONDE', 6, 10, 2.4, [
        ['paris', 'dakar', 12, 'g', ''], ['paris', 'noumea', -40, 'g', ''], ['paris', 'guadeloupe', 16, 'g', '']
      ]],
      ['ancre', 'MONDE', 6, 10, 2.4, [
        ['paris', 'capitale', 'b', 5, 'Paris', 'start', null, -5, 7.5],
        ['guadeloupe', 'carre', 'k', 4.5, 'Antilles', 'end', null, -5, 7],
        ['guyane', 'carre', 'k', 4.5, 'Guyane', 'start', null, 8, 7],
        ['reunion', 'carre', 'k', 4.5, 'La Réunion', 'start', null, 7, 7],
        ['mayotte', 'carre', 'k', 4, 'Mayotte', 'end', null, -6, 7],
        ['noumea', 'carre', 'k', 4.5, 'N.-Calédonie', 'end', null, null, 7],
        ['papeete', 'carre', 'k', 4.5, 'Polynésie', 'start', null, null, 7],
        ['kourou', 'etoile', 'c', 5]
      ]],
      ['key', 6, 140, [
        ['f', 'b:26', 'France métropolitaine'],
        ['carre', 'k', 'Territoires ultramarins et ZEE associées'],
        ['a', 'g', 'Rayonnement (francophonie)'],
        ['etoile', 'c', 'Centre spatial de Kourou']
      ], 'Une présence sur tous les océans']
    ],
    w: 252, h: 216
  },
  {
    id: 'a-monde-guerre', n: 'Le monde en 1942', m: 'hist',
    d: 'L’extension maximale de l’Axe et du Japon.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.4, { base: 'terre', fill: { eu: 'h:34', as: 'w:26', na: 'b:26', af: 'g:18', oc: 'b:18', sa: 'm:14' } }],
      ['ancre', 'MONDE', 6, 10, 2.4, [
        ['berlin', 'carre', 'h', 4.5, 'Axe', 'start', null, -6, 7.5],
        ['tokyo', 'carre', 'w', 4.5, 'Japon', 'start', null, null, 7.5],
        ['washington', 'capitale', 'b', 5, 'États-Unis', 'end', null, null, 7.5],
        ['moscou', 'capitale', 'b', 5, 'URSS', 'start', null, -4, 7.5],
        ['londres', 'capitale', 'b', 4, 'R.-U.', 'end', null, 8, 7.5],
        ['stalingrad', 'bataille', 'k', 5, 'Stalingrad', 'start', null, 10, 7],
        ['pearlharbor', 'bataille', 'k', 5, 'Pearl Harbor', 'start', null, 9, 7],
        ['hiroshima', 'nuke', 'k', 5]
      ]],
      ['key', 6, 140, [
        ['f', 'h:34', 'Axe et territoires occupés (1942)'],
        ['f', 'w:26', 'Expansion japonaise'],
        ['f', 'b:26', 'Alliés'],
        ['bataille', 'k', 'Grandes batailles']
      ], 'Le monde en guerre']
    ],
    w: 252, h: 216
  },
  {
    id: 'a-eur-1914', n: 'L’Europe en 1914', m: 'hist',
    d: 'Les deux systèmes d’alliances qui vont transformer une querelle balkanique en guerre mondiale.',
    ops: [
      ['map', 'EUR', 4, 6, 1.62, {
        base: 'terre', trait: 'l',
        fill: { fr: 'b:30', uk: 'b:30', ru: 'b:30', rs: 'b:30', me: 'b:30', be: 'b:22',
                de: 'h:30', at: 'h:30', hu: 'h:30', cz: 'h:26', sk: 'h:26', hr: 'h:26', si: 'h:26', ba: 'h:26', it: 'h:22', tr: 'h:30', bg: 'h:26',
                es: 'g:18', pt: 'g:18', ch: 'g:18', nl: 'g:18', dk: 'g:18', no: 'g:18', se: 'g:18', gr: 'g:18', ro: 'g:18', al: 'g:18' }
      }],
      ['ancre', 'EUR', 4, 6, 1.62, [
        ['sarajevo', 'etoile', 'k', 5, 'Sarajevo', 'start', null, null, 7.5],
        ['paris', 'capitale', 'i', 4, 'Paris', 'end', null, null, 7],
        ['berlin', 'capitale', 'i', 4, 'Berlin', 'start', null, null, 7],
        ['vienne', 'capitale', 'i', 4, 'Vienne', 'start', null, 6, 7],
        ['moscou', 'capitale', 'i', 4, 'Moscou', 'start', null, null, 7]
      ]],
      ['key', 172, 18, [
        ['f', 'b:30', 'Triple-Entente et allliés'],
        ['f', 'h:30', 'Triple-Alliance et alliés'],
        ['f', 'g:18', 'Neutres en 1914'],
        ['etoile', 'k', 'Attentat de Sarajevo']
      ], 'Les blocs de 1914'],
      ['rose', 300, 150, 9]
    ],
    w: 334, h: 176
  },
  {
    id: 'a-fr-front14', n: 'Le front de 1914-1918', m: 'hist',
    d: 'Sept cents kilomètres de tranchées figes de la mer du Nord à la Suisse, et les grandes batailles.',
    ops: [
      ['map', 'FR', 6, 8, 1.62, { base: 'terre', trait: 'l' }],
      ['bande', 'FR', 6, 8, 1.62, ['dunkerque', 'amiens', 'reims', 'verdun', 'nancy', 'belfort'], 'k', 4, '', .9],
      ['ancre', 'FR', 6, 8, 1.62, [
        ['verdun', 'bataille', 'k', 5.5, 'Verdun 1916', 'start', null, null, 7.5],
        ['amiens', 'bataille', 'k', 5, 'la Somme 1916', 'end', null, -5, 7.5],
        ['reims', 'bataille', 'k', 5, 'Chemin des Dames 1917', 'end', null, 8, 7.5],
        ['paris', 'metropole', 'i', 5, 'Paris', 'end', null, null, 7.5],
        ['barleduc', 'ville', 'o', 4, 'Bar-le-Duc', 'end', null, 7, 7],
        ['dunkerque', 'none', 'k', 0, 'mer du Nord', 'start', 4, -6, 7],
        ['belfort', 'none', 'k', 0, 'Suisse', 'start', 5, 4, 7]
      ]],
      ['flux', 'FR', 6, 8, 1.62, [['barleduc', 'verdun', 8, 'o', 'Voie sacrée']]],
      ['key', 180, 22, [
        ['l', 'k', 'Ligne de front (1915-1917)'],
        ['bataille', 'k', 'Grandes batailles'],
        ['a', 'o', 'Ravitaillement de Verdun'],
        ['metropole', 'i', 'Capitale']
      ], 'Le front occidental'],
      ['rose', 312, 152, 9]
    ],
    w: 346, h: 178
  },
  {
    id: 'a-monde-colonies', n: 'Les empires coloniaux en 1914', m: 'hist',
    d: 'L’Europe contrôle alors près de 85 % des terres émergées.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: {
          gbr: 'b:34', can: 'b:34', aus: 'b:34', nzl: 'b:34', ind: 'b:34', pak: 'b:34', bgd: 'b:34', mmr: 'b:34',
          lka: 'b:34', zaf: 'b:34', egy: 'b:34', sdn: 'b:34', nga: 'b:34', gha: 'b:34', ken: 'b:34', uga: 'b:34',
          tza: 'b:26', zmb: 'b:34', zwe: 'b:34', bwa: 'b:34', cyp: 'b:34', mys: 'b:34',
          fra: 'h:32', dza: 'h:32', mar: 'h:32', tun: 'h:32', mli: 'h:32', ner: 'h:32', tcd: 'h:32',
          cog: 'h:32', gab: 'h:32', civ: 'h:32', bfa: 'h:32', gin: 'h:32', sen: 'h:32', mrt: 'h:32',
          ben: 'h:32', mdg: 'h:32', khm: 'h:32', lao: 'h:32', dji: 'h:32',
          bel: 'w:30', cod: 'w:30', prt: 'w:30', ago: 'w:30', moz: 'w:30', gnb: 'w:30',
          esp: 'w:30', sah: 'w:30', nld: 'w:30', idn: 'w:30', deu: 'w:30', nam: 'w:30', cmr: 'w:30', tgo: 'w:30',
          ita: 'w:30', lby: 'w:30', eri: 'w:30', som: 'w:30', usa: 'e:24', phl: 'e:24', jpn: 'e:24', kor: 'e:24'
        }
      }],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['londres', 'capitale', 'i', 4.5, 'Londres', 'end', null, -5, 7.5],
        ['paris', 'capitale', 'i', 4.5, 'Paris', 'start', null, -5, 7.5],
        ['delhi', 'ville', 'i', 4, 'Inde britannique', 'start', null, null, 7],
        ['dakar', 'ville', 'i', 4, 'AOF', 'end', null, null, 7],
        ['hanoi', 'ville', 'i', 4, 'Indochine', 'start', null, null, 7]
      ]],
      ['key', 6, 150, [
        ['f', 'b:34', 'Empire britannique'],
        ['f', 'h:32', 'Empire français'],
        ['f', 'w:30', 'Autres empires européens'],
        ['f', 'e:24', 'Puissances non européennes'],
        ['f', 'terre', 'États indépendants']
      ], 'Les empires en 1914']
    ],
    w: 274, h: 236
  },
  {
    id: 'a-monde-froide', n: 'Le monde bipolaire (1947-1991)', m: 'hist',
    d: 'Deux blocs, des pays non alignés, et des affrontements périphériques sur trois continents.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: {
          usa: 'b:30', can: 'b:30', gbr: 'b:30', fra: 'b:30', deu: 'b:24', ita: 'b:30', esp: 'b:22', prt: 'b:30',
          nld: 'b:30', bel: 'b:30', lux: 'b:30', dnk: 'b:30', nor: 'b:30', isl: 'b:30', grc: 'b:30', tur: 'b:30',
          jpn: 'b:30', kor: 'b:30', aus: 'b:30', nzl: 'b:30', phl: 'b:30', tha: 'b:30', isr: 'b:24',
          rus: 'h:30', blr: 'h:30', ukr: 'h:30', mda: 'h:30', est: 'h:30', lva: 'h:30', ltu: 'h:30',
          kaz: 'h:30', uzb: 'h:30', tkm: 'h:30', kgz: 'h:30', tjk: 'h:30', aze: 'h:30', arm: 'h:30', geo: 'h:30',
          pol: 'h:30', cze: 'h:30', svk: 'h:30', hun: 'h:30', rou: 'h:30', bgr: 'h:30', alb: 'h:26',
          prk: 'h:30', mng: 'h:30', chn: 'k:26', vnm: 'h:30', cub: 'h:30',
          ind: 'w:26', idn: 'w:26', egy: 'w:26', srb: 'w:26', hrv: 'w:26', bih: 'w:26', mkd: 'w:26', svn: 'w:26', gha: 'w:26', dza: 'w:26'
        }
      }],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['berlin', 'etoile', 'k', 5, 'Berlin', 'start', null, -5, 7.5],
        ['lahavane', 'nuke', 'k', 5, 'Cuba 1962', 'end', null, 10, 7],
        ['seoul', 'bataille', 'k', 4.5, 'Corée 1950', 'start', null, null, 7],
        ['hanoi', 'bataille', 'k', 4.5, 'Vietnam', 'start', null, 10, 7],
        ['kaboul', 'bataille', 'k', 4.5, 'Afghanistan 1979', 'end', null, -5, 7],
        ['bandung', 'etoile', 'w', 4.5, 'Bandung 1955', 'end', null, 10, 7]
      ]],
      ['key', 6, 150, [
        ['f', 'b:30', 'Bloc de l’Ouest'],
        ['f', 'h:30', 'Bloc de l’Est'],
        ['f', 'k:26', 'Chine communiste'],
        ['f', 'w:26', 'Pays non alignés'],
        ['bataille', 'k', 'Conflits périphériques']
      ], 'Le monde en deux blocs']
    ],
    w: 274, h: 236
  },
  {
    id: 'a-monde-decolo', n: 'Les indépendances, 1945-1980', m: 'hist',
    d: 'Une centaine d’États naissent en trente ans ; l’ONU passe de 51 à 154 membres.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: {
          ind: 'w:30', pak: 'w:30', bgd: 'w:30', idn: 'w:30', mmr: 'w:30', lka: 'w:30', vnm: 'w:30',
          khm: 'w:30', lao: 'w:30', phl: 'w:30', egy: 'w:30', lby: 'w:30', mar: 'w:30', tun: 'w:30', sdn: 'w:30',
          dza: 'h:30', sen: 'h:30', mli: 'h:30', ner: 'h:30', tcd: 'h:30', civ: 'h:30', bfa: 'h:30',
          gin: 'h:30', ben: 'h:30', tgo: 'h:30', cmr: 'h:30', gab: 'h:30', cog: 'h:30', cod: 'h:30',
          mdg: 'h:30', mrt: 'h:30', nga: 'h:30', gha: 'h:30', ken: 'h:30', uga: 'h:30', tza: 'h:30',
          zmb: 'h:30', mwi: 'h:30', som: 'h:30',
          bwa: 'g:28', lso: 'g:28', gnq: 'g:28', gnb: 'g:28', ago: 'g:28', moz: 'g:28', zwe: 'g:28', dji: 'g:28',
          usa: 'm:12', can: 'm:12', bra: 'm:12', arg: 'm:12', chl: 'm:12', per: 'm:12', col: 'm:12',
          gbr: 'b:22', fra: 'b:22', prt: 'b:22', bel: 'b:22', nld: 'b:22', esp: 'b:22'
        }
      }],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['delhi', 'ville', 'k', 4, 'Inde 1947', 'start', null, null, 7],
        ['alger', 'ville', 'k', 4, 'Algérie 1962', 'start', null, -5, 7],
        ['hanoi', 'ville', 'k', 4, 'Indochine 1954', 'start', null, 10, 7],
        ['bandung', 'etoile', 'k', 5, 'Bandung 1955', 'end', null, 10, 7],
        ['dakar', 'ville', 'k', 4, '1960', 'end', null, null, 7]
      ]],
      ['key', 6, 150, [
        ['f', 'b:22', 'Anciennes métropoles européennes'],
        ['f', 'w:30', 'Indépendances 1945-1955'],
        ['f', 'h:30', 'Indépendances 1956-1965'],
        ['f', 'g:28', 'Indépendances 1966-1980'],
        ['f', 'm:12', 'Déjà indépendants avant 1945']
      ], 'Les vagues d’indépendance']
    ],
    w: 274, h: 236
  },
  {
    id: 'a-monde-puissances', n: 'Les grandes puissances aujourd’hui', m: 'geo',
    d: 'Un monde multipolaire : les États-Unis contestés par la Chine, l’Inde et les émergents.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: { usa: 'b:40', chn: 'k:36', jpn: 'w:30', deu: 'g:30', ind: 'e:30',
                gbr: 'm:22', fra: 'm:22', ita: 'm:22', bra: 'm:22', can: 'm:22', rus: 'm:22', kor: 'm:22' }
      }],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['washington', 'metropole', 'b', 7, 'États-Unis 26 %', 'end', null, null, 7.5],
        ['pekin', 'metropole', 'k', 6, 'Chine 17 %', 'start', null, null, 7.5],
        ['tokyo', 'metropole', 'w', 4.5, 'Japon 4 %', 'end', null, 9, 7],
        ['berlin', 'metropole', 'g', 4.5, 'Allemagne 4 %', 'start', null, -5, 7],
        ['delhi', 'metropole', 'e', 4.5, 'Inde 4 %', 'start', null, null, 7],
        ['paris', 'metropole', 'm', 4, 'France 3 %', 'end', null, -5, 7]
      ]],
      ['key', 6, 150, [
        ['metropole', 'b', 'États-Unis'],
        ['metropole', 'k', 'Chine'],
        ['metropole', 'w', 'Japon'],
        ['metropole', 'g', 'Allemagne'],
        ['metropole', 'e', 'Inde'],
        ['f', 'm:22', 'Autres pays du G7 et émergents']
      ], 'Part du PIB mondial']
    ],
    w: 274, h: 250
  },
  {
    id: 'a-monde-franco', n: 'La francophonie dans le monde', m: 'geo',
    d: '321 millions de locuteurs, et une croissance portée par l’Afrique.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: {
          fra: 'b:36', bel: 'b:36', che: 'b:30', can: 'b:30', lux: 'b:36',
          sen: 'b:36', mli: 'b:36', ner: 'b:36', tcd: 'b:36', caf: 'b:36', cog: 'b:36', cod: 'b:36',
          gab: 'b:36', cmr: 'b:36', gin: 'b:36', bfa: 'b:36', ben: 'b:36', tgo: 'b:36', civ: 'b:36',
          mdg: 'b:36', dji: 'b:36', gnq: 'b:36', rwa: 'b:30', bdi: 'b:36', hti: 'b:36',
          dza: 'g:28', mar: 'g:28', tun: 'g:28', mrt: 'g:28', lbn: 'g:28', vnm: 'g:22', khm: 'g:22', lao: 'g:22'
        }
      }],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['paris', 'etoile', 'b', 5, 'Paris', 'end', null, -5, 7.5],
        ['ottawa', 'ville', 'b', 4, 'Québec', 'end', null, null, 7],
        ['dakar', 'ville', 'b', 4, 'Afrique de l’Ouest', 'end', null, null, 7],
        ['kinshasa', 'ville', 'b', 4.5, 'RD Congo', 'start', null, 9, 7],
        ['papeete', 'carre', 'b', 3.6], ['noumea', 'carre', 'b', 3.6]
      ]],
      ['key', 6, 150, [
        ['f', 'b:36', 'Français langue officielle'],
        ['f', 'g:28', 'Français très présent'],
        ['etoile', 'b', 'Siège de l’OIF']
      ], 'La francophonie']
    ],
    w: 274, h: 216
  },
  {
    id: 'a-monde-migrations', n: 'Les grandes migrations internationales', m: 'geo',
    d: 'Environ 280 millions de personnes vivent hors de leur pays de naissance.',
    ops: [
      ['map', 'MONDE', 6, 10, 2.6, {
        base: 'terre', trait: 'l',
        fill: { usa: 'b:30', can: 'b:30', fra: 'b:30', deu: 'b:30', gbr: 'b:30', esp: 'b:30', ita: 'b:30',
                aus: 'b:30', sau: 'b:30', are: 'b:30', rus: 'b:24',
                mex: 'w:26', mar: 'w:26', dza: 'w:26', sen: 'w:26', mli: 'w:26', nga: 'w:26', cod: 'w:26',
                syr: 'k:28', afg: 'k:28', ukr: 'k:28', som: 'k:28', ven: 'k:28',
                ind: 'w:26', pak: 'w:26', bgd: 'w:26', phl: 'w:26', idn: 'w:26' }
      }],
      ['flux', 'MONDE', 6, 10, 2.6, [
        ['mexico', 'losangeles', 10, 'k', ''], ['bogota', 'newyork', 12, 'k', ''],
        ['dakar', 'paris', 14, 'k', ''], ['casablanca', 'paris', 8, 'k', ''],
        ['kinshasa', 'paris', 22, 'k', ''], ['delhi', 'dubai', -10, 'k', ''],
        ['kaboul', 'berlin', -16, 'k', ''], ['jakarta', 'sydney', -12, 'k', '']
      ]],
      ['ancre', 'MONDE', 6, 10, 2.6, [
        ['paris', 'metropole', 'b', 4.5, 'Europe', 'end', null, -6, 7.5],
        ['losangeles', 'metropole', 'b', 4.5, 'Amérique du Nord', 'start', null, -6, 7.5],
        ['dubai', 'metropole', 'b', 4, 'Golfe', 'start', null, null, 7],
        ['sydney', 'metropole', 'b', 4, 'Australie', 'end', null, null, 7]
      ]],
      ['key', 6, 150, [
        ['f', 'b:30', 'Principaux pays d’accueil'],
        ['f', 'w:26', 'Foyers de départ économiques'],
        ['f', 'k:28', 'Départs liés à un conflit'],
        ['a', 'k', 'Grands flux migratoires']
      ], 'Migrations internationales']
    ],
    w: 274, h: 226
  },
  {
    id: 'a-eur-euro', n: 'UE, zone euro et espace Schengen', m: 'geo',
    d: 'Trois périmètres qui ne se superposent pas — la carte le montre mieux qu’un schéma.',
    ops: [
      ['map', 'EUR', 4, 6, 1.62, {
        base: 'terre', trait: 'l',
        fill: { fr: 'b:34', de: 'b:34', it: 'b:34', es: 'b:34', pt: 'b:34', nl: 'b:34', be: 'b:34', lu: 'b:34',
                at: 'b:34', fi: 'b:34', gr: 'b:34', sk: 'b:34', si: 'b:34', ee: 'b:34', lv: 'b:34', lt: 'b:34',
                mt: 'b:34', hr: 'b:34', ie: 'g:30', cy: 'g:30',
                pl: 'w:28', cz: 'w:28', hu: 'w:28', ro: 'w:28', bg: 'w:28', se: 'w:28', dk: 'w:28',
                ch: 'e:26', no: 'e:26', is: 'e:26',
                uk: 'm:16', rs: 'm:16', ua: 'm:16', tr: 'm:16', ba: 'm:16', al: 'm:16', mk: 'm:16', me: 'm:16', md: 'm:16', by: 'm:16', ru: 'm:16' }
      }],
      ['key', 172, 16, [
        ['f', 'b:34', 'UE + euro + Schengen'],
        ['f', 'g:30', 'UE + euro, hors Schengen'],
        ['f', 'w:28', 'UE, hors zone euro'],
        ['f', 'e:26', 'Hors UE, dans Schengen'],
        ['f', 'm:16', 'Hors UE']
      ], 'Trois périmètres'],
      ['rose', 300, 150, 9]
    ],
    w: 336, h: 176
  },
  {
    id: 'a-fr-relief', n: 'Le relief et les fleuves de France', m: 'geo',
    d: 'Quatre grands massifs anciens ou récents, de vastes bassins sédimentaires et cinq fleuves.',
    ops: [
      ['map', 'FR', 40, 8, 1.7, { base: 'terre', trait: 'l' }],
      ['aire', 'FR', 40, 8, 1.7, [
        ['alpes', 15, 7, -38], ['pyrenees', 19, 4, 6], ['massifcentral', 16, 12, -10],
        ['jura', 9, 3.2, -42], ['vosges', 6, 2.6, -18], ['armorique', 14, 6, 8]
      ], 'm', .42],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'rouen', 'lehavre'], 'b', 3, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['nevers', 'orleans', 'tours', 'angers', 'nantes'], 'b', 3, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['lyon', 'valence', 'avignon', 'arles'], 'b', 3, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['toulouse', 'agen', 'bordeaux'], 'b', 3, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['mulhouse', 'strasbourg'], 'b', 3, '', .85],
      ['ancre', 'FR', 40, 8, 1.7, [
        ['alpes', 'none', 'i', 0, 'ALPES', 'start', 14, 4, 8],
        ['pyrenees', 'none', 'i', 0, 'PYRÉNÉES', 'middle', 0, 16, 8],
        ['massifcentral', 'none', 'i', 0, 'MASSIF', 'middle', 0, -3, 8],
        ['massifcentral', 'none', 'i', 0, 'CENTRAL', 'middle', 0, 6, 8],
        ['jura', 'none', 'i', 0, 'JURA', 'start', 10, 2, 7.5],
        ['vosges', 'none', 'i', 0, 'VOSGES', 'start', 8, -6, 7.5],
        ['armorique', 'none', 'i', 0, 'MASSIF', 'middle', 0, -14, 7.5],
        ['armorique', 'none', 'i', 0, 'ARMORICAIN', 'middle', 0, -6, 7.5],
        ['rouen', 'none', 'b', 0, 'Seine', 'end', -3, -5, 7.5],
        ['tours', 'none', 'b', 0, 'Loire', 'middle', 0, -7, 7.5],
        ['valence', 'none', 'b', 0, 'Rhône', 'start', 5, 2, 7.5],
        ['agen', 'none', 'b', 0, 'Garonne', 'middle', 0, 11, 7.5],
        ['strasbourg', 'none', 'b', 0, 'Rhin', 'start', 5, 8, 7.5]
      ]],
      ['key', 220, 24, [
        ['f', 'm:40', 'Massifs montagneux'],
        ['l', 'b', 'Grands fleuves'],
        ['f', 'terre', 'Bassins et plaines']
      ], 'Relief et hydrographie'],
      ['rose', 356, 160, 10]
    ],
    w: 386, h: 186
  },
  {
    id: 'a-fr-transports', n: 'Le réseau de transport français', m: 'geo',
    d: 'Un réseau en étoile depuis Paris, des ports modestes et deux hubs aériens.',
    ops: [
      ['map', 'FR', 40, 8, 1.7, { base: 'terre', trait: 'l' }],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'lille'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'reims', 'strasbourg'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'dijon', 'lyon', 'valence', 'marseille'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'tours', 'bordeaux'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'laval', 'rennes'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['tours', 'angers', 'nantes'], 'k', 3.4, '', .85],
      ['bande', 'FR', 40, 8, 1.7, ['bordeaux', 'toulouse'], 'e', 3, '', .7],
      ['bande', 'FR', 40, 8, 1.7, ['lyon', 'clermont', 'bordeaux'], 'e', 3, '', .7],
      ['ancre', 'FR', 40, 8, 1.7, [
        ['paris', 'avion', 'g', 7, 'Roissy CDG', 'start', null, -8, 7.5],
        ['lyon', 'avion', 'g', 5, 'Lyon', 'start', null, -6, 7],
        ['nice', 'avion', 'g', 4.5, 'Nice', 'start', null, null, 7],
        ['lehavre', 'port', 'b', 6, 'Le Havre', 'end', null, null, 7.5],
        ['dunkerque', 'port', 'b', 5.5, 'Dunkerque', 'start', null, null, 7],
        ['fos', 'port', 'b', 6, 'Marseille-Fos', 'end', null, 9, 7.5],
        ['bordeaux', 'port', 'b', 4.5, 'Bordeaux', 'end', null, 8, 7],
        ['nantes', 'port', 'b', 4.5, 'Nantes-St-Nazaire', 'end', null, null, 7],
        ['calais', 'none', 'k', 0, 'tunnel sous la Manche', 'start', 4, -8, 7]
      ]],
      ['key', 220, 22, [
        ['l', 'k', 'Lignes à grande vitesse'],
        ['d', 'e', 'Liaisons transversales lentes'],
        ['avion', 'g', 'Grands aéroports'],
        ['port', 'b', 'Grands ports maritimes']
      ], 'Transports'],
      ['rose', 356, 160, 10]
    ],
    w: 388, h: 186
  },
  {
    id: 'a-fr-risques', n: 'Les risques majeurs en France', m: 'geo',
    d: 'Deux communes sur trois sont exposées à au moins un risque naturel ou technologique.',
    ops: [
      ['map', 'FR', 40, 8, 1.7, { base: 'terre', trait: 'l' }],
      ['bande', 'FR', 40, 8, 1.7, ['dunkerque', 'calais', 'lehavre', 'cherbourg', 'stmalo', 'brest'], 'b', 7, '', .4],
      ['bande', 'FR', 40, 8, 1.7, ['stnazaire', 'larochelle', 'arcachon', 'biarritz'], 'b', 7, '', .4],
      ['bande', 'FR', 40, 8, 1.7, ['perpignan', 'montpellier', 'marseille', 'toulon', 'nice'], 'b', 7, '', .4],
      ['bande', 'FR', 40, 8, 1.7, ['bayonne', 'pyrenees', 'perpignan'], 'w', 8, '', .38],
      ['bande', 'FR', 40, 8, 1.7, ['annecy', 'alpes', 'nice'], 'w', 8, '', .38],
      ['bande', 'FR', 40, 8, 1.7, ['mulhouse', 'strasbourg'], 'w', 7, '', .38],
      ['bande', 'FR', 40, 8, 1.7, ['nevers', 'orleans', 'tours', 'angers', 'nantes'], 'g', 5, '', .5],
      ['bande', 'FR', 40, 8, 1.7, ['lyon', 'valence', 'avignon', 'arles'], 'g', 5, '', .5],
      ['bande', 'FR', 40, 8, 1.7, ['paris', 'rouen', 'lehavre'], 'g', 5, '', .5],
      ['ancre', 'FR', 40, 8, 1.7, [
        ['fos', 'usine', 'k', 5.5, 'Fos-Berre', 'end', null, 9, 7],
        ['lehavre', 'usine', 'k', 5, 'Le Havre', 'end', null, -6, 7],
        ['lyon', 'usine', 'k', 5, 'couloir de la chimie', 'start', null, null, 7],
        ['dunkerque', 'usine', 'k', 5, 'Dunkerque', 'start', null, 8, 7],
        ['toulouse', 'usine', 'k', 4.5, 'Toulouse (AZF)', 'end', null, 8, 7]
      ]],
      ['key', 220, 22, [
        ['f', 'b:40', 'Submersion et érosion du littoral'],
        ['f', 'w:38', 'Zones sismiques'],
        ['f', 'g:50', 'Grandes vallées inondables'],
        ['usine', 'k', 'Risques industriels majeurs']
      ], 'Risques majeurs'],
      ['rose', 356, 160, 10]
    ],
    w: 396, h: 186
  }
];

VIEWS.atlas = function (host, args) {
  if (args[0]) {
    const a = ATLAS.find(x => x.id === args[0]);
    if (a) {
      host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Atlas</div>' +
        '<h1>' + esc(a.n) + '</h1><p>' + esc(a.d) + '</p></div>' +
        '<button class="btn ghost" id="back">← Atlas</button></div>' +
        fig(a.ops, a.w, a.h, a.n);
      $('#back').onclick = () => go('atlas');
      return;
    }
  }
  const f = MAT[args[0]] ? args[0] : '';
  const liste = f ? ATLAS.filter(a => a.m === f) : ATLAS;
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Atlas</div>' +
    '<h1>Atlas</h1><p>' + ATLAS.length + ' planches bâties sur des contours réels, légendées comme au brevet. Clique pour agrandir : elles te servent de modèles pour tes croquis.</p></div>' +
    '<button class="btn p" id="jouer">Jouer à la carte muette</button></div>' +
    '<div class="tabs" style="margin-bottom:18px"><button data-am="" class="' + (f ? '' : 'on') + '">Tout (' + ATLAS.length + ')</button>' +
    ['hist', 'geo'].map(k => '<button data-am="' + k + '" class="' + (f === k ? 'on' : '') + '">' + MAT[k].n + ' (' + ATLAS.filter(a => a.m === k).length + ')</button>').join('') + '</div>' +
    '<div class="grid g2">' + liste.map(a =>
      '<button class="panel" data-a="' + a.id + '" style="text-align:left;cursor:pointer;border-color:var(--line)">' +
      '<div class="row" style="margin-bottom:8px"><span class="pill ' + MAT[a.m].cls + '">' + MAT[a.m].n + '</span></div>' +
      '<div style="max-width:100%;overflow:hidden;border-radius:6px;border:1px solid var(--line2);background:var(--surface2)">' +
      figSVG(a.ops, a.w, a.h) + '</div>' +
      '<h3 style="margin-top:10px">' + esc(a.n) + '</h3>' +
      '<p class="small muted" style="font-family:var(--ff-b)">' + esc(a.d) + '</p></button>').join('') + '</div>';
  $$('[data-a]').forEach(b => b.onclick = () => go('atlas/' + b.dataset.a));
  $$('[data-am]').forEach(b => b.onclick = () => go('atlas' + (b.dataset.am ? '/' + b.dataset.am : '')));
  $('#jouer').onclick = () => go('jeux/j-carte-fr');
};

/* ============================================================
   MINI-JEUX
   ============================================================ */
VIEWS.jeux = function (host, args) {
  if (args[0]) {
    const j = jeuById(args[0]);
    if (j) { runGame(host, j); return; }
  }
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Mini-jeux</div>' +
    '<h1>Mini-jeux</h1><p>Douze façons de réviser sans avoir l’impression de réviser. Chaque partie fait bouger ton Elo et rapporte des δ.</p></div>' +
    '<span class="stat">' + (S.stats.jeux || 0) + ' partie(s) jouée(s)</span></div>' +
    '<div class="grid g2">' + JEUX.map(j => {
      const g = S.games[j.id];
      return '<button class="panel" data-j="' + j.id + '" style="text-align:left;cursor:pointer">' +
        '<div class="row" style="margin-bottom:8px"><span style="font-size:24px">' + j.i + '</span>' +
        '<b style="font-size:16px">' + esc(j.n) + '</b><span class="grow"></span>' +
        '<span class="pill ' + MAT[j.m].cls + '">' + MAT[j.m].n + '</span></div>' +
        '<p class="small muted" style="font-family:var(--ff-b);margin-bottom:10px">' + esc(j.d) + '</p>' +
        '<div class="row small muted"><span class="mono">difficulté ' + '●'.repeat(j.diff) + '○'.repeat(4 - j.diff) + '</span>' +
        '<span class="grow"></span>' + (g ? '<span class="mono">record ' + g.best + ' · ' + g.parties + ' partie(s)' + (g.parfait ? ' · sans faute' : '') + '</span>' : '<span class="mono">jamais joué</span>') +
        '</div></button>';
    }).join('') + '</div>';
  $$('[data-j]').forEach(b => b.onclick = () => go('jeux/' + b.dataset.j));
};
