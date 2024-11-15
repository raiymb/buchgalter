import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

export const securityMiddlewares = [
  helmet(),
  cors(),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  }),
];
