import { query } from '../config/connection.js';

/**
 * @typedef {import('../types.js').student.data} student
 * @typedef {import('../types.js').student.update} studentUpdate
 */

/**
 * @type {string}
 */
const STUDENTS_TABLE = 'students';

export class Student {
    /** @private @type {string} */ _code;
    /** @private @type {string} */ _first_name;
    /** @private @type {string} */ _last_name;
    /** @private @type {number} */ _note1;
    /** @private @type {number} */ _note2;
    /** @private @type {number} */ _note3;
    /** @private @type {studentUpdate} */ toUpdate = {};
    /** @private @type {studentUpdate} */ beforeUpdate = {};

    /**
     * @private
     * create an instance of student
     * @param {student} data the data for the student
     */
    constructor(data) {
        this._code = data.code;
        this._first_name = data.first_name;
        this._last_name = data.last_name;
        this._note1 = data.note1;
        this._note2 = data.note2;
        this._note3 = data.note3;
    }
    get code() { return this._code; }
    get first_name() { return this._first_name; }
    get last_name() { return this._last_name; }
    get note1() { return this._note1; }
    get note2() { return this._note2; }
    get note3() { return this._note3; }

    set first_name(value) {
        this.beforeUpdate.first_name = this._first_name;
        this.toUpdate.first_name = this._first_name = value;
    }
    set last_name(value) {
        this.beforeUpdate.last_name = this._last_name;
        this.toUpdate.last_name = this._last_name = value;
    }
    set note1(value) {
        this.beforeUpdate.note1 = this._note1;
        this.toUpdate.note1 = this._note1 = value;
    }
    set note2(value) {
        this.beforeUpdate.note2 = this._note2;
        this.toUpdate.note2 = this._note2 = value;
    }
    set note3(value) {
        this.beforeUpdate.note3 = this._note3;
        this.toUpdate.note3 = this._note3 = value;
    }
    /**
     * @public
     * update the student in the database
     * @param {studentUpdate?} data the data to update
     * @throws {Error} if the query fails
     */
    async update(data) {
        /** @type {studentUpdate} */
        const toUpdate = {...this.toUpdate, ...data};
        if (Object.keys(toUpdate).length === 0) return;
        await Student.update(this.code, toUpdate);
    }
    /**
     * @public
     * delete the student in the database
     * @throws {Error} if the query fails
     */
    async delete() {
        await Student.delete(this.code);
    }
    /**
     * @public
     * get the student from the database
     * @param {string} code the code of student
     * @returns {Promise<Student>} the student
     * @throws {Error} if the query fails
     */
    static async get(code) {
        console.log("getting student...");
        /** @type {student[]} */
        const data = await query(`SELECT * FROM ${STUDENTS_TABLE} WHERE code = ?`, [code]);
        if (data.length == 0) throw new Error('student not found');
        return new Student(data[0]);
    }
    /**
     * @public
     * get the users from the database
     * @param {number} page the page number
     * @param {number} limit the limit of results for page
     * @returns {Promise<Student[]>} the students
     * @throws {Error} if the query fails
     */
    static async getAll(page, limit) {
        const skip = (page - 1) * limit;
        console.log("getting students...");
        /** @type {student[]} */
        const data = await query(`SELECT * FROM ${STUDENTS_TABLE} WHERE 1 LIMIT ? OFFSET ?`, [limit, skip]);
        return data.map((student) => new Student(student));
    }
    /**
     * @public
     * insert a new student in the database
     * @param {student} data the data for the student
     */
    static async create(data) {
        const { first_name, last_name, code, note1, note2, note3 } = data;
        console.log("inserting student...");
        return await query(`INSERT INTO ${STUDENTS_TABLE} (code, first_name, last_name, note1, note2, note3) VALUES (?, ?, ?, ?, ?, ?)`, [first_name, last_name, code, note1, note2, note3]);
    }
    /**
     * @public
     * update a student in the database
     * @param {studentUpdate} data the data of student
     * @param {string} code the code of student to update
     */
    static async update(code, data) {
        const { first_name, last_name, note1, note2, note3 } = data;
        console.log("updating student...");
        return await query(
            `UPDATE ${STUDENTS_TABLE} SET first_name = ?, last_name = ?, note1 = ?, note2 = ?, note3 = ? WHERE code = ?`,
            [first_name, last_name, note1, note2, note3, code]
        );
    }
    /**
     * @public
     * delete a student in the database
     * @param {string} code the code of student to delete
     */
    static async delete(code) {
        console.log("deleting student...");
        return await query(`DELETE FROM ${STUDENTS_TABLE} WHERE code = ?`, [code]);
    }
}