const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
});

connection.connect((err)=>{
    if(err){
        console.error('Database not connected successfully',err)
        return;
    }else{
        console.log('Database connected successfully')
    }
})

module.exports = connection;