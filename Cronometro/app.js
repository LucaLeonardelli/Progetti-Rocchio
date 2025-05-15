// Variabile per salvare l'intervallo del timer (setInterval)
let timerInterval; 

// Tempo trascorso in millisecondi
let elapsedTime = 0; 

// Stato del cronometro (true se in esecuzione, false se fermo)
let isRunning = false; 

// Contatore dei giri registrati
let giroCount = 0; 

// Funzione per formattare il tempo in formato mm:ss:ms
function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10); // Millisecondi (2 cifre)
    const seconds = Math.floor((ms / 1000) % 60); // Secondi
    const minutes = Math.floor((ms / (1000 * 60)) % 60); // Minuti

    // Formattazione con zero iniziale se necessario
    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

// Aggiorna il display del cronometro con il tempo attuale
function updateDisplay() {
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Avvia o ferma il cronometro a seconda dello stato attuale
function toggleTimer() {
    const startStopButton = document.getElementById("startStopButton");

    if (isRunning) {
        // Ferma il cronometro
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        startStopButton.textContent = "Avvia"; // Cambia il testo del pulsante
        startStopButton.style.backgroundColor = "#428a26"; // Cambia il colore del pulsante
    } else {
        // Avvia il cronometro
        const startTime = Date.now() - elapsedTime; // Calcola il tempo di partenza
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Aggiorna ogni 10 ms
        isRunning = true;
        startStopButton.textContent = "Ferma"; // Cambia il testo del pulsante
        startStopButton.style.backgroundColor = "#b32929"; // Cambia il colore del pulsante
    }
}

// Aggiunge un nuovo giro alla lista dei giri
function addGiro() {
    if (!isRunning) return; // Non aggiungere giri se il cronometro è fermo

    giroCount++; // Incrementa il numero del giro
    const containerGiri = document.getElementById("containerGiri");

    // Crea un nuovo div per il giro
    const giroDiv = document.createElement("div");
    giroDiv.classList.add("giro");
    giroDiv.innerHTML = `
        <p class="giro">Giro ${giroCount} :</p>
        <p class="tempoGiro">${formatTime(elapsedTime)}</p>
        <hr>
    `;

    // Aggiungi il nuovo giro al contenitore
    containerGiri.appendChild(giroDiv);
}

// Resetta il cronometro e la lista dei giri
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    isRunning = false;
    giroCount = 0; // Resetta il contatore dei giri
    updateDisplay();

    // Ripristina il pulsante a "Avvia"
    const startStopButton = document.getElementById("startStopButton");
    startStopButton.textContent = "Avvia";
    startStopButton.style.backgroundColor = "#428a26";

    // Rimuovi tutti gli elementi giro
    const containerGiri = document.getElementById("containerGiri");
    containerGiri.innerHTML = "";
}

// Aggiunge gli event listener ai pulsanti solo dopo che il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startStopButton").addEventListener("click", toggleTimer);
    document.getElementById("resetButton").addEventListener("click", resetTimer);
    document.getElementById("giroButton").addEventListener("click", addGiro);

    // Inizializza il display
    updateDisplay();
});