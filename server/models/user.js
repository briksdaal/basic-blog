import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  handle: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
