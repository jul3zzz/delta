/* ============================================================
   Delta — brevet blanc : choix du sujet, composition, correction.
   ============================================================ */
let BR = null;   // etat de l'epreuve en cours

VIEWS.brevet = function (host, args) {
  if (args[0] && BREVETS.some(b => b.id === args[0])) return brevetRun(host, args[0]);
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Brevet blanc</div>' +
    '<h1>Brevet blanc</h1>' +
    '<p>Quatre sujets au <strong>format officiel</strong> de l’épreuve d’histoire-géographie-EMC : 2 heures, 50 points, trois exercices. Les questions fermées sont corrigées automatiquement ; les développements construits sont auto-évalués à l’aide d’un corrigé type détaillé.</p></div></div>' +

    '<div class="panel" style="margin-bottom:18px"><b>Le format de l’épreuve</b>' +
    '<table class="tab" style="margin-top:10px"><thead><tr><th>Exercice</th><th>Intitulé officiel</th><th>Points</th></tr></thead><tbody>' +
    '<tr><td>1</td><td>Analyser et comprendre des documents</td><td>20</td></tr>' +
    '<tr><td>2</td><td>Maîtriser différents langages pour raisonner et se repérer</td><td>20</td></tr>' +
    '<tr><td>3</td><td>Mobiliser des compétences relevant de l’EMC</td><td>10</td></tr>' +
    '</tbody></table>' +
    '<p class="small muted" style="font-family:var(--ff-b)">Les exercices 1 et 2 portent l’un sur l’histoire, l’autre sur la géographie — dans un ordre qui change d’un sujet à l’autre.</p></div>' +

    '<div class="grid g2">' + BREVETS.map(b => {
      const faits = S.brevets.filter(x => x.id === b.id);
      const best = faits.length ? Math.max.apply(null, faits.map(x => x.note)) : null;
      return '<div class="panel"><div class="row" style="margin-bottom:8px"><b style="font-size:17px">' + esc(b.t) + '</b>' +
        '<span class="grow"></span>' + (best != null ? '<span class="pill ' + (best >= 30 ? 't-ok' : 't-bad') + '">' + best + '/50</span>' : '<span class="pill t-neutral">jamais fait</span>') + '</div>' +
        '<p class="small muted" style="font-family:var(--ff-b);margin-bottom:12px">' + esc(b.st) + '</p>' +
        '<div class="row small muted" style="margin-bottom:12px"><span class="mono">⏱ ' + b.duree + ' min</span>' +
        '<span class="mono">' + b.total + ' points</span><span class="mono">' + b.ex.length + ' exercices</span></div>' +
        '<button class="btn p wide" data-b="' + b.id + '">' + (faits.length ? 'Refaire ce sujet' : 'Composer') + '</button></div>';
    }).join('') + '</div>' +

    (S.brevets.length ? '<div class="panel" style="margin-top:18px"><b>Historique</b>' +
      '<table class="tab" style="margin-top:10px"><thead><tr><th>Sujet</th><th>Note</th><th>Date</th></tr></thead><tbody>' +
      S.brevets.slice().reverse().slice(0, 10).map(x =>
        '<tr><td>' + esc((BREVETS.find(b => b.id === x.id) || {}).t || x.id) + '</td>' +
        '<td class="mono">' + x.note + ' / 50</td>' +
        '<td class="mono">' + new Date(x.d).toLocaleDateString('fr-FR') + '</td></tr>').join('') +
      '</tbody></table></div>' : '');

  $$('[data-b]').forEach(b => b.onclick = () => go('brevet/' + b.dataset.b));
};

function brevetRun(host, id) {
  const sujet = BREVETS.find(b => b.id === id);
  if (!BR || BR.id !== id || BR.fini) {
    BR = { id: id, debut: Date.now(), rep: {}, fini: false };
  }
  const total = sujet.duree * 60;

  const qs = [];
  sujet.ex.forEach((ex, ei) => ex.qs.forEach((q, qi) => qs.push({ ex: ei, qi: qi, q: q, key: ei + '-' + qi })));

  host.innerHTML = '<div class="pagehead"><div class="grow">' +
    '<div class="eyebrow">' + esc(sujet.t) + '</div><h1>Histoire · Géographie · EMC</h1>' +
    '<p>' + esc(sujet.st) + ' — 2 heures, 50 points. Compose dans l’ordre que tu veux, puis rends ta copie.</p></div>' +
    '<button class="btn ghost" id="quit">Abandonner</button></div>' +
    '<div class="exam"><div id="copie"></div>' +
    '<aside class="panel" style="position:sticky;top:70px">' +
    '<div class="eyebrow">Temps restant</div><div class="timer" id="tm">2:00:00</div>' +
    '<div class="bar" style="margin:12px 0"><i id="tbar" style="width:100%"></i></div>' +
    '<div class="eyebrow" style="margin-top:14px">Avancement</div>' +
    '<div class="mono small" id="av" style="margin:4px 0 12px">0 / ' + qs.length + ' questions</div>' +
    '<button class="btn p wide" id="rendre">Rendre la copie</button>' +
    '<p class="small muted" style="margin-top:10px;font-size:12px;font-family:var(--ff-b)">Les développements construits seront auto-évalués : tu compareras ta réponse à un corrigé type et tu cocheras les éléments que tu as traités.</p>' +
    '</aside></div>';

  const copie = $('#copie');
  sujet.ex.forEach((ex, ei) => {
    const blocs = document.createElement('div');
    blocs.className = 'panel';
    blocs.style.marginBottom = '18px';
    blocs.innerHTML = '<div class="row" style="margin-bottom:6px">' +
      '<span class="pill ' + MAT[ex.disc].cls + '">' + MAT[ex.disc].n + '</span>' +
      '<b style="font-size:17px">' + esc(ex.n) + '</b><span class="grow"></span>' +
      '<span class="mono small muted">' + ex.pts + ' points</span></div>' +
      '<p class="small muted" style="font-family:var(--ff-b);margin-bottom:6px"><em>' + esc(ex.tt) + '</em></p>' +
      '<p style="font-family:var(--ff-b);margin-bottom:12px">' + esc(ex.cons) + '</p>' +
      (ex.docs || []).map(d => d.fig
        ? '<div class="docsrc" style="background-image:none"><div class="dt">' + esc(d.t) + '</div>' + figSVG(d.fig, d.w, d.h) + (d.src ? '<div class="src">' + esc(d.src) + '</div>' : '') + '</div>'
        : '<div class="docsrc"><div class="dt">' + esc(d.t) + '</div><blockquote>' + esc(d.txt) + '</blockquote>' + (d.src ? '<div class="src">' + esc(d.src) + '</div>' : '') + '</div>').join('') +
      ex.qs.map((q, qi) => '<div class="qbloc" data-k="' + ei + '-' + qi + '">' +
        '<span class="pts">' + q.p + ' pt' + (q.p > 1 ? 's' : '') + '</span>' +
        '<span class="qnum">QUESTION ' + (qi + 1) + '</span>' +
        '<p style="font-family:var(--ff-b);font-size:16px;margin:6px 0 10px">' + q.q + '</p>' +
        '<div class="zone"></div></div>').join('');
    copie.appendChild(blocs);
  });

  qs.forEach(item => {
    const bloc = $('[data-k="' + item.key + '"]', copie), zone = $('.zone', bloc), q = item.q;
    if (q.ty === 'qcm') {
      zone.innerHTML = '<div class="opts">' + q.o.map((o, k) => '<button class="opt" data-k="' + k + '"><span class="mk">' + 'ABCD'[k] + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>';
      $$('.opt', zone).forEach(b => b.onclick = () => {
        $$('.opt', zone).forEach(o => o.classList.remove('sel'));
        b.classList.add('sel'); BR.rep[item.key] = +b.dataset.k; maj();
      });
    } else if (q.ty === 'txt') {
      zone.innerHTML = '<input class="txtin" placeholder="Ta réponse…" autocomplete="off">';
      $('input', zone).oninput = e => { BR.rep[item.key] = e.target.value; maj(); };
    } else if (q.ty === 'ord') {
      zone.innerHTML = '<p class="small muted">Clique dans l’ordre chronologique.</p>' +
        '<div class="friserow pool">' + shuffle(q.o.map((x, k) => [x, k])).map(p => '<button class="frisecard" data-o="' + p[1] + '">' + esc(p[0]) + '</button>').join('') + '</div>' +
        '<div class="slotrow ch" style="min-height:38px"></div>';
      const ch = [];
      $$('.frisecard', zone).forEach(b => b.onclick = () => {
        b.style.display = 'none'; ch.push(+b.dataset.o);
        $('.ch', zone).innerHTML = ch.map((k, p) => '<span class="frisecard on"><span class="yr">' + (p + 1) + '</span>' + esc(q.o[k]) + '</span>').join('');
        BR.rep[item.key] = ch.slice(); maj();
      });
    } else if (q.ty === 'carte') {
      const zones = mapZones(q.map, 0, 0, 2.3);
      zone.innerHTML = '<div class="row" style="gap:6px;margin-bottom:8px" id="lab-' + item.key + '"></div>' +
        '<div class="mapgame"><svg viewBox="0 0 236 240" xmlns="http://www.w3.org/2000/svg">' +
        (CARTES_BASE[q.map].mer ? '<rect x="0" y="0" width="236" height="240" fill="' + col('mer') + '"/>' : '') +
        zones.map(z => z.contours.map(pt => '<polygon class="zone" data-c="' + z.c + '" points="' + pt + '" fill="' + col('terre') + '" stroke="' + col('l') + '" stroke-width="1"/>').join('')).join('') +
        '</svg></div>';
      const rep = BR.rep[item.key] = BR.rep[item.key] || {};
      let cur = 0;
      const majLab = () => {
        $('#lab-' + item.key).innerHTML = q.items.map((it, k) =>
          '<span class="pill ' + (rep[it[0]] ? 't-ok' : (k === cur ? 't-bad' : 't-neutral')) + '">' + esc(it[0]) + '</span>').join('');
      };
      majLab();
      $$('polygon.zone', zone).forEach(p => p.onclick = () => {
        if (cur >= q.items.length) return;
        rep[q.items[cur][0]] = p.dataset.c;
        p.style.fill = col('b:40');
        cur++; majLab(); maj();
      });
    } else if (q.ty === 'red') {
      zone.innerHTML = '<textarea class="txtin" rows="8" placeholder="Rédige ta réponse ici…" style="font-family:var(--ff-b);line-height:1.6"></textarea>' +
        '<div class="small muted mono" style="margin-top:4px"><span class="cnt">0</span> mots</div>';
      const ta = $('textarea', zone);
      ta.oninput = () => {
        BR.rep[item.key] = ta.value;
        $('.cnt', zone).textContent = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
        maj();
      };
    }
  });

  function maj() {
    const n = qs.filter(x => {
      const v = BR.rep[x.key];
      if (v == null) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'object') return Object.keys(v).length > 0;
      return true;
    }).length;
    $('#av').textContent = n + ' / ' + qs.length + ' questions';
  }
  maj();

  const tick = setInterval(() => {
    if (!$('#tm')) { clearInterval(tick); return; }
    const rest = total - Math.floor((Date.now() - BR.debut) / 1000);
    if (rest <= 0) { clearInterval(tick); corriger(); return; }
    const h = Math.floor(rest / 3600), m = Math.floor(rest % 3600 / 60), s = rest % 60;
    const el = $('#tm');
    el.textContent = h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    el.className = 'timer' + (rest < 300 ? ' crit' : rest < 900 ? ' warn' : '');
    $('#tbar').style.width = Math.max(0, 100 * rest / total) + '%';
  }, 1000);

  $('#quit').onclick = () => { if (confirm('Abandonner cette épreuve ? Tes réponses seront perdues.')) { BR = null; clearInterval(tick); go('brevet'); } };
  $('#rendre').onclick = () => { if (confirm('Rendre la copie et voir la correction ?')) { clearInterval(tick); corriger(); } };

  function corriger() {
    BR.fini = true;
    let note = 0;
    const autoEval = [];
    let out = '';

    sujet.ex.forEach((ex, ei) => {
      let ptsEx = 0;
      let bloc = '<div class="panel" style="margin-bottom:18px"><div class="row" style="margin-bottom:10px">' +
        '<span class="pill ' + MAT[ex.disc].cls + '">' + MAT[ex.disc].n + '</span><b>' + esc(ex.n) + '</b>' +
        '<span class="grow"></span><span class="mono small" id="pts-' + ei + '"></span></div>';

      ex.qs.forEach((q, qi) => {
        const key = ei + '-' + qi, v = BR.rep[key];
        let gagne = 0, detail = '';
        if (q.ty === 'qcm') {
          gagne = (v === q.r) ? q.p : 0;
          detail = '<div class="fb ' + (gagne ? 'ok' : 'no') + '"><b>' + (gagne ? '✓' : '✕') + '</b><span class="why">' +
            'Réponse attendue : <strong>' + esc(q.o[q.r]) + '</strong>. ' + (q.w || '') + '</span></div>';
        } else if (q.ty === 'txt') {
          const good = v && q.r.some(a => norm(a) === norm(v));
          gagne = good ? q.p : 0;
          detail = '<div class="fb ' + (good ? 'ok' : 'no') + '"><b>' + (good ? '✓' : '✕') + '</b><span class="why">' +
            'Ta réponse : « ' + esc(v || '—') + ' ». Attendu : <strong>' + esc(q.r[0]) + '</strong>. ' + (q.w || '') + '</span></div>';
        } else if (q.ty === 'ord') {
          const bon = Array.isArray(v) && v.length === q.o.length && v.every((k, p) => k === p);
          const justes = Array.isArray(v) ? v.filter((k, p) => k === p).length : 0;
          gagne = bon ? q.p : Math.round(q.p * justes / q.o.length * .5);
          detail = '<div class="fb ' + (bon ? 'ok' : 'no') + '"><b>' + (bon ? '✓' : '✕') + '</b><span class="why">' +
            'Ordre attendu : ' + q.o.map((x, k) => (k + 1) + '. ' + esc(x)).join(' · ') + '. ' + (q.w || '') + '</span></div>';
        } else if (q.ty === 'carte') {
          const rep = v || {};
          const justes = q.items.filter(it => rep[it[0]] === it[1]).length;
          gagne = Math.round(q.p * justes / q.items.length);
          detail = '<div class="fb ' + (justes === q.items.length ? 'ok' : 'no') + '"><b>' + justes + ' / ' + q.items.length + '</b>' +
            '<span class="why">' + q.items.map(it => {
              const ok = rep[it[0]] === it[1];
              return '<span class="pill ' + (ok ? 't-ok' : 't-bad') + '" style="margin:2px 3px 0 0">' + esc(it[0]) + '</span>';
            }).join('') + '<br>' + (q.w || '') + '</span></div>';
        } else if (q.ty === 'red') {
          const txt = (v || '').trim();
          const mots = txt ? txt.split(/\s+/).length : 0;
          detail = '<div class="modelans"><b style="font-family:var(--ff-d);display:block;margin-bottom:6px">Corrigé type — coche ce que tu as vraiment traité</b>' +
            '<ul>' + q.mod.map((m, mi) => '<li><label style="cursor:pointer"><input type="checkbox" class="se" data-k="' + key + '" data-mi="' + mi + '"> ' + m + '</label></li>').join('') + '</ul>' +
            '<p class="small muted" style="margin-top:8px">Ta copie fait ' + mots + ' mot(s). Chaque élément coché vaut ' + (q.p / q.mod.length).toFixed(1) + ' point.</p></div>' +
            (txt ? '<details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">Relire ma réponse</summary>' +
              '<p style="font-family:var(--ff-b);white-space:pre-wrap;margin-top:8px;padding:10px;background:var(--surface2);border-radius:6px">' + esc(txt) + '</p></details>'
              : '<p class="small" style="color:var(--bad);margin-top:6px">Aucune réponse rédigée.</p>');
          autoEval.push({ key: key, p: q.p, n: q.mod.length });
        }
        ptsEx += gagne;
        bloc += '<div class="qbloc"><span class="pts">' + (q.ty === 'red' ? '?' : gagne) + ' / ' + q.p + '</span>' +
          '<span class="qnum">QUESTION ' + (qi + 1) + '</span>' +
          '<p style="font-family:var(--ff-b);margin:6px 0 8px">' + q.q + '</p>' + detail + '</div>';
      });
      note += ptsEx;
      bloc += '</div>';
      out += bloc.replace('id="pts-' + ei + '"></span>', 'id="pts-' + ei + '">' + ptsEx + ' / ' + ex.pts + '</span>');
    });

    host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Correction — ' + esc(sujet.t) + '</div>' +
      '<h1>Ta copie</h1><p>Les questions fermées sont déjà corrigées. Coche dans les corrigés types les éléments que tu as réellement traités pour obtenir ta note finale.</p></div>' +
      '<div class="stack center" style="align-items:center"><div class="score" id="note">' + note + '</div>' +
      '<span class="small muted">sur 50</span></div></div>' + out +
      '<div class="panel center" style="margin-top:8px">' +
      '<p style="font-family:var(--ff-b);margin-bottom:12px">Quand tu as fini de t’auto-évaluer, valide ta note.</p>' +
      '<div class="row" style="justify-content:center"><button class="btn p big" id="valider">Valider ma note</button>' +
      '<button class="btn" id="retour">Retour aux sujets</button></div></div>';

    const base = note;
    const recalc = () => {
      let bonus = 0;
      autoEval.forEach(a => {
        const coches = $$('.se[data-k="' + a.key + '"]:checked').length;
        bonus += a.p * coches / a.n;
      });
      $('#note').textContent = Math.round(base + bonus);
      return Math.round(base + bonus);
    };
    $$('.se').forEach(c => c.onchange = recalc);
    $('#retour').onclick = () => { BR = null; go('brevet'); };
    $('#valider').onclick = () => {
      const fin = recalc();
      S.brevets.push({ id: sujet.id, note: fin, d: Date.now() });
      S.stats.brevet = (S.stats.brevet || 0) + 1;
      const d = elo(4, fin >= 30, 26);
      gain(fin * 8, fin * 5);
      commit(); checkSucces();
      if (fin >= 30) burstAt(innerWidth / 2, 200, fin >= 40 ? 110 : 60);
      modal('<div class="center"><div class="eyebrow">Note enregistrée</div>' +
        '<div class="score" style="margin:14px 0;color:' + (fin >= 30 ? 'var(--ok)' : 'var(--bad)') + '">' + fin + ' / 50</div>' +
        '<p style="font-family:var(--ff-b);margin-bottom:10px">' +
        (fin >= 45 ? 'Excellent — c’est le niveau d’une très bonne copie.' :
          fin >= 40 ? 'Très bonne copie : tu vises la mention.' :
            fin >= 30 ? 'Copie solide. Retravaille les points manqués et tu gagneras encore.' :
              fin >= 20 ? 'Il manque des connaissances précises : reprends les chapitres concernés.' :
                'Reprends les cours avant de refaire un sujet : les repères et le vocabulaire sont indispensables.') + '</p>' +
        '<p class="muted small">+' + (fin * 8) + ' δ · +' + (fin * 5) + ' XP · ' + eloTag(d) + '</p></div>');
      BR = null;
    };
  }
}
