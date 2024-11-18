import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true

            });

            if (response.data.success) {
                navigate("/"); // Redirect to signin page after successful signup
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError("An error occurred, please try again later.");
        }
    };

    return (
        <div className="container mt-5 h-svh">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Typography variant="h4" className="text-center">Sign Up</Typography>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account? <Link className="text-blue-700" to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
