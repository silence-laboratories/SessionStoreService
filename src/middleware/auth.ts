// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { validate as uuidValidate } from 'uuid';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.header('x-user-id');

  if (!userId || !uuidValidate(userId)) {
    return res.status(400).json({ error: 'Invalid or missing x-user-id' });
  }

  req.userId = userId; // ✅ must be here
  next();
};
