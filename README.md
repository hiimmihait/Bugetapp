# Buget — PWA personal

Aplicație de bugetare lunară, instalabilă ca PWA real pe iPhone.

## Ce conține

```
buget-pwa/
├── index.html                  aplicația
├── manifest.json                configurația PWA (nume, iconițe, culori)
├── sw.js                        service worker (funcționare offline)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png
└── README.md
```

Datele se salvează local pe telefon (`localStorage`), nu într-un cont sau server — rămân doar pe dispozitivul pe care deschizi aplicația.

## Pași pentru a o publica pe GitHub Pages

1. **Creează un repository nou** pe github.com (poate fi public sau privat — Pages funcționează și pentru repo-uri private dacă ai cont GitHub Pro, altfel trebuie public).

2. **Încarcă toate fișierele** din acest folder (`index.html`, `manifest.json`, `sw.js`, folderul `icons/`) direct în rădăcina repository-ului — nu într-un subfolder.
   - Cel mai simplu: pe pagina repo-ului, `Add file → Upload files`, tragi toate fișierele și folderul `icons`, apoi `Commit changes`.

3. **Activează GitHub Pages**:
   - `Settings → Pages`
   - La `Source`, alege `Deploy from a branch`
   - Branch: `main`, folder: `/ (root)`
   - Salvează.

4. După 1-2 minute, GitHub îți dă un link de forma:
   `https://<user-ul-tau>.github.io/<numele-repo-ului>/`

5. **Deschide acel link în Safari pe iPhone** (obligatoriu Safari, nu Chrome).

6. Apasă butonul **Share** (pătratul cu săgeata în sus) → **Add to Home Screen**.

Acum ai o iconiță reală pe ecranul principal, aplicația se deschide fără bara Safari, funcționează și offline (datorită service worker-ului), iar `manifest.json` face ca iOS s-o trateze ca pe o aplicație instalată propriu-zisă.

## Actualizări ulterioare

Dacă vrei să modifici aplicația mai târziu, editează `index.html` și încarcă din nou fișierul pe GitHub (`Add file → Upload files`, suprascrie). Modifică și numărul din `CACHE_NAME` din `sw.js` (ex: `buget-cache-v2`) ca telefonul să preia noua versiune, altfel service worker-ul va continua să servească din cache-ul vechi.

## Notă despre date

Fiindcă datele stau în `localStorage` al browser-ului, ele **nu se sincronizează** automat între dispozitive (ex: iPhone și laptop) și pot fi șterse dacă golești datele Safari sau dezinstalezi aplicația de pe ecranul principal. Dacă la un moment dat vrei sincronizare între dispozitive, pasul următor ar fi un mic backend (ex: Firebase, Supabase) — spune-mi dacă vrei să adaug asta.
