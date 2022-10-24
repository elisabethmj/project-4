import axios from "axios";
import { useEffect, useState } from "react";
import Login from './Login'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);


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
            if (is_staff === true) {setAdmin(true)}

          })
          .catch((err) => setLoggedIn(false));


  });


    function logout() {
      axios.delete("api/session")
              .then((response) => {
                  console.log(response);
                  window.location.href = "/"
              }).catch((err) => {
                  console.log(err)
                  alert("log out unsuccessful")
              });
    };

  
  return (
    <div className="App">

    {loggedIn ? (<div><p>Hello, {user.firstname}!</p><button onClick={logout}>LOG OUT</button></div>) : (<Login/>)}
      {admin ? (<p>you are an admin</p>) : (<p>nil</p>)}

    </div>
  )
}

export default App;
