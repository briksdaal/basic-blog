import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  author: { type: String, required: true, default: 'Anonymous' },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedAt: { type: Date, required: true, default: Date.now },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
