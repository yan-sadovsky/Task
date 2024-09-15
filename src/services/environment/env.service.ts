import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
  E2E_BASE_URL: z.string().min(11), // e2e
  SOCKET_URL: z.string().min(11), // socket api
});

export const env = envSchema.parse(process.env);
