import createHttpError from 'http-errors';

//blended 17-08-2024
export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(createHttpError(400, 'Bad request', { error: error.details }));
  }
};

//webinar 14-08-2024
// export function validateBody(schema) {
//   return (req, res, next) => {
//     //console.log('ValidateBody!');
//     const result = schema.validate(req.body, { abortEarly: false });

//     if (typeof result.error !== 'undefined') {
//       //console.log(result.error);

//       return next(
//         createHttpError(
//           400,
//           result.error.details.map((err) => err.message).join(', '),
//         ),
//       );
//     }

//     next();
//   };
// }

//console.log(result.error);
//   return (
//     res
//       .status(400)
//       //   .send({ status: 400, message: 'Validation error', data: {} });
//       .send({
//         status: 400,
//         message: 'Validation error',
//         data: result.error.details.map((err) => err.message).join(', '),
//       })
//   );
