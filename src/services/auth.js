//import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/sessions.js';
//import { createHttpError } from 'http-error';

//blended 17-08-2024
import { User } from '../db/models/user.js';
import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const setupSession = async (userId) => {
  await Session.deleteOne({ userId });
  return Session.create({ userId, ...createSession() });
};

//web-1 mod-5
// import createHttpError from 'http-errors';
// export async function registerUser(payload) {
//   const maybeUser = await User.findOne({ email: payload.email });

//   if (maybeUser !== null) {
//     throw createHttpError(409, 'Email already in user');
//   }
//   //payload.password = await bcrypt.hash(payload.password, 10);
//   return User.create(payload);
// }

//konspekt
// export const registerUser = async (payload) => {
//   return await User.create(payload);
// };
