import mongoose from "mongoose";
const {Schema} = mongoose;

const verficationSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      otp:{
        type:String,
        require:true,
      },
      createdAt:{
        type:Date,
        expires: "1day",
        default:Date.now(),
     }
},
{timestamp:true}
)
export default mongoose.model("verify",verficationSchema)