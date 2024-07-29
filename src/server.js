import express from 'express';
import cors from 'cors';
import pinoHTTP from 'pino-http';

//отримує значення змінної середовища 'PORT' або '3000'
const PORT = Number(env('PORT', '3000'));

const app = express();
const pino = pinoHTTP({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(pino);

// function middlewareA(req, res, next) {
//   console.log('Middleware A');
//   next();
// }

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.get('/movies', (req, res) => {
  res.send([
    {
      title: 'Film 1',
      year: 2020,
    },
    {
      title: 'Film 2',
      year: 2018,
    },
    {
      title: 'Film 3',
      year: 2021,
    },
  ]);
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
