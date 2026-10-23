'use strict';
// Prompt sources: identity, professions, appearance, possessions and scene choices; exclude storyteller notes.
const illustrationSceneOptions={
 place:[
  ['auto','Décor sobre de Chicago','Choisir une rue de Chicago en octobre 1940, avec un arrière-plan discret qui laisse le personnage bien lisible.'],
  ['loop','Le Loop, sous le train aérien','Une rue du Loop sous les poutrelles métalliques du train aérien « L », avec des façades et des véhicules de 1940 ; les lignes de la structure donnent de la profondeur.'],
  ['river','Au bord de la Chicago River','Un quai de la Chicago River, près d’un pont métallique basculant ; eau sombre et immeubles de l’entre-deux-guerres en arrière-plan.'],
  ['michigan','Michigan Avenue et son pont','Michigan Avenue près de son pont sur la rivière, avec ses bâtiments des années 1920–1930 ; restituer son aspect en 1940.'],
  ['station','Union Station, le grand hall','Le grand hall de Chicago Union Station, ouvert en 1925 : architecture monumentale, colonnes et vaste verrière, dans son état de 1940.'],
  ['bronzeville','Bronzeville, devant un club de jazz','Une rue de Bronzeville sur le South Side, devant un club de jazz fictif de 1940 : entrée discrète, façades de brique et évocation de la vie musicale du quartier.'],
  ['office','Un bureau dans le Loop','Un bureau de Chicago en octobre 1940, avec meubles de bois, téléphone fixe, dossiers papier et machine à écrire.'],
  ['shop','Une boutique de quartier','L’intérieur ou la devanture d’une boutique de quartier à Chicago en octobre 1940, avec comptoir, vitrines et objets usuels d’une boutique de cette époque.'],
  ['hotel','Le hall d’un hôtel','Le hall d’un hôtel fictif de Chicago en octobre 1940, avec réception, boiseries, fauteuils et éclairages d’époque.'],
  ['room','Une chambre de pension','Une chambre de pension modeste à Chicago en octobre 1940 : lit simple, mobilier usé, fenêtre et quelques affaires personnelles.'],
  ['workers','Un quartier ouvrier près des abattoirs','Une rue ouvrière du secteur de New City près des Union Stock Yards, en 1940 : maisons et immeubles de brique, ateliers et ambiance industrielle.'],
  ['alley','Une ruelle de briques','Une ruelle de service à Chicago en octobre 1940, entre des façades de brique, avec portes arrière et escaliers métalliques cohérents avec l’époque.'],
  ['lake','Au bord du lac Michigan','Une promenade au bord du lac Michigan à Chicago en octobre 1940 : horizon ouvert, vent sur les vêtements et silhouette urbaine discrète au loin.'],
  ['custom','Un lieu de mon choix','Utiliser le lieu décrit dans les précisions du joueur, à Chicago en octobre 1940.']
 ],
 pose:[
  ['auto','Pose naturelle','Choisir une posture simple et naturelle, avec le visage bien visible et une silhouette lisible.'],
  ['standing','Debout, de trois quarts','Le personnage se tient debout, de trois quarts, dans une posture naturelle ; visage bien visible.'],
  ['walking','En train de marcher','Le personnage marche d’un pas naturel, saisi dans un mouvement crédible ; les vêtements accompagnent le déplacement.'],
  ['seated','Assis, posture maîtrisée','Le personnage est assis sur un siège adapté au lieu ; posture maîtrisée et mains visibles lorsque le cadrage le permet.'],
  ['leaning','Appuyé à un mur ou à une porte','Le personnage s’appuie légèrement contre un mur ou l’encadrement d’une porte ; son attitude reste crédible et détendue.'],
  ['elbow','Accoudé à un support','Le personnage est accoudé à un support cohérent avec le décor, comme un comptoir, une table ou une balustrade.'],
  ['arms','Les bras croisés','Le personnage croise les bras avec naturel ; conserver une silhouette lisible et une anatomie crédible.'],
  ['turning','Regard par-dessus l’épaule','Le personnage se retourne légèrement et regarde par-dessus l’épaule, sans torsion anatomique exagérée.'],
  ['hands','Les mains réunies devant soi','Le personnage tient ses mains réunies devant lui, dans une posture posée dont l’intention dépend de l’attitude choisie.'],
  ['object','Avec son objet personnel','Le personnage tient ou manipule un objet décrit parmi ses possessions habituelles. Si aucun objet n’est renseigné, garder un geste simple sans ajouter d’accessoire significatif.'],
  ['journal','En consultant un journal','Le personnage consulte un journal imprimé de 1940 ; le papier sert la pose et le texte reste illisible.'],
  ['custom','Une pose de mon choix','Utiliser la pose décrite dans les précisions du joueur.']
 ],
 attitude:[
  ['auto','Expression naturelle','Choisir une expression sobre et naturelle, avec un regard attentif et des traits détendus.'],
  ['calm','Calme et réserve','Expression calme, retenue et attentive ; gestes mesurés.'],
  ['confident','Assurance et aplomb','Regard direct, port de tête assuré, présence affirmée et crédible.'],
  ['charming','Sourire complice','Sourire léger et complice, regard vif ; une chaleur naturelle avec une part de mystère.'],
  ['suspicious','Méfiance et vigilance','Regard attentif aux alentours, légère tension corporelle, méfiance contenue.'],
  ['defiant','Défi et insolence','Expression de défi, menton légèrement relevé, aplomb teinté d’insolence.'],
  ['tired','Fatigue contenue','Fatigue visible mais contenue, regard encore lucide ; conserver la dignité et l’individualité du visage.'],
  ['melancholy','Mélancolie et distance','Expression mélancolique et distante, regard chargé de pensées, sans dramatisation théâtrale.'],
  ['curious','Curiosité et vivacité','Regard curieux, expression vive et posture attentive à quelque chose hors champ.'],
  ['anger','Colère maîtrisée','Colère maîtrisée dans les yeux et la tension du visage ; gestes retenus.'],
  ['dignity','Dignité discrète','Allure digne, simplicité et présence intérieure ; aucun besoin de posture héroïque.'],
  ['custom','Une attitude de mon choix','Utiliser l’attitude décrite dans les précisions du joueur.']
 ],
 framing:[
  ['full','En pied — format vertical 3:4','Personnage visible en entier, chaussures comprises, dans un format vertical 3:4 ; vêtements et accessoires lisibles.'],
  ['american','Plan américain — format vertical 3:4','Cadrage des cuisses jusqu’au-dessus de la tête, format vertical 3:4 ; privilégier le visage, la posture et les mains visibles.'],
  ['bust','Portrait en buste — format vertical 4:5','Cadrage du haut du torse jusqu’au-dessus de la tête, format vertical 4:5 ; mettre l’accent sur le visage, le regard et les matières des vêtements.'],
  ['close','Visage rapproché — format vertical 4:5','Portrait rapproché du visage et des épaules, format vertical 4:5 ; expression, texture de peau et éclairage constituent le centre de l’image.']
 ],
 light:[
  ['auto','Lumière adaptée au décor','Choisir un éclairage dramatique mais crédible pour le décor, avec une bonne lisibilité du visage.'],
  ['morning','Matin pâle','Lumière pâle du matin, contrastes doux dans l’atmosphère, détails du visage bien présents.'],
  ['day','Jour couvert','Lumière d’un jour couvert, palette froide et désaturée, ombres modelant le visage.'],
  ['dusk','Fin de journée','Lumière de fin de journée, tons ambrés discrets et ombres allongées.'],
  ['night','Nuit, éclairages de la ville','Scène nocturne éclairée par les vitrines, les lampadaires et les lumières d’époque ; le visage reste lisible.'],
  ['window','Lumière d’une fenêtre','Éclairage latéral venant d’une fenêtre, matières révélées par la lumière et ombres profondes.'],
  ['lamps','Lampes d’intérieur','Éclairage intérieur chaleureux, issu de lampes électriques de 1940 ; contraste entre lumière ambrée et ombres froides.']
 ],
 weather:[
  ['auto','Selon le lieu et la lumière','Ambiance climatique discrète et cohérente avec le décor et l’éclairage.'],
  ['dry','Temps sec','Temps sec ; matériaux et vêtements gardent leur aspect naturel.'],
  ['rain','Pluie récente','Pluie récente à l’extérieur, reflets mesurés sur le pavé et les vitrines ; à l’intérieur, cette ambiance apparaît seulement par les fenêtres.'],
  ['mist','Brume légère','Brume légère à l’extérieur, notamment vers la rivière ou le lac ; conserver les traits du personnage distincts.'],
  ['wind','Vent du lac','Vent froid perceptible dans les cheveux et les vêtements si la scène se déroule à l’extérieur.']
 ]
};
// Additional scene choices retain all previously saved option identifiers.
const expandedIllustrationScenes={
 "place":[
  ["street_corner","Un carrefour de quartier","Un carrefour fictif de Chicago en octobre 1940 : façades de brique, commerces modestes, trottoirs et circulation d’époque.","Rues et espaces extérieurs"],
  ["stoop","Le perron d’un immeuble","Le perron et les marches d’un immeuble de logements de Chicago en 1940 ; portes et ferronneries ordinaires.","Rues et espaces extérieurs"],
  ["backyard","Une cour entre les immeubles","Une cour arrière de Chicago, avec briques, escaliers de service et cordes à linge, selon l’usage en 1940.","Rues et espaces extérieurs"],
  ["rooftop","Un toit et ses réservoirs d’eau","Un toit accessible de Chicago en 1940, près d’un réservoir d’eau en bois et de cheminées ; éviter les tours construites après 1940.","Rues et espaces extérieurs"],
  ["bridge_walkway","La passerelle piétonne d’un pont","Le passage piéton d’un pont métallique de Chicago en 1940, avec sa rambarde et la rivière visible en profondeur.","Rues et espaces extérieurs"],
  ["park_path","Une allée de parc en automne","Une allée dans un parc de Chicago en octobre 1940, avec feuillage d’automne, bancs et perspectives arborées.","Rues et espaces extérieurs"],
  ["rail_platform","Un quai du train aérien","Un quai de station du train aérien de Chicago en 1940 : structure métallique, bancs et matériel ferroviaire d’époque.","Transports et passages"],
  ["rail_carriage","Un wagon de voyageurs","L’intérieur d’un wagon ferroviaire de voyageurs en service à Chicago en 1940, avec banquettes, fenêtres et détails d’époque.","Transports et passages"],
  ["station_platform","Un quai de gare grandes lignes","Un quai couvert d’une gare de Chicago en 1940, près d’une voiture de voyageurs, avec colonnes et bagages discrets.","Transports et passages"],
  ["tram_stop","Un arrêt de tramway","Un arrêt de tramway à Chicago en octobre 1940, rails dans la chaussée et véhicule d’époque en arrière-plan.","Transports et passages"],
  ["tram_interior","À bord d’un tramway","L’intérieur d’un tramway de Chicago en 1940 : sièges, poignées et fenêtres cohérents avec cette période.","Transports et passages"],
  ["car_interior","Dans une automobile de 1940","L’intérieur d’une automobile fabriquée avant ou en 1940, à Chicago : tableau de bord, volant et banquette d’époque. Le véhicule est un élément de scène et n’est pas nécessairement la propriété du personnage.","Transports et passages"],
  ["taxi_stand","Une station de taxis","Le trottoir d’une station de taxis de Chicago en 1940, avec automobiles et portière de véhicule d’époque.","Transports et passages"],
  ["diner","Le comptoir d’un petit restaurant","Un petit restaurant fictif de Chicago en 1940, avec comptoir, tabourets, cafetière et vaisselle simple.","Commerces et lieux publics"],
  ["cafe","Un café près de la fenêtre","Un café de quartier fictif de Chicago en 1940, tables en bois, vitrine et décor modeste.","Commerces et lieux publics"],
  ["bar_counter","Le comptoir d’un bar","Un bar fictif de Chicago en 1940, avec comptoir de bois, verres et éclairages d’époque ; aucune consommation d’alcool imposée au personnage.","Commerces et lieux publics"],
  ["jazz_interior","La salle d’un club de jazz","La salle d’un club de jazz fictif de Chicago en 1940, tables rapprochées et petite scène sans musicien supplémentaire visible.","Commerces et lieux publics"],
  ["dance_hall","Une salle de danse","Une salle de danse fictive de Chicago en 1940, parquet, quelques tables et scène vide ; le personnage reste seul sujet.","Commerces et lieux publics"],
  ["cinema_foyer","Le foyer d’un cinéma","Le foyer d’un cinéma fictif de Chicago en 1940, avec billetterie et éclairages d’époque ; aucune affiche lisible.","Commerces et lieux publics"],
  ["bookshop","Une librairie de quartier","Une librairie fictive de Chicago en 1940, rayonnages de livres, comptoir et devanture simple.","Commerces et lieux publics"],
  ["library","Une salle de lecture","Une salle de lecture de bibliothèque à Chicago en 1940, tables de bois, lampes et rayonnages.","Commerces et lieux publics"],
  ["barbershop","Un salon de coiffure","Un salon de coiffure fictif de Chicago en 1940, avec miroir, fauteuil et accessoires d’époque.","Commerces et lieux publics"],
  ["market_stall","Les étals d’un marché","Un marché de quartier fictif à Chicago en octobre 1940, avec étals et caisses de produits d’automne.","Commerces et lieux publics"],
  ["workbench","Un établi de réparation","Un atelier de réparation fictif de Chicago en 1940, établi et outils cohérents avec le métier renseigné ; sans métier technique précisé, rester sobre sur les équipements.","Lieux de travail"],
  ["garage","Un garage automobile","Un garage fictif de Chicago en 1940, avec fosse ou établi, outils d’époque et automobile ancienne.","Lieux de travail"],
  ["warehouse","Un entrepôt de marchandises","Un entrepôt fictif à Chicago en 1940, avec caisses, sacs, chariot manuel et grandes portes de livraison.","Lieux de travail"],
  ["loading_dock","Un quai de chargement","Un quai de livraison d’un bâtiment industriel de Chicago en 1940, camion ancien et marchandises discrètes.","Lieux de travail"],
  ["factory","Un atelier d’usine","Un atelier industriel fictif de Chicago en 1940, machines et structures cohérentes avec la période, profondeur de champ lisible.","Lieux de travail"],
  ["newsroom","Une rédaction de journal","La rédaction d’un journal fictif de Chicago en 1940 : bureaux, machines à écrire, téléphone et épreuves papier.","Lieux de travail"],
  ["tailor","Un atelier de couture","Un atelier de couture fictif à Chicago en 1940 : table de coupe, tissus et machine à coudre d’époque.","Lieux de travail"],
  ["clinic","Un cabinet ou un dispensaire","Un petit cabinet médical ou dispensaire fictif de Chicago en 1940, mobilier et matériel modestes d’époque ; aucune blessure ou maladie imposée.","Lieux de travail"],
  ["photo_studio","Un atelier de photographe","Un atelier photographique fictif de Chicago en 1940, avec appareil sur pied et éclairages de studio d’époque.","Lieux de travail"],
  ["boarding_lounge","Le salon d’une pension","Le salon commun d’une pension fictive de Chicago en 1940, fauteuils usés, petite table et objets ordinaires.","Intérieurs privés"],
  ["kitchen","Une cuisine familiale","Une cuisine modeste de Chicago en 1940 : table, évier, vaisselle et équipement domestique de cette période.","Intérieurs privés"],
  ["apartment","Un salon d’appartement","Un salon d’appartement de Chicago en 1940, avec mobilier adapté aux moyens décrits du personnage.","Intérieurs privés"],
  ["stairwell","Une cage d’escalier","Une cage d’escalier d’immeuble de Chicago en 1940, rampe, paliers et lumière provenant des fenêtres ou des lampes.","Intérieurs privés"],
  ["hotel_corridor","Un couloir d’hôtel","Un couloir d’hôtel fictif de Chicago en 1940, avec portes de chambres, moquette ou tapis et appliques d’époque.","Intérieurs privés"],
  ["boxing_gym","Une salle de boxe","Une petite salle de boxe fictive de Chicago en 1940, avec ring, sac d’entraînement et banc ; ce décor n’attribue aucune compétence au personnage.","Institutions et loisirs"],
  ["rehearsal_room","Une salle de répétition","Une salle de répétition musicale fictive de Chicago en 1940, avec piano ou pupitres ; le décor ne suppose pas que le personnage possède un instrument.","Institutions et loisirs"],
  ["church","Une église ou un temple","L’intérieur sobre d’une église ou d’un temple de Chicago en 1940 ; adapter les détails à la religion renseignée et ne pas en déduire une appartenance absente.","Institutions et loisirs"],
  ["police_office","Le bureau d’un commissariat","Un bureau de commissariat fictif de Chicago en 1940, avec mobilier, téléphone et dossiers d’époque ; sans uniforme ou statut policier imposé.","Institutions et loisirs"],
  ["union_room","Un local syndical ou associatif","Un local associatif ou syndical fictif de Chicago en 1940, tables, chaises et documents papier ; ne pas attribuer de militantisme non renseigné.","Institutions et loisirs"]
 ],
 "pose":[
  ["hands_pockets","Les mains dans les poches","Le personnage est debout, les mains dans les poches d’un vêtement qui en possède ; posture naturelle.","Postures et appuis"],
  ["one_pocket","Une main dans la poche","Une main dans une poche, l’autre libre ; épaules et appuis naturels.","Postures et appuis"],
  ["hip","Une main sur la hanche","Une main posée sur la hanche, poids du corps légèrement décalé, sans pose artificielle.","Postures et appuis"],
  ["hands_back","Les mains derrière le dos","Debout, les mains réunies derrière le dos, port de tête adapté à l’expression choisie.","Postures et appuis"],
  ["window_pose","Près d’une fenêtre","Le personnage se tient près d’une fenêtre, légèrement tourné vers sa lumière ; conserver le visage visible.","Postures et appuis"],
  ["doorstep","Assis sur une marche","Assis sur une marche ou un perron cohérent avec le lieu, les avant-bras reposent naturellement sur les cuisses.","Postures et appuis"],
  ["chair_back","Assis à cheval sur une chaise","Assis à cheval sur une chaise dont le dossier est adapté, avant-bras posés sur le dossier ; anatomie crédible.","Postures et appuis"],
  ["chair_edge","Assis au bord d’un siège","Assis au bord d’un siège, corps légèrement penché vers l’avant, posture attentive.","Postures et appuis"],
  ["legs_crossed","Assis, jambes croisées","Assis, jambes croisées de manière confortable ; le geste reste adapté aux vêtements et au cadrage.","Postures et appuis"],
  ["table_hands","Les mains posées sur une table","Assis ou debout devant une table, les deux mains reposent sur sa surface ; une posture stable et naturelle.","Postures et appuis"],
  ["chin_hand","Le menton appuyé sur une main","Assis, coude posé sur un support, menton soutenu par une main ; garder les traits du visage visibles.","Gestes et expressions corporelles"],
  ["adjust_cuff","Ajustant une manche","Le personnage ajuste une manche ou un poignet de chemise dans un geste discret.","Gestes et expressions corporelles"],
  ["adjust_collar","Remettant son col en place","Le personnage remet le col de son vêtement en place ; geste simple et crédible.","Gestes et expressions corporelles"],
  ["coat_shoulder","Le manteau sur l’épaule","Le personnage porte sur l’épaule un manteau adapté à sa tenue et à ses moyens, sans accessoire luxueux ajouté.","Gestes et expressions corporelles"],
  ["hat_hand","Un chapeau à la main","Le personnage tient un chapeau ordinaire adapté à ses vêtements ; le visage reste découvert.","Gestes et expressions corporelles"],
  ["turning_head","Tournant la tête vers un bruit","Le personnage tourne légèrement la tête comme pour écouter un bruit hors champ, sans torsion excessive.","Gestes et expressions corporelles"],
  ["paused_step","Un pas suspendu","Le personnage vient de s’arrêter dans sa marche, un pied encore légèrement avancé ; mouvement crédible.","Déplacements et actions"],
  ["stairs","Montant quelques marches","Le personnage monte quelques marches, visage visible de trois quarts ; les marches et appuis sont cohérents.","Déplacements et actions"],
  ["door_handle","Ouvrant une porte","Le personnage ouvre une porte du décor, une main sur la poignée, visage tourné vers la lumière.","Déplacements et actions"],
  ["arrival","Arrivant, manteau encore sur les épaules","Le personnage vient d’entrer, encore dans son vêtement d’extérieur ; ne pas ajouter une seconde personne.","Déplacements et actions"],
  ["writing","Écrivant quelques lignes","Le personnage écrit sur un papier avec un crayon ou un stylo d’époque ; la feuille reste sans texte lisible.","Déplacements et actions"],
  ["reading_book","Un livre ouvert à la main","Le personnage tient un livre ouvert, le regard relevé au-dessus de la page ; aucun titre lisible imposé.","Déplacements et actions"],
  ["letter","Consultant une lettre","Le personnage examine une lettre, avec une expression adaptée à l’attitude choisie ; aucune information narrative ni écriture lisible inventée.","Déplacements et actions"],
  ["cup","Une tasse entre les mains","Le personnage tient une tasse ordinaire, posée ou légèrement relevée, dans un lieu où cet objet est crédible.","Déplacements et actions"],
  ["work","Occupé à son travail","Le personnage accomplit un geste simple lié au métier renseigné, avec du matériel d’époque. Sans métier précisé, choisir une activité ordinaire sans compétence spécialisée inventée.","Déplacements et actions"],
  ["carrying","Portant un petit colis","Le personnage porte un petit colis ou une boîte ordinaire, sans arme ni contenu exceptionnel suggéré.","Déplacements et actions"],
  ["gloves","Enlevant ses gants","Le personnage retire des gants ordinaires adaptés à sa tenue et au temps ; doigts et mains anatomiquement crédibles.","Gestes et expressions corporelles"],
  ["driving_pose","Assis au volant, véhicule à l’arrêt","Le personnage est assis au volant d’une automobile d’époque à l’arrêt ; ne pas en déduire qu’il possède ce véhicule.","Déplacements et actions"]
 ],
 "attitude":[
  ["warm","Chaleur et bienveillance","Visage ouvert, regard chaleureux et bienveillant, sourire discret sans idéalisation.","Ouverture et bonne humeur"],
  ["joy","Joie franche","Expression franchement heureuse, sourire spontané et traits vivants, sans caricature.","Ouverture et bonne humeur"],
  ["laugh","Un rire spontané","Le personnage rit naturellement, bouche et yeux expressifs, sans déformation caricaturale.","Ouverture et bonne humeur"],
  ["amused","Amusement discret","Un sourire retenu et des yeux amusés, comme devant une remarque hors champ.","Ouverture et bonne humeur"],
  ["playful","Malice et espièglerie","Regard malicieux et expression espiègle, avec une vivacité crédible.","Ouverture et bonne humeur"],
  ["welcoming","Accueil et disponibilité","Expression accueillante, attention tournée vers le spectateur et posture accessible.","Ouverture et bonne humeur"],
  ["focused","Concentration","Regard précis et expression concentrée sur une tâche, sans fermeture artificielle du visage.","Attention et maîtrise"],
  ["determined","Détermination","Traits décidés et regard fixé sur un objectif, sans pose héroïque imposée.","Attention et maîtrise"],
  ["patient","Patience et écoute","Expression patiente, calme attentif et légère inclinaison de la tête.","Attention et maîtrise"],
  ["professional","Sérieux professionnel","Expression appliquée et sérieuse, présence professionnelle sans froideur forcée.","Attention et maîtrise"],
  ["composed","Sang-froid","Expression maîtrisée sous une tension perceptible, regard stable et respiration corporelle calme.","Attention et maîtrise"],
  ["proud","Fierté discrète","Légère fierté dans le port de tête et le regard, sans arrogance automatique.","Présence et caractère"],
  ["arrogant","Arrogance et supériorité","Expression hautaine, regard évaluateur et assurance appuyée, sans caricature.","Présence et caractère"],
  ["ironic","Ironie mordante","Un léger sourire en coin et un regard incisif traduisent une ironie contenue.","Présence et caractère"],
  ["stern","Sévérité","Visage sévère, bouche ferme et regard exigeant, avec une expression crédible.","Présence et caractère"],
  ["stubborn","Entêtement","Mâchoire légèrement serrée et regard obstiné, détermination peu conciliante.","Présence et caractère"],
  ["shy","Timidité","Regard un peu détourné et expression réservée, sans infantiliser le personnage.","Émotions et vulnérabilité"],
  ["embarrassed","Gêne","Expression légèrement embarrassée, sourire hésitant ou regard fuyant, sans exagération.","Émotions et vulnérabilité"],
  ["worried","Inquiétude","Inquiétude lisible dans les yeux et une légère tension du visage, sans inventer de menace visible.","Émotions et vulnérabilité"],
  ["startled","Surprise","Surprise contenue, yeux attentifs et expression soudainement éveillée.","Émotions et vulnérabilité"],
  ["sad","Chagrin retenu","Expression de chagrin sobre, traits marqués par l’émotion, sans larmes obligatoires ni drame inventé.","Émotions et vulnérabilité"],
  ["relieved","Soulagement","Les traits se détendent, l’expression traduit un soulagement crédible sans événement explicatif ajouté.","Émotions et vulnérabilité"],
  ["vulnerable","Vulnérabilité assumée","Expression sensible et peu protégée, sans posture de victime imposée.","Émotions et vulnérabilité"],
  ["dreamy","Rêverie","Regard pensif et légèrement absent, expression paisible ou intérieure.","Émotions et vulnérabilité"],
  ["bored","Ennui et lassitude","Expression d’ennui, paupières un peu lourdes et attention distante, sans perte de présence du visage.","Émotions et vulnérabilité"],
  ["impatient","Impatience","Expression impatiente, lèvres serrées ou regard pressant, gestes mesurés.","Présence et caractère"]
 ],
 "framing":[
  ["waist","À mi-corps — vertical 4:5","Cadrage de la taille jusqu’au-dessus de la tête, vertical 4:5 ; visage et mains visibles si la pose le permet.","Échelle du portrait"],
  ["knees","Jusqu’aux genoux — vertical 3:4","Cadrage des genoux jusqu’au-dessus de la tête, vertical 3:4 ; garder le port du corps et les gestes lisibles.","Échelle du portrait"],
  ["mid_calf","Jusqu’aux mollets — vertical 3:4","Cadrage des mollets jusqu’au-dessus de la tête, vertical 3:4, sans couper les articulations.","Échelle du portrait"],
  ["square_bust","Buste — format carré 1:1","Portrait en buste carré 1:1 ; équilibre entre visage, épaules et texture des vêtements.","Échelle du portrait"],
  ["square_close","Visage — format carré 1:1","Portrait rapproché carré 1:1, visage entier lisible et regard central ; éviter de couper le menton.","Échelle du portrait"],
  ["front","Portrait de face — vertical 4:5","Portrait de face en buste, vertical 4:5, regard à hauteur du spectateur et visage entier visible.","Angle de vue"],
  ["three_quarter","Visage de trois quarts — vertical 4:5","Portrait du visage et des épaules de trois quarts, vertical 4:5 ; expression et volumes bien lisibles.","Angle de vue"],
  ["profile","Profil — vertical 4:5","Portrait du visage et des épaules de profil, vertical 4:5 ; profil anatomiquement crédible et œil visible lisible.","Angle de vue"],
  ["low_angle","Légère contre-plongée — vertical 3:4","Vue légèrement depuis le bas, vertical 3:4, sans déformer le visage ni exagérer les proportions.","Angle de vue"],
  ["high_angle","Légère plongée — vertical 4:5","Vue légèrement depuis le haut, vertical 4:5, visage relevé et lisible, perspective modérée.","Angle de vue"],
  ["environment","Personnage dans son décor — horizontal 3:2","Composition horizontale 3:2 montrant le personnage en pied et son environnement ; il reste le sujet dominant, assez grand pour être identifiable.","Portrait et environnement"],
  ["cinematic","Plan moyen cinématographique — horizontal 16:9","Composition horizontale 16:9, cadrage à mi-corps et décor en profondeur, visage clairement identifiable.","Portrait et environnement"],
  ["left_space","Buste à droite, espace à gauche — horizontal 3:2","Buste placé dans le tiers droit, horizontal 3:2, espace de décor calme à gauche ; aucune inscription dans cet espace.","Portrait et environnement"],
  ["right_space","Buste à gauche, espace à droite — horizontal 3:2","Buste placé dans le tiers gauche, horizontal 3:2, espace de décor calme à droite ; aucune inscription dans cet espace.","Portrait et environnement"],
  ["door_frame","Encadré par une porte — vertical 3:4","Composition verticale 3:4 où l’encadrement d’une porte du décor guide le regard vers le personnage ; visage visible.","Portrait et environnement"],
  ["foreground","Avec un premier plan discret — vertical 4:5","Buste vertical 4:5, un élément du décor légèrement esquissé au premier plan apporte de la profondeur sans masquer le visage.","Portrait et environnement"],
  ["reflection","Portrait dans un miroir — vertical 4:5","Le visage du personnage est principalement vu dans un miroir du décor, vertical 4:5 ; une seule personne, aucune duplication du corps et reflet cohérent.","Portrait et environnement"],
  ["custom","Un cadrage de mon choix","Utiliser le cadrage et le format décrits dans les précisions du joueur, avec un visage identifiable.","Choix libre"]
 ],
 "weather":[
  ["clear_cool","Temps clair et frais","Temps clair et frais d’automne, air net, matériaux secs et atmosphère sans brume.","Temps sec"],
  ["overcast","Ciel gris uniforme","Ciel entièrement couvert, atmosphère grise d’automne ; préserver la lumière choisie lorsque la scène est intérieure.","Temps sec"],
  ["cloud_breaks","Éclaircies entre les nuages","Alternance de nuages et d’éclaircies, avec variations lumineuses crédibles pour l’heure choisie.","Temps sec"],
  ["autumn_leaves","Temps sec, feuilles dans la rue","Temps sec d’octobre, quelques feuilles mortes sur les trottoirs ou au pied des arbres ; aucune accumulation artificielle.","Temps sec"],
  ["drizzle","Bruine fine","Bruine fine à l’extérieur, discrète humidité sur les matières et gouttelettes très légères.","Pluie"],
  ["steady_rain","Pluie continue","Pluie continue à l’extérieur, vêtements et pavés humides selon l’exposition ; le visage reste lisible.","Pluie"],
  ["heavy_rain","Forte averse","Forte averse extérieure, gouttes et ruissellements visibles, sans masquer le visage sous un rideau d’eau.","Pluie"],
  ["wind_rain","Pluie poussée par le vent","Pluie automnale poussée de biais par le vent ; cheveux et vêtements réagissent sans posture physiquement impossible.","Pluie"],
  ["after_shower","Juste après une averse","L’averse vient de cesser : quelques gouttes, flaques et reflets modérés, avec l’éclairage choisi.","Pluie"],
  ["wet_cold","Froid humide","Atmosphère froide et humide d’automne, matières assombries et sensation de fraîcheur, sans neige ni gel imposés.","Pluie"],
  ["morning_fog","Nappes de brouillard","Nappes de brouillard à l’extérieur, profondeur atmosphérique progressive et silhouette distincte ; ne pas effacer les traits.","Brume et brouillard"],
  ["river_fog","Brume au-dessus de l’eau","Brume basse uniquement au voisinage de l’eau lorsqu’il y en a dans le décor ; garder le personnage nettement visible.","Brume et brouillard"],
  ["hazy","Lointain voilé","Air légèrement voilé et profondeur adoucie, sans fumée toxique ni brouillard épais inventé.","Brume et brouillard"],
  ["breeze","Brise légère","Une brise légère anime quelques mèches et les pans libres du vêtement à l’extérieur.","Vent et froid"],
  ["gusts","Rafales d’automne","Rafales d’automne visibles dans les vêtements et quelques feuilles, si le décor s’y prête ; appuis du personnage stables.","Vent et froid"],
  ["cold_dry","Froid sec","Froid sec d’automne ; montrer une lumière nette et des vêtements adaptés, sans hiver installé.","Vent et froid"],
  ["light_frost","Légère gelée sur les surfaces","Un peu de gelée sur les surfaces extérieures exposées, comme détail automnal discret ; aucun paysage enneigé.","Vent et froid"],
  ["custom","Une météo de mon choix","Utiliser la météo décrite dans les précisions du joueur, en restant cohérent avec Chicago en octobre 1940 et le décor intérieur ou extérieur.","Choix libre"]
 ]
};
const illustrationSceneGroups={
 "place": {
  "auto": "Choix général",
  "loop": "Rues et espaces extérieurs",
  "river": "Rues et espaces extérieurs",
  "michigan": "Rues et espaces extérieurs",
  "station": "Transports et passages",
  "bronzeville": "Commerces et lieux publics",
  "office": "Lieux de travail",
  "shop": "Commerces et lieux publics",
  "hotel": "Commerces et lieux publics",
  "room": "Intérieurs privés",
  "workers": "Rues et espaces extérieurs",
  "alley": "Rues et espaces extérieurs",
  "lake": "Rues et espaces extérieurs",
  "custom": "Choix libre"
 },
 "pose": {
  "auto": "Choix général",
  "standing": "Postures et appuis",
  "walking": "Déplacements et actions",
  "seated": "Postures et appuis",
  "leaning": "Postures et appuis",
  "elbow": "Postures et appuis",
  "arms": "Postures et appuis",
  "turning": "Gestes et expressions corporelles",
  "hands": "Postures et appuis",
  "object": "Déplacements et actions",
  "journal": "Déplacements et actions",
  "custom": "Choix libre"
 },
 "attitude": {
  "auto": "Choix général",
  "calm": "Attention et maîtrise",
  "confident": "Présence et caractère",
  "charming": "Ouverture et bonne humeur",
  "suspicious": "Attention et maîtrise",
  "defiant": "Présence et caractère",
  "tired": "Émotions et vulnérabilité",
  "melancholy": "Émotions et vulnérabilité",
  "curious": "Attention et maîtrise",
  "anger": "Présence et caractère",
  "dignity": "Présence et caractère",
  "custom": "Choix libre"
 },
 "framing": {
  "full": "Échelle du portrait",
  "american": "Échelle du portrait",
  "bust": "Échelle du portrait",
  "close": "Échelle du portrait"
 },
 "weather": {
  "auto": "Choix général",
  "dry": "Temps sec",
  "rain": "Pluie",
  "mist": "Brume et brouillard",
  "wind": "Vent et froid"
 }
};
for(const [key,items]of Object.entries(expandedIllustrationScenes)){
 for(const item of illustrationSceneOptions[key])item[3]=illustrationSceneGroups[key][item[0]];
 const custom=illustrationSceneOptions[key].findIndex(item=>item[0]==='custom');
 illustrationSceneOptions[key].splice(custom<0?illustrationSceneOptions[key].length:custom,0,...items);
}
const emptyIllustrationScene=()=>({place:'auto',pose:'auto',attitude:'auto',framing:'full',light:'auto',weather:'auto',extra:''});
function normalizeIllustrationScene(value){
 const scene=emptyIllustrationScene();if(!value||typeof value!=='object')return scene;
 for(const key of Object.keys(illustrationSceneOptions))if(illustrationSceneOptions[key].some(([id])=>id===value[key]))scene[key]=value[key];
 scene.extra=typeof value.extra==='string'?value.extra.slice(0,3000):'';return scene;
}
const emptyIllustrationPrompt=()=>({text:'',source:'',custom:false,scene:emptyIllustrationScene()});
function normalizeIllustrationPrompt(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return emptyIllustrationPrompt();
 return {text:typeof value.text==='string'?value.text.slice(0,200000):'',source:typeof value.source==='string'?value.source.slice(0,32):'',custom:value.custom===true,scene:normalizeIllustrationScene(value.scene)};
}
const illustrationSourceFields=['nom','surnom','age','genre','concept','profession','professionSecondaire','silhouette','tenue','singularite','equipement','objetCher'];
function illustrationSourceSignature(dossier){
 const fields=Object.fromEntries(illustrationSourceFields.filter(key=>typeof dossier.fields[key]==='string'&&dossier.fields[key].trim()).map(key=>[key,dossier.fields[key].trim()]));
 const source=JSON.stringify([fields,normalizeIllustrationScene(dossier.illustration?.scene)]);
 let hash=2166136261;for(let i=0;i<source.length;i++){hash^=source.charCodeAt(i);hash=Math.imul(hash,16777619);}return (hash>>>0).toString(16);
}
function buildIllustrationPrompt(dossier){
 const f=dossier.fields;
 const present=value=>typeof value==='string'&&value.trim()&&!['Choisir…','Choisir un repère…','À préciser…'].includes(value.trim());
 const entries=list=>list.filter(([,v])=>present(v)).map(([label,value])=>label+' : '+value.trim()).join('\n');
 const identity=entries([['Nom',f.nom],['Surnom',f.surnom],['Âge ou date de naissance (octobre 1940)',f.age],['Genre',f.genre],['Idée de concept du personnage',f.concept]]);
 const profession=entries([['Métier ou activité, précisément',f.profession],['Métier ou activité complémentaire',f.professionSecondaire]]);
 const appearance=entries([['Silhouette, visage et allure',f.silhouette],['Vêtements et présentation',f.tenue],['Voix, gestes et habitudes',f.singularite],['Objets utiles et possessions habituelles',f.equipement],['Un objet auquel vous tenez',f.objetCher]]);
 return [
  'Génère une illustration originale de ce personnage, à Chicago en octobre 1940.',
  'DIRECTION GRAPHIQUE\nPeinture numérique semi-réaliste, esthétique gothique urbaine et néo-noire. Technique expressive évoquant l’huile et la gouache traditionnelles : coups de pinceau visibles, textures rugueuses et granuleuses, imperfections, contours souples et irréguliers, détails sélectifs et zones esquissées. Anatomie, visage et architecture réalistes, expressifs et crédibles. Composition cinématographique, profondeur atmosphérique, ombres profondes et éclairages dramatiques. Palette désaturée : gris anthracite, brun sépia, bleu pétrole, vert olive et beige poussiéreux ; rares accents rouge sombre ou ambre. Ambiance adulte, mélancolique, mystérieuse et oppressante, nourrie de roman noir et de réalisme social. Éviter le photoréalisme, le rendu 3D, les contours BD nets, les couleurs saturées, les visages idéalisés et les textures plastiques.',
  'IDENTITÉ DU PERSONNAGE\n'+(identity||'Personnage encore à définir.'),
  profession?'MÉTIER\n'+profession:'',
  'LES DÉTAILS QUI RESTENT EN MÉMOIRE\n'+(appearance||'Les détails physiques et vestimentaires seront précisés par le joueur.'),
  buildIllustrationScene(dossier),
  'DÉTAILS VISUELS\nRespecter les détails physiques, les vêtements et les accessoires renseignés. Reprendre la pose, l’expression et la mise en scène choisies. Ne montrer que les objets compatibles avec le cadrage et la pose. Les indications de voix et les explications liées aux objets ne sont pas à représenter littéralement ; retenir leurs aspects visibles. Conserver les détails non précisés sobres et cohérents avec l’époque. Aucune inscription, légende ou texte dans l’image.'
 ].filter(Boolean).join('\n\n');
}
function syncIllustrationPrompt(){
 const field=document.getElementById('illustration-prompt');if(!field)return;
 state.illustration=normalizeIllustrationPrompt(state.illustration);
 const signature=illustrationSourceSignature(state),prompt=state.illustration;syncIllustrationSceneControls();
 if(!prompt.custom){prompt.text=buildIllustrationPrompt(state);prompt.source=signature;}
 if(field.value!==prompt.text)field.value=prompt.text;
 const status=document.getElementById('illustration-prompt-status');
 status.textContent=prompt.custom?(prompt.source!==signature?'Votre identité, votre métier, vos détails de portrait ou votre mise en scène ont changé. Actualisez le prompt pour les reprendre ; votre texte personnalisé est conservé.':'Prompt personnalisé · vos modifications sont conservées.'): 'Sources : identité, apparence, métiers et possessions, avec votre mise en scène · notes au conteur exclues · modifiable librement.';
 document.getElementById('copy-illustration-prompt').disabled=!prompt.text.trim();
}
function rebuildIllustrationPrompt(){
 if(state.illustration?.custom&&!window.confirm('Actualiser le prompt remplacera vos modifications de ce texte par une nouvelle version issue des réponses. Continuer ?'))return;
 const scene=normalizeIllustrationScene(state.illustration?.scene);state.illustration={...emptyIllustrationPrompt(),scene};save({background:false});
 document.getElementById('illustration-prompt').focus();toast('Prompt actualisé à partir de votre personnage.');
}
async function copyIllustrationPrompt(){
 const field=document.getElementById('illustration-prompt');if(!field.value.trim())return;
 const status=document.getElementById('illustration-prompt-status');
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(field.value);status.textContent='Prompt copié. Collez-le dans votre outil de génération d’images.';toast('Prompt d’illustration copié.');
 }catch{
  field.focus();field.select();
  let copied=false;try{copied=document.execCommand('copy');}catch{}
  status.textContent=copied?'Prompt copié. Collez-le dans votre outil de génération d’images.':'Le texte est sélectionné. Utilisez Ctrl+C ou Cmd+C pour le copier.';
 }
}
document.addEventListener('input',e=>{
 if(e.target.id!=='illustration-prompt')return;
 state.illustration={text:e.target.value,source:illustrationSourceSignature(state),custom:true,scene:normalizeIllustrationScene(state.illustration?.scene)};save({background:false});
});
document.addEventListener('click',e=>{
 const btn=e.target.closest('button');if(!btn)return;
 if(btn.id==='rebuild-illustration-prompt')rebuildIllustrationPrompt();
 if(btn.id==='copy-illustration-prompt')copyIllustrationPrompt();
});

function buildIllustrationScene(dossier){
 const scene=normalizeIllustrationScene(dossier.illustration?.scene);
 const labels={place:'Lieu',pose:'Pose',attitude:'Attitude',framing:'Cadrage',light:'Lumière',weather:'Météo'};
 const selected=Object.entries(illustrationSceneOptions).map(([key,items])=>labels[key]+' : '+items.find(([id])=>id===scene[key])[2]);
 return 'MISE EN SCÈNE\n'+selected.join('\n')+(scene.extra.trim()?'\nPrécisions du joueur : '+scene.extra.trim():'')+'\nReprésenter une seule personne, sujet principal de l’image. Adapter la pose aux parties du corps visibles dans le cadrage choisi. Les vêtements et accessoires visibles reprennent les réponses du personnage. Les précisions du joueur affinent les options choisies. En intérieur, la météo ne se voit que par une ouverture existante ou sur des vêtements qui viennent de l’extérieur : aucune pluie, brume ou rafale à l’intérieur d’un lieu fermé. En l’absence d’ouverture visible, privilégier le décor intérieur. Adapter les appuis et les accessoires ordinaires de la pose au lieu ; un accessoire de scène ne devient pas une possession ou une compétence du personnage. Si le cadrage coupe les mains ou les jambes, suggérer la pose sans les faire entrer artificiellement dans l’image. Éviter les figurants, les visages supplémentaires, les reflets dédoublés et les textes lisibles. Conserver des vêtements, des véhicules, une architecture et des objets cohérents avec Chicago en octobre 1940. Le personnage est encore humain au début de cette histoire.';
}
function renderIllustrationOptions(items){
 const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const groups=new Map();
 for(const item of items){const name=item[3]||'';if(!groups.has(name))groups.set(name,[]);groups.get(name).push(item);}
 return [...groups].map(([name,choices])=>{const options=choices.map(([id,label])=>`<option value="${escape(id)}">${escape(label)}</option>`).join('');return name?`<optgroup label="${escape(name)}">${options}</optgroup>`:options;}).join('');
}
function renderIllustrationSceneControls(){
 const labels={place:'Lieu à Chicago',pose:'Pose',attitude:'Attitude',framing:'Cadrage',light:'Lumière',weather:'Météo'};
 document.getElementById('illustration-scene-options').innerHTML=Object.entries(illustrationSceneOptions).map(([key,items])=>`<div class="field"><label for="illustration-scene-${key}">${labels[key]}</label><select id="illustration-scene-${key}" data-illustration-scene="${key}" aria-describedby="illustration-scene-${key}-hint">${renderIllustrationOptions(items)}</select><p class="hint" id="illustration-scene-${key}-hint"></p></div>`).join('');
}
function syncIllustrationSceneControls(){
 const scene=state.illustration.scene;
 for(const [key,items]of Object.entries(illustrationSceneOptions)){
  const control=document.getElementById('illustration-scene-'+key);if(!control)continue;
  if(control.value!==scene[key])control.value=scene[key];
  document.getElementById('illustration-scene-'+key+'-hint').textContent=items.find(([id])=>id===scene[key])[2];
 }
 const extra=document.getElementById('illustration-scene-extra');if(extra&&extra.value!==scene.extra)extra.value=scene.extra;
}
function captureIllustrationScene(event){
 const key=event.target.dataset.illustrationScene;if(!key)return;
 state.illustration=normalizeIllustrationPrompt(state.illustration);
 if(key==='extra')state.illustration.scene.extra=event.target.value.slice(0,3000);
 else if(illustrationSceneOptions[key]?.some(([id])=>id===event.target.value))state.illustration.scene[key]=event.target.value;
 else return;
 save({background:false});
}
document.addEventListener('change',captureIllustrationScene);
document.addEventListener('input',event=>{if(event.target.dataset.illustrationScene==='extra')captureIllustrationScene(event);});
renderIllustrationSceneControls();
