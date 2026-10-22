'use strict';
// Prompt sources: section 01, precise profession in 02, section 08 excluding storyteller notes, and scene choices.
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
 status.textContent=prompt.custom?(prompt.source!==signature?'Votre identité, votre métier, vos détails de portrait ou votre mise en scène ont changé. Actualisez le prompt pour les reprendre ; votre texte personnalisé est conservé.':'Prompt personnalisé · vos modifications sont conservées.'): 'Sources : rubrique 01, métier de la rubrique 02 et rubrique 08 hors éléments à discuter avec le conteur, avec votre mise en scène · modifiable librement.';
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
 const labels={place:'Lieu',pose:'Pose',attitude:'Attitude',framing:'Cadrage',light:'Lumière',weather:'Atmosphère'};
 const selected=Object.entries(illustrationSceneOptions).map(([key,items])=>labels[key]+' : '+items.find(([id])=>id===scene[key])[2]);
 return 'MISE EN SCÈNE\n'+selected.join('\n')+(scene.extra.trim()?'\nPrécisions du joueur : '+scene.extra.trim():'')+'\nReprésenter une seule personne, sujet principal de l’image. Adapter la pose aux parties du corps visibles dans le cadrage choisi. Les vêtements et accessoires visibles reprennent les réponses du personnage. Les précisions du joueur affinent les options choisies. Conserver des vêtements, des véhicules, une architecture et des objets cohérents avec Chicago en octobre 1940. Le personnage est encore humain au début de cette histoire.';
}
function renderIllustrationSceneControls(){
 const labels={place:'Lieu à Chicago',pose:'Pose',attitude:'Attitude',framing:'Cadrage',light:'Lumière',weather:'Atmosphère'};
 document.getElementById('illustration-scene-options').innerHTML=Object.entries(illustrationSceneOptions).map(([key,items])=>`<div class="field"><label for="illustration-scene-${key}">${labels[key]}</label><select id="illustration-scene-${key}" data-illustration-scene="${key}" aria-describedby="illustration-scene-${key}-hint">${items.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select><p class="hint" id="illustration-scene-${key}-hint"></p></div>`).join('');
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
