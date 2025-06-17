import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import corsConfig from './config/cors.js';

import adminRoutes from './routes/admin.routes.js';
import countryRoutes from './routes/country.routes.js';
import parkRoutes from './routes/park.routes.js';
import subscribersRoutes from './routes/subscribers.routes.js';
import tourRoutes from './routes/tour.routes.js';
import userRoutes from './routes/user.routes.js';

import { logger } from './utils/logger.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors(corsConfig));
app.use(express.json());

// Morgan middleware for logging in development
if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

// Handle malformed JSON errors
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    logger.error('\x1b[31m[Server] Invalid JSON received:\x1b[0m', error.message);
    res.status(400).json({ error: 'Invalid JSON format' });
    return;
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api', subscribersRoutes);
app.use('/api', tourRoutes);
app.use('/api', countryRoutes);
app.use('/api', parkRoutes);

// 404 handler
app.use((req, res) => {
  logger.error(` Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
