import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

mongoose.Schema.Types.String.checkRequired((v) => v != null);

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedAt: { type: Date, required: true, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
