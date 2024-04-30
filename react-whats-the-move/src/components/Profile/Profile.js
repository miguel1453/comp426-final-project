import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.module.css';

const Profile = ({ user, savedEvents, friendsList, addFriend }) => {
  const [searchUsername, setSearchUsername] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    // Filtering friends by search term
    setFilteredFriends(friendsList.filter(friend => friend.username.includes(searchUsername)));
  }, [searchUsername, friendsList]);

  const handleAddFriend = () => {
    addFriend(searchUsername);
    setSearchUsername(''); // Reset search field after adding a friend
  };

  return (
    <div className={styles.Profile}>
      <h2>Profile</h2>
      <div className={styles.Info}>
        <p><strong>First Name:</strong> </p>
        <p><strong>Last Name:</strong></p>
        <p><strong>Username:</strong> </p>
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
      <button onClick={handleAddFriend}>Add Friend</button>

      <ul className={styles.FriendsList}>
        {filteredFriends.map((friend, index) => (
          <li key={index}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  savedEvents: PropTypes.arrayOf(PropTypes.string).isRequired,
  friendsList: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  addFriend: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  savedEvents: [],
  friendsList: [],
};

export default Profile;
