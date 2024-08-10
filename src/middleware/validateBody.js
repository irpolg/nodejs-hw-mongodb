import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    console.log('ValidateBody!');
    const result = schema.validate(req.body, { abortEarly: false });

    if (typeof result.error !== 'undefined') {
      console.log(result.error);

      return next(
        createHttpError(
          400,
          result.error.details.map((err) => err.message).join(', '),
        ),
      );
    }

    next();
  };
}

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
