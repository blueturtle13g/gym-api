import Practice from 'models/practices';
import User from 'models/users';
import { isFound, isBadRequest } from 'utils/apiError';

export const getPractices = async (req, res, next) => {
  try {
    const practices = await Practice.find({}, 'title difficulty videoUrl');
    res.json({ practices });
  } catch (e) {
    next(e);
  }
};

export const createPractice = async (req, res, next) => {
  try {
    const { title, description, videoUrl } = req.body;
    const practice = await new Practice({
      title,
      description,
      videoUrl,
    }).save();
    res.json({ practice });
  } catch (e) {
    next(e);
  }
};

export const getPractice = async (req, res, next) => {
  try {
    const { practiceId } = req.params;
    const practice = await Practice.findById(practiceId);
    res.json({ practice });
  } catch (e) {
    next(e);
  }
};

export const favPractice = async (req, res, next) => {
  try {
    const { practiceId } = req.params;
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $addToSet: { favoritePractices: practiceId } }
    );
    await Practice.findOneAndUpdate(
      { _id: practiceId },
      { $addToSet: { favoritedBy: req.userId } }
    );
    res.json({ message: 'done' });
  } catch (e) {
    next(e);
  }
};

export const unfavPractice = async (req, res, next) => {
  try {
    const { practiceId } = req.params;
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $pull: { favoritePractices: practiceId } }
    );
    await Practice.findOneAndUpdate(
      { _id: practiceId },
      { $pull: { favoritedBy: req.userId } }
    );
    res.json({ message: 'done' });
  } catch (e) {
    next(e);
  }
};

export const logPractice = async (req, res, next) => {
  try {
    const imageUrl = req.file ? req.file.filename : '';
    const { practiceId } = req.params;
    const { comment } = req.body;
    const difficulty = Number(req.body.difficulty);
    const practice = await Practice.findById(practiceId);
    const logsLength = practice.logs.length;
    const prevSum = logsLength * Number(practice.difficulty);
    const newDifficulty = (prevSum + difficulty) / (logsLength + 1);
    practice.difficulty = newDifficulty.toFixed(1);
    practice.logs.push({
      comment,
      difficulty,
      user: req.userId,
      createdAt: Date.now(),
      imageUrl,
    });
    await practice.save();
    res.json({ practice });
  } catch (e) {
    next(e);
  }
};
