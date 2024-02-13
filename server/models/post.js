import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

mongoose.Schema.Types.String.checkRequired((v) => v != null);

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    editedAt: { type: Date, required: true, default: Date.now },
    published: { type: Boolean, required: true, default: true },
    commentsCount: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  { toJSON: { virtuals: true } }
);

PostSchema.virtual('timeToRead').get(function () {
  return Math.ceil(this.content.split(' ').length / 182);
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
