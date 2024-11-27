import './config/env.js';
import express from 'express';
import { addRoutes } from './apiRoutes.js';

const app = express();
app.use(express.json());

addRoutes(app);

app.listen(3000);