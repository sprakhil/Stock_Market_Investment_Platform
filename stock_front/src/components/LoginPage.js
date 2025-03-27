import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api.js'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Auth.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const loginData = {
                emailOrUsername: formData.emailOrUsername,
                password: formData.password
            };
            const response = await loginUser(loginData);
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            toast.success("Login Successful!", { autoClose: 1500 });
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            toast.error("Invalid credentials, please try again.",{autoClose:1500});
            setError("Invalid credentials, please try again.");
        }
    };

    return (
        <div className="auth-page">
            <Navbar/>
            <div className="auth-container">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="auth-card">
                    <div className="logo-container">
                        <span className="app-name">FinSight</span>
                    </div>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="emailOrUsername" 
                                className="form-control"
                                placeholder="Email or Username" 
                                value={formData.emailOrUsername} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control"
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                    <p className="auth-link">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;