import mongoose from 'mongoose';

class ExtendableError extends Error {
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

export default class APIError extends ExtendableError {
  constructor(message, status = 500, isPublic = false) {
    super(message, status, isPublic);
  }
}

export const isFound = (item, itemName = 'Item') => {
  if (!item) {
    throw new APIError(`'${itemName}' Not Found.`, 404, true);
  }
};

export const isIdValid = id => {
  if (typeof id === 'number' || !mongoose.Types.ObjectId.isValid(id)) {
    throw new APIError(`'${id}' Is Not A Valid Id.`, 400, true);
  }
};

export const alreadyExists = (item, itemName = 'Item') => {
  if (item) {
    throw new APIError(`'${itemName}' Already Exists.`, 409, true);
  }
};

export const isOwner = (organizer, userId) => {
  if (organizer.toString() !== userId.toString()) {
    throw new APIError('You Dont Have The Permission.', 403, true);
  }
};

export const isBadRequest = error => {
  if (error) {
    throw new APIError(error, 400, true);
  }
};

export const isRequired = (param, title) => {
  if (!param) {
    throw new APIError(`'${title}' is required!`, 400, true);
  }
};

export const isNotAuthorized = error => {
  throw new APIError(
    error || "You don't have required permissions to continue.",
    403,
    true
  );
};
