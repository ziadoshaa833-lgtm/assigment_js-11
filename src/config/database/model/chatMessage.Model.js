import mongoose,{Types} from "mongoose";
export const chatMessageSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    senderId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    conversationId:{
        type:Types.ObjectId,
        required:true,
        ref:"conversation"
    },
}, {timestamps:true})

export const chatMessageModel=mongoose.model("chatMessage",chatMessageSchema)   