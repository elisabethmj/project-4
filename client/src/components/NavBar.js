
import "../styles/NavBar.css"
import axios from "axios";
import { useState } from "react";


export default function NavBar({setLoggedIn, loggedIn, user}) {
    
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    // console.log(loggedIn);
    // console.log("user: ", user);
    function logout() {
        axios.delete("api/session")
                .then((response) => {
                    console.log(response);
                    setLoggedIn(false);
                }).catch((err) => {
                    // console.log(err)
                    alert("log out unsuccessful")
                });
     };

    return (
    <nav className="navigation" data-testid="navBar">
            <a href="/" className="app-name">myTherapy</a>
            <button className="hamburger" data-testid="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
                {/* icon from heroicons.com */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                    </svg>
            </button>
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
               
                    {loggedIn ? (<ul>
                                    <li>Current User: <span data-testid="username">{user.firstname}</span></li>
                                    <li data-testid="home"><a href="/admin">Search Patients</a></li>
                                    <li data-testid="logout"><a href="/" onClick={() => logout()}>Logout</a></li>
                                </ul>)  
                                : 
                                (<ul>
                                    <li data-testid="about"><a href="/">About</a></li>
                                    <li data-testid="login"><a href="/login">Login</a></li>
                                </ul>)
                    }

                </div>
        </nav>
    )
}