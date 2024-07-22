import mongoose, { mongo } from 'mongoose';
import { decode } from 'html-entities';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    handle: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    gridfsImage: { type: Schema.Types.ObjectId, default: null },
    admin: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.firstname = decode(ret.firstname);
        ret.lastname = decode(ret.lastname);
        ret.email = decode(ret.email);
        ret.handle = decode(ret.handle);
        delete ret.image;
      },
    },
  }
);

UserSchema.virtual('fullname').get(function () {
  if (this.firstname && this.lastname) {
    return `${this.firstname} ${this.lastname}`;
  }
  return null;
});

UserSchema.virtual('imageUrl').get(function () {
  return this.gridfsImage && `gridimages/${this.gridfsImage}`;
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
