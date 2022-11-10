import { useState } from 'react';
import SearchBar from './SearchBar';
import moment from 'moment';
import InjectionRow from './InjectionRow'
import ResultRow from './ResultRow'
import KitRow from './KitRow';





function SearchPatients() {
    

    const [patientData, setPatientData] = useState([])
    const [patientSearchResults, setPatientSearchResults] = useState([]);
    const [displayPatientImmunoData, setDisplayPatientImmunoData] = useState(false);
    const [immunoData, setImmunoData] = useState([]);
    const [kitData, setKitData] = useState([]);


    return (
        <div className='container'>
        {displayPatientImmunoData ? 
        (
            <>
                <h1>{patientData.firstname} {patientData.surname} {moment(patientData.dob).format("DD/MM/YYYY")}</h1>
                <h3>Last reviewed on: {moment(patientData.date_of_last_review).format("DD/MM/YYYY")}</h3>
                <h3>Referral expires: {moment(patientData.referral_expiry).format("DD/MM/YYYY")}</h3>
                <button>Update Patient Details</button>
                <button>Add injection</button>
                {immunoData.map((inj) => {
                    return <InjectionRow key={inj.id} injData={inj}/>
                })}
                {kitData.map((kit) =>{
                    return <KitRow key={kit.id} kitRowData={kit}/>
                })}
           </>
        ) 
        : (
            <>
                <SearchBar setPatientSearchResults={setPatientSearchResults} />
                {patientSearchResults.length > 0 && 
                        (patientSearchResults.map((patient) => {
                            return <ResultRow key={patient.id} data={patient} setPatientData={setPatientData} setDisplayPatientImmunoData={setDisplayPatientImmunoData} setImmunoData={setImmunoData} setKitData={setKitData}/>
                                        }) 
                        )
                }
                <button>Add new patient</button>
            </>
        )
        }
        </div>
    )
    
};

export default SearchPatients;