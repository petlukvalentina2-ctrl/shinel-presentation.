import {subscribe} from './firebase-vote.js';
const status=document.getElementById('vote-status');
const url=new URL('голосовать.html',location.href).href;
const link=document.getElementById('vote-link');
const qr=document.getElementById('vote-qr');
if(link){link.textContent=url;link.style.overflowWrap='anywhere'}
if(qr){qr.innerHTML='';const im=document.createElement('img');im.alt='QR для голосования';im.style.cssText='width:100%;height:100%;object-fit:contain;background:white';im.src='https://api.qrserver.com/v1/create-qr-code/?size=280x280&data='+encodeURIComponent(url);im.onerror=()=>{qr.textContent='Откройте ссылку под QR-кодом'};qr.append(im)}
if(location.protocol==='file:'){status.textContent='Для онлайн-голосования опубликуйте файлы на сайте (HTTPS).';}
else subscribe(counts=>{const total=counts.reduce((a,b)=>a+b,0);counts.forEach((n,i)=>{document.getElementById('v'+i).textContent=n+' ('+(total?Math.round(n/total*100):0)+'%)';document.getElementById('f'+i).style.width=(total?n/total*100:0)+'%'});status.textContent='Всего голосов: '+total},e=>status.textContent='Нет доступа к голосам: проверьте правила Firestore ('+e.code+')');
