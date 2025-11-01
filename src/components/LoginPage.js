// frontend/src/components/LoginPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // REPLACED localStorage logic with this API call to our backend's login endpoint
            const response = await axios.post('/api/users/login', data);

            // If login is successful, the backend will send back the user's name
            alert(`Welcome back, ${response.data.name}!`);
            navigate('/'); // Redirect to the homepage

        } catch (error) {
            // If the backend returns an error (invalid credentials)
            console.error('Login failed:', error.response.data.message);
            alert(`Login failed: ${error.response.data.message}`);
        }
    };

    return (
        <section className="auth-section">
            <h2>Log In to Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                {/* ... The form inputs remain exactly the same ... */}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register('email', { required: 'Email is required' })}/>
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...register('password', { required: 'Password is required' })}/>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>

                <button type="submit" className="primary-btn">Log In</button>
            </form>
        </section>
    );
};

export default LoginPage;