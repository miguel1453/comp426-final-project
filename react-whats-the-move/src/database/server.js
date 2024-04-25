import express from 'express';
import cors from 'cors'; // Import CORS module
import { createUser } from './userModel.js';

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    await createUser(username, password, (error, result) => {
        if (error) {
            res.status(500).json({ message: "Failed to create user", error: error.message });
            return;
        }
        res.status(201).json({
            message: "User created successfully",
            userId: result.id
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
