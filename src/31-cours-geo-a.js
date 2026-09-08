/* ============================================================
   Delta — cours de GEOGRAPHIE (1/2) : dynamiques territoriales de la France.
   ============================================================ */
COURS.push(
{
  id: 'g1', m: 'geo', th: 'Dynamiques territoriales de la France',
  t: 'Les aires urbaines : une France des villes',
  d: 'Huit Français sur dix vivent dans une aire urbaine — et la ville continue de s’étaler bien au-delà de ses murs.',
  mo: ['aire urbaine', 'périurbanisation', 'métropolisation', 'étalement urbain'],
  sec: [
    ['p', 'La France a longtemps été un pays de villages. En 1936, un Français sur deux vivait à la campagne. Aujourd’hui, <strong>plus de 80 %</strong> de la population vit dans une aire urbaine, et la ville ne cesse de déborder de ses limites : on peut habiter à 40 km de Toulouse et pourtant vivre pleinement « toulousain ».'],
    ['def', [
      ['Aire urbaine (aire d’attraction d’une ville)', 'ensemble formé par une ville-centre, sa banlieue et les communes dont au moins 15 % des actifs vont y travailler.'],
      ['Périurbanisation', 'extension des espaces urbanisés au-delà des banlieues, sous forme de lotissements pavillonnaires.'],
      ['Métropolisation', 'concentration croissante des habitants, des emplois qualifiés, des richesses et des décisions dans les plus grandes villes.']
    ]],
    ['h', 'La structure d’une aire urbaine'],
    ['fig', [
      ['t', 145, 12, 'Les trois couronnes d’une aire urbaine', 9, 'middle', 'i', 700],
      ['c', 96, 76, 56, 'g:10', 'l'],
      ['c', 96, 76, 38, 'g:20', 'l'],
      ['c', 96, 76, 20, 'g:38', 'g'],
      ['t', 96, 78, 'VILLE-CENTRE', 7.5, 'middle', 'g', 700],
      ['t', 96, 44, 'BANLIEUE', 7.5, 'middle', 'i2', 600],
      ['t', 96, 26, 'COURONNE PÉRIURBAINE', 7.5, 'middle', 'i2', 600],
      ['a', 60, 108, 84, 88, 'k', '', 1.5], ['a', 132, 108, 108, 88, 'k', '', 1.5],
      ['t', 96, 122, 'navettes domicile-travail quotidiennes', 7, 'middle', 'k', 600],
      ['t', 200, 34, 'Ville-centre :', 7.5, 'start', 'g', 700],
      ['t', 200, 44, 'commerces, services,', 7, 'start', 'm'], ['t', 200, 52, 'emplois qualifiés, patrimoine', 7, 'start', 'm'],
      ['t', 200, 68, 'Banlieue :', 7.5, 'start', 'b', 700],
      ['t', 200, 78, 'grands ensembles, zones', 7, 'start', 'm'], ['t', 200, 86, 'commerciales, industries', 7, 'start', 'm'],
      ['t', 200, 102, 'Couronne périurbaine :', 7.5, 'start', 'e', 700],
      ['t', 200, 112, 'lotissements pavillonnaires,', 7, 'start', 'm'], ['t', 200, 120, 'dépendance à la voiture', 7, 'start', 'm']
    ], 318, 132, 'L’organisation concentrique d’une aire urbaine.'],
    ['h', 'Pourquoi la ville s’étale'],
    ['p', 'Le mouvement s’explique par un calcul très concret des ménages : le prix du mètre carré diminue quand on s’éloigne du centre. Beaucoup préfèrent une maison avec jardin à 30 km plutôt qu’un appartement en ville. S’y ajoutent la généralisation de l’automobile, l’amélioration des routes et l’aspiration à un cadre de vie « au vert ».'],
    ['p', 'Cet <strong>étalement urbain</strong> a un coût : consommation de terres agricoles (l’équivalent d’un département tous les dix ans), allongement des trajets (un actif périurbain parcourt en moyenne deux fois plus de kilomètres qu’un urbain), pollution, et coût des équipements publics à étendre toujours plus loin. La loi « Climat et résilience » de 2021 fixe un objectif de « <strong>zéro artificialisation nette</strong> » d’ici 2050.'],
    ['anec', 'Le centre commercial qui a inventé le samedi', 'En 1969 ouvre à Parly 2, près de Versailles, l’un des premiers grands centres commerciaux français, avec ce slogan devenu célèbre : « Vous n’avez pas encore visité Parly 2 ? » Il propose un parking gratuit de 4 000 places, la climatisation et des boutiques ouvertes le samedi. En quelques années, le rythme des familles bascule : le samedi après-midi devient le moment des courses en périphérie, ce qui vide progressivement les centres-villes. Un demi-siècle plus tard, les pouvoirs publics dépensent des millions pour faire l’inverse : « Action Cœur de ville » finance la revitalisation de 234 centres-villes moyens.'],
    ['h', 'Une hiérarchie urbaine très inégale'],
    ['p', 'La France est marquée par la <strong>macrocéphalie parisienne</strong> : l’aire d’attraction de Paris compte plus de 13 millions d’habitants, soit près de sept fois celle de Lyon. Cette domination est un héritage de siècles de centralisation. Depuis les lois de décentralisation, des métropoles régionales (Lyon, Marseille, Toulouse, Bordeaux, Lille, Nantes, Rennes, Montpellier) se renforcent, souvent dans le Sud et l’Ouest.'],
    ['fig', [
      ['map', 'FR', 128, 8, 1.42, {
        base: 'terre', trait: 'l',
        fill: { idf: 'k:36', ara: 'h:24', pac: 'h:24', occ: 'g:18', naq: 'g:18', pdl: 'g:18', bre: 'g:18', hdf: 'b:16', ge: 'b:16', nor: 'b:16', cvl: 'b:16', bfc: 'b:16', cor: 'b:16' }
      }],
      ['ancre', 'FR', 128, 8, 1.42, [
        ['paris', 'metropole', 'k', 8, 'Paris 13,1 M', 'start', null, null, 7.5],
        ['lyon', 'metropole', 'h', 5.5, 'Lyon 2,3 M', 'start', null, null, 7],
        ['marseille', 'metropole', 'h', 5, 'Marseille 1,8 M', 'start', null, 6, 7],
        ['toulouse', 'metropole', 'g', 4.6, 'Toulouse 1,5 M', 'end', null, null, 7],
        ['bordeaux', 'metropole', 'g', 4.4, 'Bordeaux 1,3 M', 'end', null, null, 7],
        ['lille', 'metropole', 'b', 4.4, 'Lille 1,5 M', 'start', null, null, 7],
        ['nantes', 'metropole', 'g', 4, 'Nantes 1,0 M', 'end', null, null, 7]
      ]],
      ['key', 4, 26, [
        ['metropole', 'k', 'Aire de Paris'],
        ['metropole', 'h', 'Métropoles > 1,5 M hab.'],
        ['metropole', 'g', 'Métropoles dynamiques'],
        ['f', 'g:18', 'Régions attractives'],
        ['f', 'b:16', 'Croissance faible']
      ], 'Le réseau urbain'],
      ['rose', 20, 124, 9]
    ], 290, 152, 'Les principales aires urbaines et la macrocéphalie parisienne.'],
    ['keep', [
      'Plus de 80 % des Français vivent dans une aire urbaine (ville-centre + banlieue + couronne périurbaine).',
      'La périurbanisation étale la ville : maison individuelle, voiture, artificialisation des sols.',
      'La métropolisation concentre emplois qualifiés et richesses dans les grandes villes.',
      'Paris domine largement le réseau urbain : c’est la macrocéphalie parisienne.'
    ]]
  ]
},

{
  id: 'g2', m: 'geo', th: 'Dynamiques territoriales de la France',
  t: 'Les espaces productifs industriels',
  d: 'Des vallées noires aux technopôles ensoleillés : la géographie de l’industrie française s’est retournée.',
  mo: ['désindustrialisation', 'technopôle', 'littoralisation', 'ZIP'],
  sec: [
    ['p', 'L’industrie ne représente plus que 13 % du PIB et 10 % des emplois français, contre 25 % en 1970. Mais elle n’a pas disparu : elle s’est <strong>déplacée</strong>, <strong>transformée</strong> et <strong>concentrée</strong> sur des territoires très différents de ceux du XIXᵉ siècle.'],
    ['def', [
      ['Espace productif', 'espace aménagé et utilisé pour produire des biens ou des services.'],
      ['Désindustrialisation', 'recul de l’emploi et des activités industrielles dans une région ou un pays.'],
      ['Technopôle', 'site regroupant industries de haute technologie, laboratoires de recherche et universités.']
    ]],
    ['h', 'Les régions industrielles anciennes en crise'],
    ['p', 'Le Nord (charbon, textile), la Lorraine (fer, sidérurgie), la Saint-Étienne minière : ces régions nées de la révolution industrielle ont perdu leur base économique entre 1960 et 1990. La dernière mine de charbon française a fermé en 2004, à Creutzwald. Ces <strong>friches industrielles</strong> laissent des paysages, des mémoires et des difficultés sociales durables — mais aussi des reconversions réussies : le Louvre-Lens ouvert en 2012 sur une ancienne fosse, les terrils du bassin minier classés au patrimoine mondial de l’UNESCO en 2012.'],
    ['h', 'Les nouveaux espaces gagnants'],
    ['ul', [
      '<strong>Les littoraux</strong> : les zones industrialo-portuaires (ZIP) du Havre, de Dunkerque, de Marseille-Fos raffinent, sidérurgisent et transforment les matières premières importées. C’est la <strong>littoralisation</strong>.',
      '<strong>Le Sud et l’Ouest ensoleillés</strong> : Toulouse (Airbus, spatial), Sophia-Antipolis près de Nice, Montpellier, Grenoble (microélectronique, Minatec). Ces technopôles attirent chercheurs et ingénieurs par la qualité de vie autant que par les salaires.',
      '<strong>Les vallées et couloirs de circulation</strong> : la vallée du Rhône, l’axe Paris-Lille, les abords des autoroutes et des aéroports.',
      '<strong>L’Île-de-France</strong> reste la première région industrielle française par la valeur produite, avec un tissu très diversifié et le plateau de Saclay.'
    ]],
    ['fig', [
      ['map', 'FR', 128, 8, 1.42, { base: 'terre', trait: 'l', hatch: { hdf: 'm', ge: 'm' } }],
      ['ancre', 'FR', 128, 8, 1.42, [
        ['toulouse', 'usine', 'g', 5.5, 'Toulouse', 'end', null, null, 7],
        ['grenoble', 'usine', 'g', 5, 'Grenoble', 'start', null, null, 7],
        ['sophia', 'usine', 'g', 5, 'Sophia-Antipolis', 'end', null, 9, 7],
        ['fos', 'port', 'b', 5.5, 'Marseille-Fos', 'end', null, 8, 7],
        ['lehavre', 'port', 'b', 5.5, 'Le Havre', 'end', null, null, 7],
        ['dunkerque', 'port', 'b', 5, 'Dunkerque', 'start', null, null, 7],
        ['saclay', 'usine', 'b', 4.5, 'Saclay', 'start', null, -4, 7],
        ['lens', 'none', 'm', 0, 'bassin minier', 'end', -3, -7, 6.8]
      ]],
      ['key', 4, 22, [
        ['h', 'm', 'Anciennes régions industrielles'],
        ['usine', 'g', 'Technopôles'],
        ['port', 'b', 'Zones industrialo-portuaires']
      ], 'Espaces productifs'],
      ['t', 66, 108, 'Déplacement vers le sud', 7.5, 'middle', 'k', 700],
      ['t', 66, 118, 'et vers les littoraux', 7.5, 'middle', 'k', 700],
      ['rose', 20, 138, 9]
    ], 290, 156, 'La recomposition des espaces industriels français.'],
    ['anec', 'La ville qui a poussé autour d’un avion', 'Toulouse est devenue capitale européenne de l’aéronautique presque par accident : pendant la Première Guerre mondiale, on y installe des usines d’aviation parce que la ville est <em>loin du front</em>. Puis l’Aéropostale y installe sa base — Mermoz, Saint-Exupéry y décollent. Un siècle plus tard, Airbus emploie près de 30 000 personnes dans l’agglomération, et l’A380 a nécessité la construction d’un « itinéraire à grand gabarit » de 240 km depuis Bordeaux, avec des ronds-points démontables et des lignes électriques relevables pour laisser passer les tronçons de fuselage.'],
    ['keep', [
      'L’industrie représente environ 13 % du PIB, mais reste stratégique (aéronautique, luxe, agroalimentaire, nucléaire).',
      'Les régions industrielles anciennes (Nord, Lorraine) se reconvertissent ; friches et mémoire ouvrière.',
      'Les espaces gagnants : littoraux (ZIP), Sud et Ouest (technopôles), axes de circulation, Île-de-France.',
      'Deux processus clés : littoralisation et héliotropisme (attraction du Sud ensoleillé).'
    ]]
  ]
},

{
  id: 'g3', m: 'geo', th: 'Dynamiques territoriales de la France',
  t: 'Les espaces productifs agricoles',
  d: 'Moins d’un agriculteur pour cent Français, et pourtant la première agriculture d’Europe.',
  mo: ['PAC', 'agriculture productiviste', 'AOP', 'agriculture biologique'],
  sec: [
    ['p', 'En 1950, la France comptait 7 millions d’agriculteurs. Aujourd’hui, ils sont environ <strong>400 000 exploitations</strong> pour moins de 2 % de la population active — et pourtant la production a triplé. Cette « révolution silencieuse » a totalement transformé les campagnes.'],
    ['h', 'Une agriculture productiviste'],
    ['p', 'La <strong>modernisation</strong> repose sur la mécanisation (1 tracteur pour 10 exploitations en 1950, plusieurs par exploitation aujourd’hui), les engrais et pesticides, la sélection des semences, l’irrigation, l’agrandissement des parcelles par le <strong>remembrement</strong> — qui a fait disparaître des milliers de kilomètres de haies bocagères. La <strong>PAC</strong> (Politique agricole commune européenne, 1962) a soutenu ce mouvement par des prix garantis puis des aides directes ; elle représente encore près d’un tiers du budget de l’UE.'],
    ['fig', [
      ['courbe', 36, 20, 208, 72, [
        { n: 'Exploitations (×10 000)', c: 'g', d: [[1955, 230], [1970, 158], [1988, 101], [2000, 66], [2010, 49], [2020, 39]] },
        { n: 'Rendement blé (q/ha)', c: 'h', d: [[1955, 22], [1970, 36], [1988, 62], [2000, 71], [2010, 72], [2020, 70]] }
      ], { titre: 'Moins d’exploitations, beaucoup plus de rendement', y1: 240, xticks: [1955, 1988, 2020] }],
      ['t', 140, 108, 'La France produit plus qu’en 1955 avec six fois moins d’exploitations.', 7, 'middle', 'm']
    ], 280, 116, 'La révolution agricole française (ordres de grandeur).'],
    ['h', 'Des espaces agricoles très différenciés'],
    ['tab', ['Type d’espace', 'Où ?', 'Caractéristiques'], [
      ['Openfield céréalier', 'Bassin parisien, Beauce, Picardie', 'Grandes exploitations, céréales et betteraves, très mécanisées, rendements records'],
      ['Élevage bocager', 'Bretagne, Normandie, Massif central', 'Lait, viande ; élevages hors-sol intensifs en Bretagne'],
      ['Viticulture et cultures spécialisées', 'Bordelais, Champagne, Bourgogne, vallée du Rhône', 'Forte valeur ajoutée, exportations, appellations protégées'],
      ['Maraîchage et fruits', 'Vallée du Rhône, Sud-Ouest, littoraux', 'Cultures irriguées, serres, main-d’œuvre saisonnière']
    ], 'Les grands types d’espaces agricoles français.'],
    ['anec', 'Le poulet qui voyage plus que vous', 'La Bretagne concentre l’essentiel de l’élevage hors-sol français : 55 % des porcs, 40 % des volailles. Pourquoi cette région et pas une autre ? Parce que le soja importé du Brésil arrive par les ports bretons : il est moins coûteux de faire venir l’aliment que de déplacer les animaux. Résultat, une chaîne mondiale où le soja parcourt 9 000 km, le poulet 300 km, et où l’excès de lisier pose un problème d’algues vertes sur les côtes. La géographie agricole se lit à l’échelle du monde, pas seulement du champ.'],
    ['h', 'Les nouveaux défis'],
    ['ul', [
      '<strong>Environnementaux</strong> : pollution des eaux par les nitrates, effondrement des populations d’insectes, érosion des sols, sécheresses répétées.',
      '<strong>Économiques</strong> : revenus faibles et instables, endettement, dépendance aux cours mondiaux et aux aides.',
      '<strong>Sociaux</strong> : un agriculteur sur deux partira à la retraite d’ici dix ans, et la relève n’est pas assurée.',
      '<strong>Alternatives</strong> : agriculture biologique (environ 10 % de la surface agricole), circuits courts, AOP et labels de qualité, agroécologie.'
    ]],
    ['keep', [
      'Agriculture productiviste : mécanisation, intrants, remembrement, soutien de la PAC.',
      'La France est la première puissance agricole de l’UE ; l’agroalimentaire est un secteur exportateur majeur.',
      'Espaces contrastés : openfield céréalier, élevage bocager, viticulture, maraîchage.',
      'Défis : environnement, revenus, renouvellement des générations ; essor du bio et des circuits courts.'
    ]]
  ]
},

{
  id: 'g4', m: 'geo', th: 'Dynamiques territoriales de la France',
  t: 'Services et tourisme : l’économie dominante',
  d: 'Trois emplois sur quatre : les services structurent aujourd’hui les territoires français plus que les usines.',
  mo: ['tertiarisation', 'tourisme', 'quartier d’affaires', 'attractivité'],
  sec: [
    ['p', 'Les services (commerce, santé, éducation, banque, transport, tourisme, informatique) représentent aujourd’hui <strong>plus de 75 % des emplois</strong> français. C’est la <strong>tertiarisation</strong> de l’économie. Leur localisation obéit à une règle simple : les services suivent la population, et les services les plus rares suivent les grandes villes.'],
    ['h', 'Une hiérarchie des services'],
    ['ul', [
      'Services <strong>de proximité</strong> (boulangerie, école, médecin généraliste) : présents presque partout, mais fragilisés dans les espaces peu peuplés.',
      'Services <strong>intermédiaires</strong> (lycée, hôpital, supermarché) : dans les villes moyennes.',
      'Services <strong>supérieurs</strong> ou métropolitains (CHU, université, sièges sociaux, tribunaux, recherche) : dans les métropoles seulement.'
    ]],
    ['p', 'La <strong>Défense</strong>, premier quartier d’affaires européen, concentre à elle seule 180 000 salariés et 3,6 millions de m² de bureaux sur 160 hectares — l’équivalent de la population de Rennes qui viendrait travailler chaque jour sur un espace grand comme un arrondissement parisien.'],
    ['h', 'La France, première destination touristique mondiale'],
    ['chiffres', [
      ['100 M', 'de touristes étrangers par an'],
      ['7,5 %', 'du PIB français'],
      ['2 M', 'd’emplois liés au tourisme'],
      ['1ᵉʳ', 'rang mondial pour la fréquentation']
    ]],
    ['p', 'Cette réussite tient à une combinaison rare : un patrimoine exceptionnel (Paris, châteaux de la Loire, Mont-Saint-Michel), une grande diversité de milieux (mer, montagne, campagne) sur un territoire compact, et une position centrale en Europe. Les espaces touristiques majeurs sont les <strong>littoraux</strong> (Côte d’Azur, Atlantique, Bretagne), la <strong>montagne</strong> (Alpes, premier domaine skiable du monde), <strong>Paris</strong> (avec Disneyland, premier site payant d’Europe) et les <strong>espaces ruraux</strong> patrimoniaux.'],
    ['fig', [
      ['map', 'FR', 128, 8, 1.42, { base: 'terre', trait: 'l' }],
      ['bande', 'FR', 128, 8, 1.42, ['perpignan', 'montpellier', 'marseille', 'toulon', 'nice'], 'k', 7, 'Littoral méditerranéen'],
      ['bande', 'FR', 128, 8, 1.42, ['stnazaire', 'larochelle', 'arcachon', 'biarritz'], 'k', 7, 'Côte atlantique'],
      ['bande', 'FR', 128, 8, 1.42, ['cherbourg', 'stmalo', 'brest'], 'k', 7, 'Bretagne'],
      ['bande', 'FR', 128, 8, 1.42, ['annecy', 'alpes', 'nice'], 'b', 8, 'Alpes'],
      ['bande', 'FR', 128, 8, 1.42, ['bayonne', 'pyrenees', 'perpignan'], 'b', 7, 'Pyrénées'],
      ['ancre', 'FR', 128, 8, 1.42, [
        ['paris', 'etoile', 'c', 6, 'Paris', 'start', null, null, 7.5],
        ['montsaintmichel', 'monument', 'g', 5, 'Mont-Saint-Michel', 'end', null, -4, 6.8],
        ['tours', 'monument', 'g', 5, 'Châteaux de la Loire', 'end', null, 8, 6.8]
      ]],
      ['key', 4, 26, [
        ['f', 'k:40', 'Tourisme balnéaire'],
        ['f', 'b:40', 'Tourisme de montagne'],
        ['etoile', 'c', 'Tourisme urbain et culturel'],
        ['monument', 'g', 'Grands sites patrimoniaux']
      ], 'Les espaces touristiques'],
      ['rose', 20, 124, 9]
    ], 290, 152, 'Les grands espaces touristiques français.'],
    ['anec', 'Le mont dont la mer était partie', 'Au XIXᵉ siècle, on construit une digue-route pour accéder au Mont-Saint-Michel à pied sec. Résultat : les sédiments s’accumulent, la baie s’ensable et le Mont risque de se retrouver au milieu d’un pré. Entre 2006 et 2015, un chantier de 200 millions d’euros a détruit la digue, construit un barrage sur le Couesnon qui « chasse » les sédiments à chaque marée, et remplacé la route par une passerelle sur pilotis. Le Mont est redevenu une île à chaque grande marée. Un aménagement pour réparer un aménagement : c’est aussi cela, la géographie.'],
    ['note', 'Le tourisme a des effets ambigus : il crée des emplois, souvent saisonniers et peu qualifiés, fait monter les prix du logement pour les habitants permanents (Côte d’Azur, Pays basque), et pose des questions environnementales (surfréquentation, artificialisation des littoraux).'],
    ['keep', [
      'Les services représentent plus de 75 % des emplois : c’est la tertiarisation.',
      'Hiérarchie des services : proximité, intermédiaires, supérieurs (métropoles).',
      'La France est la 1ʳᵉ destination touristique mondiale (≈ 100 millions de visiteurs).',
      'Espaces touristiques : littoraux, montagnes, Paris, espaces ruraux patrimoniaux.'
    ]]
  ]
},

{
  id: 'g5', m: 'geo', th: 'Dynamiques territoriales de la France',
  t: 'Les espaces de faible densité',
  d: 'Un tiers du territoire, 6 % de la population : ni déserts, ni musées — des espaces qui se réinventent.',
  mo: ['faible densité', 'diagonale du vide', 'néoruraux', 'désertification médicale'],
  sec: [
    ['p', 'On appelle <strong>espaces de faible densité</strong> les territoires comptant moins de 30 habitants au km². Ils couvrent environ un tiers de la France métropolitaine mais n’abritent que 6 % de sa population. On les repère sur la carte sous la forme d’une bande allant des Ardennes aux Landes, en passant par le Massif central : la fameuse « <strong>diagonale des faibles densités</strong> » (on disait autrefois « diagonale du vide », expression aujourd’hui critiquée car ces espaces ne sont pas vides).'],
    ['fig', [
      ['map', 'FR', 128, 8, 1.42, { base: 'terre', trait: 'l' }],
      ['bande', 'FR', 128, 8, 1.42, ['ardennes', 'langres', 'clermont', 'massifcentral', 'landes'], 'm', 15, '', .32],
      ['bande', 'FR', 128, 8, 1.42, ['annecy', 'alpes', 'nice'], 'b', 8, '', .34],
      ['bande', 'FR', 128, 8, 1.42, ['bayonne', 'pyrenees', 'perpignan'], 'b', 7, '', .34],
      ['ancre', 'FR', 128, 8, 1.42, [
        ['clermont', 'none', 'i', 0, 'diagonale des', 'middle', 0, -4, 7.5],
        ['clermont', 'none', 'i', 0, 'faibles densités', 'middle', 0, 5, 7.5],
        ['alpes', 'none', 'b', 0, 'Alpes', 'start', 8, 0, 7],
        ['pyrenees', 'none', 'b', 0, 'Pyrénées', 'middle', 0, 12, 7],
        ['limoges', 'ville', 'k', 4, 'villes-relais', 'end', null, -5, 6.8],
        ['dijon', 'ville', 'k', 4], ['clermont', 'ville', 'k', 4]
      ]],
      ['key', 4, 26, [
        ['f', 'm:32', 'Faible densité (< 30 hab./km²)'],
        ['f', 'b:34', 'Montagnes'],
        ['ville', 'k', 'Villes-relais']
      ], 'Espaces de faible densité'],
      ['rose', 20, 124, 9]
    ], 290, 152, 'Les espaces de faible densité en France métropolitaine.'],
    ['h', 'Des difficultés réelles'],
    ['ul', [
      '<strong>Vieillissement</strong> : la part des plus de 60 ans y dépasse souvent 35 %.',
      '<strong>Éloignement des services</strong> : fermetures d’écoles, de bureaux de poste, de maternités. On parle de « <strong>désertification médicale</strong> » : dans certains cantons, il faut 45 minutes pour atteindre un médecin.',
      '<strong>Dépendance à la voiture</strong> : sans transport en commun, pas de mobilité — un problème majeur pour les jeunes et les personnes âgées.',
      '<strong>Déprise agricole</strong> : friches, fermeture des paysages par la forêt (la forêt française a doublé de surface depuis 1830).'
    ]],
    ['h', 'Mais aussi de vrais atouts'],
    ['p', 'Ces espaces ne sont pas condamnés. Ils accueillent des <strong>néoruraux</strong> venus chercher un cadre de vie et un logement accessible — un mouvement accéléré par le télétravail depuis 2020. Ils produisent l’essentiel de l’<strong>énergie renouvelable</strong> française (barrages, éoliennes, biomasse) et de l’alimentation. Ils développent un <strong>tourisme vert</strong> (randonnée, parcs naturels régionaux, gîtes) et des productions à forte valeur ajoutée (AOP fromagères, agriculture biologique, artisanat).'],
    ['anec', 'Le village qui a fait venir un médecin en achetant un cabinet', 'Confrontés au départ à la retraite de leur unique médecin, des centaines de communes rurales ont inventé des solutions : construire elles-mêmes une « maison de santé pluriprofessionnelle », offrir le logement, financer les études d’un étudiant en médecine en échange d’un engagement d’installation. La commune de Vergt, en Dordogne, a même envoyé des élus recruter des médecins en Roumanie. En 2023, la France comptait plus de 2 500 maisons de santé, contre 20 en 2008.'],
    ['atlas', 'a-fr-relief', "Le relief : les massifs commandent une bonne part des faibles densités."],
    ['keep', [
      'Faible densité : moins de 30 habitants/km², environ un tiers du territoire et 6 % de la population.',
      'Difficultés : vieillissement, éloignement des services, désertification médicale, dépendance à la voiture.',
      'Atouts : cadre de vie, néoruraux, télétravail, énergies renouvelables, tourisme vert, produits de qualité.',
      'Les villes petites et moyennes jouent un rôle de relais essentiel.'
    ]]
  ]
},

{
  id: 'g6', m: 'geo', th: 'Pourquoi et comment aménager le territoire ?',
  t: 'Aménager le territoire : réduire les inégalités',
  d: 'Qui décide de construire une ligne à grande vitesse, un hôpital ou une zone d’activité — et selon quels critères ?',
  mo: ['aménagement', 'décentralisation', 'acteurs', 'développement durable'],
  sec: [
    ['p', '<strong>Aménager le territoire</strong>, c’est agir volontairement sur l’espace pour corriger des déséquilibres et améliorer les conditions de vie. En France, cette politique naît dans les années 1950 avec un constat resté célèbre : « <em>Paris et le désert français</em> » (Jean-François Gravier, 1947).'],
    ['h', 'Quelles inégalités faut-il corriger ?'],
    ['ul', [
      'Entre <strong>Paris et la province</strong> : concentration des sièges sociaux, de la recherche, des grandes écoles.',
      'Entre <strong>métropoles dynamiques et villes moyennes</strong> en difficulté (commerces vides, hôpitaux fragilisés).',
      'Entre <strong>centres-villes, banlieues et périurbain</strong> : les quartiers prioritaires cumulent chômage, pauvreté et enclavement.',
      'Entre <strong>métropole et outre-mer</strong> : chômage deux à trois fois plus élevé, vie chère.'
    ]],
    ['h', 'Qui aménage ?'],
    ['fig', [
      ['t', 145, 12, 'Les acteurs de l’aménagement', 9, 'middle', 'i', 700],
      ['box', 96, 24, 100, 22, 'UNION EUROPÉENNE', 'b', 'fonds européens (FEDER)'],
      ['box', 96, 56, 100, 22, 'ÉTAT', 'h', 'grandes infrastructures, ANCT'],
      ['box', 8, 92, 84, 24, 'RÉGION', 'g', 'lycées, transports, économie'],
      ['box', 100, 92, 92, 24, 'DÉPARTEMENT', 'e', 'collèges, routes, action sociale'],
      ['box', 200, 92, 84, 24, 'COMMUNE(S)', 'c', 'écoles, urbanisme, eau'],
      ['box', 96, 128, 100, 20, 'HABITANTS, ASSOCIATIONS, ENTREPRISES', 'm'],
      ['l', 146, 46, 146, 56, 'm', 1.2],
      ['l', 120, 78, 50, 92, 'm', 1.2], ['l', 146, 78, 146, 92, 'm', 1.2], ['l', 172, 78, 242, 92, 'm', 1.2],
      ['a', 146, 128, 146, 116, 'k', 'concertation, enquête publique', 1.2]
    ], 290, 156, 'L’aménagement fait intervenir plusieurs échelles de décision.'],
    ['p', 'Depuis les lois de <strong>décentralisation</strong> (1982-1983, puis 2003 et 2015), l’État n’est plus seul : les régions, départements et communes disposent de compétences propres et de budgets. L’Union européenne finance aussi des projets par ses fonds régionaux. Et les habitants ont leur mot à dire : enquêtes publiques, débats, budgets participatifs, parfois recours devant les tribunaux.'],
    ['h', 'Quels outils ?'],
    ['tab', ['Type d’action', 'Exemples'], [
      ['Grandes infrastructures', 'LGV, autoroutes, ports, aéroports, très haut débit'],
      ['Politiques ciblées', 'Zones franches urbaines, « Action Cœur de ville », zones de revitalisation rurale'],
      ['Rénovation urbaine', 'Démolition-reconstruction des grands ensembles, désenclavement des quartiers'],
      ['Protection', 'Parcs nationaux et régionaux, loi littoral, trames vertes et bleues']
    ], 'Les grands outils de l’aménagement.'],
    ['anec', 'Une ligne de train qui rapproche… et qui vide', 'L’arrivée de la LGV Sud-Europe-Atlantique en 2017 a mis Bordeaux à 2 h 04 de Paris. Effet immédiat : afflux de Parisiens, envolée des prix de l’immobilier bordelais (+ 40 % en cinq ans), et pour certains cadres, la possibilité de travailler à Paris en habitant à Bordeaux. Mais les villes sans arrêt sur la ligne, comme Angoulême-Nord ou Poitiers pour certaines liaisons, ont vu leur desserte se dégrader. Les géographes appellent cela l’« <strong>effet tunnel</strong> » : le TGV relie les deux extrémités et saute par-dessus ce qu’il y a entre.'],
    ['keep', [
      'Aménager = agir sur l’espace pour corriger les inégalités et améliorer le cadre de vie.',
      'Inégalités : Paris/province, métropoles/villes moyennes, centres/quartiers prioritaires, métropole/outre-mer.',
      'Plusieurs acteurs et échelles : UE, État, région, département, commune, habitants.',
      'Les aménagements doivent aujourd’hui répondre aux exigences du développement durable.'
    ]]
  ]
},

{
  id: 'g7', m: 'geo', th: 'Pourquoi et comment aménager le territoire ?',
  t: 'Les territoires ultramarins',
  d: 'Douze territoires sur trois océans : une France de 2,7 millions d’habitants aux enjeux très particuliers.',
  mo: ['DROM', 'ZEE', 'insularité', 'ultrapériphérique'],
  sec: [
    ['p', 'La France ne s’arrête pas à l’Hexagone. Ses <strong>territoires ultramarins</strong> comptent 2,7 millions d’habitants, s’étendent sur trois océans, et lui donnent la <strong>deuxième zone économique exclusive du monde</strong> avec 10,2 millions de km² — dont 97 % grâce à l’outre-mer.'],
    ['h', 'Des statuts variés'],
    ['tab', ['Statut', 'Territoires', 'Particularité'], [
      ['DROM (départements et régions)', 'Guadeloupe, Martinique, Guyane, La Réunion, Mayotte', 'Mêmes lois qu’en métropole ; régions ultrapériphériques de l’UE'],
      ['COM (collectivités)', 'Polynésie française, Saint-Pierre-et-Miquelon, Saint-Martin, Saint-Barthélemy, Wallis-et-Futuna', 'Autonomie plus large, lois adaptées'],
      ['Statut particulier', 'Nouvelle-Calédonie', 'Citoyenneté calédonienne, transferts de compétences'],
      ['Sans population permanente', 'Terres australes et antarctiques françaises (TAAF)', 'Bases scientifiques ; immense ZEE']
    ], 'La diversité des statuts ultramarins.'],
    ['fig', [
      ['map', 'DROM', 6, 8, 2.5, { base: 'g:26', trait: 'l', noms: true, ns: 6.6 }]
    ], 262, 232, 'Les principaux territoires ultramarins français (vignettes non à l’échelle). Superficies non proportionnelles : la Guyane (83 000 km²) est plus vaste que le Portugal.'],
    ['h', 'Des atouts considérables'],
    ['ul', [
      'Une <strong>ZEE immense</strong> : ressources halieutiques, nodules polymétalliques, terres rares potentielles.',
      'Une <strong>biodiversité exceptionnelle</strong> : 80 % de la biodiversité française est ultramarine ; la Guyane abrite 5,5 millions d’hectares de forêt amazonienne.',
      'Des <strong>atouts stratégiques</strong> : le centre spatial de Kourou, idéalement placé près de l’équateur (un lancement y gagne 15 % de charge utile), et des bases militaires sur toutes les mers.',
      'Un <strong>potentiel touristique</strong> et des productions spécialisées (banane, canne à sucre, rhum, vanille).'
    ]],
    ['h', 'Des difficultés persistantes'],
    ['p', 'L’<strong>insularité</strong> et l’<strong>éloignement</strong> renchérissent tout : les prix alimentaires sont 30 à 40 % plus élevés qu’en métropole. Le chômage atteint 15 à 30 % selon les territoires, contre 7 % dans l’Hexagone, et frappe surtout les jeunes. S’y ajoutent des risques naturels majeurs (cyclones, séismes, volcans : la Soufrière, la montagne Pelée, le Piton de la Fournaise) et, à Mayotte, une pression migratoire et démographique très forte.'],
    ['anec', 'La fusée et la forêt', 'Le centre spatial guyanais occupe 700 km² — presque sept fois la surface de Paris — dont l’immense majorité est laissée en forêt primaire, servant de zone de sécurité. Résultat paradoxal : la base de lancement d’Ariane est aussi l’un des espaces naturels les mieux protégés de Guyane, où vivent jaguars, tapirs et une faune inventoriée par les biologistes du CNES. Quand une fusée décolle, on évacue… surtout les crapauds des pas de tir.'],
    ['note', 'Vocabulaire : on ne dit plus « DOM-TOM » mais <strong>DROM</strong> (départements et régions d’outre-mer) et <strong>COM</strong> (collectivités d’outre-mer). Dans le vocabulaire européen, les DROM sont des <strong>régions ultrapériphériques (RUP)</strong> de l’Union.'],
    ['keep', [
      '2,7 millions d’habitants, trois océans, statuts variés (DROM, COM, Nouvelle-Calédonie, TAAF).',
      'La 2ᵉ ZEE mondiale (10,2 millions de km²) et 80 % de la biodiversité française.',
      'Atouts : Kourou, ressources marines, tourisme, positions stratégiques.',
      'Difficultés : éloignement, vie chère, chômage élevé, risques naturels majeurs.'
    ]]
  ]
}
);
