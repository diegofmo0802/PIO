/// @ts-nocheck
import express from 'express';
import { getStudents } from './query.js';
const { Express } = express;
/**
 * adds the routes to the app
 * @param {Express} app the express app
 */
export function addRoutes(app) {
    app.get('/', async (rq, rs) => {
        console.log("GET -> /");
        rs.json(await getStudents(1, 10));
    });
}