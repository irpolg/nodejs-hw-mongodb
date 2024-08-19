//import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/sessions.js';
//import { createHttpError } from 'http-error';

//blended 17-08-2024
import { User } from '../db/models/user.js';
import { createSession } from '../utils/createSession.js';
import createHttpError from 'http-errors';

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

export const refreshUserSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }
};

export const logoutUser = async (sessionId) => {
  // return Session.deleteOne({ _id: sessionId });
  await Session.deleteOne({ _id: sessionId });
}; //19-08 видаляємо цей документ зі значенням _id: sessionId

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
