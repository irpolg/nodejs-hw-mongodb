//import { registerUser } from '../services/auth.js';

// //import { registerUser, loginUser } from '../services/auth.js';

import createHttpError from 'http-errors';
import { createUser, findUserByEmail } from '../services/auth.js';

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

//вебінар - для перевірки Постман (поки що без логіки і перевірили чи немає помилок для роута) - 21 хв
// export async function registerUserController(req, res) {
//   res.send('Register');
// }
