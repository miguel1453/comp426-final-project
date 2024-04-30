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
    // First check if the friendship already exists to avoid UNIQUE constraint errors
    const checkQuery = `SELECT 1 FROM friends WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)`;
    db.get(checkQuery, [user1, user2, user2, user1], (err, result) => {
      if (err) {
        console.error('Error checking friendship', err.message);
        reject(err);
      } else if (result) {
        // If there's already such a friendship, we reject with a specific message
        reject(new Error('Friendship already exists'));
      } else {
        // If no friendship exists, proceed to insert
        const insertQuery = `INSERT INTO friends (user1, user2) VALUES (?, ?)`;
        db.run(insertQuery, [user1, user2], function(err) {
          if (err) {
            console.error('Error creating friendship', err.message);
            reject(err);
          } else {
            console.log('Friendship created');
            resolve();
          }
        });
      }
    });
  });
};


const getFriends = async (userId) => {
  try {
    // Fetch friends where the current user is 'user1'
    const list1 = await new Promise((resolve, reject) => {
      db.all(`SELECT user2 AS friendId FROM friends WHERE user1 = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.friendId));  // Map rows to return only friend IDs
        }
      });
    });

    // Fetch friends where the current user is 'user2'
    const list2 = await new Promise((resolve, reject) => {
      db.all(`SELECT user1 AS friendId FROM friends WHERE user2 = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(row => row.friendId));  // Map rows to return only friend IDs
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

module.exports = { createUser, getUserById, getUser, login, createFriendship, getFriends, addEvent, removeFriendship, searchUsers, getEvents };
