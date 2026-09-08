/* ============================================================
   Delta — collection de reperes (1/2) : HISTOIRE.
   Chaque fiche porte un petit dessin fait avec le moteur de cartes.
   ============================================================ */
const RARETES = [
  { id: 'tra', n: 'Trace', cls: 'rar-tra', p: 57.0, coins: 6, xp: 4 },
  { id: 'tem', n: 'Témoignage', cls: 'rar-tem', p: 25.0, coins: 14, xp: 9 },
  { id: 'arc', n: 'Archive', cls: 'rar-arc', p: 12.0, coins: 34, xp: 20 },
  { id: 'mon', n: 'Monument', cls: 'rar-mon', p: 4.6, coins: 90, xp: 48 },
  { id: 'leg', n: 'Légende', cls: 'rar-leg', p: 1.2, coins: 240, xp: 120 },
  { id: 'del', n: 'Delta', cls: 'rar-del', p: 0.2, coins: 900, xp: 400 }
];
const RAR = id => RARETES.find(r => r.id === id) || RARETES[0];
const CARTES = [];
const K = (id, m, r, n, d, e, k, s) => CARTES.push({ id: id, m: m, r: r, n: n, d: d, e: e, k: k, s: s });

/* ---------- petits blocs de dessin reutilisables ---------- */
const bg = (c) => ['r', 0, 0, 200, 150, (c || 'S2'), '', 0];
const cadre = (c) => ['r', 6, 6, 188, 138, 'none', (c || 'l'), 4];

/* ================= HISTOIRE ================= */

K('h01', 'hist', 'tra', 'Le casque Adrian', 'Le casque d’acier des poilus, adopté en 1915.',
  'Au début de la guerre, les soldats français partent au front avec un simple <strong>képi de drap</strong>. Les blessures à la tête représentent alors près d’un quart des pertes. L’intendant Louis Adrian conçoit en 1915 un casque d’acier embouti, produit à plus de <strong>20 millions d’exemplaires</strong>. Le gain est immédiat : les blessures crâniennes mortelles chutent de moitié.',
  'La guerre industrielle oblige à réinventer jusqu’à l’équipement individuel du soldat.',
  [bg(), ['path', 'M56 96 q44 -60 88 0 z', 'h:30', 'h', 2], ['path', 'M50 96 q50 12 100 0', 'none', 'h', 2.4],
  ['l', 100, 40, 100, 52, 'h', 3], ['c', 100, 38, 4, 'h', ''],
  ['t', 100, 124, 'Casque Adrian, 1915', 9, 'middle', 'i2', 600]]);

K('h02', 'hist', 'tra', 'La tranchée', 'Le boyau de terre où l’on a vécu quatre ans.',
  'Une tranchée de première ligne n’est pas une ligne droite : elle est creusée <strong>en zigzag</strong>, pour qu’un obus tombant dedans ou un ennemi y pénétrant ne puisse balayer tout le boyau. Devant, les barbelés ; derrière, les tranchées de soutien et de réserve reliées par des boyaux de communication.',
  '700 km de tranchées de la mer du Nord à la Suisse : le front n’a presque pas bougé de 1915 à 1918.',
  [bg(), ['path', 'M20 60 h30 v20 h-20 v20 h30 v-20 h20 v20 h30 v-20 h20 v20 h30 v-20 h20', 'none', 'i', 2.6],
  ['hatch', [[16, 100], [184, 100], [184, 130], [16, 130]], 'm', 45],
  ['t', 100, 44, 'Un tracé en zigzag', 9, 'middle', 'i2', 600],
  ['t', 100, 122, 'protège des tirs en enfilade', 8, 'middle', 'S', 500]]);

K('h03', 'hist', 'tem', 'Le taxi de la Marne', 'Six cent trente taxis vers le front, dans la nuit du 6 septembre 1914.',
  'Le général Gallieni réquisitionne les taxis parisiens pour transporter environ 4 000 soldats vers la Marne. L’apport militaire est modeste — l’essentiel arrive par train — mais l’image devient immédiatement un <strong>symbole de la nation en armes</strong>. Détail savoureux : la course fut facturée à l’État au tarif du compteur, avec 27 % de remise.',
  'La bataille de la Marne (6-12 septembre 1914) sauve Paris et fait échouer le plan Schlieffen.',
  [bg(), ['r', 40, 70, 100, 32, 'k:26', 'i', 4], ['r', 62, 52, 54, 22, 'k:18', 'i', 3],
  ['c', 62, 106, 10, 'i', ''], ['c', 122, 106, 10, 'i', ''],
  ['c', 62, 106, 4, 'S', ''], ['c', 122, 106, 4, 'S', ''],
  ['r', 46, 60, 14, 8, 'c', 'i', 2],
  ['a', 150, 86, 182, 86, 'k', '', 2],
  ['t', 100, 36, 'Paris → la Marne, 7 sept. 1914', 9, 'middle', 'i2', 600]]);

K('h04', 'hist', 'arc', 'La Voie sacrée', 'Un camion toutes les 14 secondes pendant dix mois.',
  'Verdun n’est reliée à l’arrière que par une petite route depuis Bar-le-Duc. Elle devient l’artère vitale de la bataille : <strong>3 500 camions par jour</strong>, une noria continue de ravitaillement et de relève. Des territoriaux jettent en permanence des pierres sous les roues pour empêcher la chaussée de s’effondrer. Maurice Barrès la baptise « la Voie sacrée ».',
  'Grâce à la noria, 70 % de l’armée française passera par Verdun en 1916.',
  [bg(), ['path', 'M24 122 C60 110 60 70 96 62 C132 54 140 40 176 34', 'none', 'm', 12],
  ['path', 'M24 122 C60 110 60 70 96 62 C132 54 140 40 176 34', 'none', 'S', 1.4, '5 5'],
  ['r', 46, 96, 16, 9, 'h', 'i', 1.5], ['r', 84, 68, 16, 9, 'h', 'i', 1.5], ['r', 130, 48, 16, 9, 'h', 'i', 1.5],
  ['sym', 20, 126, 'ville', 'i', 5], ['t', 20, 140, 'Bar-le-Duc', 8, 'start', 'i2', 600],
  ['sym', 180, 30, 'ville', 'k', 6], ['t', 180, 20, 'Verdun', 9, 'end', 'k', 700]]);

K('h05', 'hist', 'mon', 'Le soldat inconnu', 'Un corps choisi entre huit, sous l’Arc de Triomphe.',
  'Le 10 novembre 1920, huit cercueils de soldats non identifiés sont alignés dans la citadelle de Verdun. Auguste Thin, jeune soldat fils de poilu, additionne les chiffres de son régiment (132ᵉ : 1+3+2 = 6) et dépose son bouquet sur le <strong>sixième cercueil</strong>. La flamme est ravivée chaque soir à 18 h 30 depuis 1923 — sans interruption, y compris sous l’Occupation.',
  'Une tombe anonyme pour représenter 1,4 million de morts français.',
  [bg(), ['path', 'M46 122 v-58 q54 -42 108 0 v58 z', 'c:16', 'i', 2.4],
  ['r', 66, 84, 20, 38, 'S2', 'i', 2], ['r', 114, 84, 20, 38, 'S2', 'i', 2],
  ['path', 'M100 108 q-7 -12 0 -22 q7 10 0 22 z', 'c', 'c', 1],
  ['c', 100, 112, 3, 'c', ''],
  ['t', 100, 140, 'Arc de Triomphe, depuis 1920', 8.5, 'middle', 'i2', 600]]);

K('h06', 'hist', 'tem', 'Le train plombé de Lénine', 'Un wagon scellé qui traverse l’Allemagne en guerre.',
  'En avril 1917, l’état-major allemand fait traverser son territoire à Lénine, exilé en Suisse, dans un wagon scellé. Le calcul est simple : cet homme veut la paix immédiate, donc la sortie de la Russie du conflit. Churchill écrira qu’on avait envoyé Lénine en Russie « <strong>comme un bacille de peste</strong> ». Le 3 avril, il descend à la gare de Finlande et lance : « Tout le pouvoir aux soviets ! »',
  'Le pari allemand réussit : la Russie signe la paix en mars 1918 à Brest-Litovsk.',
  [bg(), ['r', 26, 62, 148, 44, 'h:24', 'i', 5],
  ['r', 40, 72, 24, 18, 'S2', 'i', 2], ['r', 76, 72, 24, 18, 'S2', 'i', 2], ['r', 112, 72, 24, 18, 'S2', 'i', 2],
  ['r', 146, 72, 18, 18, 'k:40', 'k', 2],
  ['c', 52, 112, 8, 'i', ''], ['c', 88, 112, 8, 'i', ''], ['c', 140, 112, 8, 'i', ''],
  ['t', 155, 84, '✕', 10, 'middle', 'k', 700],
  ['t', 100, 44, 'Zurich → Petrograd, avril 1917', 9, 'middle', 'i2', 600]]);

K('h07', 'hist', 'arc', 'Le wagon de Rethondes', 'Le même wagon pour deux armistices.',
  'Le 11 novembre 1918, l’armistice est signé dans le wagon-restaurant n° 2419 D du maréchal Foch, en forêt de Compiègne. Le 22 juin 1940, Hitler exige que la capitulation française soit signée <strong>dans le même wagon, au même endroit</strong> : on le fait sortir du musée et on le replace exactement sur ses rails d’origine. Le wagon sera détruit en 1945.',
  'Deux dates, un même lieu : 11 novembre 1918 et 22 juin 1940.',
  [bg(), ['r', 24, 58, 152, 46, 'g:20', 'i', 5],
  ['r', 38, 68, 26, 20, 'S2', 'i', 2], ['r', 74, 68, 26, 20, 'S2', 'i', 2], ['r', 110, 68, 26, 20, 'S2', 'i', 2], ['r', 146, 68, 20, 20, 'S2', 'i', 2],
  ['l', 14, 112, 186, 112, 'i', 2.4], ['l', 14, 118, 186, 118, 'i', 1.4],
  ['t', 62, 138, '1918', 11, 'middle', 'o', 700], ['t', 100, 138, '·', 11, 'middle', 'm'], ['t', 138, 138, '1940', 11, 'middle', 'k', 700],
  ['t', 100, 44, 'Wagon 2419 D, Rethondes', 8.5, 'middle', 'i2', 600]]);

K('h08', 'hist', 'tra', 'L’affiche de propagande', 'Convaincre, mobiliser, faire taire.',
  'Toutes les puissances en guerre ont massivement utilisé l’affiche : emprunts nationaux, engagement, dénonciation de l’ennemi. Les codes sont constants — <strong>un visage qui regarde le lecteur, un impératif, une couleur dominante</strong>. Savoir décrypter une affiche (qui la commande ? à qui parle-t-elle ? que veut-elle obtenir ?) est un savoir-faire attendu au brevet.',
  'Une affiche n’est jamais un document neutre : c’est un ordre déguisé en image.',
  [bg(), ['r', 46, 22, 108, 106, 'h:22', 'i', 3],
  ['c', 100, 56, 18, 'S', 'i'], ['c', 93, 53, 2.4, 'i', ''], ['c', 107, 53, 2.4, 'i', ''],
  ['path', 'M100 58 v8 M92 68 q8 6 16 0', 'none', 'i', 1.6],
  ['path', 'M76 122 q24 -40 48 0 z', 'i:30', 'i', 1.6],
  ['t', 100, 100, 'ENGAGEZ-VOUS', 9.5, 'middle', 'k', 700],
  ['t', 100, 140, 'Analyser : qui ? pour qui ? pourquoi ?', 7.5, 'middle', 'm']]);

K('h09', 'hist', 'tem', 'La croix gammée renversée', 'L’Allemagne bascule en dix-huit mois.',
  'Le 30 janvier 1933, Hitler est nommé chancelier <strong>légalement</strong>. En un an et demi : incendie du Reichstag et suspension des libertés (février), ouverture de Dachau (mars), parti unique (juillet), Nuit des Longs Couteaux (juin 1934), pleins pouvoirs de <em>Führer</em> (août 1934). Une démocratie peut être détruite par ceux qu’elle a portés au pouvoir.',
  '30 janvier 1933 : Hitler chancelier. Août 1934 : chef absolu du IIIᵉ Reich.',
  [bg(), ['r', 30, 40, 140, 70, 'k:12', 'k', 4],
  ['a', 42, 100, 42, 56, 'k', '', 3],
  ['t', 62, 60, 'chancelier', 8.5, 'start', 'i2', 600], ['t', 62, 74, 'parti unique', 8.5, 'start', 'i2', 600],
  ['t', 62, 88, 'pleins pouvoirs', 8.5, 'start', 'i2', 600], ['t', 62, 102, 'Führer', 8.5, 'start', 'k', 700],
  ['t', 100, 128, '30 janvier 1933 → août 1934', 9, 'middle', 'k', 700]]);

K('h10', 'hist', 'mon', 'Le mur de Berlin', 'Cent cinquante-cinq kilomètres qui coupent une ville.',
  'Construit dans la nuit du 12 au 13 août 1961 pour stopper l’hémorragie de la RDA (2,6 millions de départs depuis 1949), le mur fait 155 km de long, dont 43 en pleine ville. Ce n’est pas un simple mur mais un <strong>dispositif</strong> : mur extérieur, « bande de la mort » éclairée, chemin de ronde, miradors, second mur. Au moins 140 personnes y ont perdu la vie.',
  '13 août 1961 – 9 novembre 1989 : vingt-huit ans de séparation.',
  [bg(), ['r', 20, 60, 12, 66, 'm:60', 'i', 1], ['r', 168, 60, 12, 66, 'm:60', 'i', 1],
  ['hatch', [[36, 60], [164, 60], [164, 126], [36, 126]], 'k', 45],
  ['t', 100, 96, 'bande de la mort', 9, 'middle', 'k', 700],
  ['l', 60, 40, 60, 60, 'i', 2], ['r', 52, 30, 16, 12, 'i', 'i', 2],
  ['l', 140, 40, 140, 60, 'i', 2], ['r', 132, 30, 16, 12, 'i', 'i', 2],
  ['t', 100, 142, 'Berlin-Ouest      |      Berlin-Est', 8, 'middle', 'i2', 600]]);

K('h11', 'hist', 'arc', 'Le pont aérien de Berlin', 'Un avion toutes les 90 secondes pendant onze mois.',
  'Quand Staline coupe les routes vers Berlin-Ouest en juin 1948, les Alliés ravitaillent 2,2 millions de personnes <strong>par les airs</strong> : 277 000 vols, 2,3 millions de tonnes de charbon, de farine et de médicaments. Le pilote Gail Halvorsen y lance des friandises au bout de mouchoirs-parachutes : 23 tonnes de chocolat larguées sur les enfants berlinois.',
  'Blocus de Berlin, juin 1948 – mai 1949 : première grande crise de la guerre froide.',
  [bg(), ['sym', 50, 42, 'avion', 'b', 10], ['sym', 100, 34, 'avion', 'b', 10], ['sym', 150, 44, 'avion', 'b', 10],
  ['ca', 30, 60, 90, 96, 16, 'b', ''], ['ca', 170, 62, 112, 96, -16, 'b', ''],
  ['r', 70, 100, 60, 26, 'g:24', 'i', 3],
  ['t', 100, 116, 'BERLIN-OUEST', 8.5, 'middle', 'i', 700],
  ['t', 100, 142, '277 000 vols en 11 mois', 8.5, 'middle', 'i2', 600]]);

K('h12', 'hist', 'tem', 'Le rideau de fer', 'Une phrase de Churchill devient une frontière.',
  'Le 5 mars 1946, à Fulton (Missouri), Winston Churchill prononce une phrase qui va nommer quarante-cinq ans d’histoire : « De Stettin dans la Baltique à Trieste dans l’Adriatique, un <strong>rideau de fer</strong> est descendu à travers le continent. » L’expression, empruntée au vocabulaire du théâtre (le rideau coupe-feu), s’impose instantanément.',
  'La coupure Est-Ouest structure l’Europe de 1947 à 1989.',
  [bg(), ['r', 14, 30, 82, 96, 'b:22', 'b', 3], ['r', 104, 30, 82, 96, 'h:24', 'h', 3],
  ['l', 100, 22, 100, 134, 'k', 4, '7 4'],
  ['t', 55, 74, 'OUEST', 11, 'middle', 'b', 700], ['t', 145, 74, 'EST', 11, 'middle', 'h', 700],
  ['t', 55, 90, 'OTAN', 8, 'middle', 'b'], ['t', 145, 90, 'Varsovie', 8, 'middle', 'h'],
  ['t', 100, 146, 'Churchill, Fulton, 1946', 8, 'middle', 'i2', 600]]);

K('h13', 'hist', 'leg', 'La crise des missiles de Cuba', 'Treize jours au bord de l’abîme.',
  'En octobre 1962, un avion espion américain photographie des rampes de missiles soviétiques à Cuba, à 150 km des côtes de Floride. Kennedy impose un blocus naval ; les navires soviétiques font demi-tour à quelques milles de la ligne. En échange du retrait des missiles, les États-Unis s’engagent secrètement à retirer les leurs de Turquie. Le « <strong>téléphone rouge</strong> » entre Washington et Moscou naît de cette peur.',
  'Octobre 1962 : le moment où la guerre froide a failli devenir chaude.',
  [bg(), ['c', 100, 76, 52, 'b:10', 'b'],
  ['sym', 62, 58, 'nuke', 'b', 12], ['sym', 138, 58, 'nuke', 'h', 12],
  ['a', 74, 68, 122, 68, 'k', '', 2], ['a', 126, 84, 78, 84, 'k', '', 2],
  ['t', 100, 108, '13 JOURS', 12, 'middle', 'k', 700],
  ['t', 100, 140, 'Octobre 1962 · Kennedy / Khrouchtchev', 8, 'middle', 'i2', 600]]);

K('h14', 'hist', 'mon', 'Le débarquement de Normandie', 'Le plus grand débarquement de l’histoire.',
  'Le 6 juin 1944, 156 000 hommes débarquent sur cinq plages normandes (Utah, Omaha, Gold, Juno, Sword), appuyés par près de 7 000 navires et 11 000 avions. Deux ports artificiels sont remorqués depuis l’Angleterre. Le succès doit autant à la logistique qu’à la <strong>ruse</strong> : l’opération Fortitude a fait croire à une attaque dans le Pas-de-Calais avec des chars gonflables.',
  '6 juin 1944 : ouverture d’un second front à l’Ouest.',
  [bg(), ['r', 0, 0, 200, 74, 'mer', '', 0],
  ['path', 'M0 74 q50 -8 100 0 q50 8 100 0 v76 h-200 z', 'terre', 'i', 1.4],
  ['sym', 34, 40, 'triangle', 'b', 6], ['sym', 62, 30, 'triangle', 'b', 6], ['sym', 92, 44, 'triangle', 'b', 6],
  ['sym', 124, 32, 'triangle', 'b', 6], ['sym', 156, 42, 'triangle', 'b', 6],
  ['a', 40, 56, 40, 78, 'k', '', 2], ['a', 76, 52, 76, 78, 'k', '', 2],
  ['a', 118, 54, 118, 78, 'k', '', 2], ['a', 156, 58, 156, 80, 'k', '', 2],
  ['t', 100, 106, 'UTAH · OMAHA · GOLD · JUNO · SWORD', 8, 'middle', 'i', 700],
  ['t', 100, 128, '6 juin 1944 — 156 000 hommes', 9, 'middle', 'i2', 600]]);

K('h15', 'hist', 'del', 'L’appel du 18 juin', 'Une voix que presque personne n’a entendue.',
  'Le 18 juin 1940 à 18 h, un général de brigade à titre temporaire, inconnu du grand public, parle quatre minutes au micro de la BBC. Aucun enregistrement de ce premier appel n’a été conservé — ce que l’on entend aujourd’hui est la version du 22 juin. Le texte, placardé sur les murs de Londres puis recopié clandestinement, deviendra l’<strong>acte fondateur de la France libre</strong> et sera inscrit au registre Mémoire du monde de l’UNESCO.',
  '« Quoi qu’il arrive, la flamme de la résistance française ne doit pas s’éteindre et ne s’éteindra pas. »',
  [bg(), ['c', 100, 66, 40, 'c:16', 'c'],
  ['r', 92, 44, 16, 30, 'i', 'i', 6], ['l', 100, 74, 100, 92, 'i', 2.4], ['l', 86, 92, 114, 92, 'i', 2.4],
  ['path', 'M78 56 q-10 12 0 24', 'none', 'c', 2], ['path', 'M70 50 q-16 18 0 36', 'none', 'c', 1.6],
  ['path', 'M122 56 q10 12 0 24', 'none', 'c', 2], ['path', 'M130 50 q16 18 0 36', 'none', 'c', 1.6],
  ['t', 100, 122, '18 JUIN 1940', 13, 'middle', 'i', 700],
  ['t', 100, 140, 'Radio Londres · BBC', 8, 'middle', 'i2', 600]]);

K('h16', 'hist', 'arc', 'Le Vél’ d’Hiv’', 'Une rafle menée par la police française.',
  'Les 16 et 17 juillet 1942, 13 152 personnes juives sont arrêtées à Paris par des <strong>policiers français</strong>, dont 4 115 enfants. Les familles sont parquées plusieurs jours au Vélodrome d’Hiver, sans eau ni sanitaires, avant d’être déportées. Le 16 juillet 1995, Jacques Chirac reconnaît officiellement la responsabilité de l’État français dans ce crime.',
  'Sur environ 76 000 Juifs déportés de France, moins de 3 000 sont revenus.',
  [bg(), ['path', 'M28 118 q72 -76 144 0', 'none', 'i', 3],
  ['l', 28, 118, 172, 118, 'i', 3],
  ['l', 56, 118, 56, 96, 'l', 1.4], ['l', 84, 118, 84, 82, 'l', 1.4],
  ['l', 116, 118, 116, 82, 'l', 1.4], ['l', 144, 118, 144, 96, 'l', 1.4],
  ['c', 78, 110, 3.4, 'k', ''], ['c', 90, 110, 3.4, 'k', ''], ['c', 102, 110, 3.4, 'k', ''],
  ['c', 114, 110, 3.4, 'k', ''], ['c', 96, 102, 3.4, 'k', ''],
  ['t', 100, 138, '16-17 juillet 1942', 9.5, 'middle', 'k', 700]]);

K('h17', 'hist', 'tem', 'Le message codé de Radio Londres', 'Verlaine annonce le débarquement.',
  'Chaque soir, la BBC diffusait des « messages personnels » absurdes qui étaient en réalité des ordres pour les réseaux : « Jean a une longue moustache », « Les carottes sont cuites ». Le 5 juin 1944 au soir, la seconde partie d’un vers de Verlaine — « <em>blessent mon cœur d’une langueur monotone</em> » — signale que le débarquement aura lieu dans les 48 heures.',
  'La Résistance intérieure prépare le terrain : sabotages, renseignement, guidage.',
  [bg(), ['r', 40, 52, 120, 62, 'c:16', 'i', 6],
  ['c', 74, 84, 18, 'S2', 'i'], ['c', 74, 84, 5, 'i', ''],
  ['path', 'M60 74 q14 -10 28 0 M62 94 q12 8 24 0', 'none', 'i', 1.2],
  ['r', 106, 66, 42, 10, 'S2', 'i', 2], ['c', 116, 94, 5, 'i', ''], ['c', 134, 94, 5, 'i', ''],
  ['l', 160, 52, 176, 26, 'i', 2],
  ['t', 100, 132, '« Les sanglots longs des violons… »', 8.5, 'middle', 'i2', 600]]);

K('h18', 'hist', 'tra', 'Le ticket de rationnement', 'La faim organisée par l’État.',
  'De 1940 à 1949, chaque Français reçoit une carte d’alimentation et des tickets. La ration officielle tombe à environ <strong>1 200 calories par jour</strong> en 1942, moins de la moitié du nécessaire. Le marché noir explose, le troc revient, on cultive des pommes de terre dans les jardins publics. Le pain reste rationné jusqu’en 1949, soit quatre ans après la fin de la guerre.',
  'La pénurie fait partie de l’expérience quotidienne de l’Occupation.',
  [bg(), ['r', 34, 40, 132, 74, 'S', 'i', 4],
  ['l', 34, 62, 166, 62, 'l', 1.2],
  ['l', 78, 62, 78, 114, 'l', 1.2], ['l', 122, 62, 122, 114, 'l', 1.2],
  ['l', 34, 88, 166, 88, 'l', 1.2],
  ['t', 100, 55, 'CARTE D’ALIMENTATION', 8.5, 'middle', 'i', 700],
  ['t', 56, 79, 'PAIN', 8, 'middle', 'm', 600], ['t', 100, 79, 'SUCRE', 8, 'middle', 'm', 600], ['t', 144, 79, 'VIANDE', 8, 'middle', 'm', 600],
  ['t', 56, 105, 'J1', 8, 'middle', 'm'], ['t', 100, 105, 'J2', 8, 'middle', 'm'], ['t', 144, 105, 'J3', 8, 'middle', 'm'],
  ['t', 100, 134, '1940-1949', 9, 'middle', 'i2', 600]]);

K('h19', 'hist', 'mon', 'La Sécurité sociale', 'Ordonnances d’octobre 1945.',
  'Issue du programme du CNR, la Sécurité sociale est créée en quelques mois par Pierre Laroque et Ambroise Croizat, dans un pays qui manque de tout — les premières fiches d’assurés sont imprimées au dos de formulaires allemands récupérés. Le principe est simple et révolutionnaire : chacun cotise selon ses moyens et reçoit selon ses besoins.',
  'Maladie, retraite, allocations familiales : le modèle social français naît en 1945.',
  [bg(), ['c', 100, 72, 40, 'o:16', 'o'],
  ['path', 'M100 96 c-22 -16 -30 -28 -22 -38 c6 -8 16 -6 22 4 c6 -10 16 -12 22 -4 c8 10 0 22 -22 38 z', 'o', 'o', 1.5],
  ['t', 100, 126, '1945', 14, 'middle', 'i', 700],
  ['t', 100, 142, '« de chacun selon ses moyens… »', 7.5, 'middle', 'i2', 600]]);

K('h20', 'hist', 'tem', 'Le bulletin de vote de 1945', 'Les Françaises votent pour la première fois.',
  'L’ordonnance du 21 avril 1944, signée à Alger, accorde le droit de vote et d’éligibilité aux femmes. Elles votent le 29 avril 1945 aux municipales. Le Sénat français avait bloqué la mesure <strong>à quatre reprises</strong> entre 1919 et 1936, craignant un vote « dicté par le curé ». La France arrive 51 ans après la Nouvelle-Zélande.',
  '21 avril 1944 : droit de vote des femmes. Premier vote : 29 avril 1945.',
  [bg(), ['r', 56, 46, 88, 58, 'S', 'i', 4],
  ['path', 'M60 76 h80', 'none', 'l', 1.4],
  ['t', 100, 68, 'BULLETIN', 9, 'middle', 'i', 700],
  ['r', 46, 104, 108, 26, 'b:20', 'b', 3],
  ['path', 'M76 104 h48 v-6 h-48 z', 'S', 'b', 1.6],
  ['a', 100, 34, 100, 96, 'k', '', 2.2],
  ['t', 100, 146, '1944 · 1945', 9, 'middle', 'i2', 700]]);

K('h21', 'hist', 'arc', 'Les congés payés de 1936', 'Deux semaines, et la mer pour la première fois.',
  'Les accords Matignon accordent 15 jours de congés payés. Léo Lagrange obtient des « billets Lagrange » à 40 % de réduction : 600 000 vendus l’été 1936. Sur les photos, les couples arrivent à la mer <strong>à vélo et en habits du dimanche</strong> — personne n’avait de tenue de vacances, puisque personne n’en avait jamais pris.',
  '1936 : semaine de 40 h, 15 jours de congés payés, conventions collectives.',
  [bg(), ['r', 0, 96, 200, 54, 'g:22', '', 0],
  ['path', 'M0 96 q26 -8 52 0 q26 8 52 0 q26 -8 52 0 q26 8 44 0', 'none', 'b', 2],
  ['c', 156, 36, 16, 'c', ''],
  ['l', 74, 96, 74, 52, 'i', 2.4], ['l', 74, 52, 106, 62, 'k', 2],
  ['path', 'M52 96 q22 -14 44 0 z', 'k:36', 'k', 1.4],
  ['c', 46, 108, 8, 'i', ''], ['c', 82, 108, 8, 'i', ''], ['l', 46, 108, 82, 108, 'i', 1.6],
  ['t', 100, 138, 'Été 1936 · les premiers congés payés', 8.5, 'middle', 'i2', 600]]);

K('h22', 'hist', 'tra', 'Le plan Marshall', 'Treize milliards de dollars pour l’Europe.',
  'Annoncé en juin 1947, le plan Marshall apporte 13 milliards de dollars d’aide à seize pays européens. Objectif double : relever des économies exsangues et <strong>éviter que la misère ne pousse l’Europe vers le communisme</strong>. Staline interdit aux pays de l’Est d’y participer : c’est la naissance concrète des deux blocs.',
  'Doctrine Truman + plan Marshall (1947) : le début de la guerre froide.',
  [bg(), ['c', 60, 76, 30, 'b:24', 'b'], ['t', 60, 80, '$', 22, 'middle', 'b', 700],
  ['a', 96, 76, 138, 76, 'b', '', 3],
  ['r', 142, 50, 44, 52, 'g:22', 'g', 4],
  ['t', 164, 72, 'EUROPE', 8.5, 'middle', 'g', 700], ['t', 164, 86, '16 pays', 7.5, 'middle', 'm'],
  ['t', 100, 126, '1947 · 13 milliards de dollars', 9, 'middle', 'i2', 600]]);

K('h23', 'hist', 'leg', 'La chute du mur', 'Un empire tombe sur un malentendu.',
  'Le 9 novembre 1989 au soir, le porte-parole est-allemand Günter Schabowski lit un texte qu’il n’a pas relu. Un journaliste demande : « À partir de quand ? » Il hésite, feuillette, puis lâche : « <strong>Sofort, unverzüglich</strong> » — tout de suite, sans délai. La mesure devait être encadrée et prendre effet le lendemain. Quelques heures plus tard, la foule force les checkpoints. Les gardes, sans ordre, ouvrent.',
  '9 novembre 1989 : la chute du mur ouvre la voie à la réunification allemande (1990).',
  [bg(), ['r', 20, 66, 30, 60, 'm:60', 'i', 1],
  ['poly', [[58, 70], [72, 64], [78, 84], [62, 92]], 'm:50', 'i', 1],
  ['poly', [[86, 92], [102, 82], [110, 104], [92, 112]], 'm:50', 'i', 1],
  ['poly', [[118, 74], [134, 68], [140, 90], [122, 96]], 'm:50', 'i', 1],
  ['r', 152, 66, 28, 60, 'm:60', 'i', 1],
  ['sym', 100, 44, 'etoile', 'c', 10],
  ['t', 100, 138, '9 NOVEMBRE 1989', 11, 'middle', 'i', 700]]);

K('h24', 'hist', 'tem', 'Le drapeau européen', 'Douze étoiles qui ne comptent personne.',
  'Adopté en 1955 par le Conseil de l’Europe, repris par la CEE en 1985, le drapeau porte douze étoiles alors que l’Union a compté 6, 9, 12, 15, 25, 28 puis 27 membres. Le nombre <strong>ne désigne pas les États</strong> : douze est un symbole de plénitude (les mois, les heures). C’est pourquoi il n’a jamais fallu le modifier, même après le Brexit.',
  'Symboles de l’UE : drapeau, hymne (l’Ode à la joie), Journée de l’Europe le 9 mai.',
  [bg('b:22'), ['c', 100, 76, 46, 'none', 'none'],
  ['sym', 100, 30, 'etoile', 'c', 7], ['sym', 123, 36, 'etoile', 'c', 7], ['sym', 140, 53, 'etoile', 'c', 7],
  ['sym', 146, 76, 'etoile', 'c', 7], ['sym', 140, 99, 'etoile', 'c', 7], ['sym', 123, 116, 'etoile', 'c', 7],
  ['sym', 100, 122, 'etoile', 'c', 7], ['sym', 77, 116, 'etoile', 'c', 7], ['sym', 60, 99, 'etoile', 'c', 7],
  ['sym', 54, 76, 'etoile', 'c', 7], ['sym', 60, 53, 'etoile', 'c', 7], ['sym', 77, 36, 'etoile', 'c', 7]]);

K('h25', 'hist', 'arc', 'La déclaration Schuman', 'Le charbon et l’acier contre la guerre.',
  'Le 9 mai 1950, dans le salon de l’Horloge du Quai d’Orsay, Robert Schuman lit un texte rédigé par Jean Monnet : mettre en commun la production franco-allemande de charbon et d’acier — les deux matières premières de la guerre. La phrase clé : rendre la guerre « <strong>non seulement impensable, mais matériellement impossible</strong> ».',
  '9 mai 1950 → CECA en 1951 → CEE en 1957 → UE en 1992.',
  [bg(), ['r', 26, 56, 62, 56, 'b:24', 'b', 4], ['t', 57, 88, 'FRANCE', 8.5, 'middle', 'b', 700],
  ['r', 112, 56, 62, 56, 'h:24', 'h', 4], ['t', 143, 88, 'RFA', 8.5, 'middle', 'h', 700],
  ['a', 90, 74, 110, 74, 'i', '', 2], ['a', 110, 94, 90, 94, 'i', '', 2],
  ['t', 100, 42, 'charbon + acier en commun', 8.5, 'middle', 'i', 600],
  ['t', 100, 132, '9 mai 1950 · Journée de l’Europe', 8.5, 'middle', 'i2', 600]]);

K('h26', 'hist', 'tra', 'Le plan quinquennal', 'Cinq ans pour rattraper cent ans de retard.',
  'À partir de 1928, l’État soviétique fixe pour cinq ans des objectifs chiffrés de production, avec priorité absolue à l’industrie lourde. Les affiches claironnent « le plan en quatre ans ! ». Les résultats sont réels — l’URSS devient la deuxième puissance industrielle mondiale — mais obtenus par la contrainte, la falsification des chiffres et un coût humain considérable.',
  'Économie planifiée = l’État décide de tout, contre l’économie de marché.',
  [bg(), ['bars', 32, 30, 136, 66, [['1928', 12, 'h'], ['1932', 32, 'h'], ['1937', 58, 'h'], ['1940', 70, 'h']], { titre: 'Production d’acier (indice)', max: 80, grille: [0, .5, 1], axe: false }],
  ['t', 100, 132, 'Plans quinquennaux, à partir de 1928', 8.5, 'middle', 'i2', 600]]);

K('h27', 'hist', 'tem', 'Le procès de Nuremberg', 'Juger l’injugeable.',
  'De novembre 1945 à octobre 1946, 22 dirigeants nazis comparaissent devant un tribunal militaire international. Une notion juridique nouvelle y est forgée : le <strong>crime contre l’humanité</strong>, imprescriptible. Le procès invente aussi la traduction simultanée par casque, sans laquelle il aurait été matériellement impossible de juger en quatre langues.',
  'Nuremberg (1945-1946) fonde la justice pénale internationale.',
  [bg(), ['l', 100, 34, 100, 104, 'i', 3], ['l', 60, 46, 140, 46, 'i', 2.6],
  ['path', 'M60 46 l-12 26 h24 z', 'c:30', 'i', 1.6], ['path', 'M140 46 l-12 26 h24 z', 'c:30', 'i', 1.6],
  ['path', 'M80 104 h40 v8 h-40 z', 'i', 'i', 2],
  ['t', 100, 132, 'Crime contre l’humanité', 9.5, 'middle', 'i', 700],
  ['t', 100, 146, 'imprescriptible', 8, 'middle', 'i2', 600]]);

K('h28', 'hist', 'mon', 'La Voie lactée des indépendances', '1960, l’année de l’Afrique.',
  'En 1960, dix-sept États africains deviennent indépendants, dont quatorze anciennes colonies françaises. L’ONU passe de 51 membres en 1945 à 99 en 1960. Les frontières héritées de la colonisation, souvent tracées à la règle lors de la conférence de Berlin (1885), sont conservées telles quelles — un choix assumé pour éviter des guerres frontalières en chaîne.',
  '1960 : dix-sept indépendances africaines en une seule année.',
  [bg(), ['map', 'MONDE', 4, 12, 1.9, { base: 'terre', fill: { af: 'w:36', eu: 'b:20' }, mer: false }],
  ['t', 100, 138, '17 États indépendants en 1960', 9, 'middle', 'i2', 600]]);

K('h29', 'hist', 'arc', 'La bataille de Stalingrad', 'Se battre étage par étage.',
  'D’août 1942 à février 1943, on se bat dans une ville en ruines, immeuble par immeuble, parfois d’un étage à l’autre du même bâtiment. Les Soviétiques appellent cela la « <em>guerre des rats</em> ». La VIᵉ armée allemande, encerclée par l’opération Uranus, capitule : 90 000 prisonniers, dont 6 000 seulement reverront l’Allemagne.',
  'Stalingrad marque le tournant de la guerre sur le front de l’Est.',
  [bg(), ['poly', [[24, 122], [24, 62], [40, 62], [40, 84], [56, 84], [56, 48], [72, 48], [72, 122]], 'm:34', 'i', 1.6],
  ['poly', [[86, 122], [86, 70], [100, 70], [100, 40], [116, 40], [116, 92], [130, 92], [130, 122]], 'm:34', 'i', 1.6],
  ['poly', [[144, 122], [144, 56], [162, 56], [162, 78], [176, 78], [176, 122]], 'm:34', 'i', 1.6],
  ['sym', 62, 96, 'bataille', 'k', 6], ['sym', 108, 76, 'bataille', 'k', 6], ['sym', 156, 92, 'bataille', 'k', 6],
  ['l', 16, 122, 184, 122, 'i', 2.4],
  ['t', 100, 142, 'août 1942 – février 1943', 9, 'middle', 'i2', 600]]);

K('h30', 'hist', 'del', 'La flamme du souvenir', 'Ravivée chaque soir depuis cent ans.',
  'Depuis le 11 novembre 1923, la flamme de la tombe du Soldat inconnu est ravivée chaque soir à 18 h 30, sans une seule interruption — y compris pendant les quatre années d’Occupation, où la cérémonie fut maintenue sous le regard des soldats allemands, devenant un acte de résistance silencieuse. C’est la plus longue cérémonie ininterrompue de France.',
  'La mémoire n’est pas le passé : c’est ce que chaque génération décide d’en faire.',
  [bg(), ['c', 100, 84, 44, 'c:12', 'c'],
  ['path', 'M100 116 c-16 -14 -22 -26 -14 -40 c4 -8 12 -10 14 -18 c4 8 10 10 14 18 c8 14 2 26 -14 40 z', 'c:60', 'c', 2],
  ['path', 'M100 112 c-8 -8 -11 -16 -7 -24 c3 -6 6 -7 7 -12 c2 5 4 6 7 12 c4 8 1 16 -7 24 z', 'c', '', 0],
  ['r', 72, 118, 56, 8, 'i', 'i', 2],
  ['t', 100, 144, 'Chaque soir, 18 h 30', 8.5, 'middle', 'i2', 600]]);

K('h31', 'hist', 'tra', 'La chronologie', 'L’outil de base de l’historien.',
  'Une frise chronologique n’est pas une décoration : c’est un raisonnement. Elle rend visible ce qu’un texte peine à dire — les <strong>durées</strong>, les <strong>simultanéités</strong>, les <strong>ruptures</strong>. Placer côte à côte 1917 (révolutions russes) et 1917 (entrée en guerre des États-Unis) fait immédiatement comprendre pourquoi cette année a fait basculer le siècle.',
  'Savoir situer dans le temps est la première compétence évaluée au brevet.',
  [bg(), ['frise', 20, 78, 160, 1900, 2000, [
    [1914, '1914', 'h', 1], [1945, '1945', 'b', -1], [1989, '1989', 'o', 1]
  ], { graduation: 25, hauteur: 16 }],
  ['t', 100, 128, 'Situer, ordonner, mettre en relation', 8.5, 'middle', 'i2', 600]]);

K('h32', 'hist', 'tem', 'Le totalitarisme', 'Quatre piliers, deux régimes.',
  'Le mot apparaît en Italie dans les années 1920 et sert aujourd’hui à comparer l’URSS stalinienne et l’Allemagne nazie. Attention : comparer n’est pas confondre. Les <strong>mécanismes</strong> se ressemblent (parti unique, terreur, propagande, économie contrôlée) mais les <strong>idéologies</strong> sont opposées — l’une prétend abolir les classes, l’autre hiérarchiser des races.',
  'Comparer deux régimes, c’est chercher à la fois les ressemblances et les différences.',
  [bg(), ['box', 56, 24, 88, 24, 'PARTI + CHEF', 'i'],
  ['box', 12, 62, 82, 24, 'TERREUR', 'k'], ['box', 106, 62, 82, 24, 'PROPAGANDE', 'b'],
  ['box', 56, 100, 88, 24, 'ÉCONOMIE DIRIGÉE', 'g'],
  ['l', 100, 48, 100, 62, 'm', 1.2], ['l', 100, 86, 100, 100, 'm', 1.2],
  ['l', 76, 48, 46, 62, 'm', 1.2], ['l', 124, 48, 150, 62, 'm', 1.2],
  ['t', 100, 142, 'URSS de Staline · Allemagne nazie', 8, 'middle', 'i2', 600]]);

K('h33', 'hist', 'arc', 'Le tank de la Somme', 'Le 15 septembre 1916, une machine sort du brouillard.',
  'Les premiers chars britanniques Mark I sont si secrets qu’on les expédie sous l’étiquette « <em>water tanks for Russia</em> » — réservoirs d’eau pour la Russie. Le mot « tank » restera. Sur 49 engagés, une trentaine seulement atteint la ligne de départ : ils tombent en panne, s’enlisent, chauffent à 50 °C à l’intérieur. Mais la brèche psychologique est ouverte.',
  'Le char naît pour briser l’impasse des tranchées et des mitrailleuses.',
  [bg(), ['path', 'M34 108 q0 -22 22 -22 h88 q22 0 22 22 q0 14 -22 14 h-88 q-22 0 -22 -14 z', 'm:40', 'i', 2],
  ['c', 56, 108, 9, 'S2', 'i'], ['c', 82, 108, 9, 'S2', 'i'], ['c', 108, 108, 9, 'S2', 'i'], ['c', 134, 108, 9, 'S2', 'i'],
  ['r', 78, 66, 44, 22, 'm:50', 'i', 3],
  ['l', 122, 74, 168, 68, 'i', 3],
  ['hatch', [[16, 122], [184, 122], [184, 140], [16, 140]], 'm', 45],
  ['t', 100, 48, '15 septembre 1916', 9, 'middle', 'i2', 700]]);

K('h34', 'hist', 'mon', 'Le Panthéon', 'Aux grands hommes — et femmes — la patrie reconnaissante.',
  'Ancienne église transformée en nécropole républicaine en 1791, le Panthéon abrite les personnes que la République choisit d’honorer. Il a fallu attendre <strong>1995</strong> pour qu’une femme y entre pour ses propres mérites : Marie Curie. Depuis, Germaine Tillion, Geneviève de Gaulle-Anthonioz, Simone Veil (2018) et Joséphine Baker (2021) l’ont rejointe.',
  'La panthéonisation est un choix politique : elle dit ce que la nation veut être.',
  [bg(), ['path', 'M40 84 h120 l-60 -34 z', 'c:20', 'i', 2],
  ['l', 46, 84, 46, 122, 'i', 2.6], ['l', 68, 84, 68, 122, 'i', 2.6],
  ['l', 90, 84, 90, 122, 'i', 2.6], ['l', 112, 84, 112, 122, 'i', 2.6],
  ['l', 134, 84, 134, 122, 'i', 2.6], ['l', 156, 84, 156, 122, 'i', 2.6],
  ['r', 32, 122, 136, 8, 'i:22', 'i', 2],
  ['path', 'M84 44 q16 -14 32 0', 'none', 'i', 2],
  ['t', 100, 146, '« Aux grands hommes… »', 8, 'middle', 'i2', 600]]);

K('h35', 'hist', 'leg', 'Le testing du souvenir', 'Ce que l’histoire fait avec les silences.',
  'Le 17 octobre 1961, une manifestation pacifique d’Algériens à Paris est réprimée par la police : plusieurs dizaines de morts, des corps jetés dans la Seine. Les archives sont scellées, la presse censurée, l’événement disparaît des mémoires pendant trente ans. Il faudra le travail obstiné d’historiens et de familles pour qu’il soit reconnu en 2012. Un fait historique peut être <strong>effacé</strong> puis <strong>retrouvé</strong>.',
  'L’histoire est un travail : sources, critique, débat. Ce n’est pas une opinion.',
  [bg(), ['r', 28, 34, 144, 82, 'S', 'i', 4],
  ['l', 40, 54, 160, 54, 'l', 1.4], ['l', 40, 68, 160, 68, 'l', 1.4],
  ['r', 56, 60, 88, 22, 'i:70', '', 2],
  ['l', 40, 96, 160, 96, 'l', 1.4], ['l', 40, 108, 120, 108, 'l', 1.4],
  ['sym', 150, 100, 'etoile', 'c', 8],
  ['t', 100, 136, '17 octobre 1961 · reconnu en 2012', 8, 'middle', 'i2', 600]]);
