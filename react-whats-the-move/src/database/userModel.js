import db from "./database.js";

export const createUser = async (username, password, callback) => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    await db.run(query, [username, password], function(err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID });
        }
    });
};




// export async function createUser(username, password) {
//     db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, results) => {

//     });
// };


