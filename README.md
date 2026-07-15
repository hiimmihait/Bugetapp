# Buget

O aplicație simplă de bugetare lunară — deschisă, fără reclame, fără cont plătit, fără să-ți vândă datele. O ții pe telefon ca pe orice altă aplicație.

**Încearc-o aici:** https://hiimmihait.github.io/Bugetapp/

## De ce

Majoritatea aplicațiilor de buget sunt fie prea complicate, fie vor un abonament, fie îți cer acces la tot contul bancar. Asta face un singur lucru: îți arată clar câți bani mai ai de cheltuit luna asta, fără fasoane.

## Ce poți face

- 💰 **Îți setezi un buget lunar** și vezi în timp real cât ți-a mai rămas
- 🧾 **Cheltuieli fixe** (chirie, abonamente) — se copiază automat de la o lună la alta, nu le mai adaugi de fiecare dată
- 🛒 **Cheltuieli ocazionale** — orice cumperi în plus
- 🐷 **Economii** — o secțiune separată pentru banii puși deoparte
- ✏️ Editezi sau ștergi orice cheltuială oricând
- 📅 Treci printre luni și îți vezi istoricul complet
- ☁️ Te loghezi cu Google și ai aceleași date pe telefon, tabletă sau laptop
- 📶 Merge și fără internet — se sincronizează singură când revii online

## Cum o instalezi pe telefon

1. Deschide link-ul de mai sus în **Safari** (iPhone) sau **Chrome** (Android)
2. Conectează-te cu contul tău Google
3. Apasă butonul de Share/meniu → **Add to Home Screen**

Gata — ai o iconiță pe ecranul principal, ca orice altă aplicație. Datele tale sunt private, legate de contul tău Google, și nu le vede nimeni altcineva.

---

<details>
<summary>Detalii tehnice (pentru cine vrea să-și găzduiască propria copie)</summary>

Aplicația e un PWA static (HTML/CSS/JS, fără build), care folosește Firebase pentru autentificare și stocarea datelor. Codul e în acest repository — poți face un fork și să-l pui pe propriul GitHub Pages, cu propriul proiect Firebase.

**Structură:**
```
index.html          aplicația
manifest.json        configurație PWA
sw.js                 service worker (offline)
firebase-config.js    cheile proiectului Firebase
icons/                iconițe PWA
```

**Pași pe scurt:** creezi un proiect Firebase → activezi Google Sign-In → creezi o bază de date Firestore → publici regulile de securitate mai jos → înregistrezi o aplicație web și copiezi cheile în `firebase-config.js` → publici totul pe GitHub Pages → adaugi domeniul la "Authorized domains" în Firebase.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /budgetUsers/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

</details>
