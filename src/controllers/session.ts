//controllers/session.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../database';
import { Session } from '../entity/session';
import { validate } from 'class-validator';

export class SessionController {
  async storeSession(req: Request, res: Response) {
    const sessionRepository = AppDataSource.getRepository(Session);
    
    try {
      const session = new Session();
      session.userId = req.userId;
      session.sessionInfo = req.body;

      const errors = await validate(session);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      await sessionRepository.save(session);
      res.status(201).json({ message: 'Session stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store session' });
    }
  }

  async getSession(req: Request, res: Response) {
    const sessionRepository = AppDataSource.getRepository(Session);
    
    try {
      const session = await sessionRepository.findOneBy({ userId: req.userId });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json(session.sessionInfo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve session' });
    }
  }
}