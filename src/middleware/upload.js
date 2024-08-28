import path from 'node:path';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, 'file.txt');
    //const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //cb(null, uniquePrefix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });
