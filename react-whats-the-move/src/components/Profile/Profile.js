import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import FriendshipManager from '../FriendshipManager/FriendshipManager';


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
        <FriendshipManager userId={user.id} />
      </div>
    )
  );
}

export default Profile;
