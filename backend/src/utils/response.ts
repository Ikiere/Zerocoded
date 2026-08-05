import { Response } from 'express';
import { ApiResponse } from '../../shared/src/types';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
): void {
  const response: ApiResponse<T> = { success: true, data, message };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 400,
  errors?: Record<string, string[]>
): void {
  const response: ApiResponse = { success: false, message, errors };
  res.status(statusCode).json(response);
}

export function sendServerError(res: Response): void {
  const response: ApiResponse = {
    success: false,
    message: 'An unexpected error occurred. Please try again later.',
  };
  res.status(500).json(response);
}
