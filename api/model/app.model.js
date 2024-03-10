import mongoose from "mongoose";
const {Schema} = mongoose;
const socialMediaUSer = new Schema({
    
        ApplicationMember:{
            type:String,
        }
    
},{timestamps:true})
export default mongoose.model("applicationUser",socialMediaUSer)