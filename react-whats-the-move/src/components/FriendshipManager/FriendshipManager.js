import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FriendshipManager = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Separate state for search results
  const [searchUsername, setSearchUsername] = useState('');

  useEffect(() => {
    fetchFriends();
  }, [userId]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getFriends/${userId}`);
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const addFriend = async (friendId) => {
    if (!friendId) {
        console.error("Invalid friend ID");
        return;
    }
    try {
        const response = await axios.post('http://localhost:3001/addFriend', {
            user1: userId, // Ensure `userId` is correctly defined and populated
            user2: friendId
        });
        if (response.status === 201) {
            console.log("Friend added successfully");
            // Optionally refresh friend list or update UI here
        }
    } catch (error) {
        console.error('Failed to add friend:', error.response ? error.response.data : error.message);
        alert('Failed to add friend. Please try again.');
    }
};

  const removeFriend = async (friendId) => {
    try {
      await axios.delete(`http://localhost:3001/removeFriend`, { data: { user1: userId, user2: friendId } });
      setFriends(friends.filter(friend => friend.id !== friendId));
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  };

  const searchUsers = async () => {
    if (!searchUsername.trim()) return;
    try {
        const response = await axios.get(`http://localhost:3001/searchUsers/${encodeURIComponent(searchUsername)}`);
        if (response.data && Array.isArray(response.data)) {
            setSearchResults(response.data.filter(user => user && user.username));
        } else {
            setSearchResults([]);
        }
    } catch (error) {
        console.error('Failed to search for friends:', error);
    }
};

  return (
    <div>
      <input
        type="text"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        placeholder="Search for new friends..."
      />
      <button onClick={searchUsers}>Search</button> {/* Button to trigger search */}
      <ul>
        {searchResults.map((user, index) => (
            user ? (
            <li key={user.id || index}>
                {user.username}
                <button onClick={() => addFriend(user.id)}>Add Friend</button>
            </li>
            ) : null
        ))}
    </ul>
    <ul>
        {friends.map((friend, index) => (
            friend && friend.username ? (
            <li key={friend.id || index}>
                {friend.username}
                <button onClick={() => removeFriend(friend.id)}>Remove</button>
            </li>
            ) : null
        ))}
        </ul>
    </div>
  );
};

export default FriendshipManager;
