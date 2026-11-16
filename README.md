# Virtuālā izstāde — Pirmie soļi uz Mēness

## 1. Projekta apraksts

Šī ir praktisko mācību tīmekļa vietne par Apollo 11. Izstāde iepazīstina ar apkalpi un parāda misijas norisi astoņās NASA arhīva fotogrāfijās.

- Tēma — kosmoss un zinātniskie atklājumi
- Izstādes nosaukums — Pirmie soļi uz Mēness

## 2. Komandas dalībnieki

1. [Vārds, uzvārds]
2. [Vārds, uzvārds]
3. [Vārds, uzvārds, ja komandā ir trīs dalībnieki]

## 3. GitHub repozitorijs

[Ievietojiet komandas GitHub repozitorija saiti un piešķiriet pasniedzējam piekļuvi, ja repozitorijs ir privāts.]

To pašu saiti ierakstiet failā `GitHub-saite.txt` iesniegšanai Moodle.

## 4. Izmantotās tehnoloģijas

- HTML5 — lapas semantiskā struktūra, navigācija un attēlu apraksti.
- CSS3 — Box Model, CSS Grid kolekcijai, Flexbox galvenei un multivides vaicājumi dažādiem ekrāna platumiem.
- JavaScript — karuseļa vadība, DOM elementu atlase un atjaunināšana, kā arī pogu notikumu apstrāde.
- GitHub — komandas sadarbībai un versiju kontrolei.

## 5. Tīmekļa vietnes funkcionalitāte

- Galvenē ir saites uz izstādes aprakstu, galeriju un karuseli.
- Galerijā ir astoņas fotogrāfijas ar nosaukumiem un aprakstiem. Visas fotogrāfijas glabājas mapē `images/` WebP formātā.
- Karuselis izmanto piecas galerijā atzīmētās fotogrāfijas. Pogas “Iepriekšējais” un “Nākamais” pārslēdz kadrus abos virzienos. Pēc pēdējā kadra secība sākas no jauna.
- Automātiskā pārslēgšana maina kadru ik pēc piecām sekundēm. To var apturēt un atsākt ar to pašu pogu. Ja ierīcē ieslēgta samazināta kustība, sākumā karuselis gaida lietotāja darbību.

### Karuseļa kods

`showSlide()` atlasa kadru un atjaunina attēlu, tā alternatīvo tekstu, nosaukumu un aprakstu. `startPlayback()` ieplāno nākamo pārslēgšanu, bet `stopPlayback()` atceļ ieplānoto darbību. Atkārtoti sākot pārslēgšanu, darbojas tikai viens taimeris.

Izmantoti principi no mācību grāmatas *Learn JavaScript and AJAX with w3schools*. 1. nodaļā aprakstīts ārēja JavaScript faila pieslēgums, 24. nodaļā — attēla maiņa ar DOM, savukārt 26. nodaļā — `setTimeout()` un `clearTimeout()` izmantošana.

## 6. Projekta palaišana

Projektam nepieciešama tīmekļa pārlūkprogramma. Izvēlieties vienu no tālāk norādītajiem serveriem un vispirms instalējiet tā darbībai nepieciešamo programmu. Ja projektu klonējat no GitHub, nepieciešams arī Git.

### Pamata palaišana ar Python

Instalējiet Python 3 no [python.org](https://www.python.org/downloads/) vai Linux pakotņu pārvaldnieka. Atveriet termināli projekta mapē un palaidiet:

**Linux:**

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

**Windows (PowerShell):**

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1
```

Atveriet http://127.0.0.1:8000/. Python serveris nenorāda statisko resursu kešatmiņas termiņu ar `Cache-Control`.

### Palaišana ar Node.js un kešatmiņu

Instalējiet [Node.js](https://nodejs.org/en/download). Projekta mapē palaidiet:

```sh
node server.mjs
```

Atveriet http://127.0.0.1:8000/. Attēliem, CSS, JavaScript un favicon pārlūka kešatmiņas termiņš ir 30 dienas. HTML pārlūks pārbauda katrā apmeklējumā.

Pirms cita servera palaišanas apturiet pašreizējo ar Ctrl+C, lai atbrīvotu portu 8000.

### Publiska HTTPS pārbaude

Instalējiet `cloudflared` pēc [Cloudflare norādēm](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/). Windows var izmantot arī `winget install --exact --id Cloudflare.cloudflared`.

Atstājiet izvēlēto serveri darboties un otrā terminālī palaidiet:

```sh
cloudflared tunnel --url http://127.0.0.1:8000
```

## 7. Komandas ieguldījums

- [Vārds, uzvārds] — [faktiski paveiktais darbs].
- [Vārds, uzvārds] — [faktiski paveiktais darbs].
- [Vārds, uzvārds, ja komandā ir trīs dalībnieki] — [faktiski paveiktais darbs].

## Avoti

- [NASA — Apollo 11 misijas apraksts](https://www.nasa.gov/specials/apollo50th/missions.html)
- [NASA — Apollo 11 fotogrāfiju arhīvs](https://www.nasa.gov/wp-content/uploads/static/history/ap11ann/kippsphotos/apollo.html)
- [NASA — Apollo 11 attēlu bibliotēka](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html)
- [NASA — attēlu izmantošanas noteikumi](https://www.nasa.gov/nasa-brand-center/images-and-media/)

Fotogrāfijas nodrošina NASA. Katras fotogrāfijas identifikators norādīts galerijā.

| Fails | NASA identifikators |
| --- | --- |
| `apkalpe.webp` | S69-34882 |
| `starts.webp` | S69-39525 |
| `zemes-lekts.webp` | AS11-44-6550 |
| `noseshanas-vieta.webp` | AS11-37-5454 |
| `zabaka-nospiedums.webp` | AS11-40-5880 |
| `oldrins.webp` | AS11-40-5903 |
| `modulis-orbita.webp` | AS11-44-6642 |
| `atpakalcels.webp` | AS11-44-6689 |
