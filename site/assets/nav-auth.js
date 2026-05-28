import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyCX6dMDVlO9sXKGiD3tAYckwRVPnw7N2is",
  authDomain: "sloward-barbershop.firebaseapp.com",
  projectId: "sloward-barbershop",
  storageBucket: "sloward-barbershop.firebasestorage.app",
  messagingSenderId: "357437108740",
  appId: "1:357437108740:web:ce61f750671c15b792fb51"
});

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  const btn = document.querySelector('a[href="/login"].icon-btn');
  if (!btn) return;
  if (user) {
    const nome = user.displayName || user.email;
    const letra = nome.charAt(0).toUpperCase();
    btn.href = "/conta";
    btn.title = "Minha conta";
    btn.setAttribute("aria-label", "Minha conta");
    btn.innerHTML = `<span style="width:32px;height:32px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:14px;font-weight:700;color:#fff;">${letra}</span>`;
  }
});
