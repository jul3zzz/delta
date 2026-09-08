/* ============================================================
   Delta — profil, boutique, succes.
   ============================================================ */
function avatarSVG(id, size) {
  const a = shopFind('avatar', id) || SHOP.avatar[0];
  return '<svg viewBox="0 0 64 64" width="' + (size || 56) + '" height="' + (size || 56) + '" xmlns="http://www.w3.org/2000/svg">' +
    a.ops.map(o => (OPS[o[0]] ? OPS[o[0]](o) : '')).join('') + '</svg>';
}
function titreDe() { const t = shopFind('title', S.shop.eq.title); return t ? t.n : 'Élève de 3ᵉ'; }

function pcardHTML() {
  const ban = shopFind('banner', S.shop.eq.banner), fr = shopFind('frame', S.shop.eq.frame);
  const bk = shopFind('back', S.shop.eq.back), li = levelInfo(), r = rang(S.elo);
  return '<div class="pcard" style="' + (bk ? bk.css : '') + '">' +
    '<div class="bg" style="' + (ban ? ban.css : '') + '"></div>' +
    '<div class="ava" style="' + (fr ? fr.css : '') + '">' + avatarSVG(S.shop.eq.avatar, 76) + '</div>' +
    '<div><h2 style="margin-bottom:2px">' + esc(USER) + '</h2>' +
    '<div class="eyebrow" style="margin-bottom:8px">' + esc(titreDe()) + '</div>' +
    '<div class="row" style="gap:8px"><span class="stat">Niv. ' + li.n + '</span>' +
    '<span class="stat elo">' + r.g + ' ' + esc(r.n) + ' · ' + S.elo + '</span>' +
    '<span class="stat coin"><b>' + nfmt(S.coins) + '</b> δ</span></div>' +
    '<div class="bar" style="margin-top:10px;max-width:320px"><i style="width:' + li.pct + '%"></i></div>' +
    '</div></div>';
}

/* ============================================================
   PROFIL
   ============================================================ */
VIEWS.profil = function (host) {
  const nc = Object.keys(S.cours).length, ne = Object.keys(S.exos).filter(k => S.exos[k].ok).length;
  const nf = Object.keys(S.cards).length, ns = Object.keys(S.succes).length;
  const best = S.brevets.length ? Math.max.apply(null, S.brevets.map(b => b.note)) : null;
  const tauxE = S.stats.exoTot ? Math.round(100 * S.stats.exoOk / S.stats.exoTot) : 0;

  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Profil</div>' +
    '<h1>Ton profil</h1><p>Ta progression, tes équipements et tes statistiques. Tout est enregistré dans ce navigateur.</p></div>' +
    '<button class="btn p" onclick="go(\'boutique\')">Personnaliser</button></div>' +

    pcardHTML() +

    '<div class="tiles" style="margin:18px 0">' +
    '<div><b>' + nc + '</b><span>chapitres lus</span></div>' +
    '<div><b>' + ne + '</b><span>exercices réussis</span></div>' +
    '<div><b>' + tauxE + ' %</b><span>de réussite</span></div>' +
    '<div><b>' + (S.stats.jeux || 0) + '</b><span>parties jouées</span></div>' +
    '<div><b>' + nf + '</b><span>fiches obtenues</span></div>' +
    '<div><b>' + ns + '</b><span>succès</span></div>' +
    '<div><b>' + (best != null ? best + '/50' : '—') + '</b><span>meilleur brevet</span></div>' +
    '<div><b>' + (S.streak.best || 0) + '</b><span>meilleure série</span></div>' +
    '</div>' +

    '<div class="grid g2">' +
    '<div class="panel"><b>Progression par matière</b><div class="stack" style="gap:12px;margin-top:12px">' +
    ['hist', 'geo', 'emc'].map(m => {
      const l = coursDe(m), f = l.filter(c => S.cours[c.id]).length;
      const ex = EXOS.filter(e => e.m === m), exo = ex.filter(e => S.exos[e.id] && S.exos[e.id].ok).length;
      return '<div><div class="barlab"><span>' + MAT[m].n + '</span><span>' + f + '/' + l.length + ' cours · ' + exo + '/' + ex.length + ' exos</span></div>' +
        '<div class="bar ' + m + '"><i style="width:' + Math.round(100 * (f + exo) / (l.length + ex.length)) + '%"></i></div></div>';
    }).join('') + '</div></div>' +

    '<div class="panel"><b>Classement Elo</b>' +
    '<p class="small muted" style="font-family:var(--ff-b);margin:8px 0 12px">Ton Elo monte quand tu réussis un exercice difficile et descend quand tu rates un exercice facile.</p>' +
    '<div class="stack" style="gap:4px">' + RANGS.map(r => {
      const on = S.elo >= r.e, cur = rang(S.elo).n === r.n;
      return '<div class="badge' + (on ? '' : ' off') + '"' + (cur ? ' style="border-color:var(--brand);background:var(--brand-soft)"' : '') + '>' +
        '<i>' + r.g + '</i><span style="flex:1"><b>' + esc(r.n) + '</b><span>à partir de ' + r.e + ' points</span></span>' +
        (cur ? '<span class="pill t-ok">actuel</span>' : '') + '</div>';
    }).join('') + '</div></div></div>' +

    '<div class="panel" style="margin-top:18px"><b>Données du compte</b>' +
    '<p class="small muted" style="font-family:var(--ff-b);margin:8px 0 12px">Compte créé le ' + new Date(S.created).toLocaleDateString('fr-FR') +
    '. Tout est stocké dans le <code>localStorage</code> de ce navigateur : rien n’est envoyé sur Internet.</p>' +
    '<div class="row"><button class="btn" id="exp">Exporter ma progression</button>' +
    '<button class="btn" id="imp">Importer une sauvegarde</button>' +
    '<button class="btn" id="raz" style="color:var(--bad)">Réinitialiser ce compte</button></div></div>';

  $('#exp').onclick = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    modal('<h2>Exporter</h2><p class="small muted" style="font-family:var(--ff-b);margin:8px 0">Copie ce code et garde-le : il contient toute ta progression.</p>' +
      '<textarea class="txtin" rows="6" readonly style="font-family:var(--ff-m);font-size:11px">' + data + '</textarea>');
  };
  $('#imp').onclick = () => {
    modal('<h2>Importer</h2><p class="small muted" style="font-family:var(--ff-b);margin:8px 0">Colle ici un code d’export. Attention : cela remplacera ta progression actuelle.</p>' +
      '<textarea class="txtin" id="impdata" rows="6" style="font-family:var(--ff-m);font-size:11px"></textarea>' +
      '<button class="btn p wide" id="impgo" style="margin-top:10px">Importer</button>', () => {
        $('#impgo').onclick = () => {
          try {
            const o = JSON.parse(decodeURIComponent(escape(atob($('#impdata').value.trim()))));
            if (!o || typeof o !== 'object' || !('coins' in o)) throw new Error('format');
            DB.users[USER].save = o; login(USER); commit(); closeModal();
            toast('Progression importée', 'win'); renderApp();
          } catch (e) { toast('Code invalide'); }
        };
      });
  };
  $('#raz').onclick = () => {
    if (!confirm('Effacer toute la progression de ce compte ? C’est définitif.')) return;
    if (!confirm('Vraiment sûr ? Tous les cours, fiches et succès seront perdus.')) return;
    DB.users[USER].save = blankSave(); login(USER); commit(); renderApp();
    toast('Compte réinitialisé');
  };
};

/* ============================================================
   BOUTIQUE
   ============================================================ */
VIEWS.boutique = function (host, args) {
  const cat = SHOPCATS.some(c => c[0] === args[0]) ? args[0] : 'theme';
  const info = SHOPCATS.find(c => c[0] === cat);

  const preview = (cat, o) => {
    if (cat === 'theme') {
      const v = o.vars ? o.vars[effTheme()] : null;
      const bg = v ? v['--surface'] : 'var(--surface)', ink = v ? v['--ink'] : 'var(--ink)', br = v ? v['--brand'] : 'var(--brand)';
      return '<div style="width:100%;height:100%;background:' + bg + ';display:flex;align-items:center;justify-content:center;gap:6px">' +
        '<span style="width:22px;height:22px;border-radius:5px;background:' + br + '"></span>' +
        '<span style="width:44px;height:8px;border-radius:99px;background:' + ink + ';opacity:.75"></span></div>';
    }
    if (cat === 'avatar') return avatarSVG(o.id, 58);
    if (cat === 'banner') return '<div style="width:100%;height:100%;' + o.css + '"></div>';
    if (cat === 'frame') return '<div style="width:46px;height:46px;border-radius:50%;background:var(--surface2);' + o.css + '"></div>';
    if (cat === 'title') return '<span style="font-family:var(--ff-d);font-weight:700;font-size:13px;text-align:center;padding:0 8px">' + esc(o.n) + '</span>';
    if (cat === 'back') return '<div style="width:100%;height:100%;background:var(--surface2);' + o.css + '"></div>';
    return '';
  };

  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Boutique</div>' +
    '<h1>Boutique</h1><p>Dépense tes δ pour personnaliser ton profil et repeindre l’interface. Les thèmes changent l’apparence complète du site, en clair comme en sombre.</p></div>' +
    '<span class="stat coin"><b>' + nfmt(S.coins) + '</b> δ</span></div>' +

    pcardHTML() +

    '<div class="tabs" style="margin:18px 0">' + SHOPCATS.map(c =>
      '<button data-cat="' + c[0] + '" class="' + (cat === c[0] ? 'on' : '') + '">' + esc(c[1]) + '</button>').join('') + '</div>' +
    '<p class="small muted" style="font-family:var(--ff-b);margin-bottom:14px">' + esc(info[2]) + '</p>' +

    '<div class="grid g3">' + SHOP[cat].map(o => {
      const owned = S.shop.owned.indexOf(o.id) >= 0, eq = S.shop.eq[cat] === o.id;
      return '<div class="shopitem"' + (eq ? ' style="border-color:var(--brand);box-shadow:0 0 0 2px var(--brand-soft)"' : '') + '>' +
        '<div class="prev">' + preview(cat, o) + '</div>' +
        '<h4>' + esc(o.n) + '</h4>' +
        (o.d ? '<p class="small muted" style="font-family:var(--ff-b);font-size:12px">' + esc(o.d) + '</p>' : '') +
        (eq ? '<span class="pill t-ok">équipé</span>'
          : owned ? '<button class="btn sm" data-eq="' + o.id + '">Équiper</button>'
            : '<button class="btn sm p" data-buy="' + o.id + '">' + (o.prix ? o.prix + ' δ' : 'Gratuit') + '</button>') +
        (!owned ? '<span class="price">' + (o.prix ? nfmt(o.prix) + ' δ' : 'offert') + '</span>' : '') +
        '</div>';
    }).join('') + '</div>';

  $$('[data-cat]').forEach(b => b.onclick = () => go('boutique/' + b.dataset.cat));
  $$('[data-buy]').forEach(b => b.onclick = () => {
    const o = shopFind(cat, b.dataset.buy);
    if (!spend(o.prix)) return;
    S.shop.owned.push(o.id); S.shop.eq[cat] = o.id;
    commit(); applySkin(); checkSucces();
    toast('« ' + o.n +' » acheté et équipé', 'win');
    burstAt(innerWidth / 2, 200, 30);
    renderApp(); go('boutique/' + cat); route();
  });
  $$('[data-eq]').forEach(b => b.onclick = () => {
    S.shop.eq[cat] = b.dataset.eq; commit(); applySkin();
    toast('Équipé'); renderApp(); go('boutique/' + cat); route();
  });
};

/* ============================================================
   SUCCES
   ============================================================ */
VIEWS.succes = function (host) {
  const obtenus = SUCCES.filter(a => S.succes[a.id]);
  const gagne = obtenus.reduce((a, b) => a + b.r, 0);
  host.innerHTML = '<div class="pagehead"><div class="grow"><div class="eyebrow">Succès</div>' +
    '<h1>Succès</h1><p>' + obtenus.length + ' succès sur ' + SUCCES.length + ' — ' + nfmt(gagne) + ' δ gagnés grâce à eux.</p>' +
    '<div class="bar" style="margin-top:10px;max-width:340px"><i style="width:' + Math.round(100 * obtenus.length / SUCCES.length) + '%"></i></div></div></div>' +
    '<div class="grid g2">' + SUCCES.map(a => {
      const on = !!S.succes[a.id];
      return '<div class="badge' + (on ? '' : ' off') + '">' +
        '<i style="font-size:22px;color:' + (on ? 'var(--coin)' : 'var(--faint)') + '">' + a.i + '</i>' +
        '<span style="flex:1"><b>' + esc(a.n) + '</b><span>' + esc(a.d) + '</span></span>' +
        '<span class="pill ' + (on ? 't-ok' : 't-neutral') + '">' + (on ? '✓ ' : '') + a.r + ' δ</span></div>';
    }).join('') + '</div>';
};
