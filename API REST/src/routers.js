import express from 'express';
const { Express } = express;
/**
 * adds the routes to the app
 * @param {Express} app the express app
 */
export function addRoutes(app) {
    app.get('/', (rq, rs) => {
        rs.json({ message: "hello world" });
    });
}