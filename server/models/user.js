import mongoose, { mongo } from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    handle: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.image;
      },
    },
  }
);

UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual('imageUrl').get(function () {
  return this.image && this.image.split('public/')[1];
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
