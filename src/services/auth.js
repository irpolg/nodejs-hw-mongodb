//import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { createHttpError } from 'http-error';
import { User } from '../db/models/users';
//import { Session } from '../db/models/sessions';

export async function registerUser(payload) {
  const maybeUser = await User.findOne({ email: payload.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email already in user');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}
