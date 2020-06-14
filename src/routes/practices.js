import express from 'express';
const multer = require('multer');
import {
  createPractice,
  favPractice,
  getPractices,
  getPractice,
  logPractice,
  unfavPractice,
} from 'controllers/practices';
import requireAuth from 'middlewares/requireAuth';
import validator from 'middlewares/validator';
import fileUpload from 'utils/fileUpload';
const practices = express.Router();
practices.use(requireAuth);

practices.get('/', getPractices);
practices.post('/', validator('createPractice'), createPractice);
practices.get('/:practiceId', validator('getPractice'), getPractice);

practices.post(
  '/:practiceId/log',
  fileUpload.single('picture'),
  validator('logPractice'),
  logPractice
);
practices.post('/:practiceId/favorite', favPractice);
practices.post('/:practiceId/unfavorite', unfavPractice);

export default practices;
