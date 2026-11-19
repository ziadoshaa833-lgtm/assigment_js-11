import mongoose,{Types} from "mongoose";




export const messageSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minlength:1,
        maxlength:1000

    },
    senderId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    }, 
    reciverId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    image:{
        type:String,
        required:false
    },
    anonymous:{
        type:Boolean,
        default:true
    }
},
{timestamps:true}
)

export const messageModel=mongoose.model("massage",messageSchema)