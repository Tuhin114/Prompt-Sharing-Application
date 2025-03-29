import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["my_posts", "saved_items", "drafts"],
      default: "my_posts",
    },
    post_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
