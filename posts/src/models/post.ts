import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<IPost>('Post', PostSchema);
