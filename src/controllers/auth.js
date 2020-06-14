import User from 'models/users';

export const fakeLogin = async (req, res, next) => {
  try {
    const { phoneNumber, username, avatar, password } = req.body;
    let user;
    user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await new User({ phoneNumber, username, avatar, password }).save();
    }
    const jwt = user.generateJWT();
    res.json({ jwt, userId: user._id });
    return jwt;
  } catch (e) {
    next(e);
  }
};
