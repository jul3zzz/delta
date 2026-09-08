/* ============================================================
   Delta — mini-jeux. Un moteur commun (runGame) et dix jeux.
   Types de manche : choice · multi · order · map · slider
   ============================================================ */

/* ---------- pools de donnees ---------- */
const POOL_DATES = [
  [1914, 'Attentat de Sarajevo'], [1916, 'Bataille de Verdun'], [1917, 'Révolutions russes'],
  [1918, 'Armistice du 11 novembre'], [1919, 'Traité de Versailles'], [1929, 'Krach de Wall Street'],
  [1933, 'Hitler devient chancelier'], [1936, 'Front populaire'], [1939, 'Invasion de la Pologne'],
  [1940, 'Appel du 18 juin'], [1942, 'Conférence de Wannsee'], [1942, 'Rafle du Vél’ d’Hiv’'],
  [1944, 'Débarquement de Normandie'], [1944, 'Droit de vote des femmes'], [1945, 'Capitulation allemande'],
  [1945, 'Création de la Sécurité sociale'], [1947, 'Plan Marshall'], [1948, 'Blocus de Berlin'],
  [1949, 'Création de l’OTAN'], [1950, 'Déclaration Schuman'], [1954, 'Début de la guerre d’Algérie'],
  [1955, 'Conférence de Bandung'], [1957, 'Traité de Rome'], [1958, 'Naissance de la Vᵉ République'],
  [1960, 'Année de l’Afrique'], [1961, 'Construction du mur de Berlin'], [1962, 'Indépendance de l’Algérie'],
  [1962, 'Crise des missiles de Cuba'], [1967, 'Loi Neuwirth sur la contraception'], [1968, 'Mai 68'],
  [1974, 'Majorité à 18 ans'], [1975, 'Loi Veil sur l’IVG'], [1981, 'Alternance : Mitterrand élu'],
  [1985, 'Accords de Schengen'], [1989, 'Chute du mur de Berlin'], [1991, 'Disparition de l’URSS'],
  [1992, 'Traité de Maastricht'], [2001, 'Attentats du 11 septembre'], [2002, 'Euro en pièces et billets'],
  [2004, 'Élargissement de l’UE à l’Est'], [2020, 'Brexit'], [1848, 'Suffrage universel masculin'],
  [1881, 'Loi sur la liberté de la presse'], [1901, 'Loi sur les associations'], [1905, 'Loi de séparation'],
  [1997, 'Suspension du service militaire'], [2000, 'Passage au quinquennat'], [2022, 'Invasion de l’Ukraine']
];

const POOL_QUI = [
  ['Jean Jaurès', ['Je suis un chef socialiste français.', 'Je me bats jusqu’au bout contre la guerre.', 'Je suis assassiné au café du Croissant le 31 juillet 1914.'], ['Léon Blum', 'Georges Clemenceau', 'Aristide Briand']],
  ['Lénine', ['Je rentre d’exil dans un wagon scellé.', 'Je lance : « Tout le pouvoir aux soviets ! »', 'Je dirige la révolution d’Octobre 1917.'], ['Trotski', 'Staline', 'Nicolas II']],
  ['Staline', ['Mon vrai nom est Djougachvili.', 'J’impose les plans quinquennaux et la collectivisation.', 'J’organise les Grandes Purges de 1936-1938.'], ['Lénine', 'Khrouchtchev', 'Gorbatchev']],
  ['Léon Blum', ['Je suis le premier socialiste chef du gouvernement français.', 'Je négocie les accords Matignon.', 'Je préside le Front populaire en 1936.'], ['Jean Jaurès', 'Édouard Daladier', 'Vincent Auriol']],
  ['Charles de Gaulle', ['Le 18 juin 1940, je parle à la BBC.', 'Je fonde la France libre.', 'Je fonde la Vᵉ République en 1958.'], ['Philippe Pétain', 'Jean Moulin', 'Georges Pompidou']],
  ['Jean Moulin', ['Je suis préfet avant la guerre.', 'Je réunis la Résistance le 27 mai 1943.', 'Je meurs sans avoir parlé après mon arrestation.'], ['Charles de Gaulle', 'Pierre Brossolette', 'Jean Cavaillès']],
  ['Simone Veil', ['Je suis rescapée d’Auschwitz.', 'Je défends une loi devant 481 hommes et 9 femmes.', 'Mon nom est associé à la loi de 1975 sur l’IVG.'], ['Gisèle Halimi', 'Marguerite Yourcenar', 'Louise Weiss']],
  ['Robert Schuman', ['Je suis ministre des Affaires étrangères.', 'Je propose de mettre en commun le charbon et l’acier.', 'Le 9 mai est devenu la Journée de l’Europe grâce à ma déclaration.'], ['Jean Monnet', 'Konrad Adenauer', 'Alcide De Gasperi']],
  ['Mikhaïl Gorbatchev', ['J’arrive au pouvoir en 1985.', 'Je lance la perestroïka et la glasnost.', 'Je démissionne le 25 décembre 1991.'], ['Boris Eltsine', 'Leonid Brejnev', 'Nikita Khrouchtchev']],
  ['Winston Churchill', ['Je dirige le Royaume-Uni pendant la guerre.', 'Je parle d’un « rideau de fer » en 1946.', 'Je promets « du sang, du labeur, des larmes et de la sueur ».'], ['Clement Attlee', 'Franklin Roosevelt', 'Neville Chamberlain']],
  ['Montesquieu', ['J’écris au XVIIIᵉ siècle.', 'Je théorise la séparation des pouvoirs.', 'J’écris : « il faut que le pouvoir arrête le pouvoir ».'], ['Rousseau', 'Voltaire', 'Diderot']],
  ['Franklin Roosevelt', ['Je suis élu président en 1932 en pleine crise.', 'Je lance le New Deal.', 'Je parle de « l’arsenal des démocraties ».'], ['Herbert Hoover', 'Harry Truman', 'Woodrow Wilson']],
  ['Marianne', ['Je porte un bonnet phrygien.', 'Mon buste orne toutes les mairies.', 'Je représente la République française.'], ['Jeanne d’Arc', 'La Liberté', 'Athéna']],
  ['Jean Monnet', ['Je rédige le texte que lira Robert Schuman.', 'On me surnomme « l’inspirateur » de l’Europe.', 'Je préside la première Haute Autorité de la CECA.'], ['Robert Schuman', 'Paul-Henri Spaak', 'Jacques Delors']]
];

const POOL_BLOC = [
  ['OTAN', 'ouest'], ['Pacte de Varsovie', 'est'], ['Plan Marshall', 'ouest'], ['CAEM', 'est'],
  ['RFA', 'ouest'], ['RDA', 'est'], ['Économie planifiée', 'est'], ['Économie de marché', 'ouest'],
  ['Parti unique', 'est'], ['Élections libres et pluralistes', 'ouest'], ['Doctrine Truman', 'ouest'],
  ['Doctrine Jdanov', 'est'], ['Berlin-Ouest', 'ouest'], ['Mur de Berlin (construit par)', 'est'],
  ['Kolkhozes', 'est'], ['Société de consommation', 'ouest'], ['Solidarność (contre le régime)', 'est'],
  ['Pont aérien de 1948', 'ouest'], ['Goulag', 'est'], ['Plan quinquennal', 'est']
];

const POOL_INTOX = [
  ['Pendant le pont aérien de Berlin, un pilote américain a largué 23 tonnes de bonbons au bout de mouchoirs-parachutes.', true, 'Vrai : l’opération « Little Vittles » du pilote Gail Halvorsen.'],
  ['Le drapeau européen porte une étoile par État membre, ajoutée à chaque élargissement.', false, 'Faux : les douze étoiles sont un symbole de plénitude et n’ont jamais changé.'],
  ['La Marseillaise a été composée à Strasbourg, pas à Marseille.', true, 'Vrai : « Chant de guerre pour l’armée du Rhin », avril 1792.'],
  ['Le mur de Berlin est tombé après un vote officiel du gouvernement est-allemand.', false, 'Faux : il est tombé après une conférence de presse confuse de Günter Schabowski.'],
  ['Un cartographe a inventé une chaîne de montagnes en Afrique qui a figuré dans les atlas pendant un siècle.', true, 'Vrai : les « montagnes de Kong », dessinées en 1798 et effacées après 1889.'],
  ['Le mot « tank » vient du fait que les chars étaient expédiés sous l’étiquette « réservoirs d’eau ».', true, 'Vrai : « water tanks for Russia », pour tromper les espions.'],
  ['Les taxis de la Marne ont transporté plus de 100 000 soldats en une nuit.', false, 'Faux : environ 4 000 soldats. L’essentiel des renforts est arrivé par train.'],
  ['Jesse Owens a remporté quatre médailles d’or aux Jeux de Berlin en 1936.', true, 'Vrai — un démenti public de la théorie raciale nazie.'],
  ['La France a reconnu officiellement le mot « guerre » pour l’Algérie dès 1962.', false, 'Faux : la reconnaissance officielle date de 1999.'],
  ['Le test de lecture de la Journée défense et citoyenneté sert d’observatoire national de l’illettrisme.', true, 'Vrai : environ 11 % des jeunes y sont détectés en difficulté de lecture.'],
  ['Le Mont-Saint-Michel a été « désensablé » par un chantier de 200 millions d’euros.', true, 'Vrai : entre 2006 et 2015, la digue a été remplacée par une passerelle.'],
  ['L’isoloir a été introduit en France dès la Révolution française.', false, 'Faux : il n’a été imposé qu’en 1913, après vingt ans de débats.'],
  ['La carte de Cassini a demandé quatre générations de la même famille.', true, 'Vrai : commencée en 1747, achevée près de 70 ans plus tard.'],
  ['Kourou a été choisi comme base spatiale parce qu’il y pleut peu.', false, 'Faux : c’est la proximité de l’équateur, qui fait gagner environ 15 % de charge utile.'],
  ['Une fausse information circule en moyenne six fois plus vite qu’une vraie sur les réseaux sociaux.', true, 'Vrai : étude du MIT publiée dans Science en 2018.'],
  ['Le Panthéon a accueilli une femme pour ses propres mérites dès le XIXᵉ siècle.', false, 'Faux : il a fallu attendre Marie Curie, en 1995.']
];

const POOL_NOTION = [
  ['Guerre où l’État mobilise toutes les ressources du pays, front et arrière confondus.', 'Guerre totale', ['Guerre froide', 'Guerre civile', 'Guerre d’anéantissement']],
  ['Destruction volontaire d’un groupe humain en raison de ce qu’il est.', 'Génocide', ['Massacre', 'Épuration', 'Déportation']],
  ['Régime à parti unique qui contrôle l’État, l’économie et les esprits.', 'Totalitarisme', ['Dictature militaire', 'Monarchie absolue', 'Autoritarisme']],
  ['Affrontement indirect entre les États-Unis et l’URSS de 1947 à 1991.', 'Guerre froide', ['Guerre totale', 'Détente', 'Coexistence pacifique']],
  ['Accès à l’indépendance des anciennes colonies.', 'Décolonisation', ['Mondialisation', 'Émancipation', 'Nationalisation']],
  ['Ville-centre, banlieue et communes dont 15 % des actifs viennent y travailler.', 'Aire urbaine', ['Agglomération', 'Métropole', 'Conurbation']],
  ['Extension de la ville sous forme de lotissements au-delà des banlieues.', 'Périurbanisation', ['Urbanisation', 'Gentrification', 'Rénovation urbaine']],
  ['Concentration des richesses et des fonctions de commandement dans les grandes villes.', 'Métropolisation', ['Littoralisation', 'Tertiarisation', 'Désindustrialisation']],
  ['Bande de 200 milles marins où un État exploite seul les ressources marines.', 'Zone économique exclusive', ['Eaux territoriales', 'Plateau continental', 'Domaine public maritime']],
  ['Croisement d’un phénomène dangereux et d’enjeux humains.', 'Risque', ['Aléa', 'Vulnérabilité', 'Catastrophe']],
  ['Influence exercée par la culture, la langue et l’image d’un pays.', 'Soft power', ['Hard power', 'Diplomatie', 'Rayonnement militaire']],
  ['Principe qui sépare l’État des cultes et garantit la liberté de conscience.', 'Laïcité', ['Athéisme', 'Neutralité', 'Tolérance']],
  ['Traitement défavorable fondé sur un critère interdit par la loi.', 'Discrimination', ['Injure', 'Harcèlement', 'Inégalité']],
  ['Lien juridique entre une personne et un État.', 'Nationalité', ['Citoyenneté', 'Résidence', 'Naturalisation']],
  ['Mise en relation croissante des différentes parties du monde par des flux.', 'Mondialisation', ['Colonisation', 'Métropolisation', 'Délocalisation']],
  ['Transfert de compétences de l’État vers les collectivités locales.', 'Décentralisation', ['Déconcentration', 'Privatisation', 'Aménagement']]
];

const POOL_FIGURE = [
  ['Une région industrielle', 'Un aplat de couleur', ['Une flèche', 'Un point', 'Un trait pointillé']],
  ['Un flux migratoire', 'Une flèche', ['Un aplat de couleur', 'Un carré', 'Un cercle']],
  ['Une métropole', 'Un point (cercle) proportionnel', ['Une flèche', 'Un aplat', 'Une hachure']],
  ['Une frontière', 'Un trait linéaire', ['Un aplat', 'Un point', 'Une étoile']],
  ['Un axe autoroutier majeur', 'Un trait épais', ['Un aplat', 'Un point', 'Une hachure']],
  ['Un espace en déprise', 'Une hachure', ['Une flèche', 'Un point', 'Un trait plein']],
  ['Un port de commerce', 'Un symbole ponctuel (ancre)', ['Un aplat', 'Une flèche', 'Une hachure']],
  ['Une aire d’influence', 'Un aplat dégradé', ['Un point', 'Un trait pointillé', 'Une étoile']]
];

const POOL_INSTIT = [
  ['Voter la loi', 'Le Parlement'], ['Nommer le Premier ministre', 'Le président de la République'],
  ['Juger les délits', 'Le tribunal correctionnel'], ['Vérifier la conformité des lois à la Constitution', 'Le Conseil constitutionnel'],
  ['Gérer les collèges', 'Le département'], ['Gérer les lycées', 'La région'],
  ['Gérer les écoles primaires', 'La commune'], ['Dissoudre l’Assemblée nationale', 'Le président de la République'],
  ['Renverser le gouvernement par une motion de censure', 'L’Assemblée nationale'],
  ['Juger les litiges avec l’administration', 'Le tribunal administratif'],
  ['Défendre les droits face aux services publics', 'Le Défenseur des droits'],
  ['Élire le maire', 'Le conseil municipal']
];

const POOL_MAPFR = [
  ['idf', 'Où se trouve Paris ?'], ['ara', 'Où se trouve Lyon ?'], ['pac', 'Où se trouve Marseille ?'],
  ['occ', 'Où se trouve Toulouse ?'], ['naq', 'Où se trouve Bordeaux ?'], ['hdf', 'Où se trouve Lille ?'],
  ['bre', 'Où se trouve Rennes ?'], ['ge', 'Où se trouve Strasbourg ?'], ['nor', 'Où se trouve Le Havre ?'],
  ['pdl', 'Où se trouve Nantes ?'], ['bfc', 'Où se trouve Dijon ?'], ['cvl', 'Où se trouve Orléans ?'],
  ['cor', 'Où se trouve Ajaccio ?']
];
const POOL_MAPEUR = [
  ['de', 'Clique sur l’Allemagne.'], ['es', 'Clique sur l’Espagne.'], ['it', 'Clique sur l’Italie.'],
  ['pl', 'Clique sur la Pologne.'], ['uk', 'Clique sur le Royaume-Uni.'], ['gr', 'Clique sur la Grèce.'],
  ['se', 'Clique sur la Suède.'], ['pt', 'Clique sur le Portugal.'], ['ro', 'Clique sur la Roumanie.'],
  ['ua', 'Clique sur l’Ukraine.'], ['ie', 'Clique sur l’Irlande.'], ['at', 'Clique sur l’Autriche.'],
  ['be', 'Clique sur la Belgique.'], ['nl', 'Clique sur les Pays-Bas.'], ['fi', 'Clique sur la Finlande.'],
  ['hu', 'Clique sur la Hongrie.'], ['bg', 'Clique sur la Bulgarie.'], ['dk', 'Clique sur le Danemark.']
];
const POOL_MAPDROM = [
  ['gf', 'Clique sur la Guyane.'], ['re', 'Clique sur La Réunion.'], ['gp', 'Clique sur la Guadeloupe.'],
  ['mq', 'Clique sur la Martinique.'], ['yt', 'Clique sur Mayotte.'], ['nc', 'Clique sur la Nouvelle-Calédonie.'],
  ['pf', 'Clique sur la Polynésie française.']
];

/* ---------- generateurs de manches ---------- */
function genFrise(n) {
  return Array.from({ length: n || 5 }, () => {
    const pick5 = shuffle(POOL_DATES).slice(0, 4).sort((a, b) => a[0] - b[0]);
    return {
      ty: 'order', q: 'Remets ces événements du plus ancien au plus récent.',
      o: pick5.map(d => d[1]), sub: pick5.map(d => String(d[0])),
      w: pick5.map(d => d[0] + ' : ' + d[1]).join(' · ')
    };
  });
}
function genDate(n) {
  return shuffle(POOL_DATES).slice(0, n || 6).map(d => ({
    ty: 'slider', q: 'En quelle année ? — ' + d[1], min: 1840, max: 2030, r: d[0], tol: 3,
    w: 'La bonne réponse est ' + d[0] + '.'
  }));
}
function genQui(n) {
  return shuffle(POOL_QUI).slice(0, n || 5).map(p => {
    const opts = shuffle([p[0]].concat(p[2]));
    return { ty: 'choice', q: 'Qui suis-je ?', indices: p[1], o: opts, r: opts.indexOf(p[0]), w: 'C’était ' + p[0] + '.' };
  });
}
function genBloc(n) {
  return shuffle(POOL_BLOC).slice(0, n || 8).map(b => ({
    ty: 'choice', q: b[0], o: ['Bloc de l’Ouest', 'Bloc de l’Est'], r: b[1] === 'ouest' ? 0 : 1,
    w: b[0] + ' relève du bloc de l’' + (b[1] === 'ouest' ? 'Ouest' : 'Est') + '.'
  }));
}
function genIntox(n) {
  return shuffle(POOL_INTOX).slice(0, n || 6).map(a => ({
    ty: 'choice', q: a[0], o: ['C’est vrai', 'C’est une intox'], r: a[1] ? 0 : 1, w: a[2]
  }));
}
function genNotion(n) {
  return shuffle(POOL_NOTION).slice(0, n || 6).map(p => {
    const opts = shuffle([p[1]].concat(p[2]));
    return { ty: 'choice', q: p[0], o: opts, r: opts.indexOf(p[1]), w: 'La notion attendue est : ' + p[1] + '.' };
  });
}
function genFigure(n) {
  return shuffle(POOL_FIGURE).slice(0, n || 6).map(p => {
    const opts = shuffle([p[1]].concat(p[2]));
    return { ty: 'choice', q: 'Quel figuré pour représenter : ' + p[0] + ' ?', o: opts, r: opts.indexOf(p[1]), w: 'Réponse : ' + p[1] + '.' };
  });
}
function genInstit(n) {
  const all = Array.from(new Set(POOL_INSTIT.map(p => p[1])));
  return shuffle(POOL_INSTIT).slice(0, n || 6).map(p => {
    const wrong = shuffle(all.filter(x => x !== p[1])).slice(0, 3);
    const opts = shuffle([p[1]].concat(wrong));
    return { ty: 'choice', q: 'Qui a cette compétence : « ' + p[0] + ' » ?', o: opts, r: opts.indexOf(p[1]), w: 'Réponse : ' + p[1] + '.' };
  });
}
function genMap(pool, mapName, n) {
  return shuffle(pool).slice(0, n || 6).map(p => ({ ty: 'map', q: p[1], map: mapName, code: p[0], w: '' }));
}
function genEclair(n) {
  const src = shuffle(EXOS.filter(e => e.ty === 'qcm')).slice(0, n || 12);
  return src.map(e => ({ ty: 'choice', q: e.q, o: e.o, r: e.r, w: e.w }));
}

/* ---------- catalogue ---------- */
const JEUX = [
  { id: 'j-frise', n: 'Frise chronologique', d: 'Remets les événements dans l’ordre, du plus ancien au plus récent.', i: '⌛', m: 'hist', diff: 2, gen: () => genFrise(5) },
  { id: 'j-date', n: 'La bonne année', d: 'Fais glisser le curseur pour trouver l’année exacte d’un événement.', i: '⌖', m: 'hist', diff: 3, gen: () => genDate(6) },
  { id: 'j-qui', n: 'Qui suis-je ?', d: 'Trois indices, un personnage. Plus tu devines vite, plus tu marques.', i: '☰', m: 'hist', diff: 2, gen: () => genQui(5) },
  { id: 'j-bloc', n: 'Est ou Ouest ?', d: 'Range chaque élément dans le bon bloc de la guerre froide.', i: '◐', m: 'hist', diff: 1, gen: () => genBloc(8) },
  { id: 'j-carte-fr', n: 'Carte muette : France', d: 'Clique sur la bonne région française.', i: '⬡', m: 'geo', diff: 2, gen: () => genMap(POOL_MAPFR, 'FR', 7) },
  { id: 'j-carte-eur', n: 'Carte muette : Europe', d: 'Clique sur le bon pays européen.', i: '⬢', m: 'geo', diff: 3, gen: () => genMap(POOL_MAPEUR, 'EUR', 8) },
  { id: 'j-carte-om', n: 'Carte muette : outre-mer', d: 'Retrouve les territoires ultramarins français.', i: '◈', m: 'geo', diff: 2, gen: () => genMap(POOL_MAPDROM, 'DROM', 6) },
  { id: 'j-figure', n: 'Le bon figuré', d: 'Choisis le figuré cartographique adapté à chaque information.', i: '✎', m: 'geo', diff: 2, gen: () => genFigure(6) },
  { id: 'j-notion', n: 'Le mot juste', d: 'Une définition, quatre notions : trouve la bonne.', i: '▤', m: 'geo', diff: 2, gen: () => genNotion(6) },
  { id: 'j-instit', n: 'Qui fait quoi ?', d: 'Associe chaque compétence à la bonne institution.', i: '⚖', m: 'emc', diff: 2, gen: () => genInstit(6) },
  { id: 'j-intox', n: 'Vrai ou intox ?', d: 'Certaines anecdotes sont authentiques, d’autres inventées. À toi de trancher.', i: '◎', m: 'emc', diff: 3, gen: () => genIntox(6) },
  { id: 'j-eclair', n: 'Quiz éclair', d: 'Douze questions tirées de tout le programme, sans temps mort.', i: '⚡', m: 'hist', diff: 3, gen: () => genEclair(12) }
];
const jeuById = id => JEUX.find(j => j.id === id);

/* ============================================================
   MOTEUR DE JEU
   ============================================================ */
function runGame(host, jeu) {
  const rounds = jeu.gen();
  let i = 0, ok = 0, vies = 3, serie = 0, best = 0;

  function head() {
    return '<div class="gamehead">' +
      '<b style="font-size:16px">' + jeu.i + ' ' + esc(jeu.n) + '</b>' +
      '<span class="pill ' + MAT[jeu.m].cls + '">' + MAT[jeu.m].n + '</span>' +
      '<span class="grow"></span>' +
      '<span class="mono small">Manche ' + Math.min(i + 1, rounds.length) + ' / ' + rounds.length + '</span>' +
      '<span class="hp">' + [0, 1, 2].map(k => '<i class="' + (k < vies ? '' : 'off') + '"></i>').join('') + '</span>' +
      (serie > 1 ? '<span class="streak">' + serie + ' d’affilée</span>' : '') +
      '</div>';
  }

  function finish() {
    const parfait = ok === rounds.length;
    const win = ok >= Math.ceil(rounds.length * .6);
    const d = elo(jeu.diff, win, 20);
    const coins = ok * 12 + (parfait ? 60 : 0), xp = ok * 7 + (parfait ? 30 : 0);
    S.stats.jeux = (S.stats.jeux || 0) + 1;
    const g = S.games[jeu.id] || { parties: 0, best: 0, parfait: false };
    g.parties++; g.best = Math.max(g.best, ok); if (parfait) g.parfait = true;
    S.games[jeu.id] = g;
    gain(coins, xp);
    commit(); checkSucces();
    host.innerHTML = '<div class="board center">' +
      '<div class="eyebrow">Partie terminée</div>' +
      '<div class="score" style="margin:12px 0;color:' + (win ? 'var(--ok)' : 'var(--bad)') + '">' + ok + ' / ' + rounds.length + '</div>' +
      (parfait ? '<p style="color:var(--ok);font-weight:600;margin-bottom:8px">Sans faute !</p>' : '') +
      '<p class="muted" style="margin-bottom:14px">+' + coins + ' δ · +' + xp + ' XP · ' + eloTag(d) + '</p>' +
      '<p class="small muted" style="margin-bottom:16px">Meilleur score sur ce jeu : ' + S.games[jeu.id].best + ' / ' + rounds.length + ' · ' + S.games[jeu.id].parties + ' partie(s)</p>' +
      '<div class="row" style="justify-content:center">' +
      '<button class="btn p" id="again">Rejouer</button>' +
      '<button class="btn" id="back">Retour aux jeux</button></div></div>';
    if (win) burstAt(innerWidth / 2, 200, parfait ? 90 : 50);
    $('#again').onclick = () => runGame(host, jeu);
    $('#back').onclick = () => go('jeux');
  }

  function next(good) {
    if (good) { ok++; serie++; best = Math.max(best, serie); }
    else { serie = 0; vies--; }
    i++;
    if (vies <= 0 || i >= rounds.length) return finish();
    draw();
  }

  function feedback(zone, good, why, after) {
    zone.innerHTML = '<div class="fb ' + (good ? 'ok' : 'no') + '"><b>' + (good ? '✓ Exact' : '✕ Raté') + '</b>' +
      '<span class="why">' + (why || '') + '</span></div>' +
      '<button class="btn p" id="nx" style="margin-top:12px">Continuer</button>';
    $('#nx').onclick = after;
    if (good && serie >= 2) toast(serie + 1 + ' bonnes réponses d’affilée');
  }

  function draw() {
    const r = rounds[i];
    let body = '';
    if (r.ty === 'choice') {
      body = '<p class="q" style="font-size:17px;margin-bottom:14px">' + r.q + '</p>' +
        (r.indices ? '<div class="rep" style="margin-bottom:14px">' + r.indices.map((x, k) => '<div><b>Indice ' + (k + 1) + '</b>' + esc(x) + '</div>').join('') + '</div>' : '') +
        '<div class="opts">' + r.o.map((o, k) => '<button class="opt" data-k="' + k + '"><span class="mk">' + 'ABCD'[k] + '</span><span>' + esc(o) + '</span></button>').join('') + '</div>';
    } else if (r.ty === 'order') {
      body = '<p class="q" style="font-size:17px;margin-bottom:6px">' + r.q + '</p>' +
        '<p class="small muted" style="margin-bottom:14px">Clique sur les cartes dans l’ordre chronologique.</p>' +
        '<div class="friserow" id="pool">' + shuffle(r.o.map((x, k) => [x, k])).map(p =>
          '<button class="frisecard" data-k="' + p[1] + '">' + esc(p[0]) + '</button>').join('') + '</div>' +
        '<div class="slotrow" id="chosen" style="min-height:44px;margin-top:10px"></div>';
    } else if (r.ty === 'map') {
      const zones = mapZones(r.map, 0, 0, 2.4);
      body = '<p class="q" style="font-size:17px;margin-bottom:12px">' + r.q + '</p>' +
        '<div class="mapgame"><svg viewBox="0 0 244 250" xmlns="http://www.w3.org/2000/svg">' +
        (CARTES_BASE[r.map].mer ? '<rect x="0" y="0" width="244" height="250" fill="' + col('mer') + '"/>' : '') +
        zones.map(z => z.contours.map(pt => '<polygon class="zone" data-c="' + z.c + '" points="' + pt + '" fill="' + col('terre') + '" stroke="' + col('l') + '" stroke-width="1"/>').join('')).join('') +
        '</svg></div>';
    } else if (r.ty === 'slider') {
      body = '<p class="q" style="font-size:17px;margin-bottom:6px">' + r.q + '</p>' +
        '<div class="bigyear" id="yr">' + Math.round((r.min + r.max) / 2) + '</div>' +
        '<div class="slid"><input type="range" id="sl" min="' + r.min + '" max="' + r.max + '" value="' + Math.round((r.min + r.max) / 2) + '"></div>' +
        '<div class="axis"><span>' + r.min + '</span><span>' + r.max + '</span></div>' +
        '<button class="btn p wide" id="val" style="margin-top:16px">Valider</button>';
    }
    host.innerHTML = head() + '<div class="board">' + body + '<div id="fbz"></div></div>';
    const fbz = $('#fbz');

    if (r.ty === 'choice') {
      $$('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k, good = k === r.r;
        $$('.opt').forEach((o, j) => { o.disabled = true; if (j === r.r) o.classList.add('good'); else if (j === k) o.classList.add('wrong'); });
        feedback(fbz, good, r.w, () => next(good));
      });
    } else if (r.ty === 'order') {
      const chosen = [];
      const pool = $('#pool'), slot = $('#chosen');
      $$('.frisecard', pool).forEach(b => b.onclick = () => {
        b.classList.add('used'); b.style.display = 'none';
        chosen.push(+b.dataset.k);
        slot.innerHTML = chosen.map((k, p) => '<span class="frisecard on"><span class="yr">' + (p + 1) + '</span>' + esc(r.o[k]) + '</span>').join('');
        if (chosen.length === r.o.length) {
          const good = chosen.every((k, p) => k === p);
          $$('.frisecard', slot).forEach((el, p) => el.classList.add(chosen[p] === p ? 'good' : 'wrong'));
          feedback(fbz, good, r.w, () => next(good));
        }
      });
    } else if (r.ty === 'map') {
      $$('.zone').forEach(z => z.onclick = () => {
        const good = z.dataset.c === r.code;
        const cible = $$('.zone').find(x => x.dataset.c === r.code);
        z.classList.add(good ? 'good' : 'wrong');
        if (!good && cible) cible.classList.add('good');
        $$('.zone').forEach(x => x.style.pointerEvents = 'none');
        const nom = (CARTES_BASE[r.map].z.find(x => x.c === r.code) || {}).n || '';
        feedback(fbz, good, 'Réponse : <strong>' + esc(nom) + '</strong>.', () => next(good));
      });
    } else if (r.ty === 'slider') {
      const sl = $('#sl'), yr = $('#yr');
      sl.oninput = () => { yr.textContent = sl.value; };
      $('#val').onclick = () => {
        const v = +sl.value, ecart = Math.abs(v - r.r), good = ecart <= r.tol;
        sl.disabled = true; $('#val').disabled = true;
        yr.textContent = v; yr.style.color = good ? 'var(--ok)' : 'var(--bad)';
        feedback(fbz, good, r.w + (ecart ? ' Tu étais à ' + ecart + ' an(s).' : ' Pile dessus !'), () => next(good));
      };
    }
  }
  draw();
}
