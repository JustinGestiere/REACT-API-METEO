import { useState } from 'react';

export default function Semaine() {
    const [ville, setVille] = useState(""); // Valeur de la ville entrée par l'utilisateur
    const [weatherData, setWeatherData] = useState(null); // Données météo
    const [loading, setLoading] = useState(false); // État de chargement
    const [error, setError] = useState(null); // Gestion des erreurs

    const fetchWeatherData = async (city) => {
        const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`;

        try {
            setLoading(true);
            setError(null); // Réinitialise les erreurs avant la requête
            setWeatherData(null); // Réinitialise les données météo avant la requête

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if (ville.trim()) {
            fetchWeatherData(ville); // Appelle la fonction pour récupérer les données
        }
    };

    return (
        <div>
            <h1>Météo</h1>

            {/* Formulaire pour entrer la ville */}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    placeholder="Entrez une ville"
                />
                <button type="submit">Rechercher</button>
            </form>

            {/* Gestion des états : chargement, erreur ou affichage des données */}
            {loading && <p>Chargement...</p>}
            {error && <p>Erreur : {error}</p>}
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Température : {weatherData.main.temp}°C</p>
                    <p>Conditions : {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}
