import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCX6dMDVlO9sXKGiD3tAYckwRVPnw7N2is",
  authDomain: "sloward-barbershop.firebaseapp.com",
  projectId: "sloward-barbershop",
  storageBucket: "sloward-barbershop.firebasestorage.app",
  messagingSenderId: "357437108740",
  appId: "1:357437108740:web:ce61f750671c15b792fb51"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
