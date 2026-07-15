# Buget — PWA personal, cu sincronizare între dispozitive

Aplicație de bugetare lunară, instalabilă ca PWA real pe iPhone, cu date salvate în cloud (Firebase) — te conectezi cu contul Google și vezi aceleași date pe orice dispozitiv.

## Ce conține

```
buget-pwa/
├── index.html                  aplicația
├── manifest.json                configurația PWA (nume, iconițe, culori)
├── sw.js                        service worker (funcționare offline)
├── firebase-config.js           AICI pui cheile tale Firebase (pasul 2 mai jos)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── README.md
```

## Pasul 1 — creează un proiect Firebase (gratuit)

1. Intră pe console.firebase.google.com și conectează-te cu contul tău Google.
2. Apasă **Add project** (Adaugă proiect). Dă-i un nume, ex. `buget-personal`. Poți dezactiva Google Analytics (nu e necesar). Apasă **Create project**.
3. În meniul din stânga, apasă pe **Build → Authentication**. Apasă **Get started**. La lista de furnizori, alege **Google**, activează comutatorul (Enable), alege un email de suport, apasă **Save**.
4. Tot în meniul din stânga, apasă **Build → Firestore Database**. Apasă **Create database**. Alege o locație (orice, ex. `eur3`) și selectează **Start in production mode**. Apasă **Create**.
5. După ce baza de date e creată, mergi la tab-ul **Rules** din Firestore și înlocuiește conținutul cu:

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

   Apasă **Publish**. Asta face ca fiecare cont Google să-și vadă doar propriile date.

## Pasul 2 — copiază cheile de configurare

1. În Firebase Console, apasă pe roata dințată din stânga-sus → **Project settings**.
2. Coboară la secțiunea **Your apps**, apasă pe iconița `</>` (Web) pentru a înregistra o aplicație web. Dă-i un nume (ex. `buget-web`), NU bifa Firebase Hosting. Apasă **Register app**.
3. Îți va apărea un bloc de cod cu `const firebaseConfig = { ... }`. Copiază acele valori.
4. Deschide fișierul `firebase-config.js` din acest folder și înlocuiește valorile placeholder cu cele copiate. Salvează fișierul.

## Pasul 3 — publică pe GitHub Pages

1. Creează un repository nou pe github.com (Public).
2. `Add file → Upload files` și încarcă tot conținutul folderului `buget-pwa` (inclusiv `firebase-config.js` completat și folderul `icons`) direct în rădăcina repo-ului. Apasă **Commit changes**.
3. `Settings → Pages` → Source: `Deploy from a branch`, Branch: `main`, folder `/ (root)` → **Save**.
4. După 1-2 minute, vei avea un link de forma `https://user-ul-tau.github.io/numele-repo/`.

## Pasul 4 — autorizează domeniul în Firebase

Firebase blochează implicit autentificarea de pe domenii necunoscute:

1. În Firebase Console → **Authentication → Settings → Authorized domains**.
2. Apasă **Add domain** și adaugă `user-ul-tau.github.io` (fără `https://` și fără calea către repo).
3. Salvează.

## Pasul 5 — instalează pe iPhone

1. Deschide link-ul GitHub Pages în Safari.
2. Apasă **Continuă cu Google** și conectează-te.
3. Apasă butonul Share → **Add to Home Screen**.
4. Repetă pe orice alt dispozitiv (telefon, laptop) — conectându-te cu același cont Google vei vedea aceleași date, sincronizate automat.

## Actualizări ulterioare

Dacă modifici `index.html`, urcă din nou fișierul pe GitHub și crește numărul din `CACHE_NAME` din `sw.js` (ex. `buget-cache-v4`), altfel dispozitivele deja instalate vor continua să folosească versiunea veche din cache o vreme.

## Notă despre confidențialitate

`firebase-config.js` conține chei publice (nu secrete — sunt vizibile oricui deschide site-ul, e normal pentru aplicații web Firebase). Ce protejează efectiv datele tale sunt regulile Firestore de la Pasul 1.5 — asigură-te că le-ai publicat exact ca mai sus, altfel oricine autentificat ar putea citi datele altcuiva.
