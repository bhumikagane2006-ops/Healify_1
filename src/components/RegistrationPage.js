// frontend/src/components/RegistrationPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import PasswordStrengthMeter from './PasswordStrengthMeter';

const RegistrationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const onSubmit = async (data) => {
        try {
            // This URL now works because of the proxy we added in package.json
            const response = await axios.post('/api/users/register', data);
            
            console.log(response.data.message);
            alert('Registration successful! Please log in.');
            navigate('/login');

        } catch (error) {
            // --- THIS BLOCK IS NOW CORRECTED AND MORE ROBUST ---

            let errorMessage = 'An unexpected error occurred. Please try again.'; // Default message

            if (error.response && error.response.data && error.response.data.message) {
                // Use the specific message from the backend (e.g., "User already exists")
                errorMessage = error.response.data.message;
            } else if (error.request) {
                // Handle network errors where the backend doesn't respond at all
                errorMessage = 'Cannot connect to the server. Please ensure the backend is running and the proxy is configured correctly.';
            }

            console.error('Registration failed:', errorMessage);
            
            // This alert now uses the correct backtick (`) syntax
            alert(`Registration failed: ${errorMessage}`);
        }
    };

    return (
        <section className="auth-section">
            <h2>Create Your Healify Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register('email', { required: 'Email is required' })} />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordStrengthMeter password={password} />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                
                <button type="submit" className="primary-btn">Register</button>
            </form>
        </section>
    );
};

export default RegistrationPage;