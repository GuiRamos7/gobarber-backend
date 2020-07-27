import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempDestination = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempDestination,

  storage: multer.diskStorage({
    destination: tempDestination,
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
