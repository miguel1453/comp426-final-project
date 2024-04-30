import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import '../App.css';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            });
            console.log('Login successful:', response.data);
            Cookie.set('userId', response.data.id, { expires: 7 });
        } catch (err) {
            console.error('Login failed:', err.response ? err.response.data : 'No response');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className='signup-form'>
                <h2>Login</h2>
                <label>Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                <Link to="/signup">Don't have an account?</Link>
            </form>
        </div>
    );
}

export default Login;
