import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const formSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Email and password required");
            return;
        }

        const data = {
            email: email,
            password: password
        };

        axios.post("api/session", data)
                .then(() => {
                    // console.log(data)
                    window.location.href = "/";
                })
                .catch((err) => {
                    // console.log(err);
                    alert(err.response.data.message);
                });
    };

    return (
        <div className="container">
            <form onSubmit={formSubmit} method="post">
                <h2>Login</h2>
                <input type="email" required placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" required placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;