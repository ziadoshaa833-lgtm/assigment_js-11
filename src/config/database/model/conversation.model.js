import mongoose,{Types} from "mongoose";
 export const conversationSchema= new mongoose.Schema({
    participant1Id:[{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    }],
    originalMessageId:{
        type:Types.ObjectId,
        required:true,
        ref:"massage",
        unique:true
    },
},
{timestamps:true})
export const conversationModel=mongoose.model("conversation",conversationSchema)
