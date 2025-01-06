export default function Heures({datas}) {
    return (
        <div>
            <h2>Affichage par heure pour aujourd'hui</h2>
            <table border="1">
                <thead>
                    <tr>
                    <td>Température</td>
                    <td>Pression</td>
                    <td>Humidité</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{datas.temperature}</td>
                    <td>{datas.pression}</td>
                    <td>{datas.humidite}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}