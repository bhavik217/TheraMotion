import express from 'express';
const router = express.Router();

const users = [];

// Signup Route
router.post('/', (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            email,
            password,
        };

        users.push(newUser);

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during signup" });
    }
});

// Signin Route
router.post('/signin', (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Sign in successful",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during signin" });
    }
});

export default router;