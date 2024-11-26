import connection from "./config/connection.js";

const STUDENTS_TABLE = 'students';

/**
 * execute an query in mysql
 * @param {string} query the query to execute
 * @param {Array<any>} params the query params
 * @returns {any} the query result
 */
export function query(query, params) {
    return new Promise((resolve, reject) => {
        console.log("querying:", query);
        connection.query(query, params, (error, result) => {
            if (error) return reject(new Error('fail executing query'));
            return resolve(result);
        });
    });
}
/**
 * get the users from the database
 * @param {number} page the page number
 * @param {number} limit the limit of results for page
 */
export async function getStudents(page, limit) {
    const skip = (page - 1) * limit;
    console.log("getting students...");
    return await query(`SELECT * FROM ${STUDENTS_TABLE} WHERE 1 LIMIT ? OFFSET ?`, [limit, skip]);
}