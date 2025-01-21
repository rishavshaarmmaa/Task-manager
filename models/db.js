const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Br01pb5137@',
    database: 'project_manager'
});

module.exports = pool;
