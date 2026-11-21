import {initializeApp} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {getAuth,signInAnonymously,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {getFirestore,doc,getDoc,setDoc,collection,onSnapshot,query} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
const firebaseConfig={apiKey:"AIzaSyCUM9Cy4HYHlh05mJ0HH1hAsdcBnRc2GU0",authDomain:"sinel-interactive.firebaseapp.com",projectId:"sinel-interactive",storageBucket:"sinel-interactive.firebasestorage.app",messagingSenderId:"121316406409",appId:"1:121316406409:web:adeacb4513366a12780258"};
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
const votes=collection(db,'votes');
async function signIn(){if(auth.currentUser)return auth.currentUser;const c=await signInAnonymously(auth);return c.user;}
function subscribe(callback,error){return onSnapshot(query(votes),s=>{const counts=[0,0,0];s.forEach(d=>{const v=d.data().choice;if(Number.isInteger(v)&&v>=0&&v<3)counts[v]++});callback(counts)},error)}
export {auth,db,doc,getDoc,setDoc,signIn,subscribe};
