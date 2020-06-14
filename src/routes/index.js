import express from 'express';
import practiceRouter from './practices';
import userRouter from './users';
import APIError from 'utils/apiError';
import authRouter from './auth';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hello world');
});
router.use('/auth', authRouter);
router.use('/practices', practiceRouter);
router.use('/users', userRouter);

router.use((req, res, next) => next(new APIError('API not found', 404, true)));
// error handler, send stacktrace only during development
router.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    message: err.isPublic ? err.message : err.status,
    stack:
      process.env.NODE_ENV === 'development'
        ? err.stack.split('\n')
        : undefined,
  });
});

export default router;
