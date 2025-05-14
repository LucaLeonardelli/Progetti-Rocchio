/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Funzione per ottenere la posizione dell'utente e mostrare il meteo
async function getWeatherByLocation() {
    if (!("geolocation" in navigator)) {
        console.log("Geolocalizzazione non supportata dal browser.");
        document.getElementById("attuale-posizione").innerHTML = "Geolocalizzazione non supportata dal browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (posizione) => {
        const lat = posizione.coords.latitude;
        const lon = posizione.coords.longitude;

        console.log(`Latitudine: ${lat}, Longitudine: ${lon}`);

        // Chiamata all'API Open-Meteo
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const meteo = data.current_weather;

            // Mappa dei codici meteo con icone corrispondenti
        const iconeMeteo = {
            0: "☀️ Cielo sereno",
            1: "🌤️ Prevalentemente sereno",
            2: "⛅ Parzialmente nuvoloso",
            3: "☁️ Nuvoloso",
            45: "🌫️ Nebbia",
            48: "🌫️ Nebbia con brina",
            51: "🌦️ Pioviggine leggera",
            53: "🌧️ Pioviggine moderata",
            55: "🌧️ Pioviggine intensa",
            61: "🌦️ Pioggia leggera",
            63: "🌧️ Pioggia moderata",
            65: "🌧️ Pioggia intensa",
            71: "❄️ Neve leggera",
            73: "❄️ Neve moderata",
            75: "❄️ Neve intensa",
            95: "⛈️ Temporali",
            96: "⛈️⚡ Temporali con grandine",
            99: "⛈️⚡ Temporali forti con grandine"
        };

        // Ottieni l'icona corrispondente al codice meteo
        const icona = iconeMeteo[meteo.weathercode] || "❓ Codice meteo sconosciuto";

            // Aggiorna il contenuto del risultato
            document.getElementById("attuale-posizione").innerHTML = `
                <p><strong>${icona}</strong></p>
                <p><strong>Temperatura:</strong> ${meteo.temperature}°C</p>
                <p><strong>Velocità del vento:</strong> ${meteo.windspeed} km/h</p>
            `;
        } catch (error) {
            console.error("Errore nel recupero dati meteo:", error);
            document.getElementById("attuale-posizione").innerHTML = "Errore nel recupero dei dati meteo.";
        }
    }, () => {
        console.log("Impossibile ottenere la posizione.");
        document.getElementById("attuale-posizione").innerHTML = "Impossibile ottenere la posizione.";
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getWeather(event) {
    // Previeni il comportamento predefinito del form
    event.preventDefault();

    const lat = document.getElementById("latitudine").value;
    const lon = document.getElementById("longitudine").value;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const meteo = data.current_weather;

        // Mappa dei codici meteo con icone corrispondenti
        const iconeMeteo = {
            0: "☀️ Cielo sereno",
            1: "🌤️ Prevalentemente sereno",
            2: "⛅ Parzialmente nuvoloso",
            3: "☁️ Nuvoloso",
            45: "🌫️ Nebbia",
            48: "🌫️ Nebbia con brina",
            51: "🌦️ Pioviggine leggera",
            53: "🌧️ Pioviggine moderata",
            55: "🌧️ Pioviggine intensa",
            61: "🌦️ Pioggia leggera",
            63: "🌧️ Pioggia moderata",
            65: "🌧️ Pioggia intensa",
            71: "❄️ Neve leggera",
            73: "❄️ Neve moderata",
            75: "❄️ Neve intensa",
            95: "⛈️ Temporali",
            96: "⛈️⚡ Temporali con grandine",
            99: "⛈️⚡ Temporali forti con grandine"
        };

        // Ottieni l'icona corrispondente al codice meteo
        const icona = iconeMeteo[meteo.weathercode] || "❓ Codice meteo sconosciuto";

        // Aggiorna il contenuto del risultato
        document.getElementById("risultato").innerHTML = `
            <p><strong>${icona}</strong></p>
            <p><strong>Temperatura:</strong> ${meteo.temperature}°C</p>
            <p><strong>Velocità del vento:</strong> ${meteo.windspeed} km/h</p>
        `;
    } catch (error) {
        document.getElementById("risultato").innerHTML = "Errore nel recupero dei dati.";
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Aggiungi un listener per il caricamento del DOM
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ricerca-form").addEventListener("submit", getWeather);
    getWeatherByLocation();
});

