import express from 'express';
import { getCurrentUser } from 'controllers/users';
import requireAuth from 'middlewares/requireAuth';
const users = express.Router();

users.use(requireAuth);

users.get('/me', getCurrentUser);

export default users;
