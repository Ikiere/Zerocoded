import xss from 'xss';

/**
 * Sanitize a string value against XSS attacks.
 * Strips all HTML tags and attributes.
 */
export function sanitizeString(value: string): string {
  return xss(value, {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
  }).trim();
}

/**
 * Sanitize all string values in an object (shallow).
 * Returns a new object with sanitized values.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = sanitizeString(value);
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

/**
 * Detect common injection patterns in a string.
 * Returns true if suspicious content is found.
 */
export function containsInjection(value: string): boolean {
  const patterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /\bUNION\b.*\bSELECT\b/i,
    /\bDROP\b.*\bTABLE\b/i,
    /\bINSERT\b.*\bINTO\b/i,
    /--\s/,
    /;.*(DROP|DELETE|UPDATE|INSERT)/i,
    /\.\.\//,
    /\.\.\\/,
  ];
  return patterns.some((pattern) => pattern.test(value));
}
