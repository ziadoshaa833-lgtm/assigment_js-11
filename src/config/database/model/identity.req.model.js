
import mongoose,{Types} from "mongoose";
 export const identityRequestSchema= new mongoose.Schema({
    messageId:{
        type:Types.ObjectId,
        required:true,
        ref:"massage"
    }, 
     requesterId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    senderId:{
        type:Types.ObjectId,
        required:true,
        ref:"user"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
        required:true
    },
    
},
{timestamps:true}
)
  identityRequestSchema.index
    ({messageId:1,requesterId:1},{unique:true})   
    
    

export const identityRequestModel=mongoose.model("identityRequest",identityRequestSchema)