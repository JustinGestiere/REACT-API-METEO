# React

Sujet : Application météo

## Prérequis

Vous aurez besoin de vous créer une clé API pour vous servir de l'API d'OpenWeatherMap ! Par ici : https://openweathermap.org/

## Installation

Initialiser l'application react
```
npx create-react-app meteo
```

Lancer l'application
```
npm start
```

## Projet

Faire une application qui demande avec un input une ville. A partir du moment où ce formulaire est soumis, vous devez déclencher un appel API à openweather pour récupérer la météo et l'afficher.

Ajouter un bouton pour basculer l'affichage en "jour" ou "semaine".

Si possible, mettre un minimum de design même si non obligatoire.

## Déploiement sur Github Pages

Installer l'utilitaire de mise en prod
```
npm install gh-pages --save-dev
```

Modifier le package.json
```
"homepage": "https://<votre-nom-utilisateur>.github.io/<nom-du-repo>",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

Lancement du déploiement : 
```
npm run deploy
```