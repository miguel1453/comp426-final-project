import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import pstyles from './Profile.module.css';
import LocalActivity from '@mui/icons-material/LocalActivity';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [searchUsername, setSearchUsername] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [user, setUser] = useState({});

  const savedEvents = ['Event 1', 'Event 2', 'Event 3'];
  const friendsList = [{ username: 'Friend 1' }, { username: 'Friend 2' }, { username: 'Friend 3' }];
  
  useEffect(() => {
    const id = Cookies.get('userId');
    const findUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getUserById/${id}`);
        setUser(response.data.user);
      } catch (err) {
        console.error('Failed to get user:', err.response ? err.response.data : 'No response');
    }
   
  }
  findUser();
  }, []);


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
      <div>Loading</div>
    ) : (
      <div className={styles.Profile}>
        <div className={styles.Info}>
          <h2 className={styles.InfoLine}><strong>First Name: {user.firstName}</strong> </h2>
          <h2 className={styles.InfoLine}><strong>Last Name: {user.lastName}</strong></h2>
          <h2 className={styles.InfoLine}><strong>Username: {user.username}</strong> </h2>
        </div>
  
        <h1>Saved Events</h1>
        <ul className={styles.SavedEvents}>
          {savedEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
  
        <h1>Friends List</h1>
        <h3>Add friends by username</h3>
        <input
          type="text"
          value={searchUsername}
          placeholder="Username..."
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <button>Add Friend</button>
        <p></p>
        <div>
        <button>Log Out</button>
          </div>
        <ul className={styles.FriendsList}>
          {filteredFriends.map((friend, index) => (
            <li key={index}>{friend.username}</li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );
}

export default Profile;
