import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUser();


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                username,
                password
            });
            console.log('Login successful:', response.data);
            setUser(response.data.user);
        } catch (err) {
            console.error('Login failed:', err.response ? err.response.data : 'No response');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
