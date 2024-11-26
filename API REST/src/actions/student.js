import { StudentNotFound } from '../Error/StudentNotFount';
import Student from '../helper/Student';

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * GET route handler for fetching students
 * @param {Request} request - The request object
 * @param {Response} response - The response object
 */
export async function getStudents(request, response) {
    const code = request.query.code ? String(request.query.code) : null;

    if (!code) {
        const pageParam = String(request.query.page || 1);
        const limitParam = String(request.query.limit || 10);
        const page = parseInt(pageParam, 10);
        const limit = parseInt(limitParam, 10);
        try {
            const students = Student.getAll(page, limit);
            const data = (await students).map((student) => student.data);
            response.json({
                page, limit, data
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'fail fetching students' });
        }
        return;
    }
    try {
        const student = await Student.get(code);
        response.json(student.data);
    } catch (error) {
        if (error instanceof StudentNotFound) return response.status(404).json({ error: error.message });
        console.error(error);
        response.status(500).json({ error: 'fail fetching student' });
    }
}
/**
 * POST route handler for creating a new student
 * @param {Request} request - The request object
 * @param {Response} response - The response object
 */
export async function createStudent(request, response) {
    const { first_name, last_name, code, note1 = null, note2 = null, note3 = null } = request.body;

    if (!first_name) return response.status(400).json({ error: 'first_name is required' });
    if (!last_name) return response.status(400).json({ error: 'last_name is required' });

    const data = { first_name, last_name, code, note1, note2, note3 };
    try {
        await Student.create(data);
        response.status(201).json({ message: 'student created' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'fail creating student' });
    }
}

/**
 * PUT route handler for updating a student
 * @param {Request} request - The request object
 * @param {Response} response - The response object
 */
export async function updateStudent(request, response) {
    const { first_name, last_name, code, note1 = null, note2 = null, note3 = null } = request.body;
    if (!code) return response.status(400).json({ error: 'code is required' });
    const data = {};
    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (note1) data.note1 = note1;
    if (note2) data.note2 = note2;
    if (note3) data.note3 = note3;
    try {
        const student = await Student.get(code);
        await student.update(data);
        response.json({ message: 'student updated' });
    } catch (error) {
        if (error instanceof StudentNotFound) return response.status(404).json({ error: error.message });
        console.error(error)
        response.status(500).json({ error: 'fail updating student' });
    }
}

/**
 * DELETE route handler for deleting a student
 * @param {Request} request - The request object
 * @param {Response} response - The response object
 */
export async function deleteStudent(request, response) {
    const code = String(request.query.code);
    if (!code) return response.status(400).json({ error: 'code is required' });
    try {
        const student = await Student.get(code);
        await student.delete();
        response.json({ message: 'student deleted' });
    } catch (error) {
        if (error instanceof StudentNotFound) return response.status(404).json({ error: error.message });
        console.error(error)
        response.status(500).json({ error: 'fail deleting student' });
    }
}
/**
 * Routes to access the students
 * GET /api/students?page=number&limit=number
 * GET /api/students?code=string
 * POST /api/students
 * PUT /api/students
 * DELETE /api/students?code=string
 */