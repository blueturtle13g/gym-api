import User from 'models/users';

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
    return user;
  } catch (e) {
    next(e);
  }
};
