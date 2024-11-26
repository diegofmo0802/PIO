import connection from "./config/connection.js";

/**
 * @typedef {import('./types.d.ts').student.data} student
 * @typedef {import('./types.d.ts').student.update} studentUpdate
 */

/**
 * @type {string}
 */

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
/**
 * insert a new student in the database
 * @param {student} data the data for the student
 */
export async function insertStudent(data) {
    const { first_name, last_name, code, note1, note2, note3 } = data;
    console.log("inserting student...");
    return await query(`INSERT INTO ${STUDENTS_TABLE} (code, first_name, last_name, note1, note2, note3) VALUES (?, ?, ?, ?, ?, ?)`, [first_name, last_name, code, note1, note2, note3]);
}
/**
 * update a student in the database
 * @param {student} data the data of student
 * @param {string} code the code of student to update
 */
export async function updateStudent(code, data) {
    const { first_name, last_name, note1, note2, note3 } = data;
    console.log("updating student...");
    return await query(
        `UPDATE ${STUDENTS_TABLE} SET first_name = ?, last_name = ?, note1 = ?, note2 = ?, note3 = ? WHERE code = ?`,
        [first_name, last_name, note1, note2, note3, code]
    );
}

/**
 * delete a student in the database
 * @param {string} code the code of student to delete
 */
export async function deleteStudent(code) {
    console.log("deleting student...");
    return await query(`DELETE FROM ${STUDENTS_TABLE} WHERE code = ?`, [code]);
}