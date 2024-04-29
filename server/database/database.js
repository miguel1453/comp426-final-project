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
    db.run('PRAGMA foreign_keys = ON;', (err) => {
        if (err) {
            console.error('Error enabling foreign key constraint', err.message);
        } else {
            console.log('Foreign key constraint enabled');
        }
    });
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL
        );
    `;

    db.run(query, (err) => {
        if (err) {
            console.error('Error creating users table', err.message);
        } else {
            console.log('Users table created or already exists');
        }
    });

    const query2 = `
        CREATE TABLE IF NOT EXISTS friends (
            username VARCHAR(255) NOT NULL,
            friend_username VARCHAR(255) NOT NULL,
            PRIMARY KEY (username, friend_username),
            Foreign Key (username) references users(username),
            Foreign Key (friend_username) references users(username)
        );`;
    db.run(query2, (err) => {
        if (err) {
            console.error('Error creating friends table', err.message);
        } else {
            console.log('Friends table created or already exists');
        }
    });

}

// Add your API endpoints here


module.exports =  db;