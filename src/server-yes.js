import { env } from './utils/env.js';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
//import { getAllContacts, getContactById } from './services/contacts.js';
import {
  getAllContactsController,
  getIdContactController,
  createContactController,
} from './controllers/contacts.js';

//отримує значення змінної середовища 'PORT' або '3000'
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
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

  app.get('/contacts', getAllContactsController);

  app.get('/contacts/:contactId', getIdContactController);

  app.post('/contacts', createContactController);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Page not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
