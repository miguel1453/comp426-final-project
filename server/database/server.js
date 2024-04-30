const express = require('express');
const { createUser, login, createFriendship, getFriends, getUser, getUserById, addEvent, getEvents, getFriendsEvents, removeFriendship, searchUsers } = require('./userModel.js');

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
            id: result.id
        });
        // If you need to redirect, remove the JSON response above and uncomment below
        // res.redirect('/');
    } catch(error) {
        res.status(500).json({message: "Failed to login", error: error.message})
    }
});

app.post('/addFriend', async (req, res) => {
    const { user1, user2 } = req.body;
    if (!user1 || !user2) {
        return res.status(400).json({ message: "Missing user IDs" });
    }
    try {
        await createFriendship(user1, user2);
        res.status(201).json({ message: "Friendship created successfully", user1, user2 });
    } catch (error) {
        console.error('Failed to create friendship:', error);
        res.status(500).json({ message: "Failed to create friendship", error: error.message });
    }
});

app.get('/getFriends/:userId', async (req, res) => {
    const { userId } = req.params;  // Accessing userId from path parameters
    try {
        const friends = await getFriends(userId);
        friends.filter(friend => friend != null);
        res.status(200).json({ friends });
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

app.get('/getEvents/:userId', async (req, res) => {
    const { userId } = req.params;  // Accessing userId from path parameters
    try {
        const events = await getEvents(userId);
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: "Failed to get events", error: error.message });
    }
});

app.get('/getFriendsEvents/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const events = await getFriendsEvents(userId);
        res.status(200).json({ events });
    } catch (error) {
        res.status(500).json({ message: "Failed to get friend events", error: error.message });
    }
    });

app.get('/searchUsers/:username', async (req, res) => {
    try {
        const users = await searchUsers(req.params.username);
        res.status(200).json(users);  // Send back the list of users
    } catch (error) {
        console.error('Failed to search users:', error);
        res.status(500).json({ message: 'Failed to search users', error: error.message });
    }
});

// Remove a friendship
app.delete('/removeFriend', async (req, res) => {
    const { user1, user2 } = req.body; // Assuming you send user1 and user2 IDs
    try {
        await removeFriendship(user1, user2);
        res.status(200).json({ message: "Friendship removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove friendship", error: error.message });

    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});