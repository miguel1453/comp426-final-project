const express = require('express');
const { createUser, login, createFriendship, getFriends, getUser, getUserById, addEvent } = require('./userModel.js');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // adjust as needed
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());


app.post('/signup', async(req, res) => {
    const { username, password, firstName, lastName } = req.body;
    try {
        const result = await createUser(username, password, firstName, lastName);
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

app.post('/addFriend', async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        await createFriendship(user1, user2);
        res.status(201).json({ message: "Friendship created:", user1, user2 });
    
    } catch (error) {
        res.status(500).json({ message: "Failed to create friendship", error: error.message });
    }
});

app.get('/getFriends/:userId', async (req, res) => {
    const { userId } = req.params;  // Accessing userId from path parameters
    try {
        const friends = await getFriends(userId);
        // Assuming getFriends returns an array of friend objects
        const friendUsernames = friends.map(friend => friend.username);
        res.status(200).json({ friends: friendUsernames });
    } catch (error) {
        res.status(500).json({ message: "Failed to get friends", error: error.message });
    }
});


app.post('/getUser', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await getUser(username);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Failed to get user", error: error.message });
    }
});

app.get('/getUserById/:userId', async (req, res) => {
    const { userId } = req.params;  // Accessing userId from path parameters
    try {
        const user = await getUserById(userId);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Failed to get user", error: error.message });
    }
});


app.post('/addEvent', async (req, res) => {
    const { userId, eventName, eventDate, eventId } = req.body;
    try {
        const result = await addEvent(userId, eventName, eventDate, eventId);
        res.status(201).json({ message: "Event saved successfully", eventId: result.id });
    } catch (error) {
        res.status(500).json({ message: "Failed to save event", error: error.message });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});