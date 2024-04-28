const express = require('express');
const { createUser, isUserLoggedIn, login } = require('./userModel.js');
const cors = require('cors');
const session = require('express-session');

const app = express();


app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));


app.use(cors({
  origin: 'http://localhost:3000', // adjust as needed
  credentials: true
}));


// Middleware to parse JSON bodies
app.use(express.json());




// app.post('/signup', async(req, res) => {
//     const { username, password } = req.body;
//     await createUser(username, password, (error, result) => {
//         if (error) {
//             res.status(500).json({ message: "Failed to create user", error: error.message });
//             return;
//         }
//         req.session.userId = result.id;
//         res.status(201).json({
//             message: "User created successfully",
//             userId: result.id
//         });
//     });
// });

app.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    try {
        const result = await createUser(username, password);
        req.session.userId = result.id;
        console.log("Session id:", req.sessionID)
        res.status(201).json({
            message: "User created successfully",
            id: result.id
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password);
        req.session.userId = result.id; // Set session first
        res.status(201).json({
            message: "Logged in successfully",
            userId: result.id
        });
        // If you need to redirect, remove the JSON response above and uncomment below
        // res.redirect('/');
    } catch(error) {
        res.status(500).json({message: "Failed to login", error: error.message})
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  });

app.get('/isUserLoggedIn', (req, res) => {
    console.log("Session id:", req.sessionID)
    const loggedIn = !!req.session.userId;
    console.log('Is user logged in:', loggedIn);
    res.json({ loggedIn: loggedIn });
  });

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});