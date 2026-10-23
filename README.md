# Archives personnelles — Chicago, octobre 1940

Site de création de background humain, repris de la version existante : accueil, huit rubriques distinctes et deux compléments : « Donner un visage » et « Dossier illustré ». Les illustrations, aides, exemples, sauvegardes JSON, exports texte et prompts sont inclus.

## Mettre le site sur GitHub Pages

1. Décompressez l’archive sur votre ordinateur.
2. Créez votre nouveau dépôt GitHub (un dépôt public convient à GitHub Free).
3. Ajoutez **le contenu de l’archive à la racine du dépôt**. Le fichier `index.html` doit être directement à la racine, aux côtés de `app.js`, `dossier-prompt.js` et `assets/`. Ne téléversez pas le ZIP lui-même, ni un dossier parent contenant tous les fichiers.
4. Validez les fichiers sur la branche `main`.
5. Dans **Settings → Pages → Build and deployment**, choisissez **Deploy from a branch**, puis **main** et **/(root)**. Cliquez sur **Save**.
6. Attendez la fin de la publication. GitHub affiche ensuite l’adresse du site dans Settings → Pages, généralement `https://VOTRE-COMPTE.github.io/NOM-DU-DEPOT/`.

Le fichier caché `.nojekyll` est inclus : conservez-le lors de l’import. Il permet de publier directement les fichiers statiques.

Aucune compilation, installation npm, clé API ni configuration de serveur n’est nécessaire. Les chemins sont relatifs : le dépôt peut porter le nom de votre choix. Les publications suivantes se font en mettant à jour les fichiers sur `main`.

Documentation GitHub : [configurer la source de publication](https://docs.github.com/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) et [créer un site Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Récupérer un personnage du site précédent

L’enregistrement automatique appartient au navigateur et à l’adresse du site. Il ne se transfère pas tout seul de l’ancienne adresse vers GitHub Pages.

1. Sur l’ancien site, cliquez sur **Sauvegarder le dossier** pour télécharger le JSON.
2. Sur le nouveau site, cliquez sur **Reprendre une sauvegarde** et sélectionnez ce fichier.

Le format des sauvegardes et les identifiants des champs sont conservés. Les réponses, relations, Convictions, Attaches et choix du portrait peuvent ainsi être repris. Gardez le fichier JSON pour transmettre un dossier au conteur ou changer d’appareil. Un PDF sert à la lecture ; il ne remplace pas la sauvegarde JSON pour reprendre la saisie.

## Fonctionnement

- Accueil et repères historiques par thème.
- Huit écrans, Précédent/Suivant et navigation libre à gauche.
- Réponses enregistrées localement dans le navigateur ; aucun envoi de dossier à un serveur.
- Relecture, export JSON et export des réponses en texte.
- Dossier illustré : prompt complet au ton de roman noir, une synthèse d’une page puis un dossier développé sans plafond de pages. Les six titres directs sont fixés dans le prompt.
- Import d’un portrait JPG, PNG ou WebP (10 Mo maximum), aperçu, retrait et téléchargement. Le portrait préparé est inclus dans la sauvegarde JSON.
- Prompt du dossier modifiable, actualisable et téléchargeable. Les modifications manuelles sont conservées ; un message signale les changements de réponses ou de portrait.
- Portrait facultatif, avec choix de mise en scène et prompt modifiable. Le site prépare un texte à copier ; il ne génère pas lui-même d’image.
- Le prompt utilise l’identité, les métiers principal et complémentaire et l’apparence et les possessions, en excluant « Autres éléments à discuter avec le conteur ».
- Les notes du conteur existantes restent accessibles via leur bouton ; cet espace n’a pas de protection d’accès.

Les scripts et illustrations nécessaires sont fournis localement. Les liens documentaires externes ne sont consultés qu’à leur ouverture. Le livre de règles, la fiche officielle et les dossiers personnels de joueurs ne sont pas inclus dans cette archive.

## Essayer le site en local

Depuis le dossier décompressé, lancez avec Python 3 :

```sh
python3 -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`. Ce mode correspond au fonctionnement sur GitHub Pages et permet notamment de vérifier la copie des prompts.

## Organisation des fichiers

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et fenêtres d’aide |
| `app.js` | Formulaire, navigation, sauvegardes et relecture |
| `context-guides.js` | Repères historiques |
| `illustration-prompt.js` | Préparation du prompt et options de scène |
| `dossier-prompt.js`, `dossier-prompt.css` | Prompt du dossier illustré et import du portrait |
| `style.css`, `wallpaper.css`, `journey.css` | Présentation et illustrations fondues |
| `assets/` | Images et masque |
| `.nojekyll`, `_config.yml` | Publication statique sur GitHub Pages |
| `AGENTS.md` | Consigne conservée pour les futures interventions sur le code |

Les fichiers tiers conservés dans le projet gardent leurs mentions et licences. Ce projet est un outil de campagne non officiel ; aucune licence générale supplémentaire n’est attribuée aux contenus tiers.

## Périmètre de cette copie

Cette archive contient la version GitHub Pages du formulaire, fixée à octobre 1940. Elle comprend les contextes enrichis, le bouton « Effacer ce dossier », les relations et Attaches simplifiées, les activités élargies et les espaces de rédaction agrandis. Les anciennes sauvegardes sont importables : les descriptions libres des liens sont reprises dans « Autre » et les anciens champs de réputation sont regroupés. Les champs de ressentis mutuels ont été retirés du formulaire et des exports. La version précédemment publiée sur ChatGPT Sites n’est pas modifiée.

## Obtenir le dossier illustré

1. Remplissez les huit rubriques et relisez vos réponses.
2. Si vous voulez un portrait, utilisez **Donner un visage** pour préparer le prompt d’image. Créez le portrait dans votre outil, puis importez-le dans **Dossier illustré**.
3. Copiez le prompt du dossier et collez-le dans une conversation ChatGPT capable de créer un PDF. **Joignez également le portrait à cette conversation** : le texte copié ne transmet pas l’image. Le bouton de téléchargement du portrait permet de récupérer l’image préparée.
4. Faites générer le dossier : **Le personnage en bref**, **Origines et parcours**, **Vie quotidienne et loisirs**, **Convictions, Attaches et objectifs**, **Entourage et relations**, **Situation matérielle et vie privée**.

Le site prépare les consignes et les réponses ; la rédaction, les illustrations supplémentaires et le PDF sont produits dans cette conversation extérieure. L’ancien export PDF automatique a été remplacé. Les notes de l’espace conteur sont exclues du prompt ; les secrets du personnage sont destinés à un encadré privé. La sauvegarde JSON conserve les deux prompts personnalisés et le portrait importé. Les anciennes sauvegardes restent importables ; une nouvelle sauvegarde avec portrait ou prompt volumineux est acceptée jusqu’à 12 Mo. Si la sauvegarde locale du navigateur est indisponible ou pleine, le bandeau invite à exporter le JSON.

## Ordre du parcours

1. Votre identité.
2. Apparence et attitude : silhouette, visage, tenue, voix, gestes et habitudes.
3. Origines et métier.
4. Événements et loisirs.
5. Convictions et Attaches.
6. Ambition et Désir.
7. Moyens et possessions : logement, revenus, réputation, difficultés, objets et notes personnelles.
8. Relations, puis préparation du dossier illustré.

Les identifiants des réponses sont conservés : les anciennes sauvegardes retrouvent automatiquement les champs dans leur nouvelle rubrique. La tenue esquissée au début peut être ajustée après le choix du métier et des moyens.

La rubrique « Avec les autres personnages joueurs » a été retirée du formulaire, des aides, de la validation et des exports. Les anciens champs correspondants sont ignorés à l’import. Dans « Vos autres relations », une première fiche vide est toujours affichée, puis le bouton « Ajouter une personne » permet d’en ouvrir d’autres. Les fiches entièrement vides sont facultatives et ne sont pas transmises au prompt.

Dans la rubrique 03, « Dans quel milieu avez-vous grandi ? » propose six repères : grande précarité, famille ouvrière, artisans ou petits commerçants, classe moyenne, milieu aisé, autre ou milieu difficile à définir. Le choix adapte les suggestions de la boîte « Lieu d’origine et milieu familial » et son exemple de saisie, sans écrire ni remplacer les réponses du joueur. Le repère est facultatif, conservé dans le JSON et repris dans la relecture, l’export texte et le prompt du dossier. Les anciennes origines rédigées restent intactes et aucun milieu ne leur est attribué automatiquement.

Les menus de « Donner un visage » sont enrichis et regroupés par thèmes : 56 lieux, 40 poses, 38 attitudes, 22 cadrages et 23 météos, avec un choix libre dans chacun de ces menus. Les sept éclairages existants sont conservés. Les anciens identifiants de choix restent compatibles avec les sauvegardes. Le prompt adapte la météo aux scènes intérieures et la pose au cadrage, tout en gardant une seule personne comme sujet principal.
