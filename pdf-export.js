'use strict';
// Print composition: readable response text and flowing A4 pages without a page limit.
async function createDossierPDF(model,assets){
 const {PDFDocument,rgb,rectangle,clip,endPath,pushGraphicsState,popGraphicsState}=PDFLib;
 const doc=await PDFDocument.create();doc.setTitle('Dossier personnel - '+model.name);doc.setAuthor('Archives personnelles - Chicago, octobre 1940');doc.setLanguage('fr-FR');
 async function embed(asset){
  const m=asset.metrics,glyphs=new Map(m.characters.map(([cp,id,advanceWidth])=>[cp,{id,advanceWidth,codePoints:[cp]}]));
  const font={...m,characterSet:m.characters.map(c=>c[0]),post:{isFixedPitch:m.postscriptName.includes('Mono')},head:{macStyle:{italic:false}},'OS/2':{sFamilyClass:0},glyphForCodePoint:cp=>glyphs.get(cp)||{id:0,advanceWidth:600,codePoints:[cp]},layout:t=>({glyphs:Array.from(t,c=>font.glyphForCodePoint(c.codePointAt(0)))})};
  doc.registerFontkit({create:()=>font});return doc.embedFont(asset.bytes,{subset:false});
 }
 const mono=await embed(assets.fonts.regular),bold=await embed(assets.fonts.bold),body=await embed(assets.fonts.body),art=await doc.embedJpg(assets.art);
 const supported=new Set(body.getCharacterSet());
 const clean=s=>Array.from(String(s??'').normalize('NFC').replace(/\t/g,' ').replace(/\r\n?/g,'\n').replace(/[\u2010-\u2015]/g,'-')).map(c=>c==='\n'||supported.has(c.codePointAt(0))?c:'[U+'+c.codePointAt(0).toString(16).toUpperCase()+']').join('');
 const W=595.28,H=841.89,M=44,width=W-2*M,top=H-124,bottom=54,capacity=top-bottom;
 const ink=rgb(.10,.12,.13),muted=rgb(.31,.34,.35),accent=rgb(.35,.16,.17),line=rgb(.78,.79,.78),pale=rgb(.96,.96,.95);
 const titles=['Identité','Origines et vie quotidienne','Expériences et loisirs','Convictions et Attaches','Ce qui vous pousse à agir','Votre place dans la ville','Votre entourage','Portrait et possessions'];
 const identity=model.identity||model.subtitle||'';
 const shortLabels={
  'Idée de concept du personnage':'En quelques mots','Lieu d’origine et milieu familial':'Origines et famille','Études, apprentissage et arrivée en ville':'Parcours','Votre activité principale':'Secteur','Métier ou activité, précisément':'Métier','Ce que cette activité vous a appris':'Savoir-faire','Une journée ordinaire ou un week-end':'Quotidien ou week-end','Métier ou activité complémentaire':'Activité complémentaire','Communautés, religion et idées politiques':'Appartenances',
  'Premier événement marquant':'Premier événement','Deuxième événement marquant':'Deuxième événement','Ce que vous en avez appris':'Apprentissage','Premier loisir':'Loisir 1','Deuxième loisir':'Loisir 2','Troisième loisir':'Loisir 3','Autre fait important de votre passé':'Autre fait marquant',
  'Origine de cette Conviction':'Origine','Lien entre l’Attache et la Conviction':'Ce qui les relie','Description physique de l’Attache':'Description physique','Nature de votre relation':'Nature du lien','Fonction ou occupation':'Fonction','Âge de l’Attache':'Âge',
  'Ambition — le grand objectif':'Ambition','Désir — ce que vous voulez obtenir bientôt':'Désir','Ce que vous craignez de perdre':'Peur','Votre contradiction intime':'Contradiction',
  'Votre train de vie':'Train de vie','Origine des revenus et des biens':'Revenus','Où vivez-vous ?':'Logement','Votre réputation':'Réputation','Dettes, ennemis ou obstacles durables':'Difficultés','Ce que vous préférez garder secret':'Secret','Talents particuliers, langues ou fragilités':'Particularités',
  'Description physique et attitude':'Physique et attitude','Situations et aide concrète':'Aide concrète','Silhouette, visage et allure':'Allure','Vêtements et présentation':'Tenue','Voix, gestes et habitudes':'Voix et habitudes','Objets utiles et possessions habituelles':'Possessions','Un objet auquel vous tenez':'Objet précieux','Autres éléments à discuter avec le conteur':'À discuter'
 };
 function wrap(value,font,size,maxWidth){
  const out=[];
  for(const para of clean(value).split('\n')){
   if(!para.trim()){if(out.length&&out.at(-1)!=='')out.push('');continue;}
   let current='';
   for(const word of para.trim().split(/\s+/)){
    if(font.widthOfTextAtSize(word,size)>maxWidth){if(current){out.push(current);current='';}let part='';for(const c of word){if(part&&font.widthOfTextAtSize(part+c,size)>maxWidth){out.push(part);part='';}part+=c;}current=part;}
    else if(current&&font.widthOfTextAtSize(current+' '+word,size)>maxWidth){out.push(current);current=word;}
    else current=current?current+' '+word:word;
   }if(current)out.push(current);
  }return out.length?out:[''];
 }
 let titleSize=26;while(titleSize>14&&bold.widthOfTextAtSize(clean(model.name),titleSize)>width-130)titleSize-=.5;
 const nameLines=wrap(model.name,bold,titleSize,width-130);
 let headerName=clean(model.name);
 if(nameLines.length>1){headerName=nameLines[0];while(headerName&&bold.widthOfTextAtSize(headerName+'…',titleSize)>width-130)headerName=headerName.slice(0,-1);headerName+='…';}
 const skip=new Set(['Nom et prénom','Surnom ou nom d’usage','Âge ou date de naissance','Genre']);
 const groups=model.groups.map(g=>({...g,title:titles[g.number-1]||g.title,entries:g.entries.filter(([label,value])=>String(value??'').trim()&&!(g.number===1&&skip.has(label)))})).filter(g=>g.entries.length);
 if(nameLines.length>1){const g=groups.find(g=>g.number===1);if(g)g.entries.unshift(['Nom et prénom',model.name]);else groups.unshift({number:1,title:titles[0],entries:[['Nom et prénom',model.name]]});}
 if(wrap(identity,body,10.7,width).length>1){const g=groups.find(g=>g.number===1);if(g)g.entries.unshift(['Identité',identity]);else groups.unshift({number:1,title:titles[0],entries:[['Identité',identity]]});}
 const units=[];
 for(const g of groups){
  if(g.number===4||g.number===7){
   const prefix=g.number===4?/^Conviction \d+$/:/^Relation \d+$/;let entries=[];
   for(const entry of g.entries){if(prefix.test(entry[0])&&entries.length){units.push({...g,entries});entries=[];}entries.push(entry);}
   if(entries.length)units.push({...g,entries});
  }else units.push(g);
 }
 if(!units.length)units.push({number:1,title:titles[0],entries:[['Votre histoire','Aucune réponse renseignée. Complétez votre dossier puis générez à nouveau le PDF.']]});
 const fullLabels=new Set(['Idée de concept du personnage','Concept','Conviction 1','Conviction 2','Conviction 3','Votre Conviction','Pourquoi cette personne incarne cette Conviction','Ce qu’elle représente','Ce que cette personne représente','Lien entre l’Attache et la Conviction','Description physique de l’Attache','Description physique et attitude','Situations et aide concrète','Logement','Où vivez-vous ?']);
 function layoutUnit(unit,size,gap){
  const leading=size*1.33,headingHeight=size<11.5?28:32,padding=size<11.5?6:10,rows=[];let at=0;
  const isFull=entry=>fullLabels.has(entry[0])||String(entry[1]).length>190;
  // Keep each life event next to what it taught the character.
  if(unit.number===3&&/Premier événement/.test(unit.entries[0]?.[0]||'')&&/Deuxième événement/.test(unit.entries[2]?.[0]||'')){
   const gutter=20,cellWidth=(width-gutter)/2;
   const cells=[[0,1],[2,3]].map(indices=>({fields:indices.map(index=>{const [label,value]=unit.entries[index],caption=clean((shortLabels[label]||label).toLocaleUpperCase('fr'));return {label:caption,value:clean(value),labels:wrap(caption,bold,9.1,cellWidth),text:wrap(value,body,size,cellWidth),inline:false};})}));
   const height=Math.max(...cells.map(c=>c.fields.reduce((n,f)=>n+f.labels.length*11.2+f.text.length*leading,0)+4))+gap;
   rows.push({cells,height,cellWidth,gutter,highlight:false});at=4;
  }
  while(at<unit.entries.length){
   let count=1;
   if(!isFull(unit.entries[at])&&at+1<unit.entries.length&&!isFull(unit.entries[at+1])){
    count=2;
    if(unit.number!==4&&unit.number!==7&&at+2<unit.entries.length&&unit.entries.slice(at,at+3).every(([label,value])=>!isFull([label,value])&&String(value).length<45&&(shortLabels[label]||label).length<25))count=3;
   }
   const entries=unit.entries.slice(at,at+count),gutter=20,cellWidth=(width-gutter*(count-1))/count;
   const cells=entries.map(([label,value])=>{const caption=clean((shortLabels[label]||label).toLocaleUpperCase('fr'));return {label:caption,value:clean(value),labels:wrap(caption,bold,9.1,cellWidth),text:wrap(value,body,size,cellWidth),inline:!String(value).includes('\n')&&bold.widthOfTextAtSize(caption,9.1)+10+body.widthOfTextAtSize(clean(value),size)<=cellWidth};});
   const h=Math.max(...cells.map(c=>c.inline?leading:c.labels.length*11.2+c.text.length*leading))+gap;
   rows.push({cells,height:h,cellWidth,gutter,highlight:count===1&&/^Conviction \d+$/.test(entries[0][0])});at+=count;
  }
  return {...unit,rows,headingHeight,padding,height:headingHeight+rows.reduce((n,r)=>n+r.height,0)+padding};
 }
 // Keep ordinary cards intact; split oversized cards and answers with repeated headings.
 const size=11.7,gap=8,leading=size*1.33;
 function splitOversizedRow(row,maxHeight){
  if(row.height<=maxHeight)return [row];
  const rows=[];
  for(const cell of row.cells)for(const field of cell.fields||[cell]){
   const lines=wrap(field.value,body,size,width);let at=0;
   while(at<lines.length){
    const label=field.label+(at?' (SUITE)':''),labels=wrap(label,bold,9.1,width);
    const count=Math.max(1,Math.floor((maxHeight-labels.length*11.2-gap)/leading));
    const text=lines.slice(at,at+count);
    rows.push({cells:[{label,labels,text,value:text.join('\n'),inline:false}],cellWidth:width,gutter:0,height:labels.length*11.2+text.length*leading+gap,highlight:row.highlight});at+=text.length;
   }
  }return rows;
 }
 const parts=[];
 for(const unit of units){
  const part=layoutUnit(unit,size,gap);
  if(part.height<=capacity){parts.push(part);continue;}
  const rows=part.rows.flatMap(row=>splitOversizedRow(row,capacity-part.headingHeight-part.padding));
  let fragment=[],height=part.headingHeight+part.padding,continued=false;
  const flush=()=>{if(!fragment.length)return;parts.push({...part,title:part.title+(continued?' (suite)':''),rows:fragment,height});fragment=[];height=part.headingHeight+part.padding;continued=true;};
  for(const row of rows){if(height+row.height>capacity)flush();fragment.push(row);height+=row.height;}flush();
 }
 const pages=[];let current=[],used=0;
 for(const part of parts){if(current.length&&used+part.height>capacity){pages.push(current);current=[];used=0;}current.push(part);used+=part.height;}
 if(current.length)pages.push(current);
 const layout={size,gap,pages};
 for(let pageIndex=0;pageIndex<layout.pages.length;pageIndex++){
  const page=doc.addPage([W,H]);
  const draw=(text,x,y,font=body,size=layout.size,color=ink)=>page.drawText(clean(text),{x,y,font,size,color});
  draw('ARCHIVES DE CHICAGO / OCTOBRE 1940',M,H-28,mono,9,muted);
  page.drawRectangle({x:W-M-111,y:H-99,width:111,height:68,color:pale});
  page.pushOperators(pushGraphicsState(),rectangle(W-M-111,H-99,111,68),clip(),endPath());
  const scale=Math.max(111/art.width,68/art.height);page.drawImage(art,{x:W-M-111+(111-art.width*scale)/2,y:H-99+(68-art.height*scale)/2,width:art.width*scale,height:art.height*scale});page.pushOperators(popGraphicsState());
  draw('DOSSIER PERSONNEL',M,H-47,bold,10,accent);
  draw(headerName,M,H-73,bold,titleSize);
  const meta=wrap(identity,body,10.7,width-130);draw(meta.length===1?identity:'Chicago, octobre 1940',M,H-93,body,10.7,muted);
  page.drawLine({start:{x:M,y:H-107},end:{x:W-M,y:H-107},color:accent,thickness:1.1});
  let y=top;
  for(const part of layout.pages[pageIndex]){
   page.drawRectangle({x:M,y:y-17,width:22,height:22,color:ink});
   draw(String(part.number).padStart(2,'0'),M+4,y-10,bold,10,rgb(1,1,1));
   draw(part.title,M+33,y-11,bold,13,ink);
   page.drawLine({start:{x:M+33,y:y-19},end:{x:W-M,y:y-19},color:line,thickness:.4});y-=part.headingHeight;
   for(const row of part.rows){
    if(row.highlight){page.drawRectangle({x:M-7,y:y-row.height+layout.gap-3,width:width+14,height:row.height-layout.gap+8,color:pale});page.drawLine({start:{x:M-7,y:y+5},end:{x:M-7,y:y-row.height+layout.gap-3},color:accent,thickness:1.8});}
    row.cells.forEach((cell,col)=>{const x=M+col*(row.cellWidth+row.gutter);let cy=y;
     const fields=cell.fields||[cell];
     fields.forEach((field,index)=>{
      if(field.inline){draw(field.label,x,cy,bold,9.1,muted);draw(field.value,x+bold.widthOfTextAtSize(field.label,9.1)+10,cy,body,layout.size,ink);cy-=layout.size*1.33;}
      else{for(const t of field.labels){draw(t,x,cy,bold,9.1,muted);cy-=11.2;}for(const t of field.text){if(t)draw(t,x,cy,body,layout.size,ink);cy-=layout.size*1.33;}}
      if(index<fields.length-1)cy-=4;
     });
    });y-=row.height;
   }
   y-=part.padding;
  }
  if(!layout.pages[pageIndex].length){draw('Notes personnelles',M,y,bold,15);for(let cy=y-36;cy>bottom+15;cy-=28)page.drawLine({start:{x:M,y:cy},end:{x:W-M,y:cy},color:line,thickness:.35});}
  page.drawLine({start:{x:M,y:44},end:{x:W-M,y:44},color:line,thickness:.5});
  draw(model.validated?'DOSSIER VALIDÉ':'DOSSIER EN COURS',M,29,mono,8,muted);const p=(pageIndex+1)+' / '+layout.pages.length;draw(p,W-M-mono.widthOfTextAtSize(p,9),29,mono,9,muted);
 }
 return doc.save();
}
let dossierPDFAssets;
async function loadDossierPDFAssets(){
 if(!dossierPDFAssets)dossierPDFAssets=(async()=>{
  const read=async path=>{const r=await fetch(path);if(!r.ok)throw Error('Fichier PDF indisponible : '+path);return r;};
  const [art,regularBytes,regularMetrics,boldBytes,boldMetrics,bodyBytes,bodyMetrics]=await Promise.all([
   read('assets/ville-nocturne.jpg').then(r=>r.arrayBuffer()),read('assets/fonts/regular.ttf').then(r=>r.arrayBuffer()),read('assets/fonts/regular.json').then(r=>r.json()),read('assets/fonts/bold.ttf').then(r=>r.arrayBuffer()),read('assets/fonts/bold.json').then(r=>r.json()),read('assets/fonts/body.ttf').then(r=>r.arrayBuffer()),read('assets/fonts/body.json').then(r=>r.json())
  ]);
  return {art:new Uint8Array(art),fonts:{regular:{bytes:new Uint8Array(regularBytes),metrics:regularMetrics},bold:{bytes:new Uint8Array(boldBytes),metrics:boldMetrics},body:{bytes:new Uint8Array(bodyBytes),metrics:bodyMetrics}}};
 })().catch(e=>{dossierPDFAssets=null;throw e;});
 return dossierPDFAssets;
}
function dossierPDFModel(){
 const f=state.fields;
 const hasContent=Object.values(f).some(nonempty)||state.convictions.some(c=>Object.values(c).some(v=>typeof v==='string'&&nonempty(v)))||state.relations.length>0;
 const groups=hasContent?summaryEntries().map((g,i)=>({...g,number:i+1,entries:g.entries.map(([label,value])=>[label,value])})):[];
 return {name:f.nom?.trim()||'Personnage sans nom',subtitle:[f.age?ageOrBirthDateSummary(f.age):null,f.genre,f.surnom?'Surnom : '+f.surnom:null].filter(Boolean).join(' · '),validated:!!state.validatedAt,groups};
}
async function downloadDossierPDF(){
 const buttons=[...document.querySelectorAll('[data-pdf]')],labels=buttons.map(b=>b.textContent);
 const feedback=document.getElementById('pdf-feedback');if(feedback){feedback.hidden=true;feedback.textContent='';}
 buttons.forEach(b=>{b.disabled=true;b.textContent='Composition du PDF…';});
 try{
  // Capture a single version before loading assets; later typing never mixes versions.
  const model=dossierPDFModel();
  const bytes=await createDossierPDF(model,await loadDossierPDFAssets());
  const safe=model.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').slice(0,70)||'personnage';
  download(bytes,'dossier-'+safe+'.pdf','application/pdf');toast('PDF illustré téléchargé.');
 }catch(e){console.error(e);if(feedback){feedback.hidden=false;feedback.textContent='Le téléchargement a échoué. Vos réponses sont conservées ; vous pouvez réessayer.';}toast('Impossible de créer le PDF. Réessayez ; vos réponses sont conservées.');}
 finally{buttons.forEach((b,i)=>{b.disabled=false;b.textContent=labels[i];});}
}
document.addEventListener('click',e=>{if(e.target.closest('[data-pdf]'))downloadDossierPDF();});
