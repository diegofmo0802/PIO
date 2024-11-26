export class StudentNotFound extends Error {
    /**
     * Create a new StudentNotFound error
     * @param {string} code the code of student
     */
    constructor(code) {
        super(`Student with code ${code} not found`);
        this.name = 'StudentNotFound';
    }
}