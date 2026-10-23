'use strict';
// The original board is stored separately: it must never be downsampled into localStorage.
let boardEpoch=0,boardBusy=false,boardKey=null,boardBlob=null,boardURL=null,boardMeta=null,boardNotice='';
function boardDatabase(){
 return new Promise((resolve,reject)=>{
  if(typeof indexedDB==='undefined'){reject(Error('Le stockage des images est indisponible.'));return;}
  const request=indexedDB.open('archives-personnelles-planches',1);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('images'))request.result.createObjectStore('images');};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(Error('Le stockage des images est indisponible.'));
  request.onblocked=()=>reject(Error('Le stockage des images est occupé dans un autre onglet.'));
 });
}
async function boardStore(action,id,value){
 const db=await boardDatabase();
 try{return await new Promise((resolve,reject)=>{
  const tx=db.transaction('images',action==='get'?'readonly':'readwrite');
  const store=tx.objectStore('images');const request=action==='put'?store.put(value,id):action==='delete'?store.delete(id):store.get(id);
  let result;request.onsuccess=()=>{result=request.result;};
  tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(Error('Impossible de conserver cette planche dans le navigateur.'));tx.onabort=tx.onerror;
 });}finally{db.close();}
}
function boardSignature(){
 const source=dossierPromptSignature(state)+'|'+state.dossierPrompt.text;
 let hash=2166136261;for(let i=0;i<source.length;i++){hash^=source.charCodeAt(i);hash=Math.imul(hash,16777619);}
 return (hash>>>0).toString(16);
}
function releaseBoard(){
 document.getElementById('dossier-result-dialog').close();
 for(const id of ['dossier-result-image','dossier-result-large'])document.getElementById(id).removeAttribute('src');
 if(boardURL)URL.revokeObjectURL(boardURL);
 boardKey=null;boardBlob=null;boardURL=null;boardMeta=null;
}
function resetIllustratedResultUI(){boardEpoch++;boardBusy=false;boardNotice='';releaseBoard();document.getElementById('dossier-result-file').value='';}
function discardIllustratedResult(){
 const id=state.dossierPrompt.result?.id;
 resetIllustratedResultUI();state.dossierPrompt.result=null;
 if(id)boardStore('delete',id).catch(()=>{});
}
function renderBoard(){
 const preview=document.getElementById('dossier-result-preview');preview.hidden=!boardURL;
 if(boardURL){
  for(const id of ['dossier-result-image','dossier-result-large']){const img=document.getElementById(id);if(img.getAttribute('src')!==boardURL)img.src=boardURL;}
  document.getElementById('dossier-result-image').alt='Planche illustrée de '+(state.fields.nom||'votre personnage');
  document.getElementById('dossier-result-name').textContent=boardMeta?.name||'';
 }
 document.getElementById('dossier-result-file').disabled=boardBusy;
 document.getElementById('remove-dossier-result').disabled=boardBusy;
 const stale=boardMeta&&boardMeta.source!==boardSignature();
 document.getElementById('dossier-result-status').textContent=boardBusy?'Préparation de la planche…':boardNotice||(boardURL?(stale?'Les réponses ou le prompt ont changé depuis cet import. La planche reste affichée ; régénérez-la si nécessaire.':'Planche importée. Vérifiez son contenu avant de la partager aux autres joueurs.'):'Importez ici l’image obtenue dans ChatGPT.');
}
function syncIllustratedResult(){
 const result=state.dossierPrompt.result;
 if(result&&result.id!==boardKey&&!boardBusy){
  const epoch=++boardEpoch,owner=state;boardKey=result.id;boardBusy=true;boardNotice='';
  boardStore('get',result.id).then(blob=>{
   if(epoch!==boardEpoch||owner!==state)return;
   if(!(blob instanceof Blob)){boardNotice='Cette planche n’est pas présente dans ce navigateur. Importez à nouveau l’image ; le JSON ne contient pas l’image complète.';return;}
   if(boardURL)URL.revokeObjectURL(boardURL);boardBlob=blob;boardMeta=result;boardURL=URL.createObjectURL(blob);
  }).catch(()=>{if(epoch===boardEpoch&&owner===state)boardNotice='La planche sauvegardée est inaccessible. Vous pouvez l’importer à nouveau.';})
   .finally(()=>{if(epoch===boardEpoch&&owner===state){boardBusy=false;renderBoard();}});
 }
 renderBoard();
}
async function validateBoard(file){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Choisissez une planche JPG, PNG ou WebP.');
 if(file.size>30*1024*1024)throw Error('Cette planche dépasse 30 Mo.');
 if(!file.size)throw Error('Ce fichier est vide.');
 const url=URL.createObjectURL(file);
 try{
  await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>img.naturalWidth&&img.naturalHeight?resolve():reject(Error('Cette image ne peut pas être lue.'));img.onerror=()=>reject(Error('Cette image ne peut pas être lue.'));img.src=url;});
 }finally{URL.revokeObjectURL(url);}
 return file;
}
async function importIllustratedResult(event){
 const input=event.target,file=input.files?.[0];input.value='';if(!file)return;
 const epoch=++boardEpoch,owner=state,source=boardSignature(),oldId=state.dossierPrompt.result?.id;
 boardBusy=true;boardNotice='';renderBoard();let newId=null;
 try{
  const blob=await validateBoard(file);if(epoch!==boardEpoch||owner!==state)return;
  const meta={id:'board-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),name:String(file.name||'dossier.png').replace(/[\u0000-\u001f]/g,'').slice(0,150),source};
  let stored=true;
  try{await boardStore('put',meta.id,blob);newId=meta.id;}
  catch{stored=false;}
  if(epoch!==boardEpoch||owner!==state){if(newId)boardStore('delete',newId).catch(()=>{});return;}
  releaseBoard();boardKey=meta.id;boardMeta=meta;boardBlob=blob;boardURL=URL.createObjectURL(blob);
  state.dossierPrompt.result=stored?meta:null;
  if(!stored)boardNotice='La planche est visible pour cette session, mais le navigateur ne peut pas la conserver. Téléchargez-la maintenant.';
  save({background:false});
  if(oldId)boardStore('delete',oldId).catch(()=>{});
  toast('Planche importée.');
 }catch(e){if(epoch===boardEpoch&&owner===state){boardNotice=e.message;toast(e.message);}}
 finally{if(epoch===boardEpoch&&owner===state){boardBusy=false;renderBoard();}}
}
function downloadBoard(){
 if(!boardBlob||!boardURL)return;
 const extension=boardBlob.type==='image/png'?'png':boardBlob.type==='image/webp'?'webp':'jpg';
 const a=document.createElement('a');a.href=boardURL;a.download='planche-'+filename()+'.'+extension;document.body.append(a);a.click();a.remove();
}
function syncDossierDetail(){
 const detail=state.dossierPrompt.detail,source=dossierPromptSignature(state),field=document.getElementById('dossier-detail-text');
 if(!detail.custom){detail.text='DOSSIER RÉSERVÉ AU MJ — NE PAS PARTAGER AUX AUTRES JOUEURS\n\n'+narrativeText();detail.source=source;}
 if(field.value!==detail.text)field.value=detail.text;
 document.getElementById('dossier-detail-status').textContent=detail.custom?(detail.source!==source?'Les réponses ont changé. Votre texte pour le MJ est conservé ; relisez-le pour intégrer les changements.':'Texte pour le MJ personnalisé · conservé dans la sauvegarde JSON.'):'Réponses complètes pour le MJ · remplacez-les si vous le souhaitez par le texte rédigé dans ChatGPT.';
}
document.addEventListener('change',e=>{if(e.target.id==='dossier-result-file')importIllustratedResult(e);});
document.addEventListener('input',e=>{if(e.target.id!=='dossier-detail-text')return;state.dossierPrompt.detail={text:e.target.value,source:dossierPromptSignature(state),custom:true};save({background:false});});
document.addEventListener('click',e=>{
 const button=e.target.closest('button');if(!button)return;
 if(button.id==='remove-dossier-result'){
  if(!window.confirm('Retirer la planche de ce navigateur ? Les fichiers déjà téléchargés seront conservés.'))return;
  discardIllustratedResult();save({background:false});toast('Planche retirée.');
 }
 if(button.id==='enlarge-dossier-result'&&boardURL)document.getElementById('dossier-result-dialog').showModal();
 if(['download-dossier-result','download-dossier-result-large'].includes(button.id))downloadBoard();
 if(button.id==='download-dossier-detail')download(state.dossierPrompt.detail.text,'dossier-MJ-'+filename()+'.txt','text/plain;charset=utf-8');
 if(button.id==='rebuild-dossier-detail'){
  if(state.dossierPrompt.detail.custom&&!window.confirm('Remplacer votre texte pour le MJ par les réponses complètes du questionnaire ?'))return;
  state.dossierPrompt.detail.custom=false;save({background:false});
 }
});
