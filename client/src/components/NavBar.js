import logout from "./Logout";
import Login from "./Login";
import About from "./About";
import AdminDisplay from "./AdminDisplay";
import "../styles/NavBar.css"

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function NavBar({loggedIn, user}) {
    
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    // console.log(loggedIn);
    // console.log("user: ", user);
    return (
    <div>
        <nav className="navigation">
            <a href="/" className="app-name">myTherapy</a>
            <button className="hamburger" onClick={() => {setIsNavExpanded(!isNavExpanded)}}>
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
                                    <li>Current User: {user.firstname}</li>
                                    <li><a href="/">About</a></li>
                                    <li><a href="/admin">Home</a></li>
                                    <li><a href="/" onClick={logout}>Logout</a></li>
                                </ul>)  
                                : 
                                (<ul>
                                    <li><a href="/">About</a></li>
                                    <li><a href="/login">Login</a></li>
                                </ul>)
                    }

                </div>
        </nav>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<About />}/>
                    <Route path="/admin" element={<AdminDisplay loggedIn={loggedIn} user={user}/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<div className="container"><p>Page not found</p></div>} />
                </Routes>
        </BrowserRouter>
        </div>
    )
}