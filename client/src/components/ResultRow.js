import axios from 'axios';

export default function ResultRow({data, setDisplayPatientImmunoData, setImmunoData, setPatientData, setKitData}) {

    function grabAndSetData() {
        setPatientData(data);
        let patientId = data.id;

        axios.get(`api/kits/${patientId}`)
            .then((response) => {
                const kits = response.data;
                
                // console.log("kits", kits);
                setKitData(kits);
            })
            .catch((err) => {console.log(err)})

        axios.get(`api/injections/${patientId}`)
            .then((response) => {
                const injs = response.data;
               
            
                // console.log("injs", injs);
                setImmunoData(injs);
                setDisplayPatientImmunoData(true);
        
            })
            .catch((err) => {console.log(err)})
    }

    return (
        <div className="results-list" onClick={() => {grabAndSetData()}}>
             {data.firstname} {(data.surname).toUpperCase()}
        </div>
        )
}