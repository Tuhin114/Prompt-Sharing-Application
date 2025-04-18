import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
  },
  tag: {
    type: [String],
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  saved: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    default: [],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
