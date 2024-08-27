const db = require('../config/db');

const Product = {

    create : (data,callback)=>{
        const query = 'INSERT INTO Products(name, sku, description, price, current_stock, reorder_level)VALUES(?,?,?,?,?,?);';
        db.query(query,[data.name, data.sku, data.description, data.price, data.current_stock, data.reorder_level],callback)
    },

    findAll:(callback)=>{
        const query = 'SELECT * FROM Products';
        db.query(query,callback)
    },

    findById:(id,callback)=>{
        const query = 'SELECT * FROM Products WHERE id=?';
        db.query(query,id,callback)
    },

    update:(id,data,callback)=>{
        const query = 'UPDATE Products SET name = ?, sku = ?, description = ?, price = ?,current_stock= ?,reorder_level= ? Where id = ?';
        db.query(query,[data.name, data.sku, data.description, data.price, data.current_stock,data.reorder_level,id],callback)
    },
    
    delete:(id,callback)=>{
        const query = 'DELETE FROM Products WHERE id=?';
        db.query(query,id,callback)
    }
}

module.exports = Product