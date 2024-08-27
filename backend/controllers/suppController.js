const redisClient = require('../utils/redisClient');
const Supplies = require('../models/supplyModel');

const ensureClientConnected = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};


exports.addsupplies = async (req, res) => {
    try {
        await ensureClientConnected();
        const { name, contact_info, product_id } = req.body;
        Supplies.create({ name, contact_info, product_id }, async (err, result) => {
            if (err) {
                res.status(400).json({ success: false, message: err.message });
            } else {
                await redisClient.del('supplies:all'); 
                res.status(201).json({ success: true, message: "Supplies added successfully", data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllSupplies = async (req, res) => {
    try {
        await ensureClientConnected();
        const cachedSupplies = await redisClient.get('supplies:all');

        if (cachedSupplies) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedSupplies) });
        }

        Supplies.findAll(async (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching supplies' });
            } else {
                await redisClient.set('supplies:all', JSON.stringify(results), 'EX', 3600); // Cache for 1 hour
                res.status(200).json({ success: true, data: results });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getsuppliesById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const cachedSupply = await redisClient.get(`supply:${id}`);

        if (cachedSupply) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedSupply) });
        }

        Supplies.findById(id, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching supplies' });
            } else if (result.length === 0) {
                res.status(404).json({ success: false, message: 'Supplies not found' });
            } else {
                await redisClient.set(`supply:${id}`, JSON.stringify(result[0]), 'EX', 3600); // Cache for 1 hour
                res.status(200).json({ success: true, data: result[0] });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateSuppliesById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const { name, contact_info, product_id } = req.body;

        if (isNaN(product_id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        Supplies.update(id, { name, contact_info, product_id }, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error updating supplies' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Supplies not found' });
            } else {
                await redisClient.del(`supply:${id}`); 
                await redisClient.del('supplies:all'); 
                res.status(200).json({ success: true, message: 'Supplies updated successfully', data: result });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deletesuppliesById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        Supplies.delete(id, async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error deleting supplies' });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Supplies not found' });
            } else {
                await redisClient.del(`supply:${id}`); 
                await redisClient.del('supplies:all'); 
                res.status(200).json({ success: true, message: 'Supplies deleted successfully' });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
