/* ============================================================
   Delta — brevets blancs au format officiel du DNB.
   Epreuve d'histoire-geographie-EMC : 2 h, 50 points.
     Exercice 1 — Analyser et comprendre des documents .......... 20 pts
     Exercice 2 — Maitriser differents langages ................. 20 pts
     Exercice 3 — Mobiliser des competences d'EMC ............... 10 pts
   Questions : 'qcm' | 'txt' | 'red' (redaction auto-evaluee) | 'carte'
   ============================================================ */
const BREVETS = [];

BREVETS.push({
  id: 'b1', t: 'Brevet blanc n° 1', st: 'Guerres totales · Aires urbaines · Laïcité',
  duree: 120, total: 50,
  ex: [
    {
      n: 'Exercice 1', tt: 'Analyser et comprendre des documents', pts: 20, disc: 'hist',
      cons: 'Le sujet porte sur la Première Guerre mondiale comme guerre totale. Après avoir pris connaissance des documents, réponds aux questions.',
      docs: [
        {
          t: 'Document 1 — Lettre d’un ouvrier d’usine d’armement, 1917',
          txt: 'Nous sommes maintenant plus de mille dans l’atelier, et plus de la moitié sont des femmes. On travaille onze heures par jour, six jours sur sept. Les obus sortent par milliers. Le contremaître nous répète que la victoire se joue ici autant que là-bas. Beaucoup de camarades ont la peau et les cheveux jaunis par la poudre ; on les appelle les canaris.',
          src: 'Témoignage reconstitué à partir de plusieurs correspondances d’ouvriers de l’arrière (1917).'
        },
        {
          t: 'Document 2 — La production française d’obus de 75 mm',
          fig: [['bars', 34, 20, 210, 74, [['1914', 10, 'h'], ['1915', 60, 'h'], ['1916', 130, 'h'], ['1917', 180, 'h'], ['1918', 200, 'h']], { titre: 'Milliers d’obus produits par jour (ordres de grandeur)', max: 230 }]], w: 280, h: 108,
          src: 'D’après les statistiques de l’armement français, 1914-1918.'
        }
      ],
      qs: [
        { ty: 'qcm', p: 3, q: 'Quel groupe social nouveau apparaît massivement dans les usines d’armement selon le document 1 ?', o: ['Les enfants', 'Les femmes', 'Les prisonniers de guerre', 'Les retraités'], r: 1, w: 'Le document indique que « plus de la moitié sont des femmes » : ce sont les munitionnettes.' },
        { ty: 'txt', p: 3, q: 'Relève dans le document 1 le surnom donné aux ouvrières dont la peau jaunit.', r: ['canaris', 'les canaris', 'canari'], w: 'Les « canaris », à cause du TNT qui jaunissait la peau et les cheveux.' },
        { ty: 'qcm', p: 4, q: 'Que montre le document 2 sur l’effort de guerre français ?', o: ['La production d’obus s’effondre', 'La production est multipliée par vingt entre 1914 et 1918', 'La production reste stable', 'La production ne concerne que 1918'], r: 1, w: 'On passe d’environ 10 000 à 200 000 obus par jour : une multiplication par vingt, signe d’une économie entièrement reconvertie.' },
        {
          ty: 'red', p: 10, q: 'À l’aide des deux documents et de tes connaissances, montre en une dizaine de lignes que la Première Guerre mondiale est une guerre totale.',
          mod: ['<strong>Mobilisation économique</strong> : l’industrie est reconvertie pour la guerre ; la production d’obus est multipliée par vingt (doc. 2) ; l’État planifie et commande.',
            '<strong>Mobilisation humaine à l’arrière</strong> : les femmes remplacent les hommes partis au front (doc. 1) ; 400 000 munitionnettes ; travail de onze heures par jour.',
            '<strong>Mobilisation des colonies</strong> : environ 600 000 soldats coloniaux et des matières premières venues de l’empire.',
            '<strong>Mobilisation des esprits</strong> : censure, propagande (« bourrage de crâne »), emprunts nationaux.',
            '<strong>Effacement de la limite front / arrière</strong> : « la victoire se joue ici autant que là-bas » (doc. 1) ; bombardements de civils, restrictions alimentaires.']
        }
      ]
    },
    {
      n: 'Exercice 2', tt: 'Maîtriser différents langages pour raisonner et se repérer', pts: 20, disc: 'geo',
      cons: 'Le sujet porte sur les aires urbaines françaises. Traite les trois parties.',
      docs: [],
      qs: [
        { ty: 'qcm', p: 3, q: 'Quelle est la définition d’une aire urbaine ?', o: ['Une ville de plus de 100 000 habitants', 'Une ville-centre, sa banlieue et les communes dont au moins 15 % des actifs y travaillent', 'L’ensemble des communes d’un département', 'Une commune touristique'], r: 1, w: 'C’est le trajet domicile-travail, et non le bâti, qui définit la limite d’une aire urbaine.' },
        {
          ty: 'carte', p: 7, q: 'Place sur la carte de France les six aires urbaines suivantes en cliquant sur la région où elles se trouvent.',
          map: 'FR', items: [['Paris', 'idf'], ['Lyon', 'ara'], ['Marseille', 'pac'], ['Toulouse', 'occ'], ['Bordeaux', 'naq'], ['Lille', 'hdf']],
          w: 'Paris est en Île-de-France, Lyon en Auvergne-Rhône-Alpes, Marseille en PACA, Toulouse en Occitanie, Bordeaux en Nouvelle-Aquitaine, Lille dans les Hauts-de-France.'
        },
        {
          ty: 'red', p: 10, q: 'Rédige un développement construit d’une vingtaine de lignes : « Les aires urbaines, une nouvelle géographie de la France ».',
          mod: ['<strong>Introduction</strong> : plus de 80 % des Français vivent dans une aire urbaine ; définir aire urbaine (ville-centre, banlieue, couronne périurbaine).',
            '<strong>1. Une France qui s’urbanise et s’étale</strong> : périurbanisation, maison individuelle, prix du foncier, dépendance à la voiture, artificialisation des sols.',
            '<strong>2. Une France de plus en plus métropolisée</strong> : concentration des emplois qualifiés, des sièges sociaux et des services supérieurs dans les grandes villes ; macrocéphalie parisienne (13,1 M contre 2,3 M pour Lyon).',
            '<strong>3. Des inégalités croissantes</strong> : contrastes entre centres rénovés, quartiers prioritaires de banlieue et couronnes périurbaines ; villes moyennes en difficulté (Action Cœur de ville).',
            '<strong>Conclusion</strong> : la ville déborde de ses limites et redessine tout le territoire, y compris les espaces ruraux proches.']
        }
      ]
    },
    {
      n: 'Exercice 3', tt: 'Mobiliser des compétences relevant de l’EMC', pts: 10, disc: 'emc',
      cons: 'Le sujet porte sur la laïcité à l’école.',
      docs: [{
        t: 'Document — Charte de la laïcité à l’École (extraits, 2013)',
        txt: 'Article 3 : La laïcité garantit la liberté de conscience à tous. Chacun est libre de croire ou de ne pas croire. […] Article 9 : La laïcité implique le rejet de toutes les violences et de toutes les discriminations, garantit l’égalité entre les filles et les garçons et repose sur une culture du respect et de la compréhension de l’autre. Article 14 : Dans les établissements scolaires publics, les règles de vie des différents espaces […] respectent la laïcité. Le port de signes ou tenues par lesquels les élèves manifestent ostensiblement une appartenance religieuse est interdit.',
        src: 'Charte de la laïcité à l’École, ministère de l’Éducation nationale, 2013.'
      }],
      qs: [
        { ty: 'qcm', p: 2, q: 'D’après l’article 3, que garantit d’abord la laïcité ?', o: ['L’interdiction des religions', 'La liberté de conscience', 'L’obligation de croire', 'La neutralité des élèves'], r: 1, w: 'La liberté de conscience : chacun est libre de croire ou de ne pas croire.' },
        { ty: 'txt', p: 2, q: 'De quelle année date la loi qui interdit les signes religieux ostensibles à l’école publique ?', r: ['2004', 'en 2004'], w: 'La loi du 15 mars 2004.' },
        {
          ty: 'red', p: 6, q: 'Explique en quelques lignes pourquoi la laïcité n’est pas une interdiction des religions, mais une condition du « vivre ensemble » à l’école.',
          mod: ['La laïcité <strong>garantit</strong> la liberté de croire ou de ne pas croire (art. 3) : elle protège les croyants comme les non-croyants.',
            'Elle impose la neutralité à <strong>l’État et à ses agents</strong> (professeurs, personnels), pas aux citoyens dans leur vie privée.',
            'À l’école, elle crée un espace commun où les élèves se rencontrent indépendamment de leurs origines et convictions.',
            'Elle est liée à l’égalité et au refus des discriminations (art. 9), notamment entre filles et garçons.',
            'Elle repose sur le respect mutuel et permet d’enseigner librement tous les savoirs.']
        }
      ]
    }
  ]
});

BREVETS.push({
  id: 'b2', t: 'Brevet blanc n° 2', st: 'Mondialisation · Guerre froide · Justice',
  duree: 120, total: 50,
  ex: [
    {
      n: 'Exercice 1', tt: 'Analyser et comprendre des documents', pts: 20, disc: 'geo',
      cons: 'Le sujet porte sur la France dans la mondialisation.',
      docs: [
        {
          t: 'Document 1 — Les grands ports à conteneurs européens',
          fig: [['bars', 34, 20, 212, 74, [['Rotterdam', 14.5, 'b'], ['Anvers', 12.0, 'b'], ['Hambourg', 8.3, 'b'], ['Bremerhaven', 4.6, 'g'], ['Le Havre', 3.0, 'h'], ['Marseille', 1.5, 'h']], { titre: 'Millions de conteneurs (EVP) traités par an', max: 17, fmt: v => v }]], w: 280, h: 108,
          src: 'D’après les statistiques portuaires européennes (ordres de grandeur).'
        },
        {
          t: 'Document 2 — Un cadre du port du Havre',
          txt: 'Le Havre est la première porte d’entrée maritime française : près de 60 % des conteneurs qui entrent en France y transitent. Mais à l’échelle européenne, nous restons modestes. Nos concurrents du Nord bénéficient d’un arrière-pays immense — l’Allemagne, la vallée du Rhin, la Suisse — et d’une desserte fluviale et ferroviaire bien plus dense que la nôtre. Nous, nous évacuons encore l’essentiel de nos conteneurs par la route.',
          src: 'Propos reconstitués d’après des entretiens publiés sur l’économie portuaire française.'
        }
      ],
      qs: [
        { ty: 'qcm', p: 3, q: 'Quel est le premier port à conteneurs européen d’après le document 1 ?', o: ['Le Havre', 'Hambourg', 'Rotterdam', 'Anvers'], r: 2, w: 'Rotterdam, avec environ 14,5 millions de conteneurs par an.' },
        { ty: 'qcm', p: 4, q: 'Combien de fois Rotterdam traite-t-il plus de conteneurs que Le Havre ?', o: ['Environ 1,5 fois', 'Environ 3 fois', 'Environ 5 fois', 'Environ 10 fois'], r: 2, w: '14,5 ÷ 3,0 ≈ 5. Les ports français restent modestes à l’échelle européenne.' },
        { ty: 'txt', p: 3, q: 'D’après le document 2, quel mode de transport domine pour évacuer les conteneurs du Havre ?', r: ['la route', 'route', 'le camion', 'camion', 'la voiture', 'le transport routier'], w: 'La route, alors que les ports du Nord disposent d’une desserte fluviale et ferroviaire bien plus dense.' },
        {
          ty: 'red', p: 10, q: 'À l’aide des documents et de tes connaissances, explique en une dizaine de lignes pourquoi les ports français sont des portes d’entrée importantes pour la France mais modestes à l’échelle européenne.',
          mod: ['<strong>Des portes d’entrée majeures pour la France</strong> : Le Havre concentre près de 60 % des conteneurs entrant en France ; Marseille-Fos ouvre sur la Méditerranée et l’Afrique ; ces ports alimentent les ZIP (raffinage, sidérurgie).',
            '<strong>Mais modestes en Europe</strong> : Rotterdam traite environ cinq fois plus de conteneurs que Le Havre (doc. 1).',
            '<strong>Explication 1 — l’arrière-pays</strong> : les ports du Nord desservent un hinterland très peuplé et industrialisé (Allemagne, vallée du Rhin, Suisse) ; celui du Havre est plus limité.',
            '<strong>Explication 2 — les dessertes</strong> : la France évacue surtout par la route, plus lente et plus coûteuse, faute de fret ferroviaire et fluvial développé (doc. 2).',
            '<strong>Conclusion</strong> : la France est connectée à la mondialisation surtout par ses aéroports (Roissy) et ses métropoles, moins par ses ports.']
        }
      ]
    },
    {
      n: 'Exercice 2', tt: 'Maîtriser différents langages pour raisonner et se repérer', pts: 20, disc: 'hist',
      cons: 'Le sujet porte sur le monde bipolaire au temps de la guerre froide.',
      docs: [],
      qs: [
        {
          ty: 'ord', p: 6, q: 'Remets dans l’ordre chronologique ces événements de la guerre froide.',
          o: ['Doctrine Truman et plan Marshall', 'Blocus de Berlin', 'Création de l’OTAN', 'Construction du mur de Berlin', 'Crise des missiles de Cuba', 'Chute du mur de Berlin'],
          w: '1947 → 1948-49 → 1949 → 1961 → 1962 → 1989.'
        },
        { ty: 'qcm', p: 4, q: 'Quelle expression désigne la coupure de l’Europe en deux blocs ?', o: ['La ligne Maginot', 'Le rideau de fer', 'Le mur de l’Atlantique', 'Le limes'], r: 1, w: 'Le « rideau de fer », expression employée par Churchill à Fulton en mars 1946.' },
        {
          ty: 'red', p: 10, q: 'Rédige un développement construit d’une vingtaine de lignes : « Berlin, une ville au cœur de la guerre froide (1945-1989) ».',
          mod: ['<strong>Introduction</strong> : Berlin, capitale vaincue, est divisée en quatre zones d’occupation en 1945, alors qu’elle se situe au cœur de la zone soviétique.',
            '<strong>1. Berlin, lieu de la rupture (1948-1949)</strong> : blocus soviétique, pont aérien allié (277 000 vols en onze mois), naissance de deux États allemands (RFA et RDA) en 1949.',
            '<strong>2. Berlin, ville-vitrine et ville coupée (1961)</strong> : hémorragie de la RDA (2,6 millions de départs), construction du mur dans la nuit du 12 au 13 août 1961, 155 km, bande de la mort, au moins 140 morts.',
            '<strong>3. Berlin, lieu de la fin de la guerre froide (1989)</strong> : réformes de Gorbatchev, renoncement à intervenir dans les démocraties populaires, chute du mur le 9 novembre 1989, réunification en 1990.',
            '<strong>Conclusion</strong> : Berlin résume à elle seule les quarante-cinq ans de guerre froide, de la rupture à la réunification.']
        }
      ]
    },
    {
      n: 'Exercice 3', tt: 'Mobiliser des compétences relevant de l’EMC', pts: 10, disc: 'emc',
      cons: 'Le sujet porte sur la justice en France.',
      docs: [{
        t: 'Document — Article préliminaire du code de procédure pénale',
        txt: 'La procédure pénale doit être équitable et contradictoire et préserver l’équilibre des droits des parties. […] Toute personne suspectée ou poursuivie est présumée innocente tant que sa culpabilité n’a pas été établie. Les atteintes à sa présomption d’innocence sont prévenues, réparées et réprimées dans les conditions prévues par la loi. […] Toute personne condamnée a le droit de faire examiner sa condamnation par une autre juridiction.',
        src: 'Code de procédure pénale, article préliminaire.'
      }],
      qs: [
        { ty: 'qcm', p: 2, q: 'Que signifie la présomption d’innocence ?', o: ['L’accusé doit prouver son innocence', 'On est innocent tant que la culpabilité n’a pas été établie', 'Le juge doit croire l’accusé', 'Toute accusation est fausse'], r: 1, w: 'C’est à l’accusation d’apporter la preuve de la culpabilité, jamais à l’accusé de prouver son innocence.' },
        { ty: 'txt', p: 2, q: 'Comment appelle-t-on le droit de faire rejuger une affaire par une autre juridiction ?', r: ['l appel', 'appel', 'faire appel', 'le droit d appel'], w: 'L’appel : c’est le principe du double degré de juridiction.' },
        {
          ty: 'red', p: 6, q: 'Explique en quelques lignes pourquoi ces principes protègent tous les citoyens, y compris ceux qui ne sont jamais jugés.',
          mod: ['La <strong>présomption d’innocence</strong> empêche l’arbitraire : personne ne peut être condamné sur un simple soupçon ou une rumeur.',
            'Le <strong>contradictoire</strong> garantit que chacun peut connaître et discuter les preuves qui lui sont opposées.',
            'Les <strong>droits de la défense</strong> (avocat, y compris gratuit) rendent la justice accessible quels que soient les moyens.',
            'L’<strong>appel</strong> permet de corriger une erreur judiciaire.',
            'Ces principes valent pour tous : ils définissent la différence entre un État de droit et un régime autoritaire, où la police et le juge se confondent.']
        }
      ]
    }
  ]
});

BREVETS.push({
  id: 'b3', t: 'Brevet blanc n° 3', st: 'France occupée · Outre-mer · Engagement',
  duree: 120, total: 50,
  ex: [
    {
      n: 'Exercice 1', tt: 'Analyser et comprendre des documents', pts: 20, disc: 'hist',
      cons: 'Le sujet porte sur la France défaite et occupée (1940-1944).',
      docs: [
        {
          t: 'Document 1 — Message du maréchal Pétain, 17 juin 1940',
          txt: 'Français ! À l’appel de M. le Président de la République, j’assume à partir d’aujourd’hui la direction du gouvernement de la France. […] C’est le cœur serré que je vous dis aujourd’hui qu’il faut cesser le combat. Je me suis adressé cette nuit à l’adversaire pour lui demander s’il est prêt à rechercher avec nous, entre soldats, après la lutte et dans l’honneur, les moyens de mettre un terme aux hostilités.',
          src: 'Allocution radiodiffusée du maréchal Pétain, 17 juin 1940.'
        },
        {
          t: 'Document 2 — Appel du général de Gaulle, 18 juin 1940',
          txt: 'Les chefs qui, depuis de nombreuses années, sont à la tête des armées françaises, ont formé un gouvernement. […] Mais le dernier mot est-il dit ? L’espérance doit-elle disparaître ? La défaite est-elle définitive ? Non ! […] Car la France n’est pas seule ! Elle n’est pas seule ! Elle a un vaste Empire derrière elle. Elle peut faire bloc avec l’Empire britannique qui tient la mer et continue la lutte. […] Quoi qu’il arrive, la flamme de la résistance française ne doit pas s’éteindre et ne s’éteindra pas.',
          src: 'Appel du 18 juin 1940, prononcé à la BBC à Londres.'
        }
      ],
      qs: [
        { ty: 'qcm', p: 3, q: 'Que demande Pétain aux Français dans le document 1 ?', o: ['De poursuivre la lutte', 'De cesser le combat', 'De rejoindre Londres', 'De se soulever'], r: 1, w: '« Il faut cesser le combat » : Pétain annonce la demande d’armistice, signé le 22 juin 1940.' },
        { ty: 'qcm', p: 4, q: 'Sur quels atouts de Gaulle s’appuie-t-il pour affirmer que la France n’est pas seule ?', o: ['L’URSS et les États-Unis', 'Son Empire colonial et l’Empire britannique', 'L’Italie et l’Espagne', 'La Société des Nations'], r: 1, w: 'Il cite « un vaste Empire » et « l’Empire britannique qui tient la mer ». Les États-Unis et l’URSS ne sont pas encore en guerre en juin 1940.' },
        { ty: 'txt', p: 3, q: 'Quel jour, quel mois et quelle année a été prononcé l’appel du document 2 ? (format : 18 juin 1940)', r: ['18 juin 1940', 'le 18 juin 1940'], w: 'Le 18 juin 1940 sur les ondes de la BBC, à Londres.' },
        {
          ty: 'red', p: 10, q: 'À l’aide des deux documents et de tes connaissances, montre en une dizaine de lignes que deux France s’opposent à partir de juin 1940.',
          mod: ['<strong>La France de Vichy</strong> : Pétain demande l’armistice (doc. 1) ; le 10 juillet 1940, les pleins pouvoirs lui sont votés ; la République laisse place à l’État français.',
            '<strong>Un régime autoritaire et antisémite</strong> : devise « Travail, Famille, Patrie », parti unique de fait, censure, statut des Juifs d’octobre 1940, rafle du Vél’ d’Hiv’ en juillet 1942, Milice.',
            '<strong>La collaboration</strong> : entrevue de Montoire (octobre 1940), STO (février 1943).',
            '<strong>La France libre</strong> : de Gaulle refuse la défaite (doc. 2), s’appuie sur l’Empire et sur les Britanniques ; il fonde la France libre.',
            '<strong>La Résistance intérieure</strong> : réseaux et mouvements, maquis après le STO, unification par Jean Moulin dans le CNR le 27 mai 1943.',
            '<strong>Conclusion</strong> : la France de 1940-1944 est traversée par une véritable fracture, dont les mémoires restent vives.']
        }
      ]
    },
    {
      n: 'Exercice 2', tt: 'Maîtriser différents langages pour raisonner et se repérer', pts: 20, disc: 'geo',
      cons: 'Le sujet porte sur les territoires ultramarins français.',
      docs: [],
      qs: [
        {
          ty: 'carte', p: 6, q: 'Associe chaque territoire ultramarin à sa vignette sur la carte.',
          map: 'DROM', items: [['Guadeloupe', 'gp'], ['Martinique', 'mq'], ['Guyane', 'gf'], ['La Réunion', 're'], ['Mayotte', 'yt'], ['Nouvelle-Calédonie', 'nc']],
          w: 'Guadeloupe et Martinique sont dans les Antilles, la Guyane en Amérique du Sud, La Réunion et Mayotte dans l’océan Indien, la Nouvelle-Calédonie dans le Pacifique.'
        },
        { ty: 'qcm', p: 4, q: 'Quel rang mondial occupe la zone économique exclusive française ?', o: ['1ᵉʳ', '2ᵉ', '4ᵉ', '8ᵉ'], r: 1, w: '2ᵉ ZEE mondiale : 10,2 millions de km², dont 97 % grâce à l’outre-mer.' },
        {
          ty: 'red', p: 10, q: 'Rédige un développement construit d’une vingtaine de lignes : « Les territoires ultramarins : des atouts et des contraintes pour la France ».',
          mod: ['<strong>Introduction</strong> : 2,7 millions d’habitants, trois océans, des statuts variés (DROM, COM, Nouvelle-Calédonie, TAAF).',
            '<strong>1. Des atouts considérables</strong> : 2ᵉ ZEE mondiale, 80 % de la biodiversité française, centre spatial de Kourou (5° de l’équateur, + 15 % de charge utile), bases militaires sur toutes les mers, tourisme et productions spécialisées (banane, canne, vanille).',
            '<strong>2. De fortes contraintes</strong> : insularité et éloignement (prix 30 à 40 % plus élevés), chômage de 15 à 30 %, risques naturels majeurs (cyclones, séismes, volcans), forte pression démographique à Mayotte.',
            '<strong>3. Des politiques d’aménagement</strong> : statut de régions ultrapériphériques de l’UE et fonds européens, continuité territoriale, investissements dans les transports, la formation et la santé.',
            '<strong>Conclusion</strong> : l’outre-mer fait de la France une puissance mondiale, mais impose une politique d’aménagement spécifique.']
        }
      ]
    },
    {
      n: 'Exercice 3', tt: 'Mobiliser des compétences relevant de l’EMC', pts: 10, disc: 'emc',
      cons: 'Le sujet porte sur l’engagement.',
      docs: [{
        t: 'Document — L’engagement associatif en France',
        txt: 'La France compte environ 1,5 million d’associations actives, employant 1,8 million de salariés et mobilisant près de 20 millions de bénévoles. Le sport, la culture et les loisirs représentent près de la moitié d’entre elles ; l’action sociale, la santé, l’éducation et l’environnement se partagent le reste. Chaque année, plus de 150 000 jeunes de 16 à 25 ans effectuent une mission de service civique.',
        src: 'D’après les données publiques sur la vie associative française.'
      }],
      qs: [
        { ty: 'qcm', p: 2, q: 'Quelle loi garantit la liberté de créer une association en France ?', o: ['La loi de 1881', 'La loi de 1884', 'La loi de 1901', 'La loi de 1905'], r: 2, w: 'La loi du 1ᵉʳ juillet 1901 : deux personnes suffisent pour créer une association.' },
        { ty: 'txt', p: 2, q: 'Quel dispositif permet à un jeune de 16 à 25 ans d’effectuer une mission d’intérêt général indemnisée ?', r: ['le service civique', 'service civique'], w: 'Le service civique : 6 à 12 mois, plus de 150 000 jeunes par an.' },
        {
          ty: 'red', p: 6, q: 'Présente deux formes d’engagement possibles pour un collégien et explique en quoi elles font vivre la démocratie.',
          mod: ['<strong>Au collège</strong> : délégué de classe ou éco-délégué, membre du conseil de vie collégienne, élu au conseil d’administration — on y apprend à représenter d’autres personnes et à débattre.',
            '<strong>Dans une association</strong> : club sportif (UNSS), association de quartier, junior association, bénévolat ponctuel (collectes, tutorat).',
            '<strong>Dès 16 ans</strong> : sapeur-pompier volontaire (79 % des pompiers français sont volontaires).',
            '<strong>Pourquoi cela fait vivre la démocratie</strong> : la vie démocratique ne se limite pas au vote ; l’engagement crée du lien social, permet de faire remonter des demandes et forme des citoyens capables de débattre et d’agir collectivement.']
        }
      ]
    }
  ]
});

BREVETS.push({
  id: 'b4', t: 'Brevet blanc n° 4', st: 'Union européenne · Vᵉ République · Médias',
  duree: 120, total: 50,
  ex: [
    {
      n: 'Exercice 1', tt: 'Analyser et comprendre des documents', pts: 20, disc: 'geo',
      cons: 'Le sujet porte sur l’Union européenne, un territoire de référence.',
      docs: [
        {
          t: 'Document 1 — Les élargissements de l’Union européenne',
          fig: [['bars', 34, 20, 212, 74, [['1957', 6, 'b'], ['1973', 9, 'b'], ['1986', 12, 'g'], ['1995', 15, 'g'], ['2004', 25, 'h'], ['2013', 28, 'h'], ['2020', 27, 'k']], { titre: 'Nombre d’États membres', max: 32 }]], w: 280, h: 108,
          src: 'D’après la chronologie officielle de l’Union européenne.'
        },
        {
          t: 'Document 2 — Une élue d’une région frontalière',
          txt: 'Chez nous, l’Europe n’est pas une abstraction : 450 000 Français traversent chaque jour une frontière pour aller travailler, au Luxembourg, en Suisse, en Belgique ou en Allemagne. Nos hôpitaux coopèrent, nos lycéens partent en Erasmus, nos entreprises vendent de l’autre côté sans formalité. Mais les écarts restent forts : un salarié gagne bien davantage de l’autre côté de la frontière, et cela déséquilibre nos propres services publics.',
          src: 'Propos reconstitués d’après des témoignages d’élus de régions transfrontalières.'
        }
      ],
      qs: [
        { ty: 'qcm', p: 3, q: 'Combien d’États comptait la CEE en 1957 d’après le document 1 ?', o: ['3', '6', '9', '12'], r: 1, w: 'Six pays fondateurs : France, RFA, Italie, Belgique, Pays-Bas, Luxembourg.' },
        { ty: 'qcm', p: 4, q: 'Pourquoi le nombre d’États passe-t-il de 28 à 27 en 2020 ?', o: ['Un pays a été exclu', 'Le Royaume-Uni a quitté l’UE (Brexit)', 'Deux pays ont fusionné', 'Une erreur de comptage'], r: 1, w: 'Le Brexit : le Royaume-Uni sort de l’Union européenne en 2020.' },
        { ty: 'txt', p: 3, q: 'Combien de Français traversent chaque jour une frontière pour travailler, selon le document 2 ?', r: ['450 000', '450000', '450 000 francais', 'environ 450 000'], w: '450 000 travailleurs transfrontaliers, surtout vers le Luxembourg, la Suisse, la Belgique et l’Allemagne.' },
        {
          ty: 'red', p: 10, q: 'À l’aide des documents et de tes connaissances, montre en une dizaine de lignes que l’Union européenne est un territoire de référence pour les Français, mais un territoire inégal.',
          mod: ['<strong>Un territoire de référence au quotidien</strong> : monnaie unique (zone euro, 20 États), libre circulation (Schengen), absence de formalités douanières, Erasmus, normes communes.',
            '<strong>Un espace vécu dans les régions frontalières</strong> : 450 000 travailleurs transfrontaliers, coopérations hospitalières et scolaires (doc. 2).',
            '<strong>Un territoire qui s’est élargi</strong> : de 6 États en 1957 à 27 aujourd’hui (doc. 1), avec le grand élargissement à l’Est en 2004.',
            '<strong>Mais un territoire inégal</strong> : la dorsale Londres-Milan concentre richesse et emplois ; les périphéries (sud de l’Italie, Grèce, Europe centrale) restent en rattrapage ; écart de 1 à 6 entre régions.',
            '<strong>Des politiques de correction</strong> : politique de cohésion (environ un tiers du budget de l’UE), fonds régionaux.',
            '<strong>Une construction contestée</strong> : rejet du traité constitutionnel en 2005, Brexit en 2020.']
        }
      ]
    },
    {
      n: 'Exercice 2', tt: 'Maîtriser différents langages pour raisonner et se repérer', pts: 20, disc: 'hist',
      cons: 'Le sujet porte sur les Françaises et les Français dans une République repensée.',
      docs: [],
      qs: [
        {
          ty: 'ord', p: 6, q: 'Remets dans l’ordre chronologique ces étapes de l’évolution des droits des femmes en France.',
          o: ['Droit de vote et d’éligibilité', 'Travailler et ouvrir un compte sans l’accord du mari', 'Autorisation de la contraception', 'Loi Veil sur l’IVG', 'Le viol défini comme un crime', 'IVG inscrite dans la Constitution'],
          w: '1944 → 1965 → 1967 → 1975 → 1980 → 2024.'
        },
        { ty: 'qcm', p: 4, q: 'Quelle réforme de 1962 modifie durablement la Vᵉ République ?', o: ['Le quinquennat', 'L’élection du président au suffrage universel direct', 'La décentralisation', 'La majorité à 18 ans'], r: 1, w: 'Le référendum de 1962, après l’attentat du Petit-Clamart, instaure l’élection du président au suffrage universel direct.' },
        {
          ty: 'red', p: 10, q: 'Rédige un développement construit d’une vingtaine de lignes : « L’évolution de la place des femmes dans la société française des années 1950 aux années 1980 ».',
          mod: ['<strong>Introduction</strong> : en 1950, une femme mariée ne peut ni travailler ni ouvrir un compte sans l’accord de son mari ; en 1980, l’égalité juridique est largement acquise.',
            '<strong>1. Une transformation du quotidien</strong> : Trente Glorieuses, plein emploi, baby-boom ; équipement des ménages (réfrigérateur : 8 % en 1954, 88 % en 1975) qui allège le travail domestique ; hausse du travail féminin salarié.',
            '<strong>2. Des conquêtes juridiques par étapes</strong> : 1965 (compte bancaire et travail), 1967 (loi Neuwirth sur la contraception), 1970 (autorité parentale), 1972 (à travail égal salaire égal), 1975 (loi Veil, divorce par consentement mutuel, mixité scolaire), 1980 (le viol défini comme un crime).',
            '<strong>3. Un basculement culturel</strong> : mai 68, création du MLF en 1970, combat de Simone Veil devant une Assemblée composée de 481 hommes et 9 femmes.',
            '<strong>Conclusion</strong> : l’égalité en droit est acquise, mais les inégalités de fait subsistent (écart salarial d’environ 14 %, partage des tâches domestiques).']
        }
      ]
    },
    {
      n: 'Exercice 3', tt: 'Mobiliser des compétences relevant de l’EMC', pts: 10, disc: 'emc',
      cons: 'Le sujet porte sur l’information et l’esprit critique.',
      docs: [{
        t: 'Document — La circulation des fausses informations',
        txt: 'Une étude publiée en 2018 par des chercheurs du Massachusetts Institute of Technology, portant sur 126 000 rumeurs diffusées sur un réseau social entre 2006 et 2017, établit qu’une information fausse se propage en moyenne six fois plus vite qu’une information vraie, et touche un public bien plus large. L’explication avancée par les auteurs n’est pas technique mais humaine : les fausses informations sont perçues comme plus nouvelles et suscitent des émotions plus fortes — surprise, peur, dégoût — qui incitent au partage.',
        src: 'D’après S. Vosoughi, D. Roy et S. Aral, « The spread of true and false news online », Science, 2018.'
      }],
      qs: [
        { ty: 'qcm', p: 2, q: 'Selon le document, pourquoi les fausses informations circulent-elles plus vite ?', o: ['Parce que les algorithmes les favorisent uniquement', 'Parce qu’elles suscitent des émotions plus fortes', 'Parce qu’elles sont plus courtes', 'Parce qu’elles sont gratuites'], r: 1, w: 'L’explication avancée est humaine : nouveauté ressentie et émotions fortes (surprise, peur, dégoût) incitent au partage.' },
        { ty: 'txt', p: 2, q: 'De quelle année date la grande loi française sur la liberté de la presse ?', r: ['1881', 'en 1881'], w: 'La loi du 29 juillet 1881.' },
        {
          ty: 'red', p: 6, q: 'Propose une méthode en plusieurs étapes pour vérifier une information avant de la partager, et explique pourquoi c’est un devoir civique.',
          mod: ['<strong>Qui ?</strong> Identifier l’auteur et le site (mentions légales, URL : les faux sites imitent les vrais à une lettre près).',
            '<strong>Quand ?</strong> Vérifier la date : une image ancienne ressort souvent lors d’un nouvel événement.',
            '<strong>Où ?</strong> Faire une recherche d’image inversée pour retrouver le lieu et la date réels.',
            '<strong>Pourquoi ?</strong> S’interroger sur l’intention : informer, vendre, indigner, manipuler ?',
            '<strong>Croiser</strong> plusieurs sources d’origines différentes et consulter les rubriques de vérification.',
            '<strong>Devoir civique</strong> : partager, c’est publier — on est juridiquement responsable de ce qu’on republie ; une opinion publique trompée ne peut plus décider librement, ce qui fragilise la démocratie.']
        }
      ]
    }
  ]
});
