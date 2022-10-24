import axios from "axios";
import { useEffect, useState } from "react";
import Login from './Login'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      return;
    }
    axios.get("api/signup")
          .then((response) => {
            console.log(response.data);
            const {
                    id,
                    firstname,
                    surname,
                    email,
                    dob,
                    is_staff,
                    date_of_last_review, 
                    referral_expiry 
            } = response.data;

            setUser({ id: id, firstname: firstname, surname: surname, email: email, dob: dob, is_staff: is_staff, date_of_last_review: date_of_last_review, referral_expiry: referral_expiry });
            setLoggedIn(true);
          })
          .catch((err) => setLoggedIn(false));


  });
  
  return (
    <div className="App">

      {loggedIn ? (<p>Hello, {user.firstname}!</p>) : (<Login/>)}

    </div>
  )
}

export default App;
