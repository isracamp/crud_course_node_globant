import mongoose, { Document, Schema } from 'mongoose';
import { Blog } from '../../domain/models/Blog';

export interface BlogDocument extends Document {
  title: string;
  content: string;
}
const DB = process.env.DATABASE || '';
const blogSchema: Schema<Blog> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
// TODO Change the word Blog to env variable
export const BlogSchemaModel = mongoose.model<BlogDocument>(DB, blogSchema);
