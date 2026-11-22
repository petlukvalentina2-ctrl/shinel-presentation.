import {firebaseConfig,publicPresentationUrl,pollId} from './настройки-голосования.js';
const status=document.getElementById('vote-status');
const voteUrl=new URL('голосовать.html',publicPresentationUrl).href;
document.getElementById('vote-link').textContent=voteUrl;
const qr=document.createElement('img');qr.alt='QR-код голосования';qr.src='https://api.qrserver.com/v1/create-qr-code/?size=260x260&data='+encodeURIComponent(voteUrl);qr.onload=()=>document.getElementById('vote-qr').replaceChildren(qr);
if(!firebaseConfig.apiKey||!firebaseConfig.appId){status.textContent='Для голосования нужно заполнить настройки Firebase';}
else {try{
 const [{initializeApp},{getAuth,signInAnonymously},{getFirestore,collection,onSnapshot}]=await Promise.all([
 import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')]);
 const app=initializeApp(firebaseConfig);await signInAnonymously(getAuth(app));
 onSnapshot(collection(getFirestore(app),'votes'),snap=>{const counts=[0,0,0];snap.forEach(d=>{const v=d.data();if(Number.isInteger(v.choice)&&v.choice>=0&&v.choice<3)counts[v.choice]++});const total=counts.reduce((a,b)=>a+b,0);counts.forEach((n,i)=>{document.getElementById('v'+i).textContent=n;document.getElementById('f'+i).style.width=(total?100*n/total:0)+'%'});status.textContent='Получено ответов: '+total},()=>status.textContent='Нет доступа к результатам: проверьте правила Firestore');
}catch(e){status.textContent='Ошибка подключения к Firestore';console.error(e)}}
