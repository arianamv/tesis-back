require('dotenv').config({
    path: process.env.NODE_ENV === 'production' 
          ? __dirname + '/../.env.production' 
          : __dirname + '/../.env.development'
});

var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

const getConnection = () => {
    return connection;
}

module.exports = { getConnection };
