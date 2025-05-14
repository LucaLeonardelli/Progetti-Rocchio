let timerInterval; // Variabile per salvare l'intervallo
let elapsedTime = 0; // Tempo trascorso in millisecondi
let isRunning = false; // Stato del cronometro
let giroCount = 0; // Contatore dei giri

// Funzione per formattare il tempo in mm:ss:ms
function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10); // Millisecondi (2 cifre)
    const seconds = Math.floor((ms / 1000) % 60); // Secondi
    const minutes = Math.floor((ms / (1000 * 60)) % 60); // Minuti

    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

// Funzione per aggiornare il display
function updateDisplay() {
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Funzione per avviare o fermare il cronometro
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
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); // Aggiorna ogni 10 ms
        isRunning = true;
        startStopButton.textContent = "Ferma"; // Cambia il testo del pulsante
        startStopButton.style.backgroundColor = "#b32929"; // Cambia il colore del pulsante
    }
}

// Funzione per aggiungere un giro
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

// Funzione per resettare il cronometro
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

// Aggiungi gli event listener ai pulsanti solo dopo che il DOM è pronto
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startStopButton").addEventListener("click", toggleTimer);
    document.getElementById("resetButton").addEventListener("click", resetTimer);
    document.getElementById("giroButton").addEventListener("click", addGiro);

    // Inizializza il display
    updateDisplay();
});