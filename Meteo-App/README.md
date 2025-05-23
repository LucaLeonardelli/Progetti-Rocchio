# Meteo-App

## Descrizione del Progetto
Meteo-App è un'applicazione web progettata per fornire informazioni meteorologiche in tempo reale. 
L'app consente agli utenti di ottenere le condizioni meteo attuali per la loro posizione geografica 
o per una località specifica, inserendo latitudine e longitudine. L'obiettivo principale del progetto 
è offrire un'interfaccia semplice e intuitiva per consultare le previsioni del tempo.

## Funzionalità Principali

- **Meteo per la Posizione Attuale**: Utilizza la geolocalizzazione del browser per ottenere automaticamente le condizioni meteo della posizione corrente dell'utente (API JS Navigation).
- **Ricerca per Coordinate**: Permette di cercare le condizioni meteo di una località specifica inserendo latitudine e longitudine.
- **Dettagli Meteo**: Mostra informazioni come temperatura, velocità del vento e una descrizione visiva delle condizioni atmosferiche tramite icone intuitive (weather_code).
- **Interfaccia User-Friendly**: Design responsivo e intuitivo per una navigazione semplice.

## Tecnologie Utilizzate

- **HTML5**: Struttura del sito.
- **CSS3**: Stile e layout.
- **JavaScript**: Logica dell'applicazione, gestione delle chiamate API e manipolazione del DOM.
- **API Open-Meteo**: Per ottenere i dati meteorologici in tempo reale.
- **Bootstrap**: Per migliorare il design e la responsività.

## Come Funziona

1. **Posizione Attuale**:
   - L'app utilizza la geolocalizzazione del browser per ottenere automaticamente latitudine e longitudine.
   - I dati meteo vengono recuperati dall'API Open-Meteo e mostrati nella sezione "Posizione Attuale".

2. **Ricerca per Coordinate**:
   - L'utente può inserire manualmente latitudine e longitudine nei campi di input.
   - Dopo aver cliccato sul pulsante "Cerca", l'app recupera i dati meteo per la località specificata e li mostra nella sezione "Ricerca".

3. **Dettagli Meteo**:
   - Le informazioni includono:
     - Temperatura (in gradi Celsius).
     - Velocità del vento (in km/h).
     - Icone che rappresentano le condizioni atmosferiche (es. sole, pioggia, neve).

## Perché viene utilizzato `geolocation` in `navigator`?

Per offrire all’utente la possibilità di visualizzare le condizioni meteo della propria posizione attuale in modo automatico, l’app utilizza la funzionalità di **geolocalizzazione** fornita dai browser moderni tramite l’oggetto `navigator.geolocation`. Questo permette di ottenere le coordinate (latitudine e longitudine) dell’utente senza che debba inserirle manualmente.

### Come funziona

Quando la pagina viene caricata, viene chiamato il metodo `navigator.geolocation.getCurrentPosition()`. Questo metodo chiede all’utente il permesso di accedere alla posizione. Se l’utente accetta, il browser restituisce le coordinate geografiche correnti. Queste coordinate vengono poi utilizzate per effettuare una chiamata all’API di Open-Meteo, che restituisce le condizioni meteo aggiornate per quella posizione.

In sintesi:
- **Vantaggio**: L’utente può vedere subito il meteo della propria posizione senza inserire dati.
- **Funzionamento**: Il browser chiede il permesso, ottiene le coordinate e aggiorna automaticamente la sezione meteo della posizione attuale.

## Struttura del Progetto

- **index.html**: File principale che contiene la struttura dell'app.
- **stili.css**: File CSS per lo stile e il layout.
- **app.js**: File JavaScript per la logica dell'applicazione e le chiamate API.
- **README.md**: Documentazione del progetto.

## Autore

Questo progetto è stato realizzato da **Luca Leonardelli**.