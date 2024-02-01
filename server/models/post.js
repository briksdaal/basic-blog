import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedAt: { type: Date, required: true, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
