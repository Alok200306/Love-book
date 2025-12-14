// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* 🔥 APNI FIREBASE DETAILS YAHA PASTE KARO */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// save page data
export async function savePage(id, data){
  await setDoc(doc(db, "pages", id), data);
}

// load page data
export async function loadPage(id){
  const snap = await getDoc(doc(db, "pages", id));
  return snap.exists() ? snap.data() : null;
}

// upload voice
export async function uploadVoice(id, file){
  const voiceRef = ref(storage, `voices/${id}.mp3`);
  await uploadBytes(voiceRef, file);
  return await getDownloadURL(voiceRef);
}