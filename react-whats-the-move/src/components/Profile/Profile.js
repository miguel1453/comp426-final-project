import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

import LocalActivity from '@mui/icons-material/LocalActivity';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from '../Login.js'
import SavedEvents from './SavedEvents.js';
import FriendshipManager from './FriendshipManager.js';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const id = Cookies.get('userId');
    if (id) {
      findUser(id);
    }
  }, []);


  const logout = () => {
    Cookies.remove('userId');
    window.location.href = '/';
  };

  const findUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/getUserById/${id}`);
      setUser(response.data.user);
    } catch (err) {
      console.error('Failed to get user:', err.response ? err.response.data : 'No response');
    }
  };


  return (
    <div className={styles.ProfilePage}>
    <AppBar position="static" sx={{ backgroundColor: '#483C32' }}>
      <Toolbar>
        <IconButton edge="start" component={Link} to="/" color="inherit">
          <LocalActivity />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}></Box> {/* Fills space between icon and text */}

        <Typography variant="h5" sx={{ fontFamily: 'Limelight, sans-serif'}}>
          my profile
        </Typography>
      </Toolbar>
    </AppBar>
    {!user ? (
      <Login />
    ) : (
      <div className={styles.Profile}>
        <div className={styles.Info}>
          <h2 className={styles.InfoLine}><strong>First Name: {user.firstName}</strong> </h2>
          <h2 className={styles.InfoLine}><strong>Last Name: {user.lastName}</strong></h2>
          <h2 className={styles.InfoLine}><strong>Username: {user.username}</strong> </h2>
        </div>
  
        <SavedEvents user={user}/>
  
  

        <FriendshipManager userId={user.id} />

      </div>
    )}
    </div>
  );
}

export default Profile;
