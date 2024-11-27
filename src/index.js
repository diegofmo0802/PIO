import './config/env.js';
import path from 'path';
import express from 'express';
import { addRoutes } from './apiRoutes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

addRoutes(app);

app.use('/client', express.static(path.join(__dirname, '../client')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '../client', 'index.html')); });

app.listen(3000, () => {
    console.log(`Server running`);
});