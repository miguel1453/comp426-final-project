import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      console.log("Friends: ", response.data.friends);
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const addFriend = async (friendId) => {
    try {
        const response = await axios.post('http://localhost:3001/addFriend', {
            user1: userId,
            user2: friendId
        });
        if (response.status === 201) {
            alert("Friend added successfully!");
            fetchFriends();  // Refresh the friends list
        }
    } catch (error) {
        if (error.response && error.response.data.message === 'Friendship already exists') {
            alert('This friendship already exists.');
        } else {
            alert('Failed to add friend. Please try again.');
        }
        console.error('Failed to add friend:', error.response || error.message);
    }
};


const removeFriend = async (friendId) => {
  try {
    await axios.delete(`http://localhost:3001/removeFriend`, { data: { user1: userId, user2: friendId } });
    fetchFriends();  
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
      <h2>Friends</h2>
      {friends.map((friend) => (
        <li key={friend.id}>
          {friend.username}
          {friend.firstName && ` ${friend.firstName} ${friend.lastName}`}
          <button onClick={() => removeFriend(friend.id)}>Remove Friend</button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default FriendshipManager;
