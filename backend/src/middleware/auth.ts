import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only-change-in-prod';

export interface AuthenticatedRequest extends Request {
  adminUser?: {
    id: string;
    username: string;
  };
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication required. Missing token.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string };

    req.adminUser = decoded;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired authentication token.', 401);
  }
}

export function verifyAdminToken(req: { headers: { authorization?: string } }): { id: string; username: string } | null {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
  } catch {
    return null;
  }
}
