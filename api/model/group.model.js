import mongoose from "mongoose";
const{Schema} = mongoose

const groupSchema = new Schema({
    groupname:{
      type: String,
      require: true,
      min: 3,
     // max: 20,
      unique: true,
    },
    groupPicture:{
    type:String,
    },
    groupMember:{
        type:Array,
        require:true,
    },
    groupCreater:{
        type:String,
        require:true,
    },
    groupAdmin:{
     type:Array,
     require:true,
    },
    desc: {
        type: String,
        max: 500,
      },
    isAdminOnly:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
export default mongoose.model("group",groupSchema)