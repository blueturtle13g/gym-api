import jwt from 'jsonwebtoken';
import APIError from 'utils/apiError';

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('not authorized');
    }
    const decoded = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.userId = decoded._id;
    req.userPhoneNumber = decoded.phoneNumber;
    req.isAdmin = decoded.isAdmin;
    next();
    return req;
  } catch (e) {
    next(new APIError(e.message, 401, true));
  }
};
