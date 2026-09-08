/* ============================================================
   Delta — collection de reperes (2/2) : GEOGRAPHIE et EMC.
   ============================================================ */

/* ================= GEOGRAPHIE ================= */

K('g01', 'geo', 'tra', 'L’aire urbaine', 'Trois couronnes, une même vie quotidienne.',
  'Une aire urbaine se lit comme une cible : la <strong>ville-centre</strong>, sa <strong>banlieue</strong>, puis la <strong>couronne périurbaine</strong> — toutes les communes dont au moins 15 % des actifs viennent travailler dans le pôle. C’est donc le trajet quotidien, et non le paysage, qui définit la limite de la ville.',
  'Plus de 80 % des Français vivent dans une aire urbaine.',
  [bg(), ['c', 100, 76, 54, 'g:10', 'l'], ['c', 100, 76, 36, 'g:20', 'l'], ['c', 100, 76, 18, 'g:40', 'g'],
  ['t', 100, 80, 'CENTRE', 8, 'middle', 'g', 700],
  ['a', 60, 122, 84, 92, 'k', '', 1.8], ['a', 142, 122, 118, 92, 'k', '', 1.8],
  ['t', 100, 142, 'navettes domicile-travail', 8, 'middle', 'i2', 600]]);

K('g02', 'geo', 'tem', 'La macrocéphalie parisienne', 'Une tête six fois trop grosse.',
  'L’aire d’attraction de Paris rassemble 13,1 millions d’habitants, contre 2,3 millions pour Lyon. Ce déséquilibre est un héritage de plusieurs siècles de centralisation : le réseau routier, ferroviaire et aérien converge vers la capitale, et il reste plus rapide d’aller de Bordeaux à Paris que de Bordeaux à Lyon.',
  'Aucun autre pays européen ne connaît une domination urbaine aussi forte.',
  [bg(), ['bars', 30, 26, 140, 72, [['Paris', 13.1, 'k'], ['Lyon', 2.3, 'b'], ['Marseille', 1.8, 'b'], ['Toulouse', 1.5, 'g'], ['Lille', 1.5, 'g']], { titre: 'Population des aires (millions)', fmt: v => v }],
  ['t', 100, 134, 'Paris pèse près de six fois Lyon', 8.5, 'middle', 'i2', 600]]);

K('g03', 'geo', 'arc', 'L’hexagone', 'Un pays qui tient dans une figure géométrique.',
  'La France métropolitaine s’inscrit presque exactement dans un hexagone d’environ 1 000 km de côté — d’où le surnom. Cette compacité est un atout rare : aucun point du territoire n’est à plus de 500 km de la mer, et le pays réunit sur une surface réduite montagne, plaine, littoral atlantique et méditerranéen.',
  'La France métropolitaine : 552 000 km², la plus vaste de l’Union européenne.',
  [bg(), ['map', 'FR', 46, 12, 1.24, { base: 'g:22', trait: 'i', tw: 1.6, mer: false }],
  ['t', 100, 144, '552 000 km² · 13 régions', 8.5, 'middle', 'i2', 600]]);

K('g04', 'geo', 'mon', 'La zone économique exclusive', 'Le deuxième domaine maritime du monde.',
  'La ZEE s’étend sur 200 milles marins (370 km) au large de chaque côte : l’État y exploite seul les ressources. Grâce à ses territoires ultramarins, la France dispose de <strong>10,2 millions de km²</strong> — vingt fois sa surface terrestre — dont 97 % viennent de l’outre-mer. Seuls les États-Unis font mieux.',
  'Sans l’outre-mer, la France serait une puissance maritime de second rang.',
  [bg(), ['map', 'MONDE', 4, 24, 1.9, { base: 'terre', mer: false }],
  ['ancre', 'MONDE', 4, 24, 1.9, [
    ['guadeloupe', 'carre', 'b', 4], ['guyane', 'carre', 'b', 4], ['reunion', 'carre', 'b', 4],
    ['mayotte', 'carre', 'b', 3.4], ['noumea', 'carre', 'b', 4], ['papeete', 'carre', 'b', 4],
    ['paris', 'capitale', 'k', 4]
  ]],
  ['t', 100, 140, '10,2 millions de km² · 2ᵉ mondiale', 8.5, 'middle', 'i2', 600]]);

K('g05', 'geo', 'tra', 'La zone industrialo-portuaire', 'Où l’usine touche le quai.',
  'Une ZIP réunit sur un même site un port en eau profonde, des raffineries, de la sidérurgie et de la pétrochimie : on transforme sur place ce qu’on décharge du bateau, ce qui évite tout transport intermédiaire. Le Havre, Dunkerque et Marseille-Fos en sont les trois exemples français.',
  'La littoralisation : les activités industrielles se rapprochent des côtes.',
  [bg(), ['r', 0, 0, 200, 62, 'mer', '', 0],
  ['r', 0, 62, 200, 88, 'terre', '', 0],
  ['r', 40, 34, 60, 22, 'm:50', 'i', 2], ['r', 46, 24, 8, 10, 'm:60', 'i', 1],
  ['l', 16, 62, 184, 62, 'i', 2.4],
  ['sym', 118, 86, 'usine', 'h', 10], ['sym', 156, 86, 'usine', 'h', 10],
  ['r', 30, 76, 20, 14, 'b:40', 'b', 2], ['r', 54, 76, 20, 14, 'w:40', 'w', 2], ['r', 78, 76, 20, 14, 'g:40', 'g', 2],
  ['t', 100, 122, 'Le Havre · Dunkerque · Marseille-Fos', 8.5, 'middle', 'i2', 600]]);

K('g06', 'geo', 'tem', 'Le technopôle', 'Là où l’université touche l’usine.',
  'Un technopôle réunit sur un même site laboratoires publics, universités et entreprises de haute technologie. Sophia-Antipolis, créé en 1969 dans la garrigue au-dessus d’Antibes, emploie aujourd’hui 40 000 personnes. Ces sites choisissent le Sud et l’Ouest pour une raison peu scientifique : le <strong>cadre de vie</strong> attire les ingénieurs.',
  'Héliotropisme : les activités et les hommes se déplacent vers le soleil.',
  [bg(), ['r', 24, 60, 46, 40, 'b:22', 'b', 4], ['t', 47, 84, 'labo', 8, 'middle', 'b', 700],
  ['r', 78, 60, 44, 40, 'g:22', 'g', 4], ['t', 100, 84, 'fac', 8, 'middle', 'g', 700],
  ['r', 130, 60, 46, 40, 'h:22', 'h', 4], ['t', 153, 84, 'usine', 8, 'middle', 'h', 700],
  ['a', 70, 74, 78, 74, 'i', '', 1.6], ['a', 122, 74, 130, 74, 'i', '', 1.6],
  ['a', 130, 90, 122, 90, 'i', '', 1.6], ['a', 78, 90, 70, 90, 'i', '', 1.6],
  ['c', 168, 28, 12, 'c', ''],
  ['t', 100, 126, 'Toulouse · Grenoble · Sophia-Antipolis', 8.5, 'middle', 'i2', 600]]);

K('g07', 'geo', 'arc', 'La diagonale des faibles densités', 'Un tiers du territoire, 6 % des habitants.',
  'Une bande allant des Ardennes aux Landes, en passant par le Massif central, compte moins de 30 habitants au km². On l’a longtemps appelée « diagonale du vide » — une expression que les géographes évitent aujourd’hui, car ces espaces produisent l’essentiel de l’énergie renouvelable et de l’alimentation françaises.',
  'Faible densité ne veut pas dire déclin : le télétravail y ramène des habitants.',
  [bg(), ['map', 'FR', 46, 10, 1.2, { base: 'terre', trait: 'l', mer: false }],
  ['bande', 'FR', 46, 10, 1.2, ['ardennes', 'langres', 'clermont', 'massifcentral', 'landes'], 'm', 14, '', .34],
  ['t', 100, 140, 'moins de 30 hab./km²', 8.5, 'middle', 'i2', 600]]);

K('g08', 'geo', 'mon', 'Le Mont-Saint-Michel', 'L’île qui avait cessé d’en être une.',
  'Une digue-route construite au XIXᵉ siècle avait ensablé la baie : le Mont menaçait de se retrouver au milieu d’un pré. Entre 2006 et 2015, un chantier de 200 millions d’euros a détruit la digue, construit un barrage qui « chasse » les sédiments à chaque marée et remplacé la route par une passerelle. Le Mont est redevenu une île aux grandes marées.',
  'Un aménagement pour réparer un aménagement : la géographie corrige ses erreurs.',
  [bg(), ['r', 0, 96, 200, 54, 'mer', '', 0],
  ['path', 'M56 108 q44 -74 88 0 z', 'terre', 'i', 1.6],
  ['path', 'M84 74 q16 -22 32 0 z', 'm:44', 'i', 1.4],
  ['l', 100, 52, 100, 34, 'i', 2], ['sym', 100, 30, 'etoile', 'c', 5],
  ['path', 'M0 118 h58', 'none', 'i', 3, '6 4'],
  ['t', 100, 134, 'Baie du Mont-Saint-Michel', 8.5, 'middle', 'i2', 600]]);

K('g09', 'geo', 'tra', 'Le TGV', 'Trois cent vingt kilomètres à l’heure, en étoile.',
  'La première LGV Paris-Lyon ouvre en 1981. Le réseau s’est développé <strong>en étoile depuis Paris</strong>, ce qui rapproche spectaculairement la province de la capitale mais laisse les liaisons transversales très lentes. Bordeaux-Paris : 2 h. Bordeaux-Lyon : 5 h 30, pour une distance comparable.',
  'Le réseau radial français est un héritage direct de la centralisation.',
  [bg(), ['sym', 100, 60, 'metropole', 'k', 8], ['t', 100, 50, 'PARIS', 9, 'middle', 'k', 700],
  ['a', 100, 60, 40, 34, 'b', '', 2], ['a', 100, 60, 168, 34, 'b', '', 2],
  ['a', 100, 60, 30, 96, 'b', '', 2], ['a', 100, 60, 150, 108, 'b', '', 2],
  ['a', 100, 60, 96, 122, 'b', '', 2], ['a', 100, 60, 178, 76, 'b', '', 2],
  ['l', 24, 118, 60, 112, 'l', 1.4, '4 3'],
  ['t', 100, 142, 'Un réseau radial, peu de transversales', 8.5, 'middle', 'i2', 600]]);

K('g10', 'geo', 'tem', 'Le conteneur', 'La boîte qui a rendu le monde plat.',
  'Inventé en 1956 par Malcom McLean, le conteneur standard (EVP, 6,1 m) a divisé le coût de la manutention par vingt. Un porte-conteneurs moderne en transporte plus de 24 000. C’est cette quasi-gratuité du transport qui rend possible qu’un T-shirt parcoure 30 000 km avant d’être vendu 8 euros.',
  '90 % du commerce mondial en volume passe par la mer.',
  [bg(), ['r', 0, 92, 200, 58, 'mer', '', 0],
  ['path', 'M22 92 h156 l-16 26 h-124 z', 'i:40', 'i', 2],
  ['r', 36, 62, 28, 16, 'h:60', 'i', 1.4], ['r', 68, 62, 28, 16, 'b:60', 'i', 1.4],
  ['r', 100, 62, 28, 16, 'g:60', 'i', 1.4], ['r', 132, 62, 28, 16, 'c:60', 'i', 1.4],
  ['r', 52, 44, 28, 16, 'w:60', 'i', 1.4], ['r', 84, 44, 28, 16, 'e:60', 'i', 1.4],
  ['r', 116, 44, 28, 16, 'k:60', 'i', 1.4],
  ['t', 100, 138, '24 000 conteneurs par navire', 8.5, 'middle', 'i2', 600]]);

K('g11', 'geo', 'arc', 'La dorsale européenne', 'De Londres à Milan, le cœur qui bat.',
  'Cette bande de 1 500 km concentre les plus fortes densités d’Europe, les plus grands ports (Rotterdam, Anvers, Hambourg), les places financières et les sièges sociaux. On l’a surnommée la « banane bleue » dans les années 1980 — un nom né d’une carte de presse, pas d’un travail scientifique, mais qui est resté.',
  'Le rapport de richesse entre la région la plus riche et la plus pauvre de l’UE est de 1 à 6.',
  [bg(), ['map', 'EUR', 50, 6, 1.06, { base: 'terre', trait: 'l', mer: false }],
  ['bande', 'EUR', 50, 6, 1.06, ['londres', 'amsterdam', 'francfort', 'zurich', 'milan'], 'k', 8, '', .5],
  ['t', 100, 138, 'Londres · Randstad · Rhin · Milan', 8.5, 'middle', 'i2', 600]]);

K('g12', 'geo', 'mon', 'Le centre spatial de Kourou', 'Sept cents kilomètres carrés de forêt et une fusée.',
  'Choisi en 1964, Kourou est idéalement situé à 5° de l’équateur : la rotation terrestre y donne un « coup de fronde » qui fait gagner environ <strong>15 % de charge utile</strong> à un lanceur. La base occupe 700 km² — sept fois Paris — dont l’essentiel reste en forêt primaire pour servir de zone de sécurité.',
  'L’outre-mer donne à la France et à l’Europe leur accès à l’espace.',
  [bg(), ['path', 'M0 118 h200', 'none', 'g', 3],
  ['path', 'M100 30 q10 26 10 56 h-20 q0 -30 10 -56 z', 'S2', 'i', 2],
  ['path', 'M90 86 l-12 22 h12 z', 'h:40', 'i', 1.6], ['path', 'M110 86 l12 22 h-12 z', 'h:40', 'i', 1.6],
  ['path', 'M94 108 q6 20 12 0 q-6 26 -12 0 z', 'c', 'c', 1],
  ['c', 100, 54, 4, 'b', 'i'],
  ['path', 'M14 118 q8 -18 16 0 M34 118 q10 -22 20 0 M148 118 q10 -20 20 0 M172 118 q8 -16 16 0', 'none', 'g', 2],
  ['t', 100, 140, 'Guyane · 5° de l’équateur', 8.5, 'middle', 'i2', 600]]);

K('g13', 'geo', 'tra', 'Le figuré cartographique', 'Trois familles, pas une de plus.',
  'Tout croquis se construit avec trois types de figurés : <strong>de surface</strong> (aplats et hachures, pour un espace), <strong>ponctuels</strong> (points et symboles, pour un lieu), <strong>linéaires</strong> (traits et flèches, pour un axe ou un flux). Utiliser une flèche pour représenter une région est l’erreur qui coûte le plus de points au brevet.',
  'La légende n’est pas une liste : c’est le raisonnement du croquis.',
  [bg(), ['r', 22, 40, 40, 26, 'g:40', 'g', 2], ['t', 70, 56, 'un espace', 8, 'start', 'i2'],
  ['sym', 42, 88, 'metropole', 'k', 8], ['t', 70, 92, 'un lieu', 8, 'start', 'i2'],
  ['a', 24, 122, 62, 122, 'b', '', 2.4], ['t', 70, 126, 'un flux', 8, 'start', 'i2'],
  ['t', 100, 24, 'surface · ponctuel · linéaire', 9, 'middle', 'i', 700]]);

K('g14', 'geo', 'tem', 'L’étalement urbain', 'Un département de terres perdu tous les dix ans.',
  'Chaque année, la France artificialise l’équivalent de plusieurs dizaines de milliers d’hectares — surtout pour des lotissements, des zones commerciales et des routes. Un sol artificialisé ne stocke plus l’eau ni le carbone. La loi « Climat et résilience » de 2021 fixe l’objectif de <strong>zéro artificialisation nette</strong> en 2050.',
  'Habiter loin coûte moins cher au ménage, mais plus cher à la collectivité.',
  [bg(), ['r', 76, 34, 48, 34, 'k:34', 'k', 3], ['t', 100, 55, 'ville', 8, 'middle', 'k', 700],
  ['r', 44, 78, 22, 16, 'w:34', 'w', 2], ['r', 74, 78, 22, 16, 'w:34', 'w', 2],
  ['r', 104, 78, 22, 16, 'w:34', 'w', 2], ['r', 134, 78, 22, 16, 'w:34', 'w', 2],
  ['r', 28, 104, 20, 14, 'w:20', 'w', 2], ['r', 58, 104, 20, 14, 'w:20', 'w', 2],
  ['r', 88, 104, 20, 14, 'w:20', 'w', 2], ['r', 118, 104, 20, 14, 'w:20', 'w', 2], ['r', 148, 104, 20, 14, 'w:20', 'w', 2],
  ['a', 100, 68, 100, 78, 'i', '', 1.6],
  ['t', 100, 138, 'Zéro artificialisation nette en 2050', 8.5, 'middle', 'i2', 600]]);

K('g15', 'geo', 'arc', 'Le risque', 'Aléa multiplié par vulnérabilité.',
  'Un volcan qui entre en éruption au milieu du Pacifique, sans personne autour, n’est pas un risque : c’est un aléa. Le risque naît de la <strong>rencontre</strong> entre un phénomène dangereux et des enjeux humains. C’est pourquoi la prévention consiste autant à réduire la vulnérabilité (construire autrement, alerter, éduquer) qu’à surveiller l’aléa.',
  'Les deux tiers des communes françaises sont exposées à au moins un risque.',
  [bg(), ['c', 74, 74, 34, 'w:26', 'w'], ['c', 126, 74, 34, 'k:22', 'k'],
  ['t', 58, 78, 'ALÉA', 9, 'middle', 'w', 700], ['t', 144, 78, 'ENJEUX', 9, 'middle', 'k', 700],
  ['t', 100, 70, 'RISQUE', 8.5, 'middle', 'i', 700],
  ['t', 100, 82, '⚠', 11, 'middle', 'i'],
  ['t', 100, 132, 'Prévenir = réduire la vulnérabilité', 8.5, 'middle', 'i2', 600]]);

K('g16', 'geo', 'leg', 'Les montagnes de Kong', 'Une chaîne inventée qui a duré un siècle.',
  'En 1798, le cartographe britannique James Rennell dessine une chaîne de montagnes en Afrique de l’Ouest d’après des récits de voyageurs. Tous les atlas la recopient pendant plus de cent ans — elle figure encore dans des éditions de 1890. Elle n’existe pas. L’erreur n’est effacée qu’après l’exploration du terrain en 1889.',
  'Une carte n’est jamais la réalité : c’est toujours une interprétation datée et située.',
  [bg(), ['r', 20, 30, 160, 96, 'c:12', 'c', 4],
  ['path', 'M40 96 l24 -34 l18 24 l22 -34 l20 30 l16 -18 l20 32 z', 'm:30', 'i', 1.6, ''],
  ['t', 100, 112, 'MONTAGNES DE KONG', 9, 'middle', 'i', 700],
  ['l', 46, 108, 154, 116, 'k', 3],
  ['t', 100, 142, '1798-1889 : une erreur recopiée', 8, 'middle', 'i2', 600]]);

K('g17', 'geo', 'tra', 'Le remembrement', 'Quand on a effacé les haies.',
  'Pour permettre la mécanisation, on a regroupé les parcelles agricoles à partir des années 1950. Le bocage — ce paysage de petits champs bordés de haies — a reculé de plusieurs centaines de milliers de kilomètres. On replante aujourd’hui : les haies limitent l’érosion, abritent les auxiliaires de culture et retiennent l’eau.',
  'Un paysage agricole raconte toujours une politique publique.',
  [bg(), ['r', 12, 34, 78, 82, 'g:20', 'g', 2],
  ['l', 12, 60, 90, 60, 'g', 2.4], ['l', 12, 88, 90, 88, 'g', 2.4],
  ['l', 38, 34, 38, 116, 'g', 2.4], ['l', 64, 34, 64, 116, 'g', 2.4],
  ['t', 51, 128, 'avant', 8, 'middle', 'm', 600],
  ['r', 110, 34, 78, 82, 'w:20', 'w', 2],
  ['l', 110, 76, 188, 76, 'w', 1.6],
  ['t', 149, 128, 'après', 8, 'middle', 'm', 600],
  ['a', 94, 74, 106, 74, 'i', '', 1.6],
  ['t', 100, 24, 'Le bocage effacé', 9, 'middle', 'i', 700]]);

K('g18', 'geo', 'tem', 'Le viaduc de Millau', 'Plus haut que la tour Eiffel.',
  'Achevé en 2004, le viaduc culmine à 343 mètres — 19 de plus que la tour Eiffel. Il devait supprimer les embouteillages légendaires de la vallée du Tarn. Effet inattendu : il est devenu lui-même une attraction touristique majeure, avec près d’un million de visiteurs par an. Un ouvrage conçu pour faire passer les gens les fait s’arrêter.',
  'Un aménagement produit toujours des effets que ses concepteurs n’avaient pas prévus.',
  [bg(), ['path', 'M0 122 q30 -14 46 -34 M154 88 q16 20 46 34', 'none', 'terre', 3],
  ['path', 'M0 122 q30 -14 46 -34 M154 88 q16 20 46 34', 'none', 'g', 2],
  ['l', 6, 56, 194, 56, 'i', 3],
  ['l', 40, 56, 40, 96, 'i', 2], ['l', 76, 56, 76, 116, 'i', 2],
  ['l', 112, 56, 112, 118, 'i', 2], ['l', 148, 56, 148, 100, 'i', 2],
  ['l', 76, 20, 76, 56, 'i', 2], ['l', 112, 20, 112, 56, 'i', 2],
  ['l', 76, 20, 50, 56, 'm', 1], ['l', 76, 20, 100, 56, 'm', 1],
  ['l', 112, 20, 90, 56, 'm', 1], ['l', 112, 20, 140, 56, 'm', 1],
  ['t', 100, 142, '343 m · Aveyron · 2004', 8.5, 'middle', 'i2', 600]]);

K('g19', 'geo', 'mon', 'La carte de Cassini', 'Quatre générations pour mesurer un royaume.',
  'Commencée en 1747, la carte de Cassini est la première carte topographique d’un pays entier fondée sur la triangulation. Il a fallu <strong>quatre générations de la même famille</strong> et près de 70 ans pour la terminer. Ses 181 feuilles portent 40 000 noms de lieux, dont beaucoup ont disparu depuis : elle sert encore aux historiens et aux archéologues.',
  'Cartographier un territoire, c’est d’abord un acte de pouvoir.',
  [bg(), ['r', 16, 24, 168, 100, 'c:12', 'c', 3],
  ['map', 'FR', 62, 30, .92, { base: 'S2', trait: 'i', tw: 1.1, mer: false }],
  ['l', 20, 34, 180, 34, 'l', .8], ['l', 20, 64, 180, 64, 'l', .8],
  ['l', 20, 94, 180, 94, 'l', .8], ['l', 60, 28, 60, 120, 'l', .8],
  ['l', 100, 28, 100, 120, 'l', .8], ['l', 140, 28, 140, 120, 'l', .8],
  ['t', 100, 140, 'Cassini, 1747-1815 · 181 feuilles', 8, 'middle', 'i2', 600]]);

K('g20', 'geo', 'del', 'Le planisphère', 'Aucune carte du monde n’est innocente.',
  'Aplatir une sphère sur un plan est mathématiquement impossible sans déformer quelque chose. La projection de Mercator (1569), conçue pour la navigation, conserve les angles mais gonfle énormément les hautes latitudes : le Groenland y paraît aussi grand que l’Afrique, alors qu’il est <strong>quatorze fois plus petit</strong>. Toute carte est un choix, et tout choix a des conséquences politiques.',
  'Choisir une projection, c’est déjà défendre un point de vue sur le monde.',
  [bg(), ['map', 'MONDE', 4, 20, 1.9, { base: 'terre', fill: { grl: 'k:40', af: 'g:34' }, mer: false }],
  ['t', 100, 138, 'Groenland ≠ Afrique', 9.5, 'middle', 'i', 700],
  ['t', 100, 148, '2,1 M km² contre 30 M km²', 7.5, 'middle', 'i2', 600]]);

/* ================= EMC ================= */

K('e01', 'emc', 'tra', 'Marianne', 'Le visage de la République.',
  'Marianne apparaît sous la Révolution, coiffée du <strong>bonnet phrygien</strong> que portaient les esclaves affranchis à Rome. Le prénom, très courant au XVIIIᵉ siècle dans les milieux populaires, a d’abord été un sobriquet moqueur employé par les royalistes — avant d’être revendiqué. Son buste orne toutes les mairies de France.',
  'Symbole non officiel mais universellement reconnu de la République.',
  [bg(), ['c', 100, 76, 40, 'k:14', 'k'],
  ['path', 'M78 90 q22 -34 44 0 q-22 18 -44 0 z', 'S2', 'i', 1.6],
  ['c', 100, 66, 18, 'S', 'i'],
  ['path', 'M78 62 q22 -30 44 -4 q-6 -12 -22 -12 q-18 0 -22 16 z', 'k:60', 'k', 1.4],
  ['c', 93, 66, 2.2, 'i', ''], ['c', 107, 66, 2.2, 'i', ''],
  ['t', 100, 134, 'Bonnet phrygien = liberté', 8.5, 'middle', 'i2', 600]]);

K('e02', 'emc', 'tem', 'L’isoloir', 'Un rideau, et le vote devient libre.',
  'Jusqu’en 1913, on votait à découvert en France : chacun voyait pour qui vous glissiez votre bulletin. Les députés ont longtemps refusé l’isoloir, importé d’Australie, jugé « une insulte à la sincérité du citoyen ». Il a fallu vingt ans de débats. Aujourd’hui, ne pas passer par l’isoloir peut faire annuler un vote.',
  'Le secret du vote est ce qui le rend libre.',
  [bg(), ['r', 46, 30, 108, 90, 'S2', 'i', 4],
  ['path', 'M52 36 v78 M62 36 v78 M72 36 v78', 'none', 'l', 2],
  ['r', 96, 44, 52, 68, 'S', 'i', 3],
  ['r', 108, 62, 28, 16, 'b:34', 'b', 2],
  ['t', 122, 96, '✓', 12, 'middle', 'o', 700],
  ['t', 100, 138, 'Isoloir obligatoire depuis 1913', 8.5, 'middle', 'i2', 600]]);

K('e03', 'emc', 'arc', 'La balance de la justice', 'Peser, trancher, protéger.',
  'La justice française repose sur des principes intangibles : <strong>présomption d’innocence</strong>, droits de la défense, débat contradictoire, publicité des audiences, possibilité de faire appel, indépendance du juge. C’est à l’accusation d’apporter la preuve — jamais à l’accusé de démontrer son innocence.',
  'Deux ordres : judiciaire (civil et pénal) et administratif.',
  [bg(), ['l', 100, 34, 100, 108, 'i', 3], ['l', 58, 48, 142, 48, 'i', 2.6],
  ['l', 58, 48, 58, 60, 'i', 1.4], ['l', 142, 48, 142, 60, 'i', 1.4],
  ['path', 'M46 60 h24 l-12 18 z', 'b:26', 'i', 1.6], ['path', 'M130 60 h24 l-12 18 z', 'b:26', 'i', 1.6],
  ['r', 78, 108, 44, 8, 'i', 'i', 2],
  ['t', 100, 136, 'Présomption d’innocence', 8.5, 'middle', 'i2', 600]]);

K('e04', 'emc', 'tem', 'La loi de 1905', 'Séparer pour permettre à chacun de croire.',
  'Deux articles suffisent. Article 1 : la République assure la liberté de conscience et garantit le libre exercice des cultes. Article 2 : elle ne reconnaît, ne salarie ni ne subventionne aucun culte. Ce texte, négocié pendant 48 séances par Aristide Briand, reste l’un des plus cités — et des plus mal cités — du droit français.',
  'La neutralité s’impose à l’État et à ses agents ; les citoyens restent libres.',
  [bg(), ['r', 34, 30, 132, 92, 'S', 'i', 4],
  ['l', 100, 42, 100, 112, 'l', 1.6, '5 4'],
  ['t', 67, 62, 'ÉTAT', 9, 'middle', 'b', 700], ['t', 67, 76, 'neutre', 7.5, 'middle', 'm'],
  ['t', 133, 62, 'CULTES', 9, 'middle', 'g', 700], ['t', 133, 76, 'libres', 7.5, 'middle', 'm'],
  ['t', 100, 104, '1905', 12, 'middle', 'i', 700],
  ['t', 100, 138, 'Liberté de conscience garantie', 8.5, 'middle', 'i2', 600]]);

K('e05', 'emc', 'tra', 'Le triptyque républicain', 'Trois mots, une tension permanente.',
  'Liberté, Égalité, Fraternité ne se contredisent pas mais se limitent mutuellement : ma liberté s’arrête où commence celle des autres, l’égalité réelle exige parfois de traiter différemment des situations différentes, la fraternité impose la solidarité. En 2018, le Conseil constitutionnel a donné à la fraternité une <strong>valeur juridique</strong>.',
  'Devise inscrite dans la Constitution ; elle date de 1848, pas de 1789.',
  [bg(), ['poly', [[100, 26], [166, 116], [34, 116]], 'b:12', 'b', 3],
  ['t', 100, 52, 'LIBERTÉ', 9.5, 'middle', 'b', 700],
  ['t', 68, 100, 'ÉGALITÉ', 9.5, 'middle', 'h', 700],
  ['t', 134, 100, 'FRATERNITÉ', 8.5, 'middle', 'g', 700],
  ['t', 100, 138, 'Constitutionnalisée en 1848', 8.5, 'middle', 'i2', 600]]);

K('e06', 'emc', 'mon', 'Le Défenseur des droits', 'Une porte gratuite contre l’arbitraire.',
  'Créée en 2011, cette autorité indépendante peut être saisie gratuitement par n’importe qui, en ligne ou par courrier, en cas de discrimination, de difficulté avec un service public, d’atteinte aux droits de l’enfant ou de manquement à la déontologie de la sécurité. Elle traite plus de 100 000 réclamations par an et dispose d’un réseau de délégués dans chaque département.',
  'Une discrimination est un délit : 25 critères interdits par la loi.',
  [bg(), ['c', 100, 72, 40, 'e:14', 'e'],
  ['path', 'M100 44 v56 M76 60 h48', 'none', 'e', 3],
  ['c', 100, 40, 6, 'e', ''],
  ['path', 'M70 104 q30 -14 60 0', 'none', 'e', 2.4],
  ['t', 100, 130, 'Saisine gratuite', 9, 'middle', 'i', 700],
  ['t', 100, 144, '25 critères de discrimination', 7.5, 'middle', 'i2', 600]]);

K('e07', 'emc', 'tem', 'Le 3020', 'Un numéro contre le harcèlement.',
  'Le harcèlement scolaire est un <strong>délit</strong> depuis 2022, puni jusqu’à 10 ans de prison lorsqu’il conduit au suicide de la victime. Il se définit par des propos ou comportements <strong>répétés</strong> qui dégradent les conditions de vie. Le 3020 traite le harcèlement scolaire, le 3018 les violences numériques. Assister sans rien faire, c’est déjà participer.',
  'Témoin, on peut agir : parler à un adulte, soutenir la victime, signaler.',
  [bg(), ['r', 48, 40, 104, 62, 'k:14', 'k', 8],
  ['t', 100, 84, '3020', 26, 'middle', 'k', 700],
  ['path', 'M74 102 l-8 18 l24 -12 z', 'k:14', 'k', 2],
  ['t', 100, 128, 'Harcèlement scolaire', 9, 'middle', 'i', 700],
  ['t', 100, 142, '3018 pour le cyberharcèlement', 7.5, 'middle', 'i2', 600]]);

K('e08', 'emc', 'arc', 'La séparation des pouvoirs', 'Que le pouvoir arrête le pouvoir.',
  'Montesquieu, en 1748, formule le principe qui fonde toutes les démocraties : si un même organe fait la loi, l’applique et juge, il n’y a plus de liberté. En France, le Parlement vote, le gouvernement applique, les juges sanctionnent — et chacun contrôle les autres. La presse est parfois appelée le « quatrième pouvoir ».',
  'Contre-pouvoirs : presse, syndicats, associations, autorités indépendantes.',
  [bg(), ['box', 8, 44, 56, 30, 'LÉGIS-|LATIF', 'b'],
  ['box', 72, 44, 56, 30, 'EXÉ-|CUTIF', 'h'],
  ['box', 136, 44, 56, 30, 'JUDI-|CIAIRE', 'g'],
  ['a', 36, 84, 100, 84, 'm', '', 1.4], ['a', 164, 92, 100, 92, 'm', '', 1.4],
  ['a', 100, 100, 36, 100, 'm', '', 1.4], ['a', 100, 108, 164, 108, 'm', '', 1.4],
  ['t', 100, 130, 'Montesquieu, 1748', 9, 'middle', 'i', 700]]);

K('e09', 'emc', 'tra', 'La carte d’électeur', 'Un droit conquis, jamais acquis.',
  'Le suffrage universel masculin date de 1848, celui des femmes de 1944, la majorité à 18 ans de 1974. Chaque extension a été arrachée après des décennies de refus. Aujourd’hui la menace n’est plus l’interdiction mais l’<strong>abstention</strong> : aux régionales de 2021, plus de huit jeunes sur dix ne sont pas allés voter.',
  'S’abstenir, c’est laisser d’autres décider à sa place.',
  [bg(), ['r', 34, 42, 132, 68, 'S', 'i', 5],
  ['c', 60, 68, 12, 'S2', 'i'],
  ['l', 82, 60, 150, 60, 'l', 1.6], ['l', 82, 72, 140, 72, 'l', 1.6],
  ['l', 46, 92, 154, 92, 'l', 1.4],
  ['t', 100, 104, 'CARTE ÉLECTORALE', 7.5, 'middle', 'i', 700],
  ['t', 100, 134, '1848 · 1944 · 1974', 9, 'middle', 'i2', 700]]);

K('e10', 'emc', 'leg', 'L’article 1', 'Une phrase qui contient tout un pays.',
  '« La France est une République indivisible, laïque, démocratique et sociale. Elle assure l’égalité devant la loi de tous les citoyens sans distinction d’origine, de race ou de religion. Elle respecte toutes les croyances. » Chaque adjectif de cette phrase a été payé par un siècle de conflits — et chacun continue d’être discuté aujourd’hui.',
  'Article 1 de la Constitution du 4 octobre 1958.',
  [bg(), ['r', 26, 26, 148, 98, 'b:10', 'b', 5],
  ['t', 100, 50, 'INDIVISIBLE', 10, 'middle', 'i', 700],
  ['t', 100, 68, 'LAÏQUE', 10, 'middle', 'i', 700],
  ['t', 100, 86, 'DÉMOCRATIQUE', 10, 'middle', 'i', 700],
  ['t', 100, 104, 'SOCIALE', 10, 'middle', 'i', 700],
  ['t', 100, 140, 'Constitution du 4 octobre 1958', 8, 'middle', 'i2', 600]]);

K('e11', 'emc', 'tem', 'L’association loi 1901', 'Deux personnes suffisent.',
  'La loi du 1ᵉʳ juillet 1901 est l’une des plus courtes et des plus fécondes du droit français : deux personnes, un objet, un siège, et l’association existe. La France en compte 1,5 million d’actives, 1,8 million de salariés et <strong>20 millions de bénévoles</strong>. C’est le premier lieu d’engagement citoyen du pays.',
  'La démocratie ne vit pas qu’au moment du vote.',
  [bg(), ['c', 68, 66, 14, 'g:34', 'g'], ['c', 100, 58, 14, 'b:34', 'b'], ['c', 132, 66, 14, 'h:34', 'h'],
  ['c', 84, 92, 14, 'w:34', 'w'], ['c', 116, 92, 14, 'e:34', 'e'],
  ['l', 68, 66, 100, 58, 'm', 1.4], ['l', 100, 58, 132, 66, 'm', 1.4],
  ['l', 68, 66, 84, 92, 'm', 1.4], ['l', 132, 66, 116, 92, 'm', 1.4], ['l', 84, 92, 116, 92, 'm', 1.4],
  ['t', 100, 128, '1,5 million d’associations', 9, 'middle', 'i', 700],
  ['t', 100, 142, 'loi du 1ᵉʳ juillet 1901', 7.5, 'middle', 'i2', 600]]);

K('e12', 'emc', 'mon', 'L’esprit critique', 'Cinq questions avant de partager.',
  'Qui publie ? Quand ? Où exactement ? Pourquoi ? D’autres sources fiables le disent-elles ? Une étude du MIT a montré qu’une fausse information se diffuse en moyenne <strong>six fois plus vite</strong> qu’une vraie, parce qu’elle surprend davantage. Si une information te met immédiatement en colère, c’est le meilleur moment pour la vérifier.',
  'Partager une infox engage ta responsabilité juridique.',
  [bg(), ['c', 86, 68, 30, 'none', 'i', 4],
  ['l', 108, 90, 136, 118, 'i', 5],
  ['t', 86, 74, '?', 26, 'middle', 'b', 700],
  ['t', 100, 138, 'Qui · Quand · Où · Pourquoi · Croisé', 8, 'middle', 'i2', 600]]);
