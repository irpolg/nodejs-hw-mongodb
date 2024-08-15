//import { Router } from 'express';
import express from 'express';
import { validateBody } from '../middleware/validateBody.js';
import { userSchema } from '../db/models/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  'auth/register',
  jsonParser,
  validateBody(userSchema),
  ctrlWrapper(registerController),
);

export default router;
