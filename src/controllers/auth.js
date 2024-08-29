import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import {
  createUser,
  findUserByEmail,
  setupSession,
  logoutUser,
  refreshUserSession,
  sendResetEmail,
  resetPassword,
} from '../services/auth.js';
import { setupCookie } from '../utils/setupCookie.js';

export const registerUserController = async (req, res) => {
  const { name, email } = req.body;

  const user = await findUserByEmail(email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name,
      email,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    throw createHttpError(401, 'User not authorized!');
  }

  const isEqualPassword = bcrypt.compare(password, user.password);
  if (!isEqualPassword) {
    throw createHttpError(401, 'User not authorized!');
  }

  const userSession = await setupSession(user._id); // треба засетапити інф-ю про наші куки
  setupCookie(res, userSession);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: userSession.accessToken,
    },
  });
};

export const refreshUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshUserSession(sessionId, refreshToken); //отримаємо нову сесію

  setupCookie(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });

  //res.send('Refresh'); //перевірили чи немає помилок для роута
};

export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    //if (typeof req.cookies.sessionId === 'string')
    await logoutUser(sessionId);
  } // видалили сесію

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  //console.log(req.cookies);
  //res.send('Logout'); //перевірили чи немає помилок для роута -вебінар -21 хв
  res.status(204).end(); //нема що повертати користувачу
};

export const sendResetEmailController = async (req, res) => {
  const { email } = req.body;
  await sendResetEmail(email); //нічого не повертає у відповідь
  //res.send('Send Reset Email');
  res.send({
    status: 200,
    message: 'Send email was successfully',
    data: {}, // порожній об'єкт
  });
};

//скинути пароль
export const resetPasswordController = async (req, res) => {
  const { password, token } = req.body;
  await resetPassword(password, token);
  //res.send('Reset password');
  res.send({
    status: 200,
    message: 'Password has been successfully reset',
    data: {}, // даних немає, тому порожній масив
  });
};

//webinar 14-08-2024
// export async function registerUserController(req, res) {
//   const payload = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };

//   const registeredUser = await registerUser(payload);
//   res.send({ status: 200, message: 'User registered', data: registeredUser });
// }
