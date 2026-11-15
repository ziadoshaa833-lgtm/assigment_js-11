import mongoose,{Types} from "mongoose";




export const messageSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    reciverId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    image:{
        type:String,
        required:false
    }
},
{timestamps:true}
)

export const messageModel=mongoose.model("massage",messageSchema)