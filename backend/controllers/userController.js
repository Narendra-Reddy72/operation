const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const redisClient = require('../utils/redisClient');

const ensureClientConnected = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        await ensureClientConnected();
        const cachedUsers = await redisClient.get('users:all');

        if (cachedUsers) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedUsers) });
        }

        User.findAll(async (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching users' });
            } else {
                await redisClient.set('users:all', JSON.stringify(data), 'EX', 3600); 
                res.status(200).json({ success: true, data: data });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.getusersById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const cachedUser = await redisClient.get(`user:${id}`);

        if (cachedUser) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedUser) });
        }

        User.findById(id, async (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching user' });
            } else {
                await redisClient.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
                res.status(200).json({ success: true, data: user });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateUserById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const { name, email, password_hash, role } = req.body;
        const hashedpassword = await bcrypt.hash(password_hash, 10);

        User.update(id, { name, email, password_hash: hashedpassword, role }, async (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error updating user' });
            } else {
                await redisClient.del(`user:${id}`); 
                await redisClient.del('users:all');  
                res.status(201).json({ success: true, data: user });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.deleteUserById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        User.delete(id, async (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error deleting user' });
            } else {
                await redisClient.del(`user:${id}`); 
                await redisClient.del('users:all');  
                res.status(201).json({ success: true, data: user });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
