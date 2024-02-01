import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedAt: { type: Date, required: true, default: Date.now },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
