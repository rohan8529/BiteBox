import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { Name, Email, Password, cPassword } = req.body;

    // Input validation
    if (!Name.trim() || !Email.trim() || !Password.trim() || !cPassword.trim()) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate and format name
    const trimmedName = Name.trim();
    const nameRegex = /^[A-Za-z][A-Za-z0-9]*(?: [A-Za-z0-9]+)*$/;

    if (!nameRegex.test(trimmedName)) {
        return res.status(400).json({ message: 'Invalid name format' });
    }

    const newName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();

    // Validate email format
    const trimmedEmail = Email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password length
    if (Password.length < 4) {
        return res.status(400).json({ message: 'Password must be at least 4 characters long' });
    }

    if (Password !== cPassword) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }

    try {
        // Check for existing user
        let user = await User.findOne({ email: new RegExp('^' + trimmedEmail + '$', 'i') });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create new user
        user = new User({ name: newName, email: trimmedEmail, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token in a secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 3600000 // 1 hour in milliseconds
        });

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Registration error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email.trim() || !password.trim()) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // validate email format
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: trimmedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as an HTTP-only, secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'None', // Adjust this based on your needs (e.g., 'Lax' or 'Strict' for more restrictive settings)
            secure: true, // Ensure cookie is sent over HTTPS
            maxAge: 3600000 // Cookie expiration time in milliseconds (1 hour)
        });

        res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Check if the user is authenticated
export const checkAuth = (req, res) => {
    if (req.user) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};


// Logout User
export const logout = (req, res) => {
    res.cookie('token', '', { httpOnly: true, secure: true, sameSite: 'None', expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
};
