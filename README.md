# Archives personnelles — Chicago, octobre 1940

Création de background humain : accueil documenté, huit rubriques, portrait facultatif, puis dossier illustré. Le questionnaire et le générateur de prompt du portrait sont conservés.

## Installer sur GitHub Pages

1. Décompressez l’archive et ajoutez **son contenu à la racine** de votre dépôt GitHub. `index.html` doit être directement à la racine, à côté de `app.js` et `assets/`.
2. Conservez `.nojekyll` et `_config.yml`.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**, branche `main`, dossier `/(root)` et **Save**.
4. GitHub affiche l’adresse publiée dans Settings → Pages. Les mises à jour se font en remplaçant les fichiers du dépôt.

Le site est statique : aucune compilation, clé API ou configuration de serveur n’est nécessaire. Les chemins relatifs fonctionnent aussi dans un dépôt portant un autre nom. Cette archive ne modifie pas l’ancien site ChatGPT Sites.

## Deux boutons, deux prompts, deux formats

La page **Dossier illustré** présente deux boutons indépendants. Un clic copie le prompt correspondant, avec les réponses des huit rubriques, Convictions, Attaches et relations. Collez ensuite ce texte dans une IA comme ChatGPT capable de générer le format demandé.

| Bouton | Résultat demandé à l’IA |
| --- | --- |
| **Planche synthétique illustrée** | **Une seule image verticale**, avec une synthèse sans doublons, le personnage dominant et des illustrations de lieux, proches, scènes et objets justifiées par les réponses. |
| **Background détaillé pour le MJ** | **Un PDF de dossier de presse illustré**, avec une synthèse d’une page puis le background développé, tous les faits importants, les relations et les informations confidentielles. |

Le site copie des consignes ; l’image et le PDF sont créés dans la conversation extérieure. Il ne demande aucune clé API. Le prompt de l’image ne demande plus de texte détaillé séparé. Le prompt du PDF exige la création effective d’un fichier téléchargeable.

### Utilisation

1. Remplissez le questionnaire puis ouvrez **Dossier illustré**.
2. Cliquez sur le bouton du résultat souhaité : son prompt est copié. Si la copie automatique échoue, le texte est sélectionné pour une copie manuelle avec Ctrl+C ou Cmd+C.
3. Collez le prompt dans ChatGPT. Joignez votre portrait éventuel. Pour la planche, téléchargez et joignez aussi la référence de Kiki disponible sur la page. Copier du texte ne transmet pas une image.
4. L’IA synthétise les réponses puis génère l’image, ou rédige et met en page le PDF selon le bouton choisi.

La référence de Kiki guide la composition et la direction artistique ; ses faits et son visage ne doivent pas être copiés sur un autre personnage.

### Confidentialité

L’option **Inclure les informations confidentielles dans la planche** est décochée par défaut. Le prompt demande alors une présentation partageable entre joueurs et écarte les secrets et leurs indices visuels. Cochée, elle autorise une planche privée plus complète pour le joueur et le MJ.

Le PDF détaillé pour le MJ conserve tous les faits confidentiels renseignés, indépendamment de cette option. Les notes de l’espace conteur restent exclues des deux prompts destinés à la création humaine, et conservées dans le JSON.

Relisez les résultats avant de les partager. Les prompts complets et le JSON contiennent les réponses privées, même lorsque la planche est réglée pour le partage.

### Personnalisation et sauvegardes

Chaque prompt peut être consulté, modifié, téléchargé et actualisé séparément dans son volet. Les modifications manuelles sont conservées et signalées comme à revoir lorsque les réponses ou le portrait changent. Le réglage de confidentialité n’affecte que le prompt de la planche.

Les réponses, les deux prompts de dossier, le prompt du portrait, le réglage de confidentialité et le portrait préparé sont inclus dans la sauvegarde JSON. **Effacer ce dossier** les efface après confirmation. Les anciens JSON restent compatibles ; un ancien prompt personnalisé combinant image et texte est proposé au téléchargement et remplacé par les deux nouveaux prompts.

Pour reprendre un personnage de l’ancien site, exportez son JSON puis importez-le avec **Reprendre une sauvegarde**. La sauvegarde automatique du navigateur ne se transfère pas entre adresses.

Les résultats importés dans la version précédente restent récupérables dans un volet réservé aux anciennes sauvegardes. Une ancienne planche reste stockée dans le navigateur avec IndexedDB ; ses pixels ne sont pas inclus dans le JSON. Son téléchargement séparé permet de la conserver ou changer d’appareil. Un ancien texte personnalisé pour le MJ reste également conservé.

## Parcours

1. Identité : nom, surnom, âge ou naissance, genre et concept.
2. Apparence et attitude.
3. Origines et métiers : six milieux possibles, suggestions adaptées, activités légales ou non.
4. Événements et loisirs.
5. Convictions et Attaches.
6. Ambition et Désir.
7. Moyens et possessions : logement, revenus, réputation, difficultés, objets et notes.
8. Relations : première fiche ouverte et bouton Ajouter une personne.

Les ressentis réciproques et la rubrique avec les autres personnages joueurs restent supprimés. Les sauvegardes ignorent les anciens champs correspondants. Les notes de l’espace conteur restent dans le JSON mais sont exclues des prompts destinés à la création humaine.

**Donner un visage** conserve ses menus : 56 lieux, 40 poses, 38 attitudes, 22 cadrages, 7 éclairages, 23 météos et les précisions libres.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure, navigation et fenêtres |
| `app.js` | Questionnaire, sauvegardes, import, relecture |
| `context-guides.js` | Contextes historiques |
| `illustration-prompt.js` | Prompt du portrait et mise en scène |
| `dossier-prompt.js` | Prompts indépendants de l’image et du PDF, portrait, migrations |
| `dossier-result.js` | Récupération des résultats importés dans la version précédente |
| `dossier-prompt.css` | Présentation de la page du dossier |
| `style.css`, `wallpaper.css`, `journey.css` | Présentation générale conservée |
| `assets/` | Images du site et référence de Kiki fournie |
| `.nojekyll`, `_config.yml` | Publication statique |
| `AGENTS.md` | Préférence de formulaire conservée |

Le livre de règles, la fiche officielle et les réponses personnelles des joueurs ne sont pas inclus. La référence fictive de Kiki est fournie dans les assets pour pouvoir la joindre à la génération. Les mentions des contenus tiers sont conservées ; aucune licence générale supplémentaire ne leur est attribuée.
