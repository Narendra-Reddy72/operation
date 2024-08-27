const redisClient = require('../utils/redisClient');
const Product = require('../models/productModel');

const ensureClientConnected = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};


exports.addProduct = async (req, res) => {
    try {
        await ensureClientConnected();
        const { name, sku, description, price, current_stock, reorder_level } = req.body;
        Product.create({ name, sku, description, price, current_stock, reorder_level }, async (err, product) => {
            if (err) {
                res.status(400).json({ success: false, message: err.message });
            } else {
                await redisClient.del('products:all');  // Clear cache for all products
                res.status(201).json({ success: true, message: "Product added successfully", data: product });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        await ensureClientConnected();
        const cachedProducts = await redisClient.get('products:all');

        if (cachedProducts) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedProducts) });
        }

        Product.findAll(async (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching Products' });
            } else {
                await redisClient.set('products:all', JSON.stringify(data), 'EX', 3600);  // Cache for 1 hour
                res.status(200).json({ success: true, data: data });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.getproductById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const cachedProduct = await redisClient.get(`product:${id}`);

        if (cachedProduct) {
            return res.status(200).json({ success: true, data: JSON.parse(cachedProduct) });
        }

        Product.findById(id, async (err, product) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error fetching product' });
            } else {
                await redisClient.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);  // Cache for 1 hour
                res.status(200).json({ success: true, data: product });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.updateProductById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        const { name, sku, description, price, current_stock, reorder_level } = req.body;
        Product.update(id, { name, sku, description, price, current_stock, reorder_level }, async (err, product) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error updating Product' });
            } else {
                await redisClient.del(`product:${id}`);  
                await redisClient.del('products:all');  
                res.status(201).json({ success: true, data: product });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.deleteproductById = async (req, res) => {
    try {
        await ensureClientConnected();
        const { id } = req.params;
        Product.delete(id, async (err, product) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Error deleting product' });
            } else {
                await redisClient.del(`product:${id}`);  
                await redisClient.del('products:all');  
                res.status(201).json({ success: true, data: product });
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
