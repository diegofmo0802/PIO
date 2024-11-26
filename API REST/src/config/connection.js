import mysql from 'mysql';

const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASS = '',
    DB_NAME = 'default_db'
} = process.env;

/**@type {mysql.Connection} */
const connection = mysql.createConnection({
    host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

export default connection;
