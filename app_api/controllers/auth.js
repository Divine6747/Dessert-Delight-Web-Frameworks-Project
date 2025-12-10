require('../models/user');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const userRegister = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: "Please fill in all required fields." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "The passwords you entered do not match." });
    }

    if (password.length < 7) {
        return res.status(400).json({ error: "Your password must be at least 7 characters long." });
    }

    if (username.length < 5) {
        return res.status(400).json({ error: "Username must be at least 5 characters." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "This username is already taken." });
        }

        const newUser = new User({
            username,
            password
        });

        await newUser.save();
        return res.status(200).json({ status: "success" });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
};

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Please enter both username and password." });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "We couldn't find an account with that username." });
        }

        user.authenticate(password, (err, result) => {
            if (err || !result) {
                return res.status(400).json({ error: "The password you entered is incorrect." });
            }
            return res.status(200).json({ status: "success" });
        });
        
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
};


module.exports = {
    userRegister,
    userLogin
};