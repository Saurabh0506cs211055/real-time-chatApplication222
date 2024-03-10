import mongoose from "mongoose";
const {Schema} = mongoose;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
      postTitle: {
        type: String,
        required:true,
      },
     },
    {
 timestamps:true,
})
export default mongoose.model("post",PostSchema)