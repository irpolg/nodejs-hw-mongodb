//конспект
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  //   const { id } = req.params;
  const { contactId } = req.params;
  //   if (!isValidObjectId(id)) {
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

//вебінар 07-08-2024
// import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

// export function isValidId(req, res, next) {
//   const { id } = req.params;
//   //const { [id] } = req.params;

//   if (isValidObjectId(id) !== true) {
//     return next(createHttpError(400, 'ID is not valid'));
//   }

//   next();
// }
