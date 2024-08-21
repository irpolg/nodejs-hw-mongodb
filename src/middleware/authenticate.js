// //конспект
// import createHttpError from 'http-errors';

// import { Session } from '../db/models/session.js';
// //import { User } from '../db/models/user.js';

// export const authenticate = async (req, res, next) => {
//   const authHeader = req.get('Authorization');

//   if (!authHeader) {
//     next(createHttpError(401, 'Please provide Authorization header'));
//     return;
//   }

//   const bearer = authHeader.split(' ')[0];
//   const token = authHeader.split(' ')[1];

//   if (bearer !== 'Bearer' || !token) {
//     next(createHttpError(401, 'Auth header should be of type Bearer'));
//     return;
//   }

//   const session = await Session.findOne({ accessToken: token });

//   if (!session) {
//     next(createHttpError(401, 'Session not found'));
//     return;
//   }

//   const isAccessTokenExpired =
//     new Date() > new Date(session.accessTokenValidUntil);

//   if (isAccessTokenExpired) {
//     next(createHttpError(401, 'Access token expired'));
//   }

//   //   const user = await User.findById(session.userId);

//   //   if (!user) {
//   //     next(createHttpError(401));
//   //     return;
//   //   }

//   //   req.user = user;
//   console.log(session);
//   next();
// };

//репозиторій по вебінару
// import createHttpError from 'http-errors';

// import { User } from '../db/models/user.js';
// import { Session } from '../db/models/sessions.js';

// export async function authenticate(req, res, next) {
//   const { authorization } = req.headers;

//   if (typeof authorization !== 'string') {
//     return next(createHttpError(401, 'Please provide Authorization header'));
//   }

//   const [bearer, accessToken] = authorization.split(' ', 2);

//   if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
//     return next(createHttpError(401, 'Auth header should be type of Bearer'));
//   }

//   const session = await Session.findOne({ accessToken });

//   if (session === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   if (new Date() > new Date(session.accessTokenValidUntil)) {
//     return next(createHttpError(401, 'Access token is expired'));
//   }

//   const user = await User.findById(session.userId);

//   if (user === null) {
//     return next(createHttpError(401, 'Session not found'));
//   }

//   req.user = user;
//   console.log(session);
//   next();
// }

//моя по вебінару - НО
import createHttpError from 'http-errors';
import { Session } from '../db/models/sessions.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  //console.log(req.headers);
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please, provide Authorization header'));
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be type of Bearer'));
  }

  const session = await Session.findOne({ accessToken });
  //console.log('session >>', session);

  if (session === null) {
    return next(createHttpError(401, 'authenticate - Session not found!'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token is expired!'));
  }

  //console.log('session 2 >>', session);
  const user = await User.findById(session.userId);
  if (user === null) {
    return next(createHttpError(401, 'user null - Session not found!'));
  }

  req.user = user;

  next();
};
