export class StudentNotFound extends Error {
    /**
     * Create a new StudentNotFound error
     * @param {number} code the code of student
     */
    constructor(code) {
        super(`Student with code ${code} not found`);
        this.name = 'StudentNotFound';
    }
}