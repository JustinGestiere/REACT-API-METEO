import { useState } from "react";
import "./Semaine.css";

export default function Semaine() {
    const [ville, setVille] = useState(""); // Ville entrée par l'utilisateur
    const [forecastData, setForecastData] = useState(null); // Données météo sur 7 jours
    const [loading, setLoading] = useState(false); // État de chargement
    const [error, setError] = useState(null); // Gestion des erreurs

    const fetchForecastData = async (city) => {
        const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957";
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`;

        try {
            setLoading(true);
            setError(null); // Réinitialise les erreurs avant la requête
            setForecastData(null); // Réinitialise les données météo avant la requête

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            // Regrouper les données par jour
            const groupedData = {};
            data.list.forEach((item) => {
                const date = new Date(item.dt_txt).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
                if (!groupedData[date]) {
                    groupedData[date] = item; // Utilise la première occurrence de la journée
                }
            });

            // Récupérer les 7 jours (aujourd'hui + 6 jours suivants)
            const sortedDays = Object.values(groupedData).slice(0, 7);

            setForecastData(sortedDays);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if (ville.trim()) {
            fetchForecastData(ville); // Appelle la fonction pour récupérer les données
        }
    };

    return (
        <div className="semaine-container">
            <h1>Météo de la semaine</h1>

            {/* Formulaire pour entrer la ville */}
            <form onSubmit={handleFormSubmit} className="form">
                <input
                    type="text"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    placeholder="Entrez une ville"
                    className="input"
                />
                <button type="submit" className="button">
                    Rechercher
                </button>
            </form>

            {/* Gestion des états : chargement, erreur ou affichage des données */}
            {loading && <p>Chargement...</p>}
            {error && <p className="error">Erreur : {error}</p>}
            {forecastData && (
                <div className="forecast-container">
                    {forecastData.map((day, index) => (
                        <div key={index} className="forecast-day">
                            <h3>
                                {new Date(day.dt_txt).toLocaleDateString("fr-FR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </h3>
                            <img
                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={day.weather[0].description}
                                className="weather-icon"
                            />
                            <p>Température : {Math.round(day.main.temp)}°C</p>
                            <p>{day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
