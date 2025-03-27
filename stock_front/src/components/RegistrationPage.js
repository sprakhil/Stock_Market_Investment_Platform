import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Auth.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
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
            await registerUser(formData);
            toast.success("Registration Successful!", { autoClose: 2000 });
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            toast.error("Registration failed. Please try again.");
            setError("Registration failed. Please try again.");
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
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="username" 
                                className="form-control"
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="firstName" 
                                className="form-control"
                                placeholder="First Name" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="lastName" 
                                className="form-control"
                                placeholder="Last Name" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control"
                                placeholder="Email" 
                                value={formData.email} 
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
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="address" 
                                className="form-control"
                                placeholder="Address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                className="form-control"
                                placeholder="Phone Number" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                    <p className="auth-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;