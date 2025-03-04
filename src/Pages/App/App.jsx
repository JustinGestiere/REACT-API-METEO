import './App.css';
import Heures from '../../Components/heures'
import Semaine from '../../Components/semaine';
import Compteur from '../../Components/compteur';

import { useState } from 'react';


const datas = {
  temp: "252°C",
  pression: "1074 Hpa",
  humidite: "20 %"
};

function App() {
  const [affichage, setAffichage]= useState(false);

  const changeAffichage = () => {
    setAffichage( (val) => !val )
  }

  return (
    <div className="App">
      <h1>MÉTÉO</h1>
      <button onClick={changeAffichage}>Passer en affichage par {affichage ? "heures" : "semaine"}</button>

      { !affichage && <Heures datas={datas} />}
      { affichage && <Semaine /> }
      
      <hr />
      
      {/* <Compteur /> */}
    </div>
  );
}

export default App;
