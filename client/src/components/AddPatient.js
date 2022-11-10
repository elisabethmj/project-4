import {useState} from 'react';
import axios from 'axios';

export default function AddPatient() {

    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [lastReview, setLastReview] = useState(null);
    const [refExpiry, setRefExpiry] = useState(null);

    
    function submitData(e) {
            e.preventDefault();
    
            const data = {
                firstname: firstname,
                surname: surname,
                email: email,
                password: password,
                dob: dob,
                is_staff: false,
                date_of_last_review: lastReview,
                referral_expiry: refExpiry
            };
            
            console.log("data", data)
        
            axios.post("/api/signup", data)
                .then(() => {
                    window.location.href = "/admin";
                })
                .catch((err) => {
                    console.log(err.response);
                });
        };
    

    return (
        <form onSubmit={submitData} method="post">
            <input type="text" name="firstname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
            <input type="text" name="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
            <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required/>
            
            <label htmlFor="last-review">Date of last review</label>
            <input type="date" name="last-review" value={lastReview} onChange={(e) => setLastReview(e.target.value)}/>
            
            <label htmlFor="ref-exp">Referral Expiry</label>
            <input type="date" name="ref-exp" value={refExpiry} onChange={(e) => setRefExpiry(e.target.value)}/>
            <button type="submit">Add Patient</button>
        </form>
    
    )
}