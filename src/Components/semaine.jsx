import { useState } from "react"; // Importation de l'état local depuis React
import "./Semaine.css"; // Importation du fichier CSS pour la mise en forme

export default function Semaine() {
    // États nécessaires au fonctionnement du composant
    const [ville, setVille] = useState(""); // État pour stocker la ville saisie par l'utilisateur
    const [meteo, setMeteo] = useState([]); // État pour stocker les données météo des 7 jours
    const [loading, setLoading] = useState(false); // État pour gérer le chargement des données
    const [erreur, setErreur] = useState(""); // État pour gérer les erreurs éventuelles

    // Fonction pour récupérer les données météo depuis l'API OpenWeather
    const fetchMeteo = async () => {
        const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957"; // Clé API personnelle
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&lang=fr&units=metric`;

        try {
            setLoading(true); // Active l'état de chargement
            setErreur(""); // Réinitialise l'erreur avant la requête
            setMeteo([]); // Réinitialise les données météo avant la requête

            // Effectuer la requête API
            const response = await fetch(url);
            if (!response.ok) {
                // Si la réponse est invalide, on génère une erreur
                throw new Error(`Erreur : ${response.status}`);
            }

            // Récupérer les données JSON de l'API
            const data = await response.json();

            // Regrouper les données par jour (ignorer l'heure)
            const previsionsParJour = {};
            data.list.forEach((item) => {
                const date = item.dt_txt.split(" ")[0]; // Récupère uniquement la date (format YYYY-MM-DD)
                if (!previsionsParJour[date]) {
                    previsionsParJour[date] = item; // Utilise la première prévision pour chaque jour
                }
            });

            // Convertir en tableau et récupérer uniquement les 7 premiers jours
            const previsions = Object.values(previsionsParJour).slice(0, 7);
            setMeteo(previsions); // Met à jour l'état avec les données filtrées
        } catch (err) {
            // En cas d'erreur, on met à jour l'état avec le message d'erreur
            setErreur(err.message);
        } finally {
            // Désactive l'état de chargement
            setLoading(false);
        }
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page après la soumission
        if (ville.trim()) {
            fetchMeteo(); // Appelle la fonction pour récupérer les données météo
        }
    };

    return (
        <div className="semaine-container">
            <h1>Météo de la semaine</h1>

            {/* Formulaire pour saisir une ville */}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text" // Champ de saisie pour la ville
                    value={ville} // Valeur liée à l'état `ville`
                    onChange={(e) => setVille(e.target.value)} // Met à jour `ville` en temps réel
                    placeholder="Entrez une ville" // Texte d'invite
                    className="input" // Classe CSS pour la mise en forme
                />
                <button type="submit" className="button"> {/* Bouton avec la classe CSS */}
                    Rechercher
                </button>
            </form>

            {/* Gestion des états : chargement, erreur ou affichage des données */}
            {loading && <p>Chargement...</p>} {/* Affiche "Chargement" pendant la requête */}
            {erreur && <p className="error">Erreur : {erreur}</p>} {/* Affiche un message d'erreur si nécessaire */}
            
            {/* Affiche les prévisions météo si elles sont disponibles */}
            <div className="forecast-container">
                {meteo.map((jour, index) => (
                    <div key={index} className="forecast-day">
                        <h3>
                            {new Date(jour.dt_txt).toLocaleDateString("fr-FR", {
                                weekday: "long", // Nom complet du jour (ex. lundi)
                                day: "numeric", // Numéro du jour
                                month: "long", // Nom complet du mois (ex. janvier)
                            })}
                        </h3>
                        {/* Affichage de l'icône météo */}
                        <img
                            src={`http://openweathermap.org/img/wn/${jour.weather[0].icon}@2x.png`}
                            alt={jour.weather[0].description}
                            className="weather-icon"
                        />
                        {/* Affichage de la température */}
                        <p>Température : {Math.round(jour.main.temp)}°C</p>
                        {/* Description textuelle de la météo */}
                        <p>{jour.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
