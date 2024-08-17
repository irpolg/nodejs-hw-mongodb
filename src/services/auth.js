//import crypto from 'node:crypto';
//import bcrypt from 'bcrypt';
//import { createHttpError } from 'http-error';
import { User } from '../db/models/user.js';
//import { Session } from '../db/models/sessions';
import createHttpError from 'http-errors';

//web-1 mod-5
export async function registerUser(payload) {
  const maybeUser = await User.findOne({ email: payload.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email already in user');
  }

  //payload.password = await bcrypt.hash(payload.password, 10);

  return User.create(payload);
}

//konspekt
// export const registerUser = async (payload) => {
//   return await User.create(payload);
// };
