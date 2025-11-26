import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './api/routes';
import { logger } from './utils/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set various security-related HTTP headers
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api/v1', apiRouter);

// --- Health Check ---
app.get('/', (req: Request, res: Response) => {
  res.send('Platypus AI Core Service is alive!');
});

// --- Server Activation ---
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
