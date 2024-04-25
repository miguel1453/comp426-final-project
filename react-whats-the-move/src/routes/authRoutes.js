// import { findUserByUsername, createUser } from '../models/userModel';
// import express from 'express';
// // const express = require('express');
// // const router = express.Router();

// const router = express.Router()


// // POST route for user login
// router.post('/login', (req, res) => {

//     const { username, password } = req.body;
//     findUserByUsername(username, (error, user) => {
//         if (error || !user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (user.password !== password) {
//             return res.status(401).json({ message: 'Incorrect password' });
//         }
//         res.json({ message: 'Logged in successfully' }); // Respond with success message
//     });
// });

// router.post('/signup', (req, res) => {
//     const { username, password } = req.body;
//     createUser(username, password, (error, user) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error creating user' });
//         }
//         res.status(201).json({ message: 'User created successfully', user: user });
//     });
// });

// export default router;
