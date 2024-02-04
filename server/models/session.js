import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user: { type: String, required: true, ref: 'User' },
  expiry: { type: Date, required: true, default: Date.now },
});

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;
