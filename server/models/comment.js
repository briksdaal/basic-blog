import mongoose, { mongo } from 'mongoose';
import { decode } from 'html-entities';

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    author: { type: String, required: true, default: 'Anonymous' },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    editedAt: { type: Date, required: true, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.author = decode(ret.author);
        ret.content = decode(ret.content);
      },
    },
  }
);

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
