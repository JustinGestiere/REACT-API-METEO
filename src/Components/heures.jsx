import { useState } from "react"; // Importation de React pour utiliser les hooks comme useState
import "./Heures.css"; // Importation du fichier CSS pour le style

export default function Heures() {
    // Déclaration des états pour gérer les données et les interactions
    const [ville, setVille] = useState(""); // État pour stocker le nom de la ville saisie par l'utilisateur
    const [meteo, setMeteo] = useState([]); // État pour stocker les prévisions météo horaires
    const [loading, setLoading] = useState(false); // État pour indiquer si les données sont en cours de chargement
    const [erreur, setErreur] = useState(""); // État pour gérer et afficher les erreurs éventuelles

    // Fonction pour récupérer les données météo depuis l'API OpenWeather
    const fetchMeteo = async () => {
        const apiKey = "bc2fe2ab317fd391ca9683c0f45aa957"; // Clé API unique pour l'accès à OpenWeather
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&lang=fr&units=metric`;

        try {
            // Démarre le chargement et réinitialise les éventuels messages ou données précédentes
            setLoading(true);
            setErreur("");
            setMeteo([]);

            // Envoie une requête HTTP GET vers l'API
            const response = await fetch(url);

            if (!response.ok) {
                // Si la requête échoue, une erreur est levée
                throw new Error(`Erreur : ${response.status}`);
            }

            // Conversion des données de réponse en JSON
            const data = await response.json();

            // Extraction des prévisions horaires pour aujourd'hui uniquement
            const today = new Date().toISOString().split("T")[0]; // Récupération de la date actuelle au format YYYY-MM-DD
            const previsionsDuJour = data.list.filter((item) =>
                item.dt_txt.startsWith(today) // Filtrer uniquement les données pour la journée actuelle
            );

            // Mise à jour de l'état avec les prévisions du jour
            setMeteo(previsionsDuJour);
        } catch (err) {
            // En cas d'erreur, l'état `erreur` est mis à jour avec un message
            setErreur(err.message);
        } finally {
            // Fin du chargement, quel que soit le résultat
            setLoading(false);
        }
    };

    // Fonction pour gérer la soumission du formulaire (clic sur "Rechercher")
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page après soumission
        if (ville.trim()) {
            // Si le champ "ville" n'est pas vide, on déclenche la recherche météo
            fetchMeteo();
        }
    };

    return (
        <div className="heures-container">
            <h1>Météo par heure pour aujourd'hui</h1>

            {/* Formulaire de saisie pour entrer une ville */}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text" // Champ de saisie pour la ville
                    value={ville} // État `ville` lié à ce champ
                    onChange={(e) => setVille(e.target.value)} // Met à jour l'état `ville` en temps réel
                    placeholder="Entrez une ville" // Texte d'invite affiché dans le champ
                    className="input" // Classe CSS pour personnaliser le style
                />
                <button type="submit" className="button">
                    {/* Bouton pour soumettre le formulaire */}
                    Rechercher
                </button>
            </form>

            {/* Gestion des états de chargement ou d'erreur */}
            {loading && <p>Chargement...</p>} {/* Affiche "Chargement..." pendant la requête */}
            {erreur && <p className="error">Erreur : {erreur}</p>} {/* Affiche un message en cas d'erreur */}

            {/* Affichage des prévisions météo horaires si elles sont disponibles */}
            <div className="forecast-container">
                {meteo.map((heure, index) => (
                    <div key={index} className="forecast-hour">
                        <h3>
                            {/* Affichage de l'heure en format lisible */}
                            {new Date(heure.dt_txt).toLocaleTimeString("fr-FR", {
                                hour: "2-digit", // Affiche l'heure sur 2 chiffres
                                minute: "2-digit", // Affiche les minutes sur 2 chiffres
                            })}
                        </h3>
                        {/* Affichage de l'icône météo */}
                        <img
                            src={`http://openweathermap.org/img/wn/${heure.weather[0].icon}@2x.png`} // URL de l'icône
                            alt={heure.weather[0].description} // Description alternative pour l'image
                            className="weather-icon" // Classe CSS pour le style de l'icône
                        />
                        {/* Affichage des informations météo pour chaque heure */}
                        <p>Température : {Math.round(heure.main.temp)}°C</p>
                        <p>Pression : {heure.main.pressure} hPa</p>
                        <p>Humidité : {heure.main.humidity}%</p>
                        <p>Description : {heure.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
