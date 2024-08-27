import React, { useState } from "react";
import axios from 'axios';
import '../../assets/styles/signup.css';

function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password_hash, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const payload = { name, email, role, password_hash };
            const response = await axios.post('http://localhost:3800/api/auth/add', payload);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error creating user', error);
        }
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <table className="signup-table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="name">Name:</label></td>
                            <td><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email:</label></td>
                            <td><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="role">Role:</label></td>
                            <td><input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter your role" /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password:</label></td>
                            <td><input type="password" id="password" value={password_hash} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button type="submit" className="submit-button">Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Signup;

