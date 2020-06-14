import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    favoritePractices: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hooks:
UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Methods:
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return `Bearer ${jwt.sign(
    { _id: this._id, phoneNumber: this.phoneNumber, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  )}`;
};

export default mongoose.model('User', UserSchema);
