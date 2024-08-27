const User = require('../models/userModel');
const { generateToken } = require('../utils/token');
const bcrypt = require('bcryptjs');
const redisClient = require('../utils/redisClient');  

const ensureClientConnected = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};


exports.addUser = async (req, res) => {
    try {
        await ensureClientConnected();
        const { name, email, password_hash, role } = req.body;

        console.log(name, email, password_hash, role);
        
        await redisClient.set('isNewUserAdded', 'true');

        const hashedPassword = await bcrypt.hash(password_hash, 10);

        const cachedUser = await redisClient.get(`user:${email}`);
        if (cachedUser) {
            return res.status(400).json({ success: false, message: 'User already exists in cache' });
        }

        User.create({ name, email, password_hash: hashedPassword, role }, async (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Error occurred while creating user' });
            } else {
                const token = generateToken(user);
                res.status(201).json({ success: true, data: user, token: token });

                const userRedis = JSON.stringify({ name, email, password_hash: hashedPassword, role });
                try {
                    await redisClient.sAdd('users', userRedis);  // Add user to a Redis set
                    await redisClient.set(`user:${email}`, userRedis, 'EX', 3600);  // Cache user with 1-hour expiration
                    await redisClient.set('isNewUserAdded', 'false');  // Reset the flag
                } catch (redisErr) {
                    console.log("Error storing user in Redis:", redisErr);
                }
            }
        });
        
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.loginUser = async(req, res) => {
    try {
        await ensureClientConnected();
        const { email, password_hash } = req.body;
        const cachedUser = await redisClient.get(email);

        if (cachedUser) {
            const user = JSON.parse(cachedUser);
            const isMatch = await bcrypt.compare(password_hash, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }
            const token = generateToken(user);
            return res.status(200).json({ success: true, data: user, token: token });
        }

        User.findByEmail(email, async (err, user) => {
            if (err || !user) {
                return res.status(404).json({ success: false, message: 'Email not found' });
            }
            const isMatch = await bcrypt.compare(password_hash, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid Credentials' });
            }

            await redisClient.set(email, JSON.stringify(user), 'EX', 3600);  // Cache user for 1 hour

            const token = generateToken(user);
            res.status(200).json({ success: true, data: user, token: token });
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
