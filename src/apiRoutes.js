import * as studentAction from './actions/student.js';

/**
 * @typedef {import('express').Express} Express

 * Adds the routes to the app
 * @param {Express} app - The express app
 */
export function addRoutes(app) {
    app.get('/api/student', studentAction.getStudents);
    app.get('/api/student/:code', studentAction.getStudent);
    app.post('/api/student', studentAction.createStudent);
    app.put('/api/student/:code', studentAction.updateStudent);
    app.delete('/api/student/:code', studentAction.deleteStudent);
    app.get('/api/statistics', studentAction.getStatistics);
}
