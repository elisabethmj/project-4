import { TextField, InputAdornment, Button } from '@mui/material';
import { PlaylistAddCheckCircleOutlined, Search } from "@mui/icons-material";
import { useRef, useState } from 'react';
import "../styles/Search.css"
import axios from 'axios';

function SearchBar({setPatientData}) {
     const query = useRef();

    // Below: 1. prevent default button action i.e. prevent a reload
    // 2. .current comes from useRef. Grabs current value of textfield as user is making changes. Similar to onChange 
    //3. API call. --> .trim is JS method that removes whitespace from either side of string
    function handleSearch(e) {
        e.preventDefault();
        const queryVal = query.current.value;
        const trimmed = queryVal.trim()

        axios.get(`api/signup/${trimmed}`)
            .then((response) => {
                const data = response.data;
                if (data.length === 0) {
                    alert("No users found")
                };

                setPatientData(data)
                console.log(response.data)
            })
            .catch((err) => {console.log(err)})

    }

    // const classes = useStyles();

    return (
        <form action="" onSubmit={handleSearch} className="search-bar">
            <TextField 
                className="search-bar"
                autoFocus={true}
                inputRef={query}
                id="outlined-full-width"
                label="Search Patients By Name"
                style={{ margin: 8 }}
                placeholder="Patient Name"
                required={true}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button className="go" variant="contained" type="submit">
                                Search
                            </Button>
                        </InputAdornment>
                    )
                    // classes: {
                    //     root: classes.root,
                    //     focused: classes.focused,
                    //     notchedOutline: classes.notchedOutline,
                    // },
                }}
                variant="outlined"
            />
        </form>
    )
}

function displayPatientPage() {
    console.log("go to patient page")
}


function PatientRow({data}) {
    // const {firstname, surname} = data
    // data.firstname
    // data.surname
    // data.dob
    // setPatientData()
    return (
            <div className="" onClick={displayPatientPage}>{data.firstname} {data.surname}</div>
      
    )
}

function AdminDisplay(props) {
    // console.log(loggedIn)
    // console.log(user)
    const [patientData, setPatientData] = useState([]);
    // console.log("hello", patientData.length)
   return (
    <div>
        <SearchBar setPatientData={setPatientData} />
        {patientData.length > 0 ? (
            patientData.map((patient) => {
                return <PatientRow key={patient.id} data={patient}/>
            } ) 
        )
        : <p>No Patients</p>
        }
    </div>
   )
};

export default AdminDisplay;