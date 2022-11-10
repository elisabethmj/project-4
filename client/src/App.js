import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/App.css';

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import About from "./components/About";
import SearchPatients from "./components/SearchPatients";
import AddPatient from './components/AddPatient'


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
  // const [admin, setAdmin] = useState(false);


  useEffect(() => {
    if (loggedIn) {
      return;
    }
    axios.get("api/signup")
          .then((response) => {
            // console.log(response.data);

            setUser(response.data);
            setLoggedIn(true);

          })
          .catch((err) => setLoggedIn(false));
  });

    return (
        <div>
          <NavBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <BrowserRouter>
                <Routes>
                    <Route path="/" element={<About />}/>
                    {loggedIn && <Route path="/admin" element={<SearchPatients />} />}
                    <Route path="/login" element={<Login />} />
                    {loggedIn && <Route path="/new" element={<AddPatient />} />}
                    <Route path="*" element={<div className="container"><p>Page not found</p></div>} />
                </Routes>
          </BrowserRouter>

        </div>
  )
}

export default App;
