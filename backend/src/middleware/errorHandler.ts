import { Request, Response, NextFunction } from 'express';
import { sendServerError } from '../utils/response';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Never expose internal error details in production
  if (process.env.NODE_ENV !== 'development') {
    console.error('[ERROR]', { message: err.message, stack: err.stack, url: req.url });
    sendServerError(res);
    return;
  }
  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
}
