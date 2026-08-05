import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendError } from '../utils/response';

/**
 * Middleware factory that validates request body against a Zod schema.
 * Returns 422 with field-level errors on validation failure.
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = formatZodErrors(result.error);
      sendError(res, 'Validation failed', 422, errors);
      return;
    }
    // Attach validated (and coerced) data back to body
    req.body = result.data;
    next();
  };
}

function formatZodErrors(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = issue.path.join('.');
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(issue.message);
  }
  return errors;
}
