import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import APIError from 'utils/apiError';

export default route => {
  return async (req, res, next) => {
    try {
      Object.keys(_schemas[route]).forEach(key => {
        const error = Joi.object(_schemas[route][key]).validate(req[key]).error;
        if (error) {
          throw new APIError(error.details[0].message, 400, true);
        }
      });
      next();
    } catch (e) {
      next(e);
    }
  };
};

const isIdValid = (id, helpers) =>
  !mongoose.Types.ObjectId.isValid(id) ? helpers.error('any.invalid') : id;

const _schemas = {
  fakeLogin: {
    body: {
      phoneNumber: Joi.string().length(11).required(),
      username: Joi.string(),
      avatar: Joi.string().uri(),
      password: Joi.string().min(6).max(20).required(),
    },
  },
  getPractice: {
    params: {
      practiceId: Joi.custom(isIdValid),
    },
  },
  createPractice: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      videoUrl: Joi.string().uri().required(),
    },
  },
  logPractice: {
    params: {
      practiceId: Joi.custom(isIdValid),
    },
    body: {
      difficulty: Joi.number().min(1).max(5).required(),
      comment: Joi.string().required(),
    },
  },
};
