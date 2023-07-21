import { InferSchemaType, Schema, model } from "mongoose";

const letterSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
}, { timestamps: true });

type Letter = InferSchemaType<typeof letterSchema>;

export default model<Letter>("Letter", letterSchema);
