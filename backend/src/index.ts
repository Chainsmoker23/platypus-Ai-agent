import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './api/routes';
import { logger } from './utils/logger';

dotenv.config();

const app: express.Express = express();
const port = process.env.PORT || 8080;

// --- Middleware ---
// FIX: Correctly use express middleware. The original code had type errors.
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set various security-related HTTP headers
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api/v1', apiRouter);

// --- Health Check ---
app.get('/', (req: Request, res: Response) => {
  // FIX: Use res.send, which was failing due to a type resolution issue.
  res.send('Platypus AI Core Service is alive!');
});

// --- Server Activation ---
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});