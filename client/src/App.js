import axios from "axios";
import { useEffect, useState } from "react";

import './styles/App.css';

import NavBar from "./components/NavBar";


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
          <NavBar user={user} loggedIn={loggedIn} />
        </div>
  )
}

export default App;
