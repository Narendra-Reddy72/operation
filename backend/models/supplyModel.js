const db = require('../config/db');

const Supplies = {

    create: (data, callback) => {
        const query = 'INSERT INTO suppliers (name, contact_info, product_id) VALUES (?, ?, ?);';
        db.query(query, [data.name, data.contact_info, data.product_id], callback);
    },

    findAll: (callback) => {
        const query = 'SELECT * FROM suppliers';
        db.query(query, callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM suppliers WHERE id = ?';
        db.query(query, id, callback);
    },

    update: (id, data, callback) => {
        const query = 'UPDATE suppliers SET product_id = ?, name = ?, contact_info = ? WHERE id = ?';
        db.query(query, [data.product_id, data.name, data.contact_info, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM suppliers WHERE id = ?';
        db.query(query, id, callback);
    }
}

module.exports = Supplies;
