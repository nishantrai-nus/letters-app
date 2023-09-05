import { InferSchemaType, Schema, model } from "mongoose";

const letterSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  text: { type: String },
  recipientUsername: { type: String, required: true },
  senderUsername: { type: String, required: true },
}, { timestamps: true });

type Letter = InferSchemaType<typeof letterSchema>;

export default model<Letter>("Letter", letterSchema);
