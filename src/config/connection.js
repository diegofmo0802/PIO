import pg from 'pg'
const { Client } = pg;

const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASS = '',
    DB_NAME = 'default_db'
} = process.env;

let isConnected = false;

async function getConnection() {
    const connection = new Client({
        host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
    });
    await connection.connect();
    isConnected = true;
    connection.on('end', () => {
        isConnected = false;
    });
    return connection;
}

let connection = await getConnection();

/**
 * execute an query in mysql
 * @param {string} query the query to execute
 * @param {Array<any>} params the query params
 * @returns {Promise<any>} the query result
 */
export function query(query, params = []) {
    return new Promise(async (resolve, reject) => {
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
 * close the connection to mysql
 */
export function closeConnection() {
    if (isConnected) connection.end();
}
/**
 * Change the param pointers in mysql query's (?, ?) to postgres query's ($1, $2)
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
