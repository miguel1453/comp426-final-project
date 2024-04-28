import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                username: username,
                password: password
            });
            console.log('Signup successful:', response.data);
            Cookies.set('userId', response.data.id, { expires: 7 }); // Set a cookie with the user's ID
            navigate('/'); // Redirect to the home page
        } catch (err) {
            setError('Failed to signup');
            console.error('Signup failed:', err.response ? err.response.data : 'No response');
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup} className='signup-form'>
                <h2>Signup</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default Signup;
