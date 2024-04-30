const db = require("./database.js");


const createUser = (username, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, password, firstName, lastName) VALUES (?, ?, ?, ?)`;
      db.run(query, [username, password, firstName, lastName], function(err) {
          if (err) {
              reject(err);
          } else {
              resolve({ id: this.lastID });
          }
      });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const getUser = (username) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
};


const login = (username, password) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        reject('Invalid username or password');
      } else {
        resolve({ id: row.id });
      }
    });
  });
}

const createFriendship = (user1, user2) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO friends (user1, user2) VALUES (?, ?)`;
    db.run(query, [firstUser, secUser], function(err) {
      if (err) {
        reject(new Error('Error creating friendship: ' + err.message));
      } else {
        resolve('Friendship created');
      }
    });
  });
};



const getFriends = async (userId) => {
  try {
    // Fetch friends where the current user is 'user1'
    const list1 = await new Promise((resolve, reject) => {
      db.all(`
          SELECT f.user2, u.username
          FROM friends f 
          JOIN users u on u.id = f.user2
          WHERE f.user1 = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.username));  // Map rows to return only friend IDs
        }
      });
    });
    // Fetch friends where the current user is 'user2'
    const list2 = await new Promise((resolve, reject) => {
      db.all(`
            SELECT f.user1, u.username
            FROM friends f 
            JOIN users u on u.id = f.user1
            WHERE f.user2 = ?
      `, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.username));  // Map rows to return only friend IDs
        }
      });
    });
    // Concatenate both lists to form the full list of friend IDs
    return list1.concat(list2);
  } catch (error) {
    console.error('Error getting friends', error.message);
    return [];  // Return an empty array if an error occurs
  }
}

const addEvent = async (userId, eventName, eventDate, eventId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO savedEvents (userId, eventName, eventDate, eventId) VALUES (?, ?, ?, ?)`;
    db.run(query, [userId, eventName, eventDate, eventId], function(err) {
      if (err) {
        console.error('Error saving event', err.message);
        reject('Failed to save event', err.message);
      } else {
        console.log('Event saved');
        resolve({ id: this.lastID }); // Return the id of the inserted row
      }
    });
  });
}

const getEvents = async (userId) => {
  try {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM savedEvents WHERE userId = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (error) {
    console.error('Error getting events', error.message);
    return [];
  }
}

const getFriendsEvents = async (userId) => {
  try {
    const friends = await getFriends(userId);
    console.log('Friends:', friends)
    const friendsInfo = await Promise.all(friends.map(async (friend) => {
      const user = await getUserById(friend);
      return {id: user.id, username: user.username};
    }));
    console.log('Friend IDs:', friendsInfo)
    const friendEvents = await Promise.all(friendsInfo.map(async (friend) => {
      const events = await getEvents(friend.id);
      return {username: friend.username, events};
    }));
    console.log('Friend events:', friendEvents)
    return friendEvents;
  } catch (error) {
    console.error('Error getting friend events', error.message);
    return [];
  }
};


const removeFriendship = (user1, user2) => {
  return new Promise((resolve, reject) => {
      const query = `DELETE FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`;
      db.run(query, [user1, user2, user2, user1], function(err) {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
};

const searchUsers = (username) => {
  return new Promise((resolve, reject) => {
      const query = `SELECT id, username FROM users WHERE username LIKE '%' || ? || '%'`;
      db.all(query, [username], (err, users) => {
          if (err) {
              console.error('Error searching users', err.message);
              reject(err);
          } else {
              resolve(users);
          }
      });
  });
};



module.exports = { createUser, getUserById, getUser, login, createFriendship, getFriends, addEvent, getEvents, getFriendsEvents, addEvent, searchUsers };

