import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
});

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;
