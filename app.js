'use strict';
const STORAGE_KEY='dossier-personnel-1940-v1';
const F=(id,label,placeholder='',opts={})=>({id,label,placeholder,...opts});
const sections=[
 {id:'identite',title:'Un nom, une première impression',nav:'Votre identité',intro:'Commencez par une idée simple. Le personnage se précisera avec ses choix et ses relations.',help:'concept',fields:[
 F('nom','Nom et prénom','Ex. : Evelyn Ward'),F('surnom','Surnom ou nom d’usage','S’il en possède un',{optional:true}),
 F('age','Âge ou date de naissance','Ex. : 32 ans ou 12/05/1908',{hint:'Âge en octobre 1940, ou date de naissance au format jour/mois/année.'}),F('genre','Genre','',{type:'select',options:['Choisir…','Masculin','Féminin'],strictOptions:true,optional:true}),
 F('concept','Idée de concept du personnage','Ex. : infirmière obstinée, boxeur endetté, journaliste trop curieux…',{area:true,full:true,hint:'Présentez sa personnalité et ce qui risque de l’entraîner dans l’histoire. Cette idée pourra évoluer.',example:'Infirmière obstinée · boxeur endetté · secrétaire débrouillarde · escroc élégant · ouvrier syndicaliste · héritière en rupture.'})]},
 {id:'portrait',title:'Votre apparence',nav:'Apparence & attitude',intro:'Donnez un visage à votre personnage : silhouette, traits, tenue, voix et attitude. Quelques détails suffisent pour commencer ; vous pourrez les ajuster lorsque sa vie et ses moyens se préciseront.',help:'portrait',fields:[
 F('silhouette','Silhouette, visage et allure','Taille, carrure, traits du visage, regard, cheveux…',{area:true}),
 F('tenue','Vêtements et présentation','Ce que vos habits disent de votre métier, de vos moyens ou de vos goûts…',{area:true}),
 F('singularite','Voix, gestes et habitudes','Ex. : parle à voix basse, retourne sa bague avant de mentir…',{area:true,optional:true})]},
 {id:'quotidien',title:'La vie que vous menez',nav:'Origines & métier',intro:'Où avez-vous grandi ? De quoi vivez-vous ? Quelques recherches sur Chicago en octobre 1940 vous aideront à situer votre histoire. Donnez des noms aux personnes qui comptent, aux établissements et aux lieux que vous fréquentez ; vous pouvez inventer des personnes et de petites adresses cohérentes avec l’époque.',help:'vie',fields:[
 F('origines','Lieu d’origine et milieu familial','Quartier ou pays, famille, langue, situation sociale…',{area:true}),
 F('parcours','Études, apprentissage et arrivée en ville','École quittée tôt, diplôme, formation sur le tas, migration…',{area:true}),
 F('professionType','Votre activité principale','',{type:'select',options:['Choisir un repère…','Industrie / usine / abattoirs','Artisanat / mécanique / réparation','Bâtiment / entretien','Chemin de fer / transport / livraison','Commerce / boutique / vente ambulante','Affaires / banque / assurance / comptabilité','Hôtellerie / pension / restauration / bar','Travail domestique / conciergerie / services','Médecine / soins / pharmacie','Aide sociale / association / syndicat','Presse / photographie / édition','Enquête privée / détective','Droit / justice','Musique / théâtre / cinéma / spectacle','Arts / écriture / création','Sport / boxe / entraînement','Police / pompiers / sécurité','Armée / marine','Administration / politique','Enseignement / études / recherche','Religion / fonction religieuse','Agriculture / horticulture / travail saisonnier','Foyer / aide familiale','Rentes / héritage / placements','Paris clandestins / bookmaker','Contrebande / recel / marché clandestin','Escroquerie / faussaire / petites combines','Vol / cambriolage / pickpocket','Prostitution / activité de nuit clandestine','Activité illégale à préciser','Sans emploi / situation précaire','Autre activité']}),
 F('profession','Métier ou activité, précisément','Ex. : mécanicien au dépôt ferroviaire',{hint:'Votre activité peut être officielle ou officieuse, légale ou illégale. Précisez l’établissement ou le lieu si vous le connaissez.'}),
 F('professionSecondaire','Métier ou activité complémentaire','Ex. : musicien le samedi soir, paris clandestins, petits travaux…',{area:true,optional:true,hint:'Vous pouvez cumuler plusieurs activités, officielles ou non, légales ou non. Décrivez vos revenus dans la rubrique « Moyens & possessions ».'}),
 F('savoirfaire','Ce que cette activité vous a appris','Ex. : réparer sous pression, reconnaître les habitués, négocier des pièces…',{area:true,full:true,hint:'Décrivez des savoir-faire. Les compétences et leurs scores seront choisis dans la page suivante.'}),
 F('routine','Une journée ordinaire ou un week-end','Racontez une journée habituelle ou un bon week-end : horaires, trajets, lieux, personnes…',{area:true}),
 F('appartenances','Communautés, religion et idées politiques','Ce que vous pratiquez, défendez, subissez ou rejetez…',{area:true,optional:true})]},
 {id:'vecu',title:'Ce qui vous a façonné',nav:'Événements & loisirs',intro:'Deux moments marquants et trois loisirs donnent une base concrète à votre expérience. Les événements peuvent être heureux ou malheureux, intimes ou liés à un fait public, local ou international : une naissance, une réussite, une grève, une catastrophe ou une guerre. Expliquez ce qui vous a personnellement marqué.',help:'vecu',fields:[
 F('evenement1','Premier événement marquant','Ex. : avoir participé à une grève qui a divisé votre famille.',{area:true}),
 F('lecon1','Ce que vous en avez appris','Une pratique, un savoir-faire, une façon de lire les gens…',{area:true}),
 F('evenement2','Deuxième événement marquant','Ex. : avoir pris soin d’un proche malade pendant plusieurs mois.',{area:true}),
 F('lecon2','Ce que vous en avez appris','Ce que vous savez faire depuis cet épisode…',{area:true}),
 F('loisir1','Premier loisir','Ex. : piano dans un petit orchestre ; où répétez-vous, avec qui et à quelle fréquence ?',{area:true,rows:4}),F('loisir2','Deuxième loisir','Ex. : boxe dans un club de quartier ; nom du club, partenaires et habitudes…',{area:true,rows:4}),
 F('loisir3','Troisième loisir','Ex. : réparation de radios ; où pratiquez-vous, avec quel matériel et pour qui ?',{area:true,rows:4}),F('autrePasse','Autre fait important de votre passé','Une rupture, une réussite, une faute, une rencontre…',{optional:true,help:'autrePasse'})]},
 {id:'valeurs',title:'Ce à quoi vous tenez',nav:'Convictions & Attaches',intro:'Une Conviction est une règle personnelle qui guide vos choix difficiles ; son Attache est une personne humaine vivante qui représente cette valeur à vos yeux. Vous créez les deux ensemble, en expliquant ce qui les relie.',help:'convictions',special:'convictions'},
 {id:'motivations',title:'Ce qui vous pousse à agir',nav:'Ambition & Désir',intro:'Un cap à long terme et une intention immédiate : deux façons de mettre votre personnage en mouvement.',help:'motivation',fields:[
 F('ambition','Ambition — le grand objectif','Ex. : réunir assez d’argent pour racheter l’atelier où travaillait mon père.',{area:true,full:true,hint:'Un résultat concret, dont vous pourrez reconnaître la réussite. « Être heureux » reste trop vague.'}),
 F('desir','Désir — ce que vous voulez obtenir bientôt','Ex. : convaincre mon ancien contremaître de me rendre les lettres de mon père.',{area:true,full:true,hint:'Une action accessible à court terme, liée à une personne ou à un lieu. Vous pourrez la changer au début d’une séance.'}),
 F('peur','Ce que vous craignez de perdre','Un proche, une réputation, votre indépendance…',{area:true,optional:true}),
 F('contradiction','Votre contradiction intime','Un principe que vous défendez, et une habitude qui le met à l’épreuve…',{area:true,optional:true})]},
 {id:'moyens',title:'Votre situation et vos possessions',nav:'Moyens & possessions',intro:'Décrivez votre logement, vos revenus, vos possessions, vos appuis et vos difficultés. Reliez les objets que vous possédez à votre métier, à vos moyens et à votre histoire.',help:'historiques',fields:[
 F('niveauVie','Votre train de vie','',{type:'select',options:['À préciser…','Sans revenu stable','Revenus modestes','À l’aise au quotidien','Fortuné','Très grande fortune']}),
 F('revenus','Origine des revenus et des biens','Salaire, petite affaire, héritage, placements, activités clandestines… Précisez vos sources de revenus et leur régularité.',{area:true,rows:6}),
 F('logement','Où vivez-vous ?','Adresse fictive ou quartier, type de logement, avec qui…',{area:true}),
 F('influence','Votre réputation','Comment êtes-vous connu, et dans quel milieu ? Ex. : mécanicien fiable, musicienne prometteuse, voisin serviable ou escroc à éviter…',{area:true,optional:true}),
 F('difficultes','Dettes, ennemis ou obstacles durables','Qui veut vous nuire ? À qui devez-vous quelque chose ? Quel problème vous suit ?',{area:true,optional:true}),
 F('secret','Ce que vous préférez garder secret','Une information qui pourrait réellement compliquer votre vie…',{area:true,optional:true}),
 F('particularites','Talents particuliers, langues ou fragilités','Langues apprises, aptitude singulière, dépendance, difficulté persistante…',{area:true,optional:true}),
 F('equipement','Objets utiles et possessions habituelles','Outils de travail, papiers, véhicule, objets du quotidien…',{area:true,optional:true,hint:'Restez cohérent avec vos moyens et vos contacts. Une longue liste d’achats est facultative.'}),
 F('objetCher','Un objet auquel vous tenez','Ce que c’est, d’où il vient et pourquoi il compte.',{area:true,optional:true}),
 F('notes','Autres éléments à discuter avec le conteur','Une idée encore incertaine, une information à fixer ensemble…',{area:true,optional:true})]},
 {id:'relations',title:'Les personnes autour de vous',nav:'Relations & groupe',intro:'Présentez simplement les personnes importantes : leur identité, leur âge, leur fonction, votre lien et quelques traits visibles. Les Attaches renseignées avec vos Convictions figurent déjà dans votre dossier.',help:'relations',special:'relations'}
];
const relationshipOptions=['Choisir…','Famille','Conjoint / personne aimée','Proche','Ami','Voisin','Collègue','Employeur / supérieur','Employé / assistant','Mentor / ancien professeur','Allié : peut apporter une aide','Contact : sait des choses','Rival / ennemi','Créancier / débiteur','Autre'];
const convictionFields=[
 F('principe','Votre Conviction','Ex. : Je ne livre jamais quelqu’un qui m’a demandé protection.',{area:true,full:true}),
 F('origine','Comment cette règle s’est imposée à vous','Une éducation, une rencontre, un événement…',{area:true,full:true,optional:true}),
 F('nom','Nom et prénom de l’Attache','Prénom et nom de la personne'),
 F('age','Âge de l’Attache','Ex. : 38 ans, environ 60 ans…',{optional:true}),
 F('fonction','Fonction ou occupation','Ex. : infirmière au dispensaire du quartier',{optional:true,full:true}),
 F('lien','Nature de votre relation','',{type:'select',options:relationshipOptions,strictOptions:true}),
 F('lienAutre','Précisez votre relation','Décrivez simplement le lien qui vous unit.',{area:true,conditional:'lien'}),
 F('description','Description physique de l’Attache','Silhouette, visage, cheveux, vêtements, signes distinctifs…',{area:true,full:true,optional:true}),
 F('incarne','Pourquoi cette personne incarne-t-elle votre Conviction ?','Ex. : ma Conviction est « Je protège les plus fragiles ». Martha, mon ancienne voisine, accueille ceux qui n’ont plus personne : elle me rappelle pourquoi cette règle compte.',{area:true,full:true})
];
const relationFields=[
 F('nom','Nom et prénom','Prénom et nom'),
 F('age','Âge','Ex. : 45 ans, une vingtaine d’années…',{optional:true}),
 F('fonction','Fonction ou occupation','Ex. : patron du garage, journaliste, propriétaire de votre pension…',{optional:true,full:true}),
 F('role','Nature de votre relation','',{type:'select',options:relationshipOptions,strictOptions:true}),
 F('roleAutre','Précisez votre relation','Décrivez simplement le lien qui vous unit.',{area:true,full:true,conditional:'role'}),
 F('description','Description physique et attitude','Silhouette, visage, tenue, posture, manière de parler ou de se tenir…',{area:true,full:true,optional:true}),
 F('appui','Dans quelles situations pouvez-vous lui demander de l’aide, et quelle aide concrète ?','Ex. : réparer votre voiture à crédit, vous ouvrir les archives du journal ou vous héberger quelques nuits…',{area:true,full:true,optional:true})
];
const groupFields=[F('groupePourquoi','Pourquoi accepteriez-vous de rester avec les autres ?','Une solidarité, une obligation, un intérêt commun…',{area:true,full:true}),F('pjPositif','Un personnage joueur : lien positif','Son nom, puis ce qui vous rapproche.'),F('pjNegatif','Un autre personnage joueur : tension','Son nom, puis ce qui vous oppose sans empêcher la coopération.')];
const gmFields=[F('gmAnnee','Année de l’Étreinte','À définir selon la chronique'),F('gmAge','Âge réel / apparent après l’Étreinte','Ne pas confondre âge et génération'),F('gmClan','Clan / lignage et génération','À fixer avec le conteur'),F('gmSire','Sire ou dame','Nom, clan, année d’Étreinte, fonction connue'),F('gmEtreinte','Les circonstances de l’Étreinte','Quand, où, pourquoi vous, consentement ou violence, conséquences…',{area:true}),F('gmSireLien','Relation avec le sire ou la dame','Sa fonction, la nature de votre relation et les faits qui vous lient.',{area:true}),F('gmIdentite','Identité après la mort et Masque','Statut officiel : vivant, mort ou disparu ; nom public et éventuel nom de Descendant.',{area:true}),F('gmNuit','Activité nocturne et refuge','Comment justifier l’absence le jour ? De quoi vivre et où dormir à l’abri ?',{area:true}),F('gmAmbition','Ambition après l’Étreinte','Conserver, transformer ou remplacer l’Ambition humaine.',{area:true}),F('gmPNJPositif','PNJ vampirique : relation positive','Nom, clan, âge connu, fonction et nature de votre relation.',{area:true}),F('gmPNJNegatif','PNJ vampirique : relation négative','Nom, clan, âge connu, fonction et nature de votre relation.',{area:true}),F('gmPredation','Prédation, si déjà apprise','Pour un débutant inexpérimenté, laissez ce choix en attente.',{area:true}),F('gmHistoire','Passé vampirique et conséquences','Secte, événements, soutiens, difficultés, liens à conserver.',{area:true}),F('gmCoterie','Coterie à définir collectivement','But, type de groupe, domaine et historiques partagés.',{area:true}),F('gmSaga','Saga éventuelle','Uniquement si adaptée à 1940 et autorisée ; préciser les liens et PNJ concernés.',{area:true}),F('gmPrincipes','Principes communs de la chronique','À définir ensemble ; distincts des Convictions personnelles.',{area:true})];
const references=[
 ['Concept, identité et coopération','p. 136, 141, 144','Formuler un concept, choisir un nom et un passé compatible avec la chronique. Construire un personnage capable de coopérer. Âge, culture et origine sont à discuter avec le conteur.'],
 ['Schéma des relations','p. 142–144, 147, 150–151','Inclure les PJ, les Attaches, le sire et les PNJ issus des avantages/handicaps. Identifier les personnes concernées et la nature des liens importants. Au départ, proposer un lien positif vers un PJ et une tension vers un autre. Ces liens peuvent être précisés pendant la création. Le schéma comprend aussi les lieux et intérêts pertinents. Le présent formulaire propose une liste simplifiée ; les nuances peuvent se préciser en jeu.'],
 ['Profession, événements et loisirs','p. 144–147','La méthode détaillée attribue deux compétences professionnelles à 3, deux à 2 et une spécialité professionnelle. Deux événements donnent respectivement une compétence à 3 et une à 2 ; trois loisirs donnent trois compétences à 1. Ensuite : une autre compétence à 4 (spécialiste), ou deux à 2 et quatre à 1 (généraliste). Les compétences et les scores seront répartis dans la page suivante. Ne pas additionner cette méthode aux distributions rapides.'],
 ['Spécialités et méthode rapide','p. 136, 145, 147','Une spécialité gratuite en Artisanat, Représentation, Érudition et Sciences dès lors que la compétence est possédée. La spécialité professionnelle peut être déplacée vers la compétence à 4 de la méthode détaillée. La méthode rapide propose touche-à-tout, équilibré ou spécialiste, plus une spécialité supplémentaire ; c’est une alternative, pas un bonus cumulé.'],
 ['Convictions et Attaches','p. 137, 146–147, 172–173','Choisir une à trois Convictions validées par le conteur, et autant d’Attaches humaines vivantes, chacune liée à une Conviction. Une Attache peut être admirée à distance et ne pas partager les convictions du personnage. Ce lien protège l’Humanité ; les conséquences de sa perte sont détaillées p. 239–240. Les Principes de chronique sont fixés par le groupe et s’appliquent à tous, même à un PJ qui n’y adhère pas.'],
 ['Ambition et Désir','p. 148–149, 173–175','L’Ambition vise un résultat concret et théoriquement réalisable ; elle peut changer après l’Étreinte ou une fois accomplie. Y travailler activement permet de récupérer 1 dégât de Volonté aggravé en fin de séance. Le Désir est un objectif à court terme, renouvelable en début de séance et relié au monde extérieur ; progresser décisivement vers lui ou le réaliser récupère immédiatement 1 dégât de Volonté superficiel, une fois par séance.'],
 ['Étreinte et identité nocturne','p. 143–144, 148–149','Décrire le sire, les circonstances et la relation. Déterminer le nom utilisé, le statut officiel, l’éventuel Masque, l’activité nocturne et le refuge. Pour une introduction de novices, l’Étreinte peut être jouée en prélude et ces choix complétés ensuite. Les deux relations vampiriques locales ne sont pas attendues d’un infant tout juste étreint.'],
 ['Prédation','p. 149, 175–178','Le style de prédation traduit une méthode de chasse apprise et accorde des traits mécaniques. Le livre demande de ne pas en choisir pour les inexpérimentés, notamment les Sangs Clairs et la plupart des novices. Pour cette introduction, le choix reste différé.'],
 ['Avantages et handicaps','p. 136, 149–151, 179–194','Budget ordinaire : 7 points d’avantages et au moins 2 points de handicaps, en plus des effets éventuels du style de prédation. Les avantages achetés doivent rester utilisables après l’Étreinte. Un proche ou un appartement décrit dans le récit ne vaut pas automatiquement un historique chiffré. Les atouts personnels, langues, dépendances et autres handicaps seront sélectionnés dans l’étape mécanique. Le conteur peut imposer/interdire certains choix et ajuster le budget dans les cas prévus.'],
 ['Les douze Historiques du livre','p. 153, 184–194','Alliés : aide de mortels ; Contacts : informations ; Influence : pouvoir dans la société mortelle ; Masque : identité de couverture ; Mawla : soutien vampirique ; Refuge : abri diurne ; Renommée : célébrité ; Ressources : revenus et biens ; Saga : lien à l’histoire du monde ; Servants : assistants loyaux ; Statut : place dans une société vampirique ; Troupeau : accès régulier à des calices. Il faut expliquer leur origine et ce qu’ils représentent. Les Ennemis, dettes et secrets peuvent préparer des handicaps, sans attribution automatique.'],
 ['Sagas et coterie','p. 151, 193, 195–197, 382 et suivantes','Une Saga est facultative et soumise au conteur ; chaque niveau s’achète séparément. Choisir seulement parmi celles du livre de base compatibles avec la date de campagne. La coterie se crée collectivement : 1 point de coterie par joueur (le conteur peut en donner 2 à un petit groupe), plus les avantages individuels volontairement mis en commun, pour le Domaine et les historiques partagés. Ces points sont distincts du récit personnel.'],
 ['Apparence, équipement, singularités','p. 154','Décrire l’apparence en cohérence avec les traits, le train de vie et les atouts. L’équipement raisonnablement accessible dépend des Ressources et éventuellement des Contacts ; l’inventaire détaillé est facultatif. Quelques habitudes ou particularités donnent de la couleur au personnage.'],
 ['Âge vampirique et cas particuliers','p. 137, 139–140, 149–151, 182–183','L’âge vampirique, la génération et les ajustements associés relèvent du choix de chronique. Les bornes calendaires du livre sont écrites pour son époque contemporaine : ne pas les appliquer littéralement à une chronique située en 1940. Un infant n’est pas nécessairement un Sang Clair. Un Sang Clair choisit un à trois atouts spécifiques et autant de handicaps spécifiques, distincts des avantages ordinaires, et ne peut acheter certains historiques initiaux (Mawla, Servants, Statut, atouts de Lien de sang). Les Caitiffs ne peuvent pas acheter de Statut à la création et commencent avec Suspect. Ces vérifications viendront dans la création mécanique.']
];
const help={
 concept:['L’idée de concept du personnage','Décrivez la personne assez précisément pour imaginer ses réactions : quelques traits de personnalité, sa situation et ce qui l’entraîne dans les ennuis ou l’aventure.','Quelques mots peuvent suffire : infirmière obstinée, boxeur endetté, secrétaire débrouillarde, escroc élégant ou héritière en rupture. Donnez-lui une raison de s’impliquer dans l’histoire.','Un métier peut vous aider à démarrer, mais cette idée reste libre et peut se préciser pendant les autres étapes. Le personnage commence son histoire à Chicago, en octobre 1940.'],
 vie:['La vie humaine','Reliez le métier à une expérience concrète : qui vous a formé ? Dans quel milieu travaillez-vous ? Qui dépend de votre revenu ? Un personnage sans emploi peut avoir des années de pratique dans un domaine.','Vos origines et vos appartenances donnent du contexte. Elles ne dictent ni vos opinions ni votre personnalité. Précisez ce qui compte pour ce personnage en particulier.','Les choix de métier servent de repères ; écrivez librement l’activité exacte. Vous choisirez les compétences ensuite.'],
 vecu:['Ce que l’expérience vous a appris','Le parcours détaillé s’appuie sur un métier, deux événements et trois loisirs. Les événements peuvent être heureux, malheureux, personnels ou publics, locaux ou internationaux : un mariage, l’ouverture d’une boutique, une grève, une catastrophe ou une guerre peuvent transformer une vie.','Pour chaque événement, notez ce que vous avez appris à faire. Cela aidera à choisir vos compétences. Une cicatrice émotionnelle seule ne précise pas encore un savoir-faire.','Les trois loisirs peuvent être modestes : lectures du soir, jardinage, musique, sport de quartier, bricolage. Dites où, avec qui et comment vous les pratiquez. Ils n’attribuent encore aucun score.'],
 autrePasse:['Autre fait important de votre passé','Ajoutez, si vous le souhaitez, un épisode qui compte encore dans votre vie et que les deux événements précédents ne couvrent pas, par exemple avoir quitté votre ville natale après avoir dénoncé votre employeur.'],
 convictions:['Convictions et Attaches','Une Conviction est une règle personnelle forte qui peut vous obliger à faire un choix difficile, comme « Je n’abandonne jamais quelqu’un qui dépend de moi ». Une formulation précise aide à comprendre comment vous agirez.','L’Attache est une personne humaine vivante qui incarne cette règle à vos yeux : par exemple Ruth, l’ancienne voisine qui vous a hébergé lorsque vous n’aviez plus rien. Elle vous rappelle ce que signifie pouvoir compter sur quelqu’un.','Créez une à trois paires. Pour chaque règle, nommez une personne et expliquez le lien entre cette personne et la valeur choisie. Une seule paire complète suffit pour commencer.','L’Attache peut être un proche, une personne admirée à distance ou quelqu’un avec qui vous êtes en désaccord. Elle peut représenter votre Conviction sans partager vos idées. Un défunt, un animal ou un lieu ne peut pas tenir ce rôle. Le conteur vérifie avec vous que les paires conviennent à la chronique.'],
 motivation:['L’Ambition et le Désir','L’Ambition est un objectif de longue haleine avec une réussite identifiable. « Réussir » est vague ; « devenir propriétaire du journal où je travaille » donne un cap. L’objectif peut être très difficile, tant qu’il est théoriquement possible.','Le Désir est une intention à court terme tournée vers le monde extérieur. « Me sentir respecté » reste abstrait ; « obtenir des excuses publiques du contremaître » vous pousse à agir.','Le Désir peut changer au début d’une séance. L’Ambition évolue si l’histoire bouleverse les priorités du personnage. Les peurs et contradictions proposées ici sont des aides facultatives.'],
 historiques:['Des éléments de vie aux Historiques','Les Historiques représentent des appuis extérieurs : argent, logement, réseau, réputation ou influence. Expliquez d’où ils viennent et ce qu’ils vous permettent réellement de faire.','Une personne qui vous donne des informations peut préparer un Contact ; une personne prête à vous aider peut préparer un Allié. Une Attache représente une valeur et n’est pas automatiquement l’un ou l’autre.','Décrire une richesse, une arme, un ami puissant ou un logement n’accorde pas de points. Le conteur et vous choisirez ensuite les avantages et les handicaps correspondant au récit et au budget de création.','Les intitulés de train de vie servent uniquement à décrire votre situation. Ils ne correspondent pas encore à des niveaux de Ressources.'],
 relations:['Un réseau de relations','Nommez les personnes importantes et leur fonction. Si elles peuvent vous aider, donnez un exemple concret : garder vos outils, vous prêter une chambre ou vous transmettre un renseignement.','Une identité, un âge approximatif, une fonction, la nature du lien et quelques traits physiques suffisent. Choisissez « Autre » pour décrire librement une relation qui ne correspond pas aux catégories.','Quand les autres personnages sont connus, prévoyez un lien positif avec l’un et une tension avec un autre. Cette tension doit rester compatible avec la coopération. À deux joueurs ou si vous commencez sans vous connaître, réglez ce point ensemble avec le conteur.','Les informations restent modifiables. Si le groupe n’est pas encore défini, cochez le report proposé : aucune rencontre préalable ne sera inventée.'],
 portrait:['Apparence et attitude','Quelques détails cohérents valent mieux qu’un inventaire interminable : mains couvertes de coupures, manteau trop grand, diction très soignée, montre offerte par une mère.','Esquissez une tenue et une allure qui vous plaisent. Vous pourrez les ajuster après avoir précisé le métier et les moyens du personnage. Les possessions et l’objet auquel vous tenez se décrivent avec les moyens matériels.','Le livre présente l’apparence, le détail de l’équipement et les singularités comme des éléments à développer librement. Vous pouvez en compléter une partie après le début du jeu.']
};
const flatFields=sections.flatMap(s=>s.fields||[]).concat(groupFields,gmFields);
const emptyState=()=>({schemaVersion:1,fields:{},convictions:[{vivant:false}],relations:[],groupDeferred:true,validatedAt:null,illustration:emptyIllustrationPrompt(),dossierPrompt:emptyDossierPrompt()});
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nonempty=v=>typeof v==='string'&&v.trim().length>0;
function validAgeOrBirthDate(value){
 const v=String(value||'').trim();
 const age=v.match(/^(\d{1,3})(?:\s*ans?)?$/i);
 if(age)return Number(age[1])>=1&&Number(age[1])<=150;
 const fr=v.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/),iso=v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
 if(!fr&&!iso)return false;
 const [year,month,day]=fr?[Number(fr[3]),Number(fr[2]),Number(fr[1])]:[Number(iso[1]),Number(iso[2]),Number(iso[3])];
 const date=new Date(Date.UTC(year,month-1,day));
 return year>=1790&&date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day&&date.getTime()<=Date.UTC(1940,9,31);
}
function ageOrBirthDateSummary(value){
 const v=String(value||'').trim();if(!v)return '';
 return /^\d{1,3}(?:\s*ans?)?$/i.test(v)?v.replace(/\s*ans?$/i,'')+' ans':'Naissance : '+v;
}
function relationshipText(row,key){return row[key]==='Autre'?(row[key+'Autre']||'Autre'):row[key];}
function normalizeRelationship(row,key,textValue){
 const value=textValue(row[key]);
 if(!value||value==='Choisir…')return {[key]:'',[key+'Autre']:textValue(row[key+'Autre'])};
 if(relationshipOptions.includes(value)&&value!=='Choisir…')return {[key]:value,[key+'Autre']:textValue(row[key+'Autre'])};
 return {[key]:value?'Autre':'',[key+'Autre']:textValue(row[key+'Autre'])||(value==='Autre relation'?'':value)};
}
function normalize(data){
 if(!data||data.schemaVersion!==1||typeof data.fields!=='object'||Array.isArray(data.fields)||!Array.isArray(data.convictions)||data.convictions.length<1||data.convictions.length>3||!Array.isArray(data.relations)||data.relations.length>30)throw new Error('Format du dossier non reconnu.');
 const textValue=v=>typeof v==='string'?v.slice(0,20000):'';
 const n=emptyState();flatFields.forEach(f=>{n.fields[f.id]=textValue(data.fields[f.id]);});
 n.fields.influence=[n.fields.influence,textValue(data.fields.renommee)].filter((v,i,a)=>nonempty(v)&&a.indexOf(v)===i).join('\n\n');
 const genre=n.fields.genre.trim().toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 n.fields.genre=['masculin','homme','m','male'].includes(genre)?'Masculin':['feminin','femme','f','female'].includes(genre)?'Féminin':'';
 n.convictions=data.convictions.map(row=>{if(!row||typeof row!=='object')throw new Error('Conviction invalide.');const r={vivant:row.vivant===true};convictionFields.forEach(f=>r[f.id]=textValue(row[f.id]));Object.assign(r,normalizeRelationship(row,'lien',textValue));if(!r.fonction&&row.lieu)r.fonction='Où la trouver : '+textValue(row.lieu);return r;});
 n.relations=data.relations.map(row=>{if(!row||typeof row!=='object')throw new Error('Relation invalide.');const r={};relationFields.forEach(f=>r[f.id]=textValue(row[f.id]));Object.assign(r,normalizeRelationship(row,'role',textValue));if(nonempty(row.rencontre)){r.role='Autre';r.roleAutre=[textValue(row.role),textValue(row.rencontre)].filter(nonempty).join(' — ');}return r;});
 n.illustration=normalizeIllustrationPrompt(data.illustration);n.dossierPrompt=normalizeDossierPrompt(data.dossierPrompt);n.groupDeferred=data.groupDeferred!==false;n.validatedAt=typeof data.validatedAt==='string'?data.validatedAt:null;return n;
}
let state=emptyState(),storageAvailable=true,hadInvalidStorage=false;
try{const stored=localStorage.getItem(STORAGE_KEY);if(stored)state=normalize(JSON.parse(stored));}catch{storageAvailable=false;hadInvalidStorage=true;}
function inputField(f,value='',prefix='',meta=''){
 const id=prefix+f.id;const attrs=`id="${esc(id)}" ${meta} ${meta?'':`data-field="${esc(f.id)}"`} maxlength="20000"`;
 let control;
 if(f.type==='select'){const options=[...f.options];if(value&&!options.includes(value)&&!f.strictOptions)options.push(value);control=`<select ${attrs}>${options.map(x=>`<option value="${esc(x)}" ${x===value?'selected':''}>${esc(x)}</option>`).join('')}</select>`;}
 else if(f.area)control=`<textarea ${attrs} rows="${f.rows||3}" placeholder="${esc(f.placeholder)}">${esc(value)}</textarea>`;
 else control=`<input ${attrs} type="${f.type||'text'}" ${f.min?`min="${f.min}"`:''} value="${esc(value)}" placeholder="${esc(f.placeholder)}">`;
 const label=`<label for="${esc(id)}">${esc(f.label)}${f.optional?'<small>Facultatif</small>':''}</label>`;
 const labelWithHelp=f.help?`<div class="field-label">${label}<button type="button" class="help field-help" data-help="${esc(f.help)}" aria-label="Aide : ${esc(f.label)}" title="${esc(help[f.help]?.[1]||'En savoir plus')}">i</button></div>`:label;
 return `<div class="field ${f.full||f.area?'full':''}">${labelWithHelp}${control}${f.hint?`<p class="hint">${esc(f.hint)}</p>`:''}${f.example?`<p class="field-example"><strong>Exemple</strong> ${esc(f.example)}</p>`:''}</div>`;
}
// Older saves may contain an unfinished phrase starter; keep the existing validation.
function hasCompletedStarter(id,value){
 const starters={evenement1:['Tout a changé lorsque…','Ma plus grande réussite a été…','Un jour, j’ai dû choisir entre…'],evenement2:['Je me souviens encore du jour où…','Une rencontre a bouleversé ma vie quand…','J’ai pris un risque en…'],lecon1:['Depuis cet épisode, je sais…','J’ai appris à…'],lecon2:['Cette expérience m’a appris à…','Depuis, je reconnais facilement…'],ambition:['Je veux parvenir à…','Un jour, je compte…'],desir:['Dans les prochains jours, je veux…','Ma priorité immédiate est de…']};
 return nonempty(value)&&!(starters[id]||[]).some(starter=>starter.replace(/…/g,'').trim()===value.trim());
}
function relationshipField(f,row,prefix,kind,index){
 const markup=inputField(f,row[f.id],prefix,`data-kind="${kind}" data-index="${index}" data-key="${f.id}"`);
 return f.conditional?markup.replace('class="field ',`id="${prefix+f.id}-field" ${row[f.conditional]==='Autre'?'':'hidden'} class="field `):markup;
}
function syncRelationshipOther(kind,index,key){
 if(!['lien','role'].includes(key))return;
 const prefix=kind==='convictions'?`c${index}-`:`r${index}-`;
 const wrapper=document.getElementById(prefix+key+'Autre-field');if(!wrapper)return;
 const isOther=state[kind][index][key]==='Autre';wrapper.hidden=!isOther;
}
function renderConvictionPanels(row,index){
 const fields=ids=>ids.map(id=>convictionFields.find(f=>f.id===id)).map(f=>relationshipField(f,row,`c${index}-`,'convictions',index)).join('');
 return `<div class="pair-part"><div class="pair-part-heading"><h4>Votre Conviction</h4><span>Une règle qui compte pour vous</span></div><div class="fields">${fields(['principe','origine'])}</div></div><div class="pair-part"><div class="pair-part-heading"><h4>Votre Attache</h4><span>La personne qui représente cette valeur à vos yeux</span></div><div class="fields">${fields(['nom','age','fonction','lien','lienAutre','description'])}</div></div><div class="pair-part"><div class="pair-part-heading"><h4>Le lien entre cette personne et votre Conviction</h4></div><p class="hint">Expliquez en quoi cette personne vous rappelle la règle que vous venez d’écrire. Elle peut l’incarner sans partager vos idées.</p><div class="fields">${fields(['incarne'])}</div></div><div class="checkfield"><input type="checkbox" id="c${index}-vivant" data-kind="convictions" data-index="${index}" data-key="vivant" ${row.vivant?'checked':''}><label for="c${index}-vivant">Cette Attache est une personne humaine actuellement en vie.</label></div>`;
}
function renderConvictions(){return `<div class="rulebox"><strong>Une valeur, une personne, un lien.</strong><p>Votre Conviction guide vos choix difficiles. Votre Attache est une personne humaine vivante qui représente cette valeur à vos yeux, même si elle ne partage pas vos idées.</p><p>Commencez par la règle ou par la personne. Écrivez librement votre Conviction, votre Attache et ce qui les relie.</p><p>Une paire suffit pour commencer. Vous pouvez en créer jusqu’à trois, à discuter avec le conteur.</p></div><div id="conviction-cards">${state.convictions.map((row,i)=>`<section class="repeat-card"><div class="card-top"><h3>Conviction & Attache ${i+1}</h3>${state.convictions.length>1?`<button type="button" class="remove" data-remove-conviction="${i}" aria-label="Retirer la paire ${i+1}">Retirer</button>`:''}</div>${renderConvictionPanels(row,i)}</section>`).join('')}</div><button type="button" class="add" id="add-conviction" ${state.convictions.length>=3?'disabled':''}>+ Ajouter une autre paire (${state.convictions.length}/3)</button>`;}
function renderRelations(){return `<h3 class="subheading">Vos autres relations <span class="optional">Facultatif</span></h3><p class="hint">Les Attaches sont déjà prises en compte. Ajoutez les autres proches, soutiens, sources d’information ou adversaires.</p><div id="relation-cards">${state.relations.map((row,i)=>`<section class="repeat-card"><div class="card-top"><h3>Relation ${i+1}</h3><button type="button" class="remove" data-remove-relation="${i}" aria-label="Retirer la relation ${i+1}">Retirer</button></div><div class="fields">${relationFields.map(f=>relationshipField(f,row,`r${i}-`,'relations',i)).join('')}</div></section>`).join('')}</div><button type="button" class="add" id="add-relation" ${state.relations.length>=30?'disabled':''}>+ Ajouter une personne</button><h3 class="subheading">Avec les autres personnages joueurs</h3><p class="hint">Ces liens sont à convenir avec les personnes concernées. Une tension reste compatible avec une aventure commune.</p><div class="checkfield"><input type="checkbox" id="groupDeferred" ${state.groupDeferred?'checked':''}><label for="groupDeferred">Le groupe n’est pas encore fixé : je préciserai ces liens avec le conteur.</label></div><div class="fields" style="margin-top:20px">${groupFields.map(f=>inputField(f,state.fields[f.id])).join('')}</div>`;}
function renderSections(){
 const finalActions=document.getElementById('dossier-actions');
 finalActions.remove();
 document.getElementById('chapters').innerHTML=sections.map((s,i)=>`<section class="chapter" id="${s.id}" hidden aria-labelledby="title-${s.id}"><div class="chapter-art" aria-hidden="true" style="--chapter-image:url('assets/vignettes/${s.id}.webp')"></div><div class="chapter-head"><span class="chapter-num">${String(i+1).padStart(2,'0')}</span><div><h2 id="title-${s.id}" tabindex="-1">${s.title}</h2><p>${s.intro}</p></div><button type="button" class="help" data-help="${s.help}" aria-label="Comprendre : ${esc(s.title)}">i</button></div>${s.special==='convictions'?renderConvictions():s.special==='relations'?renderRelations():`<div class="fields">${s.fields.map(f=>inputField(f,state.fields[f.id])).join('')}</div>`}${s.id==='portrait'?'<p class="section-note">Ces détails restent libres. Vous pourrez les ajuster en cohérence avec les aptitudes et les moyens choisis ensuite.</p>':''}${renderStepNavigation(i)}</section>`).join('');
 document.getElementById('gm-fields').innerHTML=gmFields.map(f=>inputField(f,state.fields[f.id])).join('');
 const lastChapter=document.getElementById(sections.at(-1).id);lastChapter.insertBefore(finalActions,lastChapter.querySelector('.step-navigation'));
 showScreen(activeScreen);updateProgress();syncIllustrationPrompt();syncDossierPrompt();
}
document.getElementById('chapter-nav').innerHTML=`<a href="#accueil" data-screen="accueil" class="home-nav"><span aria-hidden="true">⌂</span>Accueil & repères</a><div class="chapter-links">${sections.map((s,i)=>`<a href="#${s.id}" data-chapter="${s.id}" data-screen="${s.id}"><span>${String(i+1).padStart(2,'0')}</span>${s.nav}</a>`).join('')}</div><div class="appendix-nav"><span class="appendix-label">POUR ALLER PLUS LOIN</span><a href="#donner-un-visage" data-screen="donner-un-visage"><span aria-hidden="true">◇</span><span class="appendix-name">Donner un visage<small>Facultatif</small></span></a><a href="#dossier-illustre" data-screen="dossier-illustre"><span aria-hidden="true">↗</span><span class="appendix-name">Dossier illustré<small>Prompt et portrait</small></span></a></div>`;
document.getElementById('rules-reference').innerHTML=references.map(([title,pages,content])=>`<div class="reference"><strong>${title}</strong><span class="pages">${pages}</span><p>${content}</p></div>`).join('');
function assess(s){
 const f=s.fields;const missing=[];const add=(id,text)=>missing.push({id,text});
 if(!nonempty(f.nom))add('identite','Donner un nom au personnage.');
 if(!nonempty(f.concept))add('identite','Décrire l’idée de concept du personnage.');
 if(!validAgeOrBirthDate(f.age))add('identite','Préciser un âge en octobre 1940 ou une date de naissance valide (jour/mois/année).');
 if(!nonempty(f.origines))add('quotidien','Situer les origines et le milieu du personnage.');
 if(!nonempty(f.profession))add('quotidien','Préciser une activité ou une situation de vie.');
 if(!nonempty(f.savoirfaire))add('quotidien','Décrire les savoir-faire liés à l’activité.');
 if(!['evenement1','lecon1','evenement2','lecon2'].every(id=>hasCompletedStarter(id,f[id])))add('vecu','Décrire deux événements et ce qu’ils vous ont appris.');
 if(![f.loisir1,f.loisir2,f.loisir3].every(nonempty))add('vecu','Nommer trois loisirs pour préparer les compétences.');
 s.convictions.forEach((c,i)=>{if(!([c.principe,c.nom,relationshipText(c,'lien'),c.incarne].every(nonempty)&&c.lien!=='Choisir…'&&(c.lien!=='Autre'||nonempty(c.lienAutre)))||!c.vivant)add('valeurs',`Compléter la paire ${i+1} : Conviction, Attache, lien, signification et humain vivant.`);});
 if(!hasCompletedStarter('ambition',f.ambition))add('motivations','Fixer une Ambition concrète.');
 if(!hasCompletedStarter('desir',f.desir))add('motivations','Proposer un premier Désir à court terme.');
 if(!nonempty(f.logement)||!nonempty(f.revenus))add('moyens','Décrire votre logement et l’origine de vos moyens, même précaires.');
 if(!s.groupDeferred&&![f.groupePourquoi,f.pjPositif,f.pjNegatif].every(nonempty))add('relations','Préciser le lien positif, la tension et la raison de coopérer, ou reporter ce choix au groupe.');
 s.relations.forEach((r,i)=>{if(!nonempty(r.nom))add('relations',`Nommer la relation ${i+1}, ou retirer cette fiche vide.`);if(r.role==='Autre'&&!nonempty(r.roleAutre))add('relations',`Préciser la nature de la relation ${i+1} dans « Autre ».`);});
 const complete=sections.map(x=>!missing.some(m=>m.id===x.id)&&(x.id!=='portrait'||[f.silhouette,f.tenue,f.singularite].some(nonempty))&&(x.id!=='relations'||s.relations.some(r=>nonempty(r.nom))||groupFields.some(g=>nonempty(f[g.id]))));
 return {missing,complete};
}
function updateProgress(){const {complete}=assess(state);const count=complete.filter(Boolean).length;document.getElementById('progress').value=count;document.getElementById('progress-label').textContent=`${count} / 8`;sections.forEach((s,i)=>document.querySelector(`[data-chapter="${s.id}"]`).classList.toggle('done',complete[i]));}
const screenIds=['accueil',...sections.map(s=>s.id),'donner-un-visage','dossier-illustre'];
const screenFromHash=()=>{const key=window.location.hash.slice(1);return screenIds.includes(key)?key:'accueil';};
let activeScreen=screenFromHash();
function renderStepNavigation(index){
 const prev=index===0?'accueil':sections[index-1].id;
 return `<div class="step-navigation" aria-label="Progression entre les rubriques"><a class="outline" href="#${prev}">← ${index===0?'Accueil & repères':'Précédent'}</a><span class="step-count">${String(index+1).padStart(2,'0')} / 08</span>${index<sections.length-1?`<a class="button" href="#${sections[index+1].id}">Suivant <span aria-hidden="true">→</span></a>`:''}</div>`;
}
function showScreen(key,{focus=false,scroll=false}={}){
 activeScreen=screenIds.includes(key)?key:'accueil';
 document.getElementById('accueil').hidden=activeScreen!=='accueil';
 const isChapter=sections.some(s=>s.id===activeScreen);
 document.getElementById('dossier').hidden=!isChapter;
 sections.forEach(s=>{document.getElementById(s.id).hidden=s.id!==activeScreen;});
 document.getElementById('donner-un-visage').hidden=activeScreen!=='donner-un-visage';
 document.getElementById('dossier-illustre').hidden=activeScreen!=='dossier-illustre';
 document.querySelectorAll('[data-screen]').forEach(a=>{const selected=a.dataset.screen===activeScreen;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const title=activeScreen==='accueil'?'Accueil & repères':activeScreen==='donner-un-visage'?'Donner un visage':activeScreen==='dossier-illustre'?'Dossier illustré':sections.find(s=>s.id===activeScreen).nav;
 document.title=title+' — Archives personnelles · Octobre 1940';
 document.getElementById('screen-status').textContent=title;
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
 if(focus){const heading=activeScreen==='accueil'?document.querySelector('#accueil h1'):activeScreen==='donner-un-visage'?document.getElementById('illustration-prompt-title'):activeScreen==='dossier-illustre'?document.getElementById('dossier-prompt-title'):document.getElementById('title-'+activeScreen);heading?.focus({preventScroll:true});}
}
function navigateToScreen(key){
 if(!screenIds.includes(key))return;
 if(window.location.hash!=='#'+key)window.history.pushState(null,'','#'+key);
 showScreen(key,{focus:true,scroll:true});
}
window.addEventListener('hashchange',()=>showScreen(screenFromHash(),{focus:true,scroll:true}));
document.addEventListener('click',e=>{
 const link=e.target.closest('a[href^="#"]');
 if(!link||e.defaultPrevented||e.button>0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const key=link.getAttribute('href').slice(1);
 if(key==='debut'||screenIds.includes(key)){e.preventDefault();navigateToScreen(key==='debut'?'accueil':key);}
});
let toastTimer;
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),4500);}
function save(options={}){if(options.background!==false)state.validatedAt=null;syncIllustrationPrompt();syncDossierPrompt();try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));storageAvailable=true;document.getElementById('save-status').textContent='Enregistré dans ce navigateur';}catch{storageAvailable=false;document.getElementById('save-status').textContent='Sauvegarde locale indisponible — exportez le dossier';}updateProgress();}
function capture(e){const t=e.target;if(t.dataset.field){state.fields[t.dataset.field]=t.value;save();}else if(t.dataset.kind){state[t.dataset.kind][Number(t.dataset.index)][t.dataset.key]=t.type==='checkbox'?t.checked:t.value;syncRelationshipOther(t.dataset.kind,Number(t.dataset.index),t.dataset.key);save();}else if(t.id==='groupDeferred'){state.groupDeferred=t.checked;save();}}
document.addEventListener('input',capture);document.addEventListener('change',e=>{if(e.target.type==='checkbox'||e.target.tagName==='SELECT')capture(e);});
document.getElementById('dossier').addEventListener('submit',e=>e.preventDefault());
function openHelp(key){const h=help[key];if(!h)return;document.getElementById('help-title').textContent=h[0];document.getElementById('help-body').innerHTML=h.slice(1).map(p=>`<p>${esc(p)}</p>`).join('');document.getElementById('help-dialog').showModal();}
document.addEventListener('click',e=>{
 const btn=e.target.closest('button');if(!btn)return;
 if(btn.classList.contains('close')){btn.closest('dialog').close();return;}
 if(btn.dataset.help){openHelp(btn.dataset.help);return;}
 if(btn.hasAttribute('data-open-review')){openReview();return;}
 if(btn.id==='add-conviction'&&state.convictions.length<3){state.convictions.push({vivant:false});save();renderSections();document.getElementById(`c${state.convictions.length-1}-principe`).focus();}
 if(btn.dataset.removeConviction!==undefined&&state.convictions.length>1){const i=Number(btn.dataset.removeConviction);const row=state.convictions[i];if(Object.values(row).some(v=>typeof v==='string'&&nonempty(v))&&!window.confirm('Retirer cette Conviction et son Attache ?'))return;state.convictions.splice(i,1);save();renderSections();document.getElementById('add-conviction').focus();}
 if(btn.id==='add-relation'&&state.relations.length<30){state.relations.push({role:relationFields.find(f=>f.id==='role').options[0]});save();renderSections();document.getElementById(`r${state.relations.length-1}-nom`).focus();}
 if(btn.dataset.removeRelation!==undefined){const i=Number(btn.dataset.removeRelation);if(nonempty(state.relations[i].nom)&&!window.confirm('Retirer cette relation du dossier ?'))return;state.relations.splice(i,1);save();renderSections();document.getElementById('add-relation').focus();}
 if(btn.dataset.jump){document.getElementById('review-dialog').close();navigateToScreen(btn.dataset.jump);document.querySelector(`#${btn.dataset.jump} input, #${btn.dataset.jump} textarea`)?.focus({preventScroll:true});}
});
function summaryEntries(){
 const groups=sections.map(s=>({id:s.id,title:s.title,entries:(s.fields||[]).map(f=>[f.label,state.fields[f.id]])}));
 const convictions=groups.find(g=>g.id==='valeurs'),relations=groups.find(g=>g.id==='relations');
 convictions.entries=state.convictions.flatMap((c,i)=>[[`Conviction ${i+1}`,c.principe],['Origine de cette Conviction',c.origine],[`Attache ${i+1}`,c.nom],['Âge de l’Attache',c.age],['Fonction ou occupation',c.fonction],['Nature de votre relation',relationshipText(c,'lien')],['Description physique de l’Attache',c.description],['Lien entre l’Attache et la Conviction',c.incarne]]);
 relations.entries=state.relations.flatMap((r,i)=>[[`Relation ${i+1}`,r.nom],['Âge',r.age],['Fonction ou occupation',r.fonction],['Nature de votre relation',relationshipText(r,'role')],['Description physique et attitude',r.description],['Situations et aide concrète',r.appui]]);
 relations.entries.push(...groupFields.map(f=>[f.label,state.fields[f.id]]));
 if(state.groupDeferred)relations.entries.push(['Liens avec le groupe','À préciser avec le conteur et les autres joueurs.']);
 return groups;
}
function openReview(){
 document.getElementById('review-name').textContent=state.fields.nom||'Votre personnage';
 const {missing}=assess(state);const v=document.getElementById('validation');v.classList.toggle('valid',!missing.length);
 v.innerHTML=missing.length?`<strong>Un brouillon à compléter</strong><p>Ces repères permettront de préparer la suite. Les détails de portrait restent facultatifs.</p><ul>${missing.map(m=>`<li><button type="button" data-jump="${m.id}">${esc(m.text)}</button></li>`).join('')}</ul><p>Vous pouvez déjà exporter ou imprimer ce brouillon.</p>`:'<strong>Les repères de la page sont renseignés.</strong><p>La cohérence des Convictions, des relations et du cadre reste à discuter avec le conteur. Aucun point n’a encore été attribué.</p>';
 document.getElementById('confirm-background').disabled=missing.length>0;
 document.getElementById('summary').innerHTML=summaryEntries().map(g=>`<h3>${esc(g.title)}</h3>${g.entries.filter(([,value])=>nonempty(value)).map(([label,value])=>`<div><p class="entry-label">${esc(label)}</p><p class="entry-value">${esc(value)}</p></div>`).join('')||'<p class="empty">À préciser.</p>'}`).join('');
 document.getElementById('review-dialog').showModal();
}
document.getElementById('review').onclick=openReview;document.getElementById('review-top').onclick=openReview;
document.getElementById('gm-open').onclick=()=>document.getElementById('gm-dialog').showModal();
document.getElementById('confirm-background').onclick=()=>{if(assess(state).missing.length)return;state.validatedAt=new Date().toISOString();try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));document.getElementById('save-status').textContent='Background validé · enregistré ici';}catch{document.getElementById('save-status').textContent='Background validé · pensez à exporter';}toast('Version validée pour la prochaine étape. Vous pouvez toujours la modifier.');document.getElementById('review-dialog').close();};
function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const filename=()=>String(state.fields.nom||'personnage').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,70)||'personnage';
document.getElementById('export-json').onclick=()=>{download(JSON.stringify(state,null,2),`dossier-${filename()}.json`,'application/json');toast('Sauvegarde téléchargée. Elle inclut les notes du conteur si elles sont remplies.');};
document.getElementById('export-json-end').onclick=()=>document.getElementById('export-json').click();
document.getElementById('reset-dossier').onclick=()=>{
 if(!window.confirm('Effacer ce dossier et sa sauvegarde dans ce navigateur ? Toutes les réponses, les notes, les prompts et le portrait importé seront effacés. Cette action est irréversible.'))return;
 try{localStorage.removeItem(STORAGE_KEY);}catch{toast('Impossible d’effacer la sauvegarde dans ce navigateur. Le dossier a été conservé.');return;}
 state=emptyState();storageAvailable=true;hadInvalidStorage=false;
 resetDossierPromptUI();
 document.getElementById('import-file').value='';
 document.getElementById('summary').innerHTML='';
 document.getElementById('validation').innerHTML='';
 document.getElementById('validation').classList.remove('valid');
 document.getElementById('review-name').textContent='Votre personnage';
 document.getElementById('confirm-background').disabled=true;
 renderSections();navigateToScreen('identite');
 document.getElementById('save-status').textContent='Dossier vierge';
 toast('Dossier effacé. Vous pouvez commencer un nouveau personnage.');
};
function narrativeText(){const f=state.fields;let out=`DOSSIER PERSONNEL — OCTOBRE 1940\n${f.nom||'Personnage sans nom'}\n\n`;if(nonempty(f.concept))out+=`${f.concept.trim()}\n\n`;for(const g of summaryEntries()){const entries=g.entries.filter(([,v])=>nonempty(v));if(!entries.length)continue;out+=`${g.title.toUpperCase()}\n\n`;out+=entries.map(([label,value])=>`${label}\n${value.trim()}\n`).join('\n')+'\n';}return out;}
document.getElementById('export-text').onclick=()=>download(narrativeText(),`histoire-${filename()}.txt`,'text/plain;charset=utf-8');
document.getElementById('import-json').onclick=()=>document.getElementById('import-file').click();
document.getElementById('import-file').onchange=async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;if(file.size>12*1024*1024){toast('Fichier trop volumineux : limite de 12 Mo.');return;}try{const next=normalize(JSON.parse(await file.text()));const hasWork=Object.values(state.fields).some(nonempty)||state.convictions.some(c=>Object.values(c).some(v=>typeof v==='string'&&nonempty(v)));if(hasWork&&!window.confirm('Reprendre cette sauvegarde remplacera le dossier actuellement affiché. Continuer ?'))return;state=next;resetDossierPromptUI();save();renderSections();toast('Dossier repris.');}catch{toast('Import impossible : choisissez une sauvegarde JSON créée par cette page.');}};
renderSections();
document.getElementById('save-status').textContent=storageAvailable?(Object.values(state.fields).some(nonempty)?(state.validatedAt?'Background validé · enregistré ici':'Dossier repris dans ce navigateur'):'Dossier vierge'):'Sauvegarde locale indisponible — exportez le dossier';
if(hadInvalidStorage)toast('La sauvegarde précédente est inaccessible. Vous pouvez importer un fichier JSON.');
// Exposed for deterministic data validation without browser dependencies.
if(typeof module!=='undefined')module.exports={assess,normalize,emptyState,sections,convictionFields,relationFields,gmFields,esc};
