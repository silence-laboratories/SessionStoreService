//index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import { AppDataSource } from './database';
import { authMiddleware } from './middleware/auth';
import { SessionController } from './controllers/session';
dotenv.config();


const app = express();
const PORT = parseInt(process.env.PORT || '3008', 10);
const sessionController = new SessionController();
/// <reference path="./types/express.d.ts" />
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

// Database initialization
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

app.use(authMiddleware);

app.post('/api/session', (req, res) => sessionController.storeSession(req, res));
app.get('/api/session', (req, res) => sessionController.getSession(req, res));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});