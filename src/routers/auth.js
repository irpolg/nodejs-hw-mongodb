//import { Router } from 'express';
import express from 'express';
import { validateBody } from '../middleware/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutController,
  refreshUserController,
  sendResetEmailController,
} from '../controllers/auth.js';
import {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();
// треба jsonParser, бо будемо передавати дані про користувача в Body

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema), //цей Body треба провалідувати і в цю мідлвару передамо схему
  ctrlWrapper(registerUserController), //якщо успішна валідація, то викликаємо метод з контролера
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserController));

router.post('/logout', ctrlWrapper(logoutController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

export default router;
