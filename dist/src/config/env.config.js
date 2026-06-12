"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function getEnv(key, defaultValue) {
    return process.env[key] ?? defaultValue ?? '';
}
function getEnvMs(key, defaultValue) {
    return process.env[key] ?? defaultValue ?? '1d';
}
exports.env = {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: getEnv('PORT', '3000'),
    DATABASE_URL: getEnv('DATABASE_URL'),
    DIRECT_URL: getEnv('DIRECT_URL'),
    JWT_SECRET: getEnv('JWT_SECRET'),
    JWT_EXPIRES_IN: getEnvMs('JWT_EXPIRES_IN', '1d'),
    JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
    JWT_REFRESH_EXPIRES_IN: getEnvMs('JWT_REFRESH_EXPIRES_IN', '7d'),
    COOKIE_SECRET: getEnv('COOKIE_SECRET'),
    MAIL_HOST: getEnv('MAIL_HOST'),
    MAIL_USER: getEnv('MAIL_USER'),
    MAIL_PASS: getEnv('MAIL_PASS'),
    MP_ACCESS_TOKEN: getEnv('MP_ACCESS_TOKEN'),
    MP_FRONTEND_URL: getEnv('MP_FRONTEND_URL', 'http://localhost:3000'),
    BACKEND_URL: getEnv('BACKEND_URL', 'http://localhost:3000'),
};
//# sourceMappingURL=env.config.js.map