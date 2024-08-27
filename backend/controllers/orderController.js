const redisClient = require('../utils/redisClient');
const Order = require('../models/orderModel');

const ensureClientConnected = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};


exports.addOrder = async(req, res) => {
    try {
        await ensureClientConnected();
        const { product_id, quantity, order_date, status } = req.body;
        Order.create({ product_id, quantity, order_date, status }, async (err, order) => {
            if (err) {
                res.status(400).json({ success: false, message: err.message });
            } else {
                await redisClient.del('orders:all'); 
                res.status(201).json({ success: true, message: "Order added successfully", order: order });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.getAllOrders = async(req, res) => {
    try {
        await ensureClientConnected();
        const cachedOrders = await redisClient.get('orders:all');

        if (cachedOrders) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedOrders) });
        }

        Order.findAll(async (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching orders' });
            } else {
                await redisClient.set('orders:all', JSON.stringify(data), 'EX', 3600); 
                res.status(200).json({ success: true, data: data });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.getOrderById = async(req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const cachedOrder = await redisClient.get(`order:${id}`);

        if (cachedOrder) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedOrder) });
        }

        Order.findById(id, async (err, order) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching order' });
            } else {
                await redisClient.set(`order:${id}`, JSON.stringify(order), 'EX', 3600);
                res.status(200).json({ success: true, data: order });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.updateOrderById = async(req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const { product_id, quantity, order_date, status } = req.body;
        Order.update(id, { product_id, quantity, order_date, status }, async (err, order) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error updating order' });
            } else {
                await redisClient.del(`order:${id}`); 
                await redisClient.del('orders:all'); 
                res.status(201).json({ success: true, data: order });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.deleteOrderById = async(req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        Order.delete(id, async (err, order) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error deleting order' });
            } else {
                await redisClient.del(`order:${id}`); 
                await redisClient.del('orders:all'); 
                res.status(201).json({ success: true, data: order });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
