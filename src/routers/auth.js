//import { Router } from 'express';
import express from 'express';
import { validateBody } from '../middleware/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();
// треба jsonParser, бо будемо передавати дані про користувача в Body

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUserSchema), //цей Body треба провалідувати і в цю мідлвару передамо схему
  ctrlWrapper(registerUserController), //якщо успішна валідація, то викликаємо метод з контролера
);

export default router;
