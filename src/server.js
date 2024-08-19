import { env } from './utils/env.js';
import express from 'express';
//import cookieParser from 'cookie-parser'; // 19-08-2024 webinar2 - 16-08-2024

import cors from 'cors';
import pino from 'pino-http';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

//отримує значення змінної середовища 'PORT' або '3000'
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  //app.use(cookieParser()); // 19-08-2024 webinar2 - 16-08-2024
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Contacts Web Service !',
    });
  });
  app.use(contactsRouter);

  //   app.use('/auth', authRouter); //HW-5 17-08-2024
  app.use(authRouter); //HW-5 17-08-2024

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
