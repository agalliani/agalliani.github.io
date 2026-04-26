# Piano di lavoro — Sanity Fix agalliani.github.io

Sei un agente che lavora sul sito personale `agalliani.github.io` (Vue.js + Vite + Tailwind CSS, hosted su GitHub Pages).
Hai accesso diretto ai file sorgente nella cartella del progetto.

Il tuo compito è eseguire in sequenza le seguenti fix, verificando ogni modifica prima di passare alla successiva.

---

## FIX 1 — Email errata nel Footer (URGENTE)

**File:** `src/components/Footer.vue`

**Problema:** L'email mostrata e il link `mailto:` contengono `andreagalliani29@gmail.com`, che è un indirizzo sbagliato.

**Azione:** Sostituisci tutte le occorrenze di `andreagalliani29@gmail.com` con `andrea.galliani.29@gmail.com` nel file `Footer.vue`.

**Verifica:** Cerca nel file che non rimanga nessuna occorrenza del vecchio indirizzo.

---

## FIX 2 — Link Oxymeter (URGENTE)

**File:** `src/components/Projects.vue`

**Problema:** Il link del progetto Oxymeter punta a `https://agalliani.github.io/frontend-oxymeter/#/`, che è un dominio/path vecchio.

**Azione:** Il nuovo URL corretto per l'app Oxymeter è `https://www.oxymeter.it/` , poi aggiorna il campo `link` nell'oggetto corrispondente nell'array `webApps`.

---

## FIX 3 — og:image con URL assoluto

**File:** `index.html`

**Problema:** Il meta tag Open Graph per l'immagine usa un path relativo:
```html
<meta property="og:image" content="/propic.webp">
```
I path relativi non funzionano quando il link viene condiviso sui social (LinkedIn, Twitter, ecc.).

**Azione:** Sostituisci con l'URL assoluto:
```html
<meta property="og:image" content="https://agalliani.github.io/propic.webp">
```

---

## FIX 4 — Aggiunta og:url mancante

**File:** `index.html`

**Problema:** Manca il meta tag `og:url`, consigliato per SEO e condivisione social.

**Azione:** Aggiungi subito dopo il tag `og:image` esistente:
```html
<meta property="og:url" content="https://agalliani.github.io/">
```

---

## FIX 5 — Aggiornamento Font Awesome

**File:** `index.html`

**Problema:** Viene caricata Font Awesome versione `6.2.0` (2022), obsoleta.

**Azione:** Aggiorna il link CDN alla versione `6.6.0`:
```html
<!-- DA -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />

<!-- A -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
```

**Verifica:** Controlla che le icone del sito siano ancora visibili dopo la modifica (i nomi delle classi sono retrocompatibili).

---

## FIX 6 — Gallery vuota per "Mechanical Design & 3D Prototyping"

**File:** `src/assets/images/ventures/mechanical/` e `src/components/Projects.vue`

**Problema:** Il progetto "Mechanical Design & 3D Prototyping" chiama `getGallery('ventures/mechanical')` ma la cartella è vuota — nessuna immagine viene mostrata.

**Azione:** Chiedi all'utente se vuole:
- (a) Aggiungere immagini alla cartella `src/assets/images/ventures/mechanical/`
- (b) Rimuovere temporaneamente il campo `gallery` dall'oggetto del progetto, così la card non mostra lo spazio vuoto

Attendi la risposta prima di procedere.

---

## FIX 7 — Cleanup file scaffolding inutilizzati

**File da eliminare** (residui del template Vue, non importati da nessuna parte):
- `src/components/HelloWorld.vue`
- `src/components/TheWelcome.vue`
- `src/components/WelcomeItem.vue`
- `src/stores/counter.ts`

**Azione:** Prima di eliminare, verifica con una ricerca globale (grep) che nessuno di questi file sia importato altrove nel progetto. Se la ricerca conferma che non sono usati, eliminali.

---

## FIX 8 — Service Worker kill switch (post FIX 2)

**File:** `index.html`

**Problema:** Il kill switch del Service Worker referenzia il vecchio path `/frontend-oxymeter`:
```js
if (window.location.pathname.startsWith('/timeline-me') || window.location.pathname.startsWith('/frontend-oxymeter')) {
```

**Azione:** Una volta noto il nuovo URL dell'app Oxymeter (da FIX 2), aggiorna questa condizione con il nuovo path corretto. Se l'app non usa più un Service Worker, rimuovi la entry `/frontend-oxymeter` del tutto.

---

## Riepilogo ordine di esecuzione

| # | Fix | Priorità | Autonomia |
|---|-----|----------|-----------|
| 1 | Email errata nel footer | 🔴 Urgente | Esegui subito |
| 2 | Link Oxymeter | 🔴 Urgente | Chiedi URL all'utente |
| 3 | og:image assoluto | 🟡 Media | Esegui subito |
| 4 | og:url mancante | 🟡 Media | Esegui subito |
| 5 | Font Awesome aggiornamento | 🟡 Media | Esegui subito |
| 6 | Gallery Mechanical vuota | 🟡 Media | Chiedi all'utente |
| 7 | Cleanup scaffolding | 🔵 Bassa | Esegui dopo verifica grep |
| 8 | Service Worker kill switch | 🔵 Bassa | Esegui dopo FIX 2 |

Al termine di tutte le fix, crea un commit con messaggio: `fix: sanity fixes — email, OG tags, Font Awesome, cleanup`
