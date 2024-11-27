import { StudentNotFound } from '../Error/StudentNotFount.js';
import connection, { query } from '../config/connection.js';

/**
 * @typedef {import('../types.js').student.data} student
 * @typedef {import('../types.js').student.update} studentUpdate
 * @typedef {import('../types.js').student.create} studentCreate
 * @typedef {import('../types.js').student.statistics} statistics
 */

/**
 * @type {string}
 */
const STUDENTS_TABLE = 'students';

export class Student {
    /** @private @type {number} */ _code = 0;
    /** @private @type {string} */ _first_name = '';
    /** @private @type {string} */ _last_name = '';
    /** @private @type {number} */ _note1 = 0;
    /** @private @type {number} */ _note2 = 0;
    /** @private @type {number} */ _note3 = 0;
    /** @private @type {number} */ _average = 0;
    /** @private @type {studentUpdate} */ toUpdate = {};
    /** @private @type {studentUpdate} */ beforeUpdate = {};

    /**
     * @private
     * create an instance of student
     * @param {student} data the data for the student
     */
    constructor(data) {
        this._code = data.code;
        this.setUpdatedData(data);
    }
    get code() { return this._code; }
    get first_name() { return this._first_name; }
    get last_name() { return this._last_name; }
    get note1() { return this._note1; }
    get note2() { return this._note2; }
    get note3() { return this._note3; }
    get average() { return this._average; }
    /**
     * @public
     * get the student data
     * @returns {student} the student data
     */
    get data() {
        return {
            code: this.code,
            first_name: this.first_name,
            last_name: this.last_name,
            note1: this.note1,
            note2: this.note2,
            note3: this.note3,
            average: this._average
        }
    }

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
     * @private
     * set the student data
     * @param {student} value the data for the student
     */
    setUpdatedData(value) {
        this.first_name = value.first_name;
        this.last_name = value.last_name;
        this.note1 = value.note1;
        this.note2 = value.note2;
        this.note3 = value.note3;
        this._average = value.average;
    }

    /**
     * @public
     * update the student in the database
     * @param {studentUpdate?} data the data to update
     * @returns {Promise<Student>} the updated student
     * @throws {StudentNotFound} if the student not found
     * @throws {Error} if the query fails
     */
    async update(data) {
        /** @type {studentUpdate} */
        const toUpdate = { ...this.toUpdate, ...data };
        if (Object.keys(toUpdate).length === 0) return this;
        const result = await Student.update(this.code, toUpdate);
        this.setUpdatedData(result.data);
        return this;
    }
    /**
     * @public
     * delete the student in the database
     * @throws {StudentNotFound} if the student not found
     * @throws {Error} if the query fails
     */
    async delete() {
        await Student.delete(this.code);
    }
    /**
     * @public
     * get the student from the database
     * @param {number} code the code of student
     * @returns {Promise<Student>} the student
     * @throws {StudentNotFound} if the student not found
     * @throws {Error} if the query fails
     */
    static async get(code) {
        /** @type {student[]} */
        const data = await query(`SELECT * FROM ${STUDENTS_TABLE} WHERE code = ?`, [code]);
        if (data.length == 0) throw new StudentNotFound(code);
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
        /** @type {student[]} */
        const data = await query(`SELECT * FROM ${STUDENTS_TABLE} WHERE 1 LIMIT ? OFFSET ?`, [limit, skip]);
        return data.map((student) => new Student(student));
    }
    /**
     * @public
     * insert a new student in the database
     * @param {studentCreate} data the data for the student
     * @returns {Promise<Student>} the new student
     * @throws {Error} if the query fails
     */
    static async create(data) {
        const { first_name, last_name, code, note1, note2, note3 } = data;
        console.log("inserting student...");
        const result = await query(`INSERT INTO ${STUDENTS_TABLE} (code, first_name, last_name, note1, note2, note3) VALUES (?, ?, ?, ?, ?, ?)`, [code, first_name, last_name, note1, note2, note3]);
        if (result.affectedRows === 0) throw new Error('fail inserting student');
        const student = await Student.get(code);
        return student;
    }
    /**
     * @private
     * update a student in the database
     * @param {number} code the code of student to update
     * @param {studentUpdate} data the data of student
     * @returns {Promise<Student>} the updated student
     * @throws {StudentNotFound} if the student not found
     * @throws {Error} if the query fails
     */
    static async update(code, data) {
        const { first_name, last_name, note1, note2, note3 } = data;
        console.log("updating student...");
        let querySets = '';
        let values = [];
        if (first_name)  {
            querySets += 'first_name = ?, ';
            values.push(first_name);
        }
        if (last_name) {
            querySets += 'last_name = ?, ';
            values.push(last_name);
        }
        if (note1) {
            querySets += 'note1 = ?, ';
            values.push(note1);
        }
        if (note2) {
            querySets += 'note2 = ?, ';
            values.push(note2);
        }
        if (note3) {
            querySets += 'note3 = ?, ';
            values.push(note3);
        }
        values.push(code);
        querySets = querySets.slice(0, -2);
        const result = await query(`UPDATE ${STUDENTS_TABLE} SET ${querySets} WHERE code = ?`, values);
        if (result.affectedRows === 0) throw new StudentNotFound(code);
        const student = await Student.get(code);
        return student;
    }
    /**
     * @private
     * delete a student in the database
     * @param {number} code the code of student to delete
     * @throws {StudentNotFound} if the student not found
     * @throws {Error} if the query fails
     */
    static async delete(code) {
        console.log("deleting student...");
        const result = await query(`DELETE FROM ${STUDENTS_TABLE} WHERE code = ?`, [code]);
        if (result.affectedRows === 0) throw new StudentNotFound(code);
    }
    /**
     * @public
     * get the statistics from the database
     * @returns {Promise<statistics>} the statistics
     * @throws {Error} if the query fails
     */
    static async getStatistics() {
        const [
            HighestAverageStudent,
            LowestAverageStudent,
            GeneralAverage
        ] = await Promise.all([
            query(
                "SELECT CONCAT_WS(' ', first_name, last_name) AS highestAverageStudent, MAX(average) AS highestAverage " +
                "FROM students " +
                "GROUP BY first_name, last_name " +
                "ORDER BY highestAverage DESC " +
                "LIMIT 1; "
            ), query(
                "SELECT CONCAT_WS(' ', first_name, last_name) AS lowestAverageStudent, MIN(average) AS lowestAverage " +
                "FROM students " +
                "GROUP BY first_name, last_name " +
                "ORDER BY lowestAverage ASC " +
                "LIMIT 1 "
            ), query('SELECT AVG(average) AS generalAverage FROM students;')
        ])
        return {
            highestAverageStudent: HighestAverageStudent[0].highestAverageStudent,
            highestAverage: HighestAverageStudent[0].highestAverage,
            lowestAverageStudent: LowestAverageStudent[0].lowestAverageStudent,
            lowestAverage: LowestAverageStudent[0].lowestAverage,
            generalAverage: GeneralAverage[0].generalAverage
        };
    }
}
export default Student;