# Delta (δ) — histoire, géographie et EMC pour la 3ᵉ

Un site complet pour réviser le brevet en **histoire-géographie-EMC** :
des cours écrits pour être lus avec plaisir et remplis d'anecdotes, des
cartes bâties sur des contours géographiques réels, des exercices
auto-corrigés, des brevets blancs au format officiel, des mini-jeux, une
collection à faire tomber au tirage et un profil personnalisable.

**→ [Ouvrir le site](https://jul3zzz.github.io/delta/)**

Tout fonctionne dans le navigateur, sans serveur ni compte en ligne.

---

## Ce que contient le site

| | |
|---|---|
| **44 chapitres de cours** | 21 en histoire, 13 en géographie, 10 en EMC. Chacun avec au moins une anecdote, un encadré « à retenir », des définitions, des chiffres clés et un document source. |
| **173 exercices** | QCM, vrai/faux, réponse écrite, date à trouver, remise en ordre chronologique — tous auto-corrigés. |
| **4 brevets blancs** | Format officiel du DNB : 2 h, 50 points, les trois exercices réglementaires, chronomètre, tâche cartographique cliquable. |
| **12 mini-jeux** | Frise chronologique, cartes muettes (France, Europe, outre-mer), « Qui suis-je ? », « Vrai ou intox ? », curseur de dates… |
| **21 planches d'atlas** | Cartes légendées comme au brevet, réutilisables comme modèles de croquis. |
| **67 fiches de collection** | Six raretés, tirage avec système de pitié, dessins et textes complets. |
| **Progression** | Comptes locaux, XP et niveaux, classement Elo à 8 rangs, série quotidienne, 41 succès, boutique avec 9 thèmes qui repeignent l'interface. |

---

## Les cartes

Les quatre fonds de carte ne sont pas dessinés à la main : ils sont
**générés** par `node _fonds.js`, qui télécharge des données
géographiques publiques, les projette, les simplifie et les normalise.

| Fond | Contenu | Projection |
|---|---|---|
| `FR` | 13 régions métropolitaines | Lambert conforme conique |
| `EUR` | 42 pays européens | Lambert conforme conique |
| `MONDE` | 175 pays, groupés par continent | Miller |
| `DROM` | 7 territoires ultramarins | vignettes |

Chaque fond porte aussi un dictionnaire de **lieux réels** (villes,
massifs, points de repère historiques), projetés exactement comme la
carte. Toutes les annotations sont donc placées par nom de lieu, jamais
« à l'œil » :

```js
['ancre', 'FR',    x, y, échelle, [['lyon', 'metropole', 'h', 6, 'Lyon']]]
['flux',  'MONDE', x, y, échelle, [['paris', 'noumea', -40, 'g']]]
['bande', 'FR',    x, y, échelle, ['bayonne', 'pyrenees', 'perpignan'], 'b', 7]
['aire',  'FR',    x, y, échelle, [['alpes', 15, 7, -38]], 'm', .42]
```

---

## Développer

```bash
node _fonds.js     # regénère les fonds de carte (téléchargement unique dans data/)
node _check.js     # vérifie la cohérence de toutes les données
node build.js      # assemble src/ -> delta.html + index.html
node _serve.js     # prévisualise sur http://localhost:4177
node _planche.js cartes|fiches|cours|atlas   # planche de contrôle des dessins
```

On n'édite **que** le dossier `src/`. Les fichiers `delta.html`,
`index.html` et `src/24-fonds.js` sont générés.

`_check.js` contrôle la syntaxe, les identifiants uniques, les bonnes
réponses dans les bornes, le barème des brevets (50 points), les taux de
rareté (100 %), les fonds de carte, les générateurs de mini-jeux, les
couleurs des thèmes, ainsi que tout ce qui pourrait rendre une figure
illisible : texte hors cadre, légende plus large que sa figure, frise
dont les étiquettes débordent, nom de lieu ou de zone inconnu.

---

## Limites à connaître

- Les comptes sont enregistrés **uniquement dans le navigateur**
  (`localStorage`). Rien n'est envoyé sur Internet. Le profil propose un
  export/import de sauvegarde pour changer d'appareil.
- Les développements construits des brevets blancs sont **auto-évalués** :
  on affiche un corrigé type et l'élève coche ce qu'il a traité. La note
  est donc indicative.
- Les sujets de brevet sont écrits d'après le format et l'esprit des
  annales officielles ; ce ne sont pas des sujets recopiés.
- Les contours des cartes sont réels mais **simplifiés** : ils servent à
  localiser et à raisonner, pas à mesurer.

---

## Sources des données cartographiques

- **Natural Earth** (1:50 m et 1:110 m) — domaine public.
  <https://www.naturalearthdata.com/>
- **france-geojson**, de Grégoire David, d'après les données IGN et Insee
  — Licence Ouverte. <https://france-geojson.gregoiredavid.fr/>

Les fichiers téléchargés ne sont pas versionnés (`data/` est ignoré) :
`node _fonds.js` les récupère au besoin.

---

## Polices

[Fraunces](https://fonts.google.com/specimen/Fraunces),
[Literata](https://fonts.google.com/specimen/Literata) et
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono),
servies par Google Fonts (SIL Open Font License).
