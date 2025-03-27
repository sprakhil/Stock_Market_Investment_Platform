import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "../style/Theme.css";
import "../style/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (isLoggedIn && storedUsername) {
            setUsername(storedUsername);
        } else if (isLoggedIn && !storedUsername) {
            fetchUsername();
        }
    }, [isLoggedIn]);

    const fetchUsername = async () => {
        try {
            const response = await axios.get("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data && response.data.username) {
                localStorage.setItem("username", response.data.username);
                setUsername(response.data.username);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername("");
        toast.success("Logged out successfully!", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 1500);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="logo" onClick={() => navigate("/")}>FinSight</div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
                        <li><Link to="/companiescatalog">Market</Link></li>
                        {isLoggedIn && <li><Link to="/budget">Budget</Link></li>}
                        {isLoggedIn && <li><Link to="/portfolio">Portfolio</Link></li>}
                        <li><Link to="/learn">Learn</Link></li>
                    </ul>
                </nav>
                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <>
                            <span className="username-display">Welcome, {username}</span>
                            <button className="btn btn-error" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-secondary" onClick={() => navigate("/register")}>Register</button>
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </header>
    );
};

export default Navbar;