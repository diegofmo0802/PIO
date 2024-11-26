import express from 'express';
import { addRoutes } from './routers.js';

const app = express();

addRoutes(app);

app.listen(3000);