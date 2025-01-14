import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "coin", "bookmark"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    promptId: {
      type: Schema.Types.ObjectId,
      ref: "Prompt",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;
