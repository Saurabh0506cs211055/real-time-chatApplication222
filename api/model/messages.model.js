import mongoose from "mongoose";
const {Schema} = mongoose;

const MessagesSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("message", MessagesSchema);
