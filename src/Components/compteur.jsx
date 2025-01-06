import { useState } from 'react';

export default function Compteur() {
    const [count, setCount] = useState(0); // Initialisation avec une valeur de départ de 0
    const increaseCount = () => setCount(count + 1); // Mise à jour de l’état

    return (
        <div>
            <p>Compteur : {count}</p>
            <button onClick={increaseCount}>Incrémenter</button>
        </div>
    );
}