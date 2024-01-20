import mongoose, { Document, Schema } from 'mongoose';

interface TUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<TUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model<TUser>('User', userSchema);

export default UserModel;
