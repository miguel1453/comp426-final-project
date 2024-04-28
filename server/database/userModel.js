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

module.exports = { createUser, getUserById, getUser, login };
