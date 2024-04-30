import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from '../Login.js'
import SavedEvents from './SavedEvents.js';
import Cookies from 'js-cookie';
import styles from './Profile.module.css';
import FriendshipManager from '../FriendshipManager/FriendshipManager.js';
import FriendsEvents from './FriendsEvents.js';
import LocalActivity from '@mui/icons-material/LocalActivity.js';

const Profile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const id = Cookies.get('userId');
        if (id) {
            findUser(id);
        }
    }, []);

    const findUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/getUserById/${id}`);
            setUser(response.data.user);
        } catch (err) {
            console.error('Failed to get user:', err.response ? err.response.data : 'No response');
        }
    };
    const logout = () => {
        Cookies.remove('userId');
        window.location.href = '/';
    };

    return (
        <div className={styles.ProfilePage}>
            <AppBar position="static" sx={{ backgroundColor: '#483C32' }}>
                <Toolbar>
                    <IconButton edge="start" component={Link} to="/" color="inherit">
                    <LocalActivity /> 
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography variant="h5" sx={{ fontFamily: 'Limelight, sans-serif' }}>
                        my profile
                    </Typography>
                </Toolbar>
            </AppBar>
            {!user ? (
                <Login />
            ) : (
                <div className={styles.Profile}>
                    <div className={styles.Info}>
                        <h2><strong>First Name: {user.firstName}</strong></h2>
                        <h2><strong>Last Name: {user.lastName}</strong></h2>
                        <h2><strong>Username: {user.username}</strong></h2>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <FriendshipManager userId={user.id} />
                    <SavedEvents user={user} />
                    <FriendsEvents user={user} />
                    
                </div>
            )}
        </div>
    );
};

export default Profile;
