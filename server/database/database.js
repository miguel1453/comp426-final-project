const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());

// Open a database connection
let db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Database connected!');
        initializeDb();
    }
});

// Function to initialize the database tables if they don't exist
function initializeDb() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;

    db.run(query, (err) => {
        if (err) {
            console.error('Error creating users table', err.message);
        } else {
            console.log('Users table created or already exists');
        }
    });
}

// Add your API endpoints here


module.exports =  db;