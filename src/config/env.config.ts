import type { StringValue } from 'ms';

export const env = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: getEnv('PORT', '3000'),

  DATABASE_URL: getEnv('DATABASE_URL'),
  DIRECT_URL: getEnv('DIRECT_URL'),

  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN') as StringValue,
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
  JWT_REFRESH_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN') as StringValue,

  COOKIE_SECRET: getEnv('COOKIE_SECRET'),
};

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}
