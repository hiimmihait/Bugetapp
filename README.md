# Buget

Aplicație personală de bugetare lunară, construită ca PWA (Progressive Web App) — se instalează pe ecranul principal al telefonului ca o aplicație reală, funcționează offline și sincronizează datele în cloud între toate dispozitivele tale, prin autentificare cu Google.

## Ce face

- **Buget lunar** — setezi o sumă totală pentru lună; aplicația calculează automat cât ți-a mai rămas pe măsură ce adaugi cheltuieli.
- **Cheltuieli fixe** — chirie, abonamente, facturi recurente. Se copiază automat în luna următoare, ca să nu le reintroduci de fiecare dată.
- **Cheltuieli ocazionale** — cumpărături, ieșiri, orice cost neregulat.
- **Economii** — o secțiune separată pentru sumele puse deoparte.
- Fiecare categorie afișează suma totală a elementelor din ea.
- Poți edita numele și suma oricărei cheltuieli deja adăugate, sau o poți șterge.
- Bifarea unei cheltuieli o marchează ca plătită (vizual), fără să afecteze calculul sumei rămase — suma se scade din buget din momentul adăugării.
- Navigare rapidă între luni, cu istoric complet; aplicația se deschide mereu pe ultima lună în care ai făcut o modificare.
- Autentificare cu Google — aceleași date, pe orice telefon sau computer.
- Funcționează offline (datele locale sunt disponibile chiar și fără semnal; se sincronizează la reconectare).

## Tehnologii

- HTML, CSS și JavaScript vanilla (fără framework, fără build step)
- Firebase Authentication (Google Sign-In)
- Firebase Firestore pentru salvarea datelor
- Service Worker pentru cache și funcționare offline
- Web App Manifest pentru instalare ca PWA pe iOS/Android

## Structura proiectului

```
buget-pwa/
├── index.html                  aplicația (interfață + logică)
├── manifest.json                configurația PWA (nume, iconițe, culori)
├── sw.js                        service worker (cache & offline)
├── firebase-config.js           cheile proiectului tău Firebase
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── README.md
```

## Cum îl pui pe picioare

Pe scurt, ai nevoie de un proiect Firebase gratuit (pentru autentificare și stocarea datelor) și de un loc unde să găzduiești fișierele static (GitHub Pages, gratuit).

1. **Creează un proiect Firebase** — console.firebase.google.com → Add project.
2. **Activează Google Sign-In** — Build → Authentication → Get started → provider Google → Enable.
3. **Creează baza de date** — Build → Firestore Database → Create database → production mode.
4. **Setează regulile Firestore**, în tab-ul Rules:

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

5. **Înregistrează o aplicație Web** — Project settings → Your apps → `</>` → copiezi valorile în `firebase-config.js`.
6. **Publică pe GitHub Pages** — încarci toate fișierele într-un repository nou, apoi Settings → Pages → Deploy from a branch → `main` / `root`.
7. **Autorizează domeniul** — Authentication → Settings → Authorized domains → adaugi domeniul tău `*.github.io`.
8. **Instalează pe telefon** — deschizi link-ul în Safari (iOS) sau Chrome (Android) → Share/meniu → Add to Home Screen.

## Confidențialitate

`firebase-config.js` conține chei publice, nu secrete — sunt vizibile oricui deschide site-ul, e normal pentru aplicații web Firebase. Ce protejează efectiv datele fiecărui utilizator sunt regulile Firestore de mai sus: fiecare cont Google are acces doar la propriile date.

Datele nu sunt colectate, vândute sau folosite în alt scop — stau exclusiv în baza de date Firestore a proiectului tău, sub controlul tău complet.
