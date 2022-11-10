import { TextField, InputAdornment, Button } from '@mui/material';
import { Search } from "@mui/icons-material";
import { useRef } from 'react';
import axios from 'axios';
import "../styles/Search.css"

// let patientSearchResults
// const setPatient = (data) => {
//     patientSearchResults = data
// }
// render(<SearchBar setPatientSearchResults={setPatient} />)

// expect(patientSearchResults).toHaveLength(3)




export default function SearchBar({setPatientSearchResults}) {
    //NEED TO ADD CHECK IF LOGGED IN AS ADMIN TO RENDER THIS
    //Add filter for patient search only, don't return staff

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

                setPatientSearchResults(data)
                // console.log(response.data)
            })
            .catch((err) => {console.log(err)})

    }



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
                
                }}
                variant="outlined"
            />
        </form>
    )
};