import mongoose from 'mongoose';

const { Schema } = mongoose;

const PracticeSchema = new Schema(
  {
    __v: {
      type: Number,
      select: false,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      default: 0,
      type: Number,
    },
    logs: [
      {
        comment: String,
        difficulty: Number,
        user: Schema.Types.ObjectId,
        imageUrl: String,
        createdAt: Date,
      },
    ],
    favoritedBy: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Practice', PracticeSchema);
