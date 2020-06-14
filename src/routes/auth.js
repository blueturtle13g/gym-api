import express from 'express';
import { fakeLogin } from 'controllers/auth';
import validator from 'middlewares/validator';
const auth = express.Router();

auth.post('/fake-login', validator('fakeLogin'), fakeLogin);

export default auth;
