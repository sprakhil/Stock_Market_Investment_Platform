import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Home.css";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <Navbar/>
            <main className="hero">
                <div className="hero-content">
                    <h1>Master the Stock Market with FinSight</h1>
                    <p>Track trends, analyze stocks, and make smarter investments.</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate("/demataccount")}
                    >
                        Explore Stocks
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;