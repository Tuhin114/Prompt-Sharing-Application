import { Schema, model, models } from "mongoose";

const SchedulePostSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SchedulePost =
  models.SchedulePost || model("SchedulePost", SchedulePostSchema);

export default SchedulePost;
