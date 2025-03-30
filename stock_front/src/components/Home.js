import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Home.css";

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = () => {
        const token = localStorage.getItem("token");
        return token !== null && token !== undefined && token !== '';
    };

    const handleExploreStocks = () => {
        if (isLoggedIn()) {
            navigate("/demataccount");
        } else {
                toast.info('Please login/register to explore stocks', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate("/login", { 
                        state: { 
                            from: "/demataccount",
                            message: "Please login to explore stocks" 
                        } 
                    })
                });
            }
        }
    return (
        <div className="home-page">
            <Navbar/>
            <ToastContainer />
            <main className="hero">
                <div className="hero-content">
                    <h1>Master the Stock Market with FinSight</h1>
                    <p>Track trends, analyze stocks, and make smarter investments.</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleExploreStocks}
                    >
                        Explore Stocks
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;