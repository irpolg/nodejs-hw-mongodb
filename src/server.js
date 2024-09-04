import path from 'node:path';
import { env } from './utils/env.js';
import express from 'express';
import cookieParser from 'cookie-parser'; // 19-08-2024 webinar2 - 16-08-2024

import cors from 'cors';
import pino from 'pino-http';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
// 19-08-2024 ДЗ-5 - додала
import { authenticate } from './middleware/authenticate.js';
import { swaggerDocs } from './middleware/swaggerDocs.js';

//отримує значення змінної середовища 'PORT' або '3000'
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(cookieParser()); // 19-08-2024 webinar2 - 16-08-2024
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use('/api-docs', swaggerDocs());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Contacts Web Service !',
    });
  });

  app.use('/avatars', express.static(path.resolve('src', 'public/avatars'))); //hw-6 29-08-2024

  app.use('/auth', authRouter); //HW-5 17-08-2024

  app.use('/contacts', authenticate, contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Перший рядок app.use(pino({ transport: { target: 'pino-pretty', }, }),);
// використовує модуль pino для логування подій від сервера.
// У цьому випадку вказано, що використовується транспорт
// pino - pretty, який форматує логи у привабливому для читача вигляді.

// Другий рядок app.use(cors()); використовує модуль cors для налаштування
// Cross - Origin Resource Sharing(CORS) політики, яка дозволяє або обмежує
// доступ до ресурсів на сервері з іншого джерела(наприклад, інших доменів).
