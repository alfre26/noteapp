const mysql = require('mysql');
const {promisify} = require('util');

const {database} = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Connection closed');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('database has too many connection');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
        if(err.code === 'ER_NOT_SUPPORTED_AUTH_MODE'){
            console.log('algo paso');
        }
    }

    if(connection){
        connection.release();
    }
    console.log('database connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;

