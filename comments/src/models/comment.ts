import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  userName: string;
  postId: string;
  body: string;
}

const CommentSchema: Schema = new Schema({
  userName: { type: String, required: true },
  postId: { type: String, required: true },
  body: { type: String, required: true },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
