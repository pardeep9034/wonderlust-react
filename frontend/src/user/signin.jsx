import React, { useEffect, useState, useContext } from 'react';
import { Typography, TextField, Button, Alert, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../component/GeneralContext';

const Signin = () => {
    const { setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const { email, password } = formData;

        if (!email || !password) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:8080/api/auth/signin', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (data.success) {
                setUser(data.existingUser);
                setSuccess('Login Successful!');
                setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 seconds
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred, please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Typography variant="h4" align="center" gutterBottom>
                        Sign In
                    </Typography>
                    <Stack spacing={2}>
                        {success && <Alert severity="success">{success}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Typography align="center" sx={{ marginTop: 2 }}>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-700">
                            Sign Up
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Signin;
