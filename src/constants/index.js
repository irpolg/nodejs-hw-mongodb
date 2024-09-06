//import path from 'node:path'; //06-09-2024
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds;
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds;

export const SMTP = {
  SERVER: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
};
//konspekt 06-09-2024
//export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
