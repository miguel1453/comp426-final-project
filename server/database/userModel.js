const db = require("./database.js");

// const createUser = async (username, password, callback) => {
//     const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
//     console.log("Creating user");
//     await db.run(query, [username, password], function(err) {
//         if (err) {
//             callback(err);
//         } else {
//             callback(null, { id: this.lastID });
//         }
//     });
// };

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

const createFriendship = (username, friend_username) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO friends (username, friend_username) VALUES (?, ?)`;
    db.run(query, [username, friend_username], function(err) {
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

const getFriends = async (username) => {
  try {
    const list1 = await new Promise((resolve, reject) => {
      db.all(`SELECT friend_username FROM friends WHERE username = ?`, [username], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    console.log(list1)
    const list2 = await new Promise((resolve, reject) => {
      db.all(`SELECT username FROM friends WHERE friend_username = ?`, [username], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return list1.concat(list2);
  } catch(error) {
    console.error('Error getting friends', error.message);
    return [];
  }
}


module.exports = { createUser, getUserById, getUser, login, createFriendship, getFriends };
