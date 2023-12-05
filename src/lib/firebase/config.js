import { initializeApp, getApps } from "firebase/app";

var admin = require("firebase-admin");

var serviceAccount = require("@/src/lib/firebase/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseConfig = {
    apiKey: "AIzaSyDfyoozU4WRdbna2bkViT1Qu61wtkQcbr4",
    authDomain: "librairy-0.firebaseapp.com",
    projectId: "librairy-0",
    storageBucket: "librairy-0.appspot.com",
    messagingSenderId: "972408964955",
    appId: "1:972408964955:web:fa5bdb1002aeffb9583c7e",
    measurementId: "G-F8K01N96WS"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;