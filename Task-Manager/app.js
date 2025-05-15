let cardSelezionata = null; // Variabile per salvare la card selezionata per modifica/eliminazione

// Funzione per la ricerca delle attività
function ricerca() {
    // Ottieni il valore dell'input di ricerca
    const valoreRicerca = document.getElementById("ricerca").value.toLowerCase();

    // Ottieni tutte le card delle attività
    const cards = Array.from(document.querySelectorAll(".contenutoCard .col"));

    // Ordina le card in base alla corrispondenza con il valore di ricerca
    const cardsOrdinate = cards.sort((a, b) => {
        const nomeA = a.querySelector(".nomeAttivita").textContent.toLowerCase();
        const nomeB = b.querySelector(".nomeAttivita").textContent.toLowerCase();

        // Card che corrispondono meglio al valore di ricerca vengono messe prima
        const matchA = nomeA.includes(valoreRicerca) ? 1 : 0;
        const matchB = nomeB.includes(valoreRicerca) ? 1 : 0;

        return matchB - matchA; // Ordina in base alla corrispondenza
    });

    // Rimuovi tutte le card dal contenitore
    const contenutoCard = document.querySelector(".contenutoCard .row");
    contenutoCard.innerHTML = "";

    // Riaggiungi le card ordinate
    cardsOrdinate.forEach(card => contenutoCard.appendChild(card));
}

// Funzione per creare o modificare un'attività
function creaAttivita() {
    document.getElementById("crea-modificaButton").textContent = "Crea"; // Cambia il testo del pulsante

    // Ottieni i valori dal modal
    const nomeAttivita = document.getElementById("nomeAttivita").value;
    const descrizioneAttivita = document.getElementById("descrizioneAttivita").value;
    const statoAttivita = document.getElementById("opzioniAttivita").value;

    // Verifica che i campi non siano vuoti
    if (!nomeAttivita || !descrizioneAttivita) {
        alert("Per favore, compila tutti i campi.");
        return;
    }

    // Assegna uno stile diverso in base allo stato dell'attività
    let classeStato = "";
    if (statoAttivita === "daFare") {
        classeStato = "box-shadow: 0 0 10px rgb(223, 85, 85);";
    } else if (statoAttivita === "inCorso") {
        classeStato = "box-shadow: 0 0 10px rgb(211, 154, 69);";
    } else if (statoAttivita === "completata") {
        classeStato = "box-shadow: 0 0 10px rgb(97, 211, 69);";
    }

    if (cardSelezionata) {
        // Modifica la card esistente
        cardSelezionata.querySelector(".nomeAttivita").textContent = nomeAttivita;
        cardSelezionata.querySelector(".task-text").textContent = descrizioneAttivita;
        cardSelezionata.querySelector(".card").style = classeStato;

        // Resetta la variabile cardSelezionata
        cardSelezionata = null;
    } else {
        // Crea una nuova card attività
        const nuovaCard = document.createElement("div");
        nuovaCard.classList.add("col");
        nuovaCard.innerHTML = `
            <div class="card h-100" style="${classeStato}">
                <h1 class="nomeAttivita">${nomeAttivita}</h1>
                <span class="task-text">${descrizioneAttivita}</span>
                <hr>
                <div class="task-buttons">
                    <input class="task-button" type="button" name="modifica" value="Modifica" data-bs-toggle="modal" data-bs-target="#modalCreaAttivita" onclick="openModalModifica(this)">
                    <input class="task-button elimina" type="button" name="elimina" value="Elimina" data-bs-toggle="modal" data-bs-target="#modalElimina" onclick="openModalElimina(this)">
                </div>
            </div>
        `;

        // Aggiungi la nuova card al contenitore
        const contenutoCard = document.querySelector(".contenutoCard .row");
        contenutoCard.appendChild(nuovaCard);
    }

    // Resetta i campi del modal
    document.getElementById("nomeAttivita").value = "";
    document.getElementById("descrizioneAttivita").value = "";
    document.getElementById("opzioniAttivita").value = "daFare";
}

// Apre il modal di modifica e carica i dati della card selezionata
function openModalModifica(button) {
    document.getElementById("crea-modificaButton").textContent = "Modifica"; // Cambia il testo del pulsante
    // Salva la card selezionata
    cardSelezionata = button.closest('.col');

    // Ottieni i dati della card selezionata
    const nomeAttivita = cardSelezionata.querySelector(".nomeAttivita").textContent;
    const descrizioneAttivita = cardSelezionata.querySelector(".task-text").textContent;

    // Imposta i valori nel modal
    document.getElementById("nomeAttivita").value = nomeAttivita;
    document.getElementById("descrizioneAttivita").value = descrizioneAttivita;

    // Imposta lo stato dell'attività nel modal in base al colore della box-shadow
    const statoAttivita = cardSelezionata.querySelector(".card").style.boxShadow;
    if (statoAttivita.includes("rgb(223, 85, 85)")) {
        document.getElementById("opzioniAttivita").value = "daFare";
    } else if (statoAttivita.includes("rgb(211, 154, 69)")) {
        document.getElementById("opzioniAttivita").value = "inCorso";
    } else if (statoAttivita.includes("rgb(97, 211, 69)")) {
        document.getElementById("opzioniAttivita").value = "completata";
    }
}

// Apre il modal di eliminazione e salva la card selezionata
function openModalElimina(button) {
    cardSelezionata = button.closest('.col');
}

// Elimina la card selezionata
function eliminaAttivita() {
    if (cardSelezionata) {
        cardSelezionata.remove(); // Rimuove la card dal DOM
        cardSelezionata = null; // Resetta la variabile
    }
}

// Filtra le attività in base allo stato selezionato
function filtraStato() {
    // Ottieni il valore selezionato dal menu a tendina
    const statoSelezionato = document.getElementById("filtroStato").value;

    // Ottieni tutte le card
    const cards = Array.from(document.querySelectorAll(".contenutoCard .col"));

    // Ordina le card in base allo stato selezionato
    const cardsOrdinate = cards.sort((a, b) => {
        const statoA = a.querySelector(".card").style.boxShadow;
        const statoB = b.querySelector(".card").style.boxShadow;

        // Funzione per determinare la priorità in base allo stato
        const getPriority = (stato) => {
            if (stato.includes("rgb(223, 85, 85)")) return "daFare";
            if (stato.includes("rgb(211, 154, 69)")) return "inCorso";
            if (stato.includes("rgb(97, 211, 69)")) return "completata";
            return "altro";
        };

        const priorityA = getPriority(statoA) === statoSelezionato ? 1 : 0;
        const priorityB = getPriority(statoB) === statoSelezionato ? 1 : 0;

        return priorityB - priorityA; // Ordina in base alla priorità
    });

    // Rimuovi tutte le card dal contenitore
    const contenutoCard = document.querySelector(".contenutoCard .row");
    contenutoCard.innerHTML = "";

    // Riaggiungi le card ordinate
    cardsOrdinate.forEach(card => contenutoCard.appendChild(card));
}