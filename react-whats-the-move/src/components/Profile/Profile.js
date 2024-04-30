import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

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
    !user ? (
      <div>Loading</div>
    ) : (
      <div className={styles.Profile}>
        <h2>Profile</h2>
        <div className={styles.Info}>
          <p><strong>First Name: {user.firstName}</strong> </p>
          <p><strong>Last Name: {user.lastName}</strong></p>
          <p><strong>Username: {user.username}</strong> </p>
        </div>
  
        <h3>Saved Events</h3>
        <ul className={styles.SavedEvents}>
          {savedEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
  
        <h3>Friends List</h3>
        <input
          type="text"
          value={searchUsername}
          placeholder="Search username..."
          onChange={(e) => setSearchUsername(e.target.value)}
        />
  
        <ul className={styles.FriendsList}>
          {filteredFriends.map((friend, index) => (
            <li key={index}>{friend.username}</li>
          ))}
        </ul>
      </div>
    )
  );
}

export default Profile;
