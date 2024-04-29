const db = require("./database.js");


const createUser = (username, password) => {
  return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
      db.run(query, [username, password], function(err) {
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
    db.get(`SELECT username, id, password FROM users WHERE id = ?`, [id], (err, row) => {
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
      db.get(`SELECT username, id, password FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
};


const login = async (username, password) => {
    const user = await getUser(username);
    if (!user) {
        throw new Error('No user with this username');
    }
    if (user.password !== password) {
        throw new Error('Incorrect password');
    }
    return user;
};

const createFriendship = (user1, user2) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO friends (user1, user2) VALUES (?, ?)`;
    db.run(query, [user1, user2], function(err) {
      if (err) {
        console.error('Error creating friendship', err.message);
        reject('Failed to create friendship');
      } else {
        console.log('Friendship created');
        resolve();
      }
    });
  });
}

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

module.exports = { createUser, getUserById, getUser, login, createFriendship, getFriends };