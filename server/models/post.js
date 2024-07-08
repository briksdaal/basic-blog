import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

mongoose.Schema.Types.String.checkRequired((v) => v != null);

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default: null,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    editedAt: { type: Date, required: true, default: Date.now },
    published: { type: Boolean, required: true, default: true },
    commentsCount: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.image;
      },
    },
  }
);

PostSchema.virtual('timeToRead').get(function () {
  return Math.ceil(this.content.split(' ').length / 182);
});

PostSchema.virtual('imageUrl').get(function () {
  return this.image && this.image.split('public/')[1];
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
