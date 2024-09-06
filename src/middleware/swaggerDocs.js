//webinar-2
import * as fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';

export function swaggerDocs() {
  try {
    const doc = JSON.parse(
      fs.readFileSync(path.resolve('docs', 'swagger.json')),
      {
        encoding: 'utf-8',
      },
    );
    console.log('doc >> ', doc);
    return [...swaggerUI.serve, swaggerUI.setup(doc)];
  } catch (error) {
    console.error(error); //виведем в логи помилку, а користувачеві про неї не потрібно знати
    return (req, res, next) => {
      next(createHttpError(500, 'Can load swagger docs'));
    };
  }
}

// import createHttpError from 'http-errors';
// import swaggerUI from 'swagger-ui-express';
// import fs from 'node:fs';

// import { SWAGGER_PATH } from '../constants/index.js';

// export const swaggerDocs = () => {
//   try {
//     const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
//     return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
//   } catch (err) {
//     console.error(err); //виведем в логи помилку
//     return (req, res, next) =>
//       next(createHttpError(500, "Can't load swagger docs"));
//   }
// };
