# Archives personnelles — Chicago, octobre 1940

Création de background humain : accueil documenté, huit rubriques, portrait facultatif, puis dossier illustré. Le questionnaire et le générateur de prompt du portrait sont conservés.

## Installer sur GitHub Pages

1. Décompressez l’archive et ajoutez **son contenu à la racine** de votre dépôt GitHub. `index.html` doit être directement à la racine, à côté de `app.js` et `assets/`.
2. Conservez `.nojekyll` et `_config.yml`.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**, branche `main`, dossier `/(root)` et **Save**.
4. GitHub affiche l’adresse publiée dans Settings → Pages. Les mises à jour se font en remplaçant les fichiers du dépôt.

Le site est statique : aucune compilation, clé API ou configuration de serveur n’est nécessaire. Les chemins relatifs fonctionnent aussi dans un dépôt portant un autre nom. Cette archive ne modifie pas l’ancien site ChatGPT Sites.

## Le dossier : deux résultats distincts

- **Une planche illustrée synthétique**, partageable entre joueurs : personnage principal dominant, illustrations secondaires justifiées par les réponses, textes courts, esthétique peinte de roman noir et Art déco.
- **Un texte détaillé réservé au MJ**, avec l’ensemble des faits renseignés, les nuances, les secrets et les difficultés. Ce texte est séparé de l’image et se télécharge à part.

Le site prépare un **prompt** à partir des huit rubriques. La synthèse rédactionnelle et la génération graphique se font dans ChatGPT, conformément au fonctionnement choisi ; le site ne fait pas d’appel à une API et ne vérifie pas automatiquement les textes dessinés dans une image.

### Obtenir les deux résultats

1. Remplissez les rubriques et ouvrez **Générer le dossier illustré**.
2. Téléchargez la référence de Kiki depuis cette page. Elle guide le style et la composition ; ses faits et son visage ne doivent pas être copiés sur un autre personnage.
3. Si vous le souhaitez, utilisez **Donner un visage**, créez votre portrait dans ChatGPT, puis importez-le dans le dossier.
4. Copiez le prompt du dossier dans ChatGPT. **Joignez aussi la référence de Kiki et le portrait éventuel** : le texte copié ne transmet pas les images.
5. Le prompt demande d’abord une synthèse structurée sans doublons, puis le texte complet destiné au MJ et une seule image verticale. Il distingue les faits partageables des faits confidentiels et exclut les indices visuels révélant un secret.
6. Importez la planche obtenue dans le site (JPG, PNG ou WebP, 30 Mo maximum). Elle est affichable en grand et téléchargeable dans son format original, sans compression.
7. Collez le texte rédigé dans **Le dossier pour le MJ**. À défaut, cette zone rassemble déjà les réponses complètes. Elle est modifiable et téléchargeable en `.txt`.

Relisez la planche avant de la partager : aucune consigne de génération ne garantit à elle seule la confidentialité ou l’exactitude du résultat. Le prompt complet, le texte pour le MJ et la sauvegarde JSON contiennent les informations privées ; ne les transmettez pas aux autres joueurs. La zone MJ repliée sert à la présentation et n’est pas une protection d’accès.

## Sauvegardes et images

Les réponses, les deux prompts, le texte personnalisé pour le MJ et le portrait préparé sont conservés dans le navigateur et exportables dans le JSON. Une modification ultérieure des réponses signale les textes personnalisés à revoir ; elle ne les écrase pas.

La planche originale est conservée séparément dans le navigateur avec IndexedDB. **Le JSON ne contient pas ses pixels.** Téléchargez l’image séparément pour l’archiver ou changer d’appareil. Après import d’un JSON sur un autre navigateur, réimportez cette image. Si le stockage d’images est indisponible, elle reste visible pendant la session et un message invite à la télécharger immédiatement.

**Effacer ce dossier** efface les réponses, les prompts, le texte pour le MJ, le portrait et la planche associée dans ce navigateur, après confirmation. Les fichiers téléchargés restent sur votre appareil.

Pour reprendre un personnage de l’ancien site : exportez son JSON sur l’ancienne adresse, puis utilisez **Reprendre une sauvegarde** sur la nouvelle. L’enregistrement automatique ne se transfère pas entre adresses. Les anciennes réponses restent compatibles. Un ancien prompt de dossier PDF personnalisé est proposé au téléchargement et remplacé par le nouveau prompt de planche ; le portrait reste conservé.

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
| `dossier-prompt.js` | Prompt de la planche et du texte MJ, portrait, migrations |
| `dossier-result.js` | Consultation et conservation de la planche, texte pour le MJ |
| `dossier-prompt.css` | Présentation de la page du dossier |
| `style.css`, `wallpaper.css`, `journey.css` | Présentation générale conservée |
| `assets/` | Images du site et référence de Kiki fournie |
| `.nojekyll`, `_config.yml` | Publication statique |
| `AGENTS.md` | Préférence de formulaire conservée |

Le livre de règles, la fiche officielle et les réponses personnelles des joueurs ne sont pas inclus. La référence fictive de Kiki est fournie dans les assets pour pouvoir la joindre à la génération. Les mentions des contenus tiers sont conservées ; aucune licence générale supplémentaire ne leur est attribuée.
