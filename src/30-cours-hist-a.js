/* ============================================================
   Delta — cours d'HISTOIRE (1/3). Programme de 3e.
   Un cours : {id, m, th, t, d, mo:[mots-cles], sec:[...]}
   Sections : p / h / ul / ol / def / anec / note / keep / doc / fig /
              chiffres / tab / rep
   ============================================================ */
const COURS = [];

COURS.push(
{
  id: 'h1', m: 'hist', th: 'L’Europe, un théâtre majeur des guerres totales',
  t: 'L’Europe en 1914 : l’engrenage',
  d: 'Comment deux coups de revolver à Sarajevo ont fait basculer un continent entier dans la guerre en cinq semaines.',
  mo: ['Triple-Entente', 'Triple-Alliance', 'nationalisme', 'Sarajevo'],
  sec: [
    ['p', 'Au printemps 1914, l’Europe n’a jamais paru aussi prospère. Le train relie Paris à Constantinople, l’électricité éclaire les boulevards, les Expositions universelles célèbrent le progrès. Six mois plus tard, des millions d’hommes s’enterrent dans la boue. Comprendre 1914, ce n’est pas chercher un coupable : c’est comprendre un <strong>engrenage</strong> que personne n’a voulu arrêter.'],
    ['h', 'Une Europe qui domine le monde… et se déteste'],
    ['p', 'En 1914, l’Europe contrôle près de 85 % des terres émergées à travers ses <strong>empires coloniaux</strong>. Le Royaume-Uni règne sur 400 millions de sujets, la France sur un empire de 10 millions de km². Cette domination nourrit les rivalités : deux crises marocaines (1905, 1911) manquent de déclencher une guerre franco-allemande à propos… de Tanger et d’Agadir.'],
    ['p', 'À l’intérieur, les États sont travaillés par le <strong>nationalisme</strong>. En France, on n’a pas digéré la perte de l’Alsace et d’une partie de la Lorraine en 1871 : dans les manuels scolaires, ces provinces sont coloriées en violet, comme un deuil. Dans les Balkans, la Serbie rêve de rassembler tous les Slaves du Sud, au détriment de l’Autriche-Hongrie qui les administre. On appelle la région la « poudrière des Balkans ».'],
    ['def', [
      ['Nationalisme', 'idéologie qui place sa nation au-dessus des autres et réclame pour elle toutes les terres où vivent ses compatriotes.'],
      ['Revanche', 'en France, désir de reprendre à l’Allemagne l’Alsace-Lorraine annexée en 1871.'],
      ['Militarisme', 'exaltation de l’armée et course aux armements : entre 1900 et 1914, les budgets militaires européens doublent.']
    ]],
    ['h', 'Deux blocs qui se font face'],
    ['p', 'L’Europe s’est organisée en deux systèmes d’alliances défensives. Chacun promet d’aider les autres en cas d’attaque : c’est précisément ce mécanisme qui va transformer une querelle locale en guerre mondiale.'],
    ['fig', [
      ['r', 8, 14, 104, 76, 'b:12', 'b', 6],
      ['t', 60, 28, 'TRIPLE-ENTENTE', 8.5, 'middle', 'b', 700],
      ['t', 60, 42, 'France', 8, 'middle', 'i'], ['t', 60, 55, 'Royaume-Uni', 8, 'middle', 'i'],
      ['t', 60, 68, 'Russie', 8, 'middle', 'i'],
      ['t', 60, 83, '+ Serbie, Belgique…', 7, 'middle', 'm'],
      ['r', 148, 14, 104, 76, 'h:12', 'h', 6],
      ['t', 200, 28, 'TRIPLE-ALLIANCE', 8.5, 'middle', 'h', 700],
      ['t', 200, 42, 'Allemagne', 8, 'middle', 'i'], ['t', 200, 55, 'Autriche-Hongrie', 8, 'middle', 'i'],
      ['t', 200, 68, 'Italie', 8, 'middle', 'i'],
      ['t', 200, 83, '+ Empire ottoman (fin 1914)', 6.6, 'middle', 'm'],
      ['a', 116, 50, 144, 50, 'k', '', 1.6], ['a', 144, 60, 116, 60, 'k', '', 1.6],
      ['t', 130, 40, 'rivalité', 7, 'middle', 'k', 600],
      ['t', 130, 104, 'L’Italie change de camp en 1915 et rejoint l’Entente.', 7, 'middle', 'm']
    ], 260, 112, 'Les deux systèmes d’alliances en 1914.'],
    ['anec', 'Le chauffeur qui a raté son virage', 'Le 28 juin 1914, à Sarajevo, une première bombe rate l’archiduc <strong>François-Ferdinand</strong>, héritier d’Autriche-Hongrie. L’attentat a échoué, les conspirateurs se dispersent. L’un d’eux, Gavrilo Princip, 19 ans, va manger un sandwich. Une heure plus tard, le chauffeur de l’archiduc se trompe de rue, fait marche arrière… et s’arrête à trois mètres de Princip. Deux coups de feu. L’Histoire tient parfois à un demi-tour raté.'],
    ['h', 'Cinq semaines pour basculer'],
    ['p', 'L’Autriche-Hongrie, soutenue par l’Allemagne (le fameux « chèque en blanc »), adresse à la Serbie un ultimatum inacceptable. La Serbie accepte presque tout : ce n’est pas assez. L’enchaînement est alors mécanique.'],
    ['rep', [
      ['28 juin 1914', 'Attentat de Sarajevo : François-Ferdinand est assassiné.'],
      ['28 juillet', 'L’Autriche-Hongrie déclare la guerre à la Serbie.'],
      ['30 juillet', 'La Russie mobilise pour défendre la Serbie.'],
      ['1ᵉʳ août', 'Mobilisation générale en France et en Allemagne.'],
      ['3 août', 'L’Allemagne déclare la guerre à la France et envahit la Belgique neutre.'],
      ['4 août', 'Le Royaume-Uni entre en guerre au nom de la neutralité belge.']
    ]],
    ['note', 'Le 31 juillet 1914, <strong>Jean Jaurès</strong>, chef socialiste et principale voix pacifiste française, est assassiné au café du Croissant à Paris. Sa mort prive la France de son plus grand opposant à la guerre au moment décisif. Aux obsèques, le secrétaire de la CGT lance : « Nous entrons dans la guerre le cœur brisé. »'],
    ['h', 'La « fleur au fusil » : un mythe à nuancer'],
    ['p', 'On imagine souvent des foules en délire poussant les soldats vers la gare. La réalité est plus grave : les rapports de préfets montrent une France <strong>résignée</strong> plutôt qu’enthousiaste, surtout dans les campagnes où l’on part en pleine moisson. Mais tous partent : sur 3,7 millions d’hommes appelés, moins de 1,5 % désertent, alors que l’état-major en attendait 13 %. C’est ce qu’on appellera l’<strong>Union sacrée</strong> : socialistes, catholiques et républicains se rangent derrière le gouvernement.'],
    ['p', 'De part et d’autre, une conviction partagée : la guerre sera courte. « Vous serez rentrés avant la chute des feuilles », promet l’empereur Guillaume II à ses troupes. Elle durera <strong>1 561 jours</strong>.'],
    ['atlas', 'a-eur-1914', "L’Europe des deux alliances à la veille de la guerre."],
    ['keep', [
      'En 1914, l’Europe domine le monde mais s’est divisée en deux blocs d’alliances : Triple-Entente contre Triple-Alliance.',
      'Nationalisme, militarisme et rivalités coloniales préparent les esprits à la guerre.',
      'L’attentat de Sarajevo (28 juin 1914) déclenche l’engrenage des alliances : en cinq semaines, l’Europe entière est en guerre.',
      'Tous croient à une guerre courte : elle durera quatre ans et trois mois.'
    ]]
  ]
},

{
  id: 'h2', m: 'hist', th: 'L’Europe, un théâtre majeur des guerres totales',
  t: 'La Grande Guerre, une guerre totale',
  d: 'Trois phases, des tranchées, et une société entière mise au service du front : la définition même de la guerre totale.',
  mo: ['guerre totale', 'tranchée', 'économie de guerre', 'propagande'],
  sec: [
    ['p', 'La Première Guerre mondiale n’est pas seulement plus longue que les précédentes : elle est d’une <strong>autre nature</strong>. Elle mobilise non seulement les armées, mais l’économie, la science, les colonies, les femmes, les enfants, l’opinion. C’est ce qu’on appelle une <strong>guerre totale</strong>.'],
    ['def', [['Guerre totale', 'guerre dans laquelle un État mobilise toutes ses ressources — humaines, économiques, scientifiques, idéologiques — et efface la frontière entre le front et l’arrière.']]],
    ['h', 'Trois phases'],
    ['fig', [
      ['frise', 16, 60, 240, 1914, 1919, [
        [1914, 'Marne', 'h', 1], [1916, 'Verdun', 'k', 1], [1917, 'Révolutions russes', 'b', 1],
        [1918, 'Armistice', 'o', 1], [1915, 'Gaz à Ypres', 'w', -1], [1917, 'Entrée des USA', 'b', -1]
      ], {
        periodes: [[1914, 1914.6, 'mouvement', 'b'], [1914.6, 1918.2, 'guerre de position', 'h'], [1918.2, 1918.9, 'mouvement', 'b']],
        graduation: 1
      }]
    ], 272, 101, 'Les trois phases du conflit : deux guerres de mouvement encadrent quatre années de tranchées.'],
    ['ol', [
      '<strong>1914 : la guerre de mouvement.</strong> L’Allemagne applique le plan Schlieffen — écraser la France en six semaines par la Belgique, puis se retourner contre la Russie. Le 6 septembre, la contre-offensive de la <strong>Marne</strong> stoppe l’avancée à 40 km de Paris. Puis chacun tente de déborder l’autre par le nord : c’est la « course à la mer ». Fin novembre, le front est figé de la mer du Nord à la Suisse.',
      '<strong>1915-1917 : la guerre de position.</strong> 700 km de tranchées. Les offensives coûtent des centaines de milliers d’hommes pour quelques kilomètres. Verdun (1916) et la Somme (1916) en sont les symboles.',
      '<strong>1918 : le retour du mouvement.</strong> L’arrivée massive des Américains et les chars alliés brisent le front. Le 11 novembre 1918 à 11 h, l’<strong>armistice</strong> est signé à Rethondes.'
    ]],
    ['anec', 'La Marne en taxi', 'Dans la nuit du 6 au 7 septembre 1914, le général Gallieni réquisitionne <strong>630 taxis parisiens</strong> pour transporter environ 4 000 soldats vers le front de la Marne. Militairement, l’apport est modeste — l’essentiel des renforts arrive par train. Mais l’image des « taxis de la Marne » traversant la nuit devient immédiatement un symbole : la nation entière, jusqu’aux chauffeurs de fiacre, est en guerre. Détail savoureux : la course a été facturée à l’État, au tarif du compteur, avec une remise de 27 %.'],
    ['h', 'La tranchée : un monde souterrain'],
    ['p', 'Le soldat de 1916 vit dans un boyau de terre profond de deux mètres, protégé par des barbelés et de la boue. Il y côtoie les rats, les poux (le « toto »), les cadavres. On y reste 4 à 8 jours, puis on redescend au repos. La <strong>violence de masse</strong> y prend une forme nouvelle : 70 % des morts sont dues à l’<strong>artillerie</strong>, et non aux balles ou aux baïonnettes. On meurt sans avoir vu l’ennemi.'],
    ['fig', [
      ['r', 6, 42, 268, 40, 'terre', 'l', 2],
      ['path', 'M6 42 h60 v14 h-8 v10 h8 v14 h-60 z', 'S2', 'i', 1.2],
      ['path', 'M208 42 h60 v38 h-60 v-14 h8 v-10 h-8 z', 'S2', 'i', 1.2],
      ['t', 36, 36, 'tranchée française', 7.5, 'middle', 'b', 600],
      ['t', 238, 36, 'tranchée allemande', 7.5, 'middle', 'h', 600],
      ['hatch', [[70, 46], [204, 46], [204, 78], [70, 78]], 'k', 45],
      ['t', 137, 64, 'NO MAN’S LAND', 9, 'middle', 'k', 700],
      ['t', 137, 74, '50 à 500 mètres', 7, 'middle', 'm'],
      ['l', 70, 44, 204, 44, 'm', 1, '2 2'], ['l', 70, 80, 204, 80, 'm', 1, '2 2'],
      ['t', 137, 20, 'La ligne de front, de la mer du Nord à la Suisse : 700 km', 8, 'middle', 'i', 600],
      ['sym', 24, 60, 'ville', 'b', 4], ['sym', 34, 62, 'ville', 'b', 4], ['sym', 46, 60, 'ville', 'b', 4],
      ['sym', 236, 60, 'ville', 'h', 4], ['sym', 246, 62, 'ville', 'h', 4], ['sym', 256, 60, 'ville', 'h', 4]
    ], 280, 90, 'Coupe schématique du front en 1916. Le no man’s land est balayé par les mitrailleuses : sortir de la tranchée, c’est mourir.'],
    ['doc', 'Lettre d’un poilu, Verdun, mai 1916',
      'Nous sommes restés cinquante-deux heures sans manger, sans boire autre chose que l’eau des trous d’obus. On ne dort plus, on ne pense plus. Quand la marmite tombe à côté, on n’a même plus peur : on est trop fatigué pour avoir peur. Je ne sais plus quel jour nous sommes.',
      'Lettre reproduite d’après les recueils de correspondances de poilus (texte reconstitué à partir de plusieurs témoignages).'],
    ['h', 'L’arrière mobilisé'],
    ['p', 'Une guerre totale se gagne aussi dans les usines. La France produit <strong>200 000 obus par jour</strong> en 1918, contre 10 000 en 1914. Les femmes remplacent les hommes : ce sont les <strong>munitionnettes</strong>, 400 000 dans les usines d’armement, souvent la peau jaunie par le TNT (on les surnomme les « canaris »). Les colonies fournissent hommes et matières premières : 600 000 soldats coloniaux combattent pour la France.'],
    ['chiffres', [
      ['70 %', 'des morts causés par l’artillerie'],
      ['300 000', 'obus tirés par jour à Verdun'],
      ['400 000', 'munitionnettes en usine'],
      ['1 561', 'jours de guerre']
    ]],
    ['h', 'Contrôler les esprits'],
    ['p', 'L’État censure la presse et diffuse une <strong>propagande</strong> optimiste : c’est le « bourrage de crâne ». Les journaux affirment que les balles allemandes ne percent pas la peau, que les poilus sont joyeux. Les soldats, eux, lisent ces articles dans la boue — ce décalage nourrit un ressentiment durable envers l’arrière. Un journal de tranchée, <em>Le Crapouillot</em>, se moque férocement de cette presse.'],
    ['anec', 'Le Noël qui n’aurait pas dû avoir lieu', 'Le 24 décembre 1914, sur plusieurs points du front, des soldats allemands allument des bougies et chantent <em>Stille Nacht</em>. En face, des Britanniques répondent. On sort des tranchées, on échange du tabac, des boutons d’uniforme ; on enterre les morts ensemble ; on joue même au football entre deux lignes. Les états-majors, horrifiés, interdiront toute fraternisation les années suivantes, sous peine de conseil de guerre. Cette trêve de Noël est restée le symbole de l’humanité qui subsiste dans l’inhumain.'],
    ['atlas', 'a-fr-front14', "Le front occidental, figé de la mer du Nord à la Suisse."],
    ['keep', [
      'Guerre totale = mobilisation de l’économie, des sciences, des colonies, des femmes et des esprits.',
      'Trois phases : mouvement (1914), position (1915-1917), mouvement (1918).',
      'La tranchée impose une violence de masse, dominée par l’artillerie.',
      'Repères : septembre 1914 la Marne · 11 novembre 1918 l’armistice.'
    ]]
  ]
},

{
  id: 'h3', m: 'hist', th: 'L’Europe, un théâtre majeur des guerres totales',
  t: 'Verdun, la Somme : l’expérience combattante',
  d: 'Deux batailles de 1916 qui résument la guerre industrielle — et ce qu’elle fait aux hommes qui la subissent.',
  mo: ['Verdun', 'Somme', 'violence de masse', 'mutineries'],
  sec: [
    ['p', 'En 1916, les états-majors cherchent la percée décisive. Ils obtiennent deux abattoirs. Verdun et la Somme sont devenues les noms mêmes de l’absurde : après dix mois de combats à Verdun, le front n’a pratiquement pas bougé.'],
    ['h', 'Verdun : « saigner à blanc » l’armée française'],
    ['p', 'Le général allemand Falkenhayn choisit Verdun non pour sa valeur stratégique, mais parce qu’il sait que la France défendra cette place symbolique jusqu’au dernier homme. L’objectif avoué est de <strong>l’épuiser</strong>. L’attaque commence le 21 février 1916 par un bombardement de neuf heures : un million d’obus.'],
    ['p', 'Côté français, Pétain organise la <strong>noria</strong> : les divisions se relaient toutes les deux semaines, si bien que 70 % de l’armée française passera par Verdun. Le ravitaillement emprunte une unique route depuis Bar-le-Duc, la « <strong>Voie sacrée</strong> » : un camion toutes les 14 secondes, jour et nuit, pendant dix mois.'],
    ['fig', [
      ['t', 140, 14, 'Verdun, 21 février – 18 décembre 1916', 9, 'middle', 'i', 700],
      ['poly', [[40, 30], [90, 26], [120, 40], [130, 70], [100, 96], [56, 98], [34, 72], [30, 46]], 'terre', 'l', 1],
      ['path', 'M62 34 C80 40 86 60 78 88', 'none', 'b', 2.4],
      ['t', 58, 62, 'front français', 7, 'end', 'b', 600],
      ['path', 'M96 30 C112 44 116 66 104 92', 'none', 'h', 2.4, ''],
      ['t', 122, 62, 'front allemand', 7, 'start', 'h', 600],
      ['sym', 86, 62, 'ville', 'i', 5], ['t', 86, 55, 'Verdun', 8, 'middle', 'i', 700],
      ['sym', 74, 44, 'bataille', 'k', 4], ['t', 68, 40, 'Douaumont', 6.6, 'end', 'k'],
      ['a', 150, 60, 118, 60, 'h', 'assauts allemands', 1.8],
      ['a', 26, 92, 62, 76, 'o', '', 2],
      ['t', 20, 100, 'Voie sacrée', 7.5, 'start', 'o', 700],
      ['t', 20, 108, 'Bar-le-Duc → Verdun, 1 camion / 14 s', 6.6, 'start', 'm'],
      ['key', 176, 26, [['l', 'b', 'ligne française'], ['l', 'h', 'ligne allemande'], ['a', 'h', 'offensive'], ['bataille', 'k', 'fort disputé'], ['a', 'o', 'ravitaillement']], 'Légende']
    ], 280, 126, 'La bataille de Verdun : une guerre d’usure sur quelques kilomètres carrés. 10 mois de combats · environ 300 000 morts · le front bouge de quelques kilomètres'],
    ['chiffres', [
      ['300 000', 'morts à Verdun'],
      ['60 M', 'd’obus tirés en 10 mois'],
      ['1,2 M', 'morts et blessés dans la Somme'],
      ['20 km', 'gagnés au total dans la Somme']
    ]],
    ['anec', 'La tranchée des baïonnettes', 'Après la guerre, on découvre près de Douaumont une ligne de baïonnettes sortant du sol, comme si un bataillon entier avait été enseveli debout, l’arme au clair. La légende fait le tour du monde ; un mécène américain finance un monument. Les historiens ont depuis établi la vérité, moins héroïque et plus terrible : les corps ont probablement été enterrés là par leurs camarades, fusils plantés pour marquer les tombes, avant que les obus ne nivellent tout. Le mythe et le fait coexistent au même endroit — c’est aussi cela, l’histoire de 1914-1918.'],
    ['h', 'La Somme : le jour le plus meurtrier de l’armée britannique'],
    ['p', 'Le 1ᵉʳ juillet 1916, l’offensive franco-britannique de la Somme s’ouvre après une semaine de bombardement censé avoir tout détruit. Les Allemands, abrités dans des galeries profondes, remontent leurs mitrailleuses en trois minutes. Ce seul jour coûte <strong>19 240 morts</strong> aux Britanniques — le pire de leur histoire militaire. La bataille dure jusqu’en novembre et voit apparaître, le 15 septembre, une machine nouvelle : le <strong>char d’assaut</strong>.'],
    ['h', 'Ce que la guerre fait aux hommes'],
    ['p', 'L’<strong>expérience combattante</strong> désigne tout ce que vivent les soldats : la peur, la camaraderie, l’ennui, la brutalisation. Les blessures nouvelles aussi : les « <strong>gueules cassées</strong> », visages arrachés par les éclats, qui inspirent la naissance de la chirurgie reconstructrice. Ou l’<em>obusite</em> (le <em>shell shock</em>), traumatisme psychique longtemps confondu avec la lâcheté.'],
    ['p', 'Au printemps 1917, après l’échec sanglant de l’offensive du Chemin des Dames, éclatent des <strong>mutineries</strong> : dans une quarantaine de divisions, des soldats refusent de remonter en ligne. Ils ne veulent pas la paix à tout prix — ils refusent les assauts inutiles. Pétain rétablit l’ordre par un mélange de sanctions (49 fusillés) et de réformes concrètes : meilleures permissions, meilleure nourriture, fin des offensives massives.'],
    ['note', 'Attention au contresens fréquent : les mutins de 1917 ne sont pas des déserteurs. La grande majorité accepte de tenir les tranchées ; ils refusent seulement de <em>monter à l’attaque</em>. C’est une grève, pas une trahison.'],
    ['doc', 'Chanson de Craonne (chant de mutins, 1917)',
      'C’est à Craonne, sur le plateau, qu’on doit laisser sa peau, car nous sommes tous condamnés, c’est nous les sacrifiés.',
      'Chanson anonyme née parmi les soldats du Chemin des Dames ; interdite par le commandement, elle circule oralement dans les tranchées.'],
    ['keep', [
      'Verdun (fév.-déc. 1916) : bataille d’usure, ~300 000 morts, la Voie sacrée, 70 % de l’armée française y passe.',
      'La Somme (juil.-nov. 1916) : 19 240 Britanniques tués le premier jour ; premiers chars d’assaut.',
      'L’expérience combattante mêle violence extrême, camaraderie et traumatismes durables (gueules cassées, obusite).',
      'Mutineries de 1917 : refus des assauts inutiles, pas refus de défendre la France.'
    ]]
  ]
},

{
  id: 'h4', m: 'hist', th: 'L’Europe, un théâtre majeur des guerres totales',
  t: '1917, l’année des ruptures',
  d: 'Deux révolutions à Petrograd, une entrée en guerre à Washington : l’année où le XXᵉ siècle change de direction.',
  mo: ['révolution de Février', 'révolution d’Octobre', 'Lénine', 'soviet'],
  sec: [
    ['p', '1917 est l’année où tout bascule. La Russie sort de la guerre par une révolution ; les États-Unis y entrent. Le monde qui naît de ces deux événements — un monde partagé entre communisme et démocratie libérale — durera jusqu’en 1991.'],
    ['h', 'Février : la chute du tsar'],
    ['p', 'L’Empire russe est le pays le plus vaste et l’un des plus pauvres d’Europe. Le tsar <strong>Nicolas II</strong> gouverne en autocrate. La guerre y est un désastre : 2 millions de morts, des soldats envoyés au front sans fusil, des villes affamées.'],
    ['p', 'Le 23 février 1917 (calendrier russe ; 8 mars pour nous), des ouvrières de Petrograd manifestent pour le pain, à l’occasion de la Journée internationale des femmes. La grève devient générale. Les soldats envoyés pour tirer sur la foule… rejoignent la foule. Le 2 mars, Nicolas II abdique. Trois siècles de dynastie Romanov s’effondrent en huit jours.'],
    ['p', 'Un <strong>gouvernement provisoire</strong> libéral prend le pouvoir. Mais il commet une erreur fatale : continuer la guerre. Face à lui se dressent les <strong>soviets</strong>, conseils élus d’ouvriers et de soldats. C’est le « double pouvoir ».'],
    ['def', [
      ['Soviet', 'en russe, « conseil » : assemblée élue d’ouvriers, de paysans ou de soldats.'],
      ['Bolchevik', 'membre du parti communiste russe dirigé par Lénine ; le mot signifie « majoritaire ».'],
      ['Autocratie', 'régime où un seul homme détient tous les pouvoirs sans contrôle.']
    ]],
    ['anec', 'Le train plombé', 'En 1917, <strong>Lénine</strong> est exilé en Suisse. L’état-major allemand comprend son intérêt : cet homme veut la paix immédiate, donc la sortie de la Russie du conflit. Berlin organise son retour dans un wagon scellé qui traverse l’Allemagne en guerre — un « bacille de peste envoyé en Russie », écrira Churchill. Le 3 avril 1917, Lénine descend du train à la gare de Finlande et lance ses <em>Thèses d’avril</em> : « Tout le pouvoir aux soviets ! » Le pari allemand est gagné… et coûtera très cher au monde entier.'],
    ['h', 'Octobre : la prise du pouvoir'],
    ['p', 'Dans la nuit du 24 au 25 octobre 1917 (7 novembre), les bolcheviks de Lénine et Trotski s’emparent des points stratégiques de Petrograd, puis du palais d’Hiver. Le coup de force fait… six morts. Les décrets tombent aussitôt : paix immédiate, partage des terres aux paysans, contrôle des usines par les ouvriers.'],
    ['note', 'Le film <em>Octobre</em> d’Eisenstein (1927) met en scène un assaut héroïque du palais d’Hiver avec des milliers de figurants. Cette reconstitution a fait plus de blessés que la prise réelle du palais. Attention : ce film est de la <strong>propagande</strong>, pas un document sur l’événement.'],
    ['p', 'En mars 1918, le traité de <strong>Brest-Litovsk</strong> sort la Russie de la guerre au prix de pertes territoriales énormes. Puis le pays plonge dans une <strong>guerre civile</strong> (1918-1921) entre Rouges et Blancs : 5 millions de morts, la famine, la Tchéka (police politique) et la « terreur rouge ». L’URSS naît officiellement en 1922.'],
    ['fig', [
      ['frise', 18, 62, 236, 1917, 1923, [
        [1917.15, 'Février : le tsar abdique', 'b', 1],
        [1917.83, 'Octobre : les bolcheviks', 'h', 1],
        [1918.2, 'Brest-Litovsk', 'w', -1],
        [1922, 'Naissance de l’URSS', 'h', -1],
        [1921, 'Fin de la guerre civile', 'm', 1]
      ], { periodes: [[1918, 1921, 'guerre civile russe', 'k']], graduation: 1 }]
    ], 272, 103, 'De la chute du tsar à la naissance de l’URSS.'],
    ['h', 'L’entrée en guerre des États-Unis'],
    ['p', 'Le 6 avril 1917, les États-Unis déclarent la guerre à l’Allemagne. Deux raisons : la guerre sous-marine à outrance (le paquebot <em>Lusitania</em> coulé en 1915 avec 128 Américains à bord) et le <strong>télégramme Zimmermann</strong>, message secret où Berlin propose au Mexique de récupérer le Texas s’il attaque les États-Unis — intercepté et publié par les Britanniques.'],
    ['p', 'L’apport est d’abord financier et matériel, puis humain : 2 millions de « <em>Sammies</em> » débarquent en 1918. Surtout, le président <strong>Wilson</strong> donne à la guerre un sens nouveau avec ses « <strong>14 points</strong> » (janvier 1918) : droit des peuples à disposer d’eux-mêmes, diplomatie ouverte, création d’une Société des Nations.'],
    ['keep', [
      'Février 1917 : la révolution renverse le tsar Nicolas II ; double pouvoir entre gouvernement provisoire et soviets.',
      'Octobre 1917 : Lénine et les bolcheviks prennent le pouvoir ; paix, terre, usines.',
      'Guerre civile (1918-1921), puis naissance de l’URSS en 1922.',
      'Avril 1917 : entrée en guerre des États-Unis ; les 14 points de Wilson redéfinissent les buts de guerre.'
    ]]
  ]
},

{
  id: 'h5', m: 'hist', th: 'L’Europe, un théâtre majeur des guerres totales',
  t: 'Sortir de la guerre : 1918-1923',
  d: 'Un armistice, un traité de paix contesté, des empires qui disparaissent et des sociétés à reconstruire.',
  mo: ['armistice', 'traité de Versailles', 'SDN', 'Diktat'],
  sec: [
    ['p', 'La guerre s’arrête le 11 novembre 1918 à 11 heures. Mais on ne sort pas d’une guerre totale comme on sort d’un match : il faut démobiliser des millions d’hommes, enterrer les morts, redessiner un continent et reconstruire des sociétés blessées.'],
    ['h', 'Un bilan vertigineux'],
    ['chiffres', [
      ['10 M', 'de morts militaires'],
      ['1,4 M', 'de morts français (1 soldat sur 6)'],
      ['6 M', 'de blessés et d’invalides'],
      ['3 M', 'de veuves en Europe']
    ]],
    ['p', 'À ces pertes s’ajoutent la <strong>grippe espagnole</strong> (1918-1919), qui tue plus que la guerre elle-même (au moins 50 millions de morts dans le monde), un « déficit des naissances » qui pèsera vingt ans plus tard, et des régions entières détruites : dans le nord-est de la France, 300 000 maisons sont rasées, des villages sont déclarés « <strong>zone rouge</strong> », interdits parce que trop pollués par les obus. Un siècle après, on y ramasse encore des dizaines de tonnes de munitions par an.'],
    ['anec', 'Le soldat inconnu et le choix du cercueil', 'Le 10 novembre 1920, dans la citadelle de Verdun, huit cercueils de soldats non identifiés sont alignés. Un jeune soldat, Auguste Thin, fils d’un poilu mort au front, doit en désigner un. Il additionne les chiffres de son régiment (le 132ᵉ : 1+3+2 = 6) et dépose son bouquet sur le sixième cercueil. Ce corps repose depuis sous l’Arc de Triomphe, et la flamme y est ravivée tous les soirs à 18 h 30 depuis 1923 — même sous l’Occupation.'],
    ['h', 'Le traité de Versailles (28 juin 1919)'],
    ['p', 'Les vainqueurs se réunissent à Paris. Trois hommes dominent : <strong>Clemenceau</strong> pour la France (surnommé « le Tigre »), <strong>Wilson</strong> pour les États-Unis, <strong>Lloyd George</strong> pour le Royaume-Uni. L’Allemagne n’est pas invitée à discuter : on lui présente le texte à signer. D’où le nom qu’elle lui donnera, « <em>Diktat</em> ».'],
    ['tab', ['Clause du traité', 'Contenu'], [
      ['Responsabilité (art. 231)', 'L’Allemagne est déclarée seule responsable de la guerre.'],
      ['Territoires', 'Retour de l’Alsace-Lorraine à la France ; perte de toutes les colonies ; couloir de Dantzig cédé à la Pologne.'],
      ['Armée', 'Limitée à 100 000 hommes, sans aviation, sans chars, sans sous-marins ; Rhénanie démilitarisée.'],
      ['Réparations', '132 milliards de marks-or à payer aux vainqueurs.']
    ], 'Les principales clauses du traité de Versailles.'],
    ['p', 'Le traité satisfait mal tout le monde : trop dur pour les Allemands, trop doux pour Clemenceau qui voulait la rive gauche du Rhin. L’économiste britannique Keynes prédit dès 1919 qu’une paix aussi punitive fabriquera la prochaine guerre. Il n’avait pas complètement tort.'],
    ['h', 'Une nouvelle carte de l’Europe'],
    ['p', 'Quatre empires disparaissent : allemand, austro-hongrois, russe et ottoman. En appliquant le <strong>droit des peuples à disposer d’eux-mêmes</strong>, on crée ou recrée la Pologne, la Tchécoslovaquie, la Yougoslavie, la Hongrie, l’Autriche, les pays baltes. Mais aucune frontière ne peut être parfaitement « nationale » : partout subsistent des minorités, dont 3 millions d’Allemands en Tchécoslovaquie — un prétexte tout prêt pour Hitler en 1938.'],
    ['fig', [
      ['map', 'EUR', 4, 6, 1.62, {
        base: 'terre', trait: 'l',
        fill: { de: 'h:30', at: 'w:26', hu: 'w:26', pl: 'b:26', cz: 'b:26', sk: 'b:26', ee: 'b:26', lv: 'b:26', lt: 'b:26', fr: 'b:16', ru: 'e:22', ua: 'e:22', by: 'e:22', tr: 'g:22' },
        noms: ['de', 'pl', 'fr', 'ru', 'hu', 'at', 'tr', 'cz'], ns: 6.2
      }],
      ['ancre', 'EUR', 4, 6, 1.62, [['gdansk', 'ville', 'k', 3.4, 'couloir de Dantzig', 'start', null, -4, 6.6]]],
      ['key', 172, 16, [
        ['f', 'b:26', 'États nés des traités'],
        ['f', 'h:30', 'Allemagne amputée'],
        ['f', 'w:26', 'Reste de l’Autriche-Hongrie'],
        ['f', 'e:22', 'URSS (à partir de 1922)']
      ], 'L’Europe après 1920'],
      ['rose', 300, 150, 9]
    ], 334, 176, 'L’Europe redessinée par les traités de 1919-1920.'],
    ['h', 'La Société des Nations : un espoir désarmé'],
    ['p', 'Née de l’idée de Wilson, la <strong>SDN</strong> siège à Genève à partir de 1920. Elle doit régler les conflits par la discussion et la « sécurité collective ». Problèmes dès le départ : le Sénat américain refuse d’y adhérer (les États-Unis reviennent à l’isolationnisme), l’Allemagne et l’URSS en sont d’abord exclues, et surtout la SDN n’a <strong>aucune armée</strong>. Face aux agressions des années 1930, elle sera impuissante.'],
    ['keep', [
      '11 novembre 1918 : armistice de Rethondes.',
      'Traité de Versailles (28 juin 1919) : responsabilité, désarmement, pertes territoriales, réparations. Vécu comme un « Diktat » en Allemagne.',
      'Quatre empires disparaissent ; l’Europe centrale est redessinée au nom du droit des peuples.',
      'La SDN, créée en 1920, est privée des États-Unis et de toute force armée.'
    ]]
  ]
}
);
