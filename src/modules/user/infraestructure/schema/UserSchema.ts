import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../../domain/models/User';

export interface UserDocument extends Document {
  email: string;
  password: string;
}
const DB = 'users' || '';
const blogSchema: Schema<User> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
});
// TODO Change the word Blog to env variable
export const UserSchemaModel = mongoose.model<UserDocument>(DB, blogSchema);
