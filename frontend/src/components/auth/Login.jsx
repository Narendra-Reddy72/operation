import React, { useState } from "react";
import axios from 'axios';
import '../../assets/styles/login.css';

function Login(){
    const [email, setEmail] = useState('');
    const [password_hash, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const payload = { email, password_hash };
            const response = await axios.post('http://localhost:3800/api/auth/login', payload);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching login', error);
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <table className="login-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input type="password" id="password" value={password_hash} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit" className="login-button">Login</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Login;
