# Archives personnelles — Chicago, 1940

Site de création de background humain, repris de la version existante : accueil, huit rubriques distinctes et appendice facultatif « Donner un visage ». Les illustrations, aides, exemples, sauvegardes JSON et exports PDF et texte sont inclus.

## Mettre le site sur GitHub Pages

1. Décompressez l’archive sur votre ordinateur.
2. Créez votre nouveau dépôt GitHub (un dépôt public convient à GitHub Free).
3. Ajoutez **le contenu de l’archive à la racine du dépôt**. Le fichier `index.html` doit être directement à la racine, aux côtés de `app.js`, `assets/` et `vendor/`. Ne téléversez pas le ZIP lui-même, ni un dossier parent contenant tous les fichiers.
4. Validez les fichiers sur la branche `main`.
5. Dans **Settings → Pages → Build and deployment**, choisissez **Deploy from a branch**, puis **main** et **/(root)**. Cliquez sur **Save**.
6. Attendez la fin de la publication. GitHub affiche ensuite l’adresse du site dans Settings → Pages, généralement `https://VOTRE-COMPTE.github.io/NOM-DU-DEPOT/`.

Le fichier caché `.nojekyll` est inclus : conservez-le lors de l’import. Il permet de publier directement les fichiers statiques. Le fichier `_config.yml` inclut également `vendor/` si `.nojekyll` n’a pas été transféré, afin de conserver la bibliothèque nécessaire au PDF.

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
- Relecture, export JSON, export texte et PDF A4 sans plafond de pages.
- Portrait facultatif, avec choix de mise en scène et prompt modifiable. Le site prépare un texte à copier ; il ne génère pas lui-même d’image.
- Le prompt utilise l’identité, le métier et les détails de la rubrique 08, en excluant « Autres éléments à discuter avec le conteur ».
- Les notes du conteur existantes restent accessibles via leur bouton ; cet espace n’a pas de protection d’accès.

Les scripts, illustrations et polices nécessaires sont fournis localement. Les liens documentaires externes ne sont consultés qu’à leur ouverture. Le livre de règles, la fiche officielle et les dossiers personnels de joueurs ne sont pas inclus dans cette archive.

## Essayer le site en local

Depuis le dossier décompressé, lancez avec Python 3 :

```sh
python3 -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`. Utilisez un serveur HTTP plutôt qu’un double-clic sur `index.html` : l’export PDF charge ses polices et son illustration avec `fetch`, qui peut être bloqué avec une adresse `file://`.

## Organisation des fichiers

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Structure de la page et fenêtres d’aide |
| `app.js` | Formulaire, navigation, sauvegardes et relecture |
| `context-guides.js` | Repères historiques |
| `illustration-prompt.js` | Préparation du prompt et options de scène |
| `pdf-export.js` | Composition du dossier PDF |
| `style.css`, `wallpaper.css`, `journey.css` | Présentation et illustrations fondues |
| `assets/` | Images, masque et polices |
| `vendor/` | PDF-lib et sa licence |
| `.nojekyll`, `_config.yml` | Publication statique sur GitHub Pages |
| `AGENTS.md` | Consigne conservée pour les futures interventions sur le code |

Les mentions et licences des bibliothèques et des polices sont conservées dans leurs dossiers. Ce projet est un outil de campagne non officiel ; aucune licence générale supplémentaire n’est attribuée aux contenus tiers.

## Périmètre de cette copie

Cette archive prépare l’hébergement sur GitHub Pages. Les fichiers du site sont repris à l’identique ; seule la configuration d’hébergement et la documentation changent. La version précédemment publiée n’est pas modifiée.
