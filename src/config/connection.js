import pg from 'pg'
const { Client } = pg;

const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASS = '',
    DB_NAME = 'default_db'
} = process.env;

const client = new Client({
    host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
});

/* @type {mysql.Connection} */
// const connection = mysql.createConnection({
//     host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
// });

const connection = client;

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

/**
 * execute an query in mysql
 * @param {string} query the query to execute
 * @param {Array<any>} params the query params
 * @returns {any} the query result
 */
export function query(query, params = []) {
    return new Promise((resolve, reject) => {
        query = sqlParamsToPostgresParams(query);
        console.log("querying:", query);
        connection.query(query, params, (error, result) => {
            if (error) return reject(new Error('fail executing query: ' + error));
            // console.log(result);
            if (result.command === 'SELECT') return resolve(result.rows);
            resolve(result)
        });
    });
}
/**
 * execute an query in mysql
 * @param {string} query the query to execute
 * @returns {any} the query result
 */
function sqlParamsToPostgresParams(query) {
    return query.replace(/\?/g, (_, offset, string) => {
        const index = (string.slice(0, offset).match(/\?/g) || []).length;
        return `$${index + 1}`;
    });
}

export default connection;
