/**
 * @typedef {import('../types').student.data} studentData
 * @typedef {import('../types').student.update} studentUpdate
 * @typedef {import('../types').student.create} studentCreate
 * @typedef {{page: number, limit: number, data: studentData[]}} studentPage
 * @typedef {import('../types').student.statistics} statistics
 */

export class Api {
    static BASE_URL = '/api/student';
    /**
     * get the students from the api
     * @param {number} page the page number
     * @param {number} limit  the limit of students per page
     * @returns {Promise<studentPage>} the students
     */
    static async getStudents(page = 1, limit = 10) {
        const response = await fetch(`${Api.BASE_URL}?page=${page}&limit=${limit}`);
        if (response.status !== 200) throw new Error('Failed to get students');
        const data = await response.json();
        return data;
    }
    /**
     * get the student from the api
     * @param {string} code the code of the student
     * @returns {Promise<studentData>} the student
     */
    static async getStudent(code) {
        const response = await fetch(`${Api.BASE_URL}/${code}`);
        if (response.status !== 200) throw new Error('Failed to get student');
        const data = await response.json();
        return data;
    }
    /**
     * create the student in the api
     * @param {studentCreate} data the data of the student
     * @returns {Promise<studentData>}
     */
    static async createStudent(data) {
        const response = await fetch(Api.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status !== 201) throw new Error('Failed to create student');
        const result = await response.json();
        return result;
    }
    /**
     * update the student in the api
     * @param {number} code the code of the student
     * @param {studentUpdate} data the data of the student
     * @returns {Promise<studentData>}
     */
    static async updateStudent(code, data) {
        const response = await fetch(`${Api.BASE_URL}/${code}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status !== 200) throw new Error('Failed to update student');
        const result = await response.json();
        return result;
    }
    /**
     * delete the student from the api
     * @param {number} code the code of the student
     * @returns {Promise<void>}
     */
    static async deleteStudent(code) {
        const response = await fetch(`${Api.BASE_URL}/${code}`, {
            method: 'DELETE'
        });
        if (response.status !== 200) throw new Error('Failed to delete student');
        const result = await response.json();
        return result;
    }
    /**
     * get the statistics from the api
     * @returns {Promise<statistics>} the statistics
     */
    static async getStatistics() {
        const response = await fetch(`/api/statistics`);
        if (response.status !== 200) throw new Error('Failed to get statistics');
        const data = await response.json();
        return data;
    }
}