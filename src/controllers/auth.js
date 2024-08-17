import { registerUser } from '../services/auth.js';

// //import { registerUser, loginUser } from '../services/auth.js';

export async function registerUserController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.send({ status: 200, message: 'User registered', data: registeredUser });
}

//вебінар - для перевірки Постман (поки що без логіки і перевірили чи немає помилок для роута) - 21 хв
// export async function registerUserController(req, res) {
//   res.send('Register');
// }
