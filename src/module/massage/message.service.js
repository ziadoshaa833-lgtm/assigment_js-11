import { messageModel } from "../../database/model/massage.model.js"
import {BadRequestEception} from"../../common/exciptions/error.exceptions.js"
import { userModel } from "../../database/model/user.model.js"
import { log } from "console"




export const getallmessage=async ()=>{
    let data=await messageModel.find()
    if(data.length==0){
    throw BadRequestEception({message:"no massage found"})
    }
    return{
        message:"message found",
        data
    }
}





export const sendMessage=async (body,file)=>{
let{content,reciverId}=body
let image
let existUser=await userModel.findById(reciverId)
if(!existUser){
    throw BadRequestEception({message:"user not found"})
}
if(file){
    image=file.path
}
let addMessage=await messageModel.insertOne({content,reciverId,image})
if (!addMessage) {
    throw BadRequestEception({message:"message not add"})
}
return addMessage
}


export const geturl=async (user)=>{
    let userdata=await  userModel.findById(user.id)
    const url=`https://sara7a/${userdata.uniqename}`
    return url
}




export const getuserdata=async (body)=>{
let {url}=body
let uniqename=url.split('/').at(-1)
console.log(uniqename);
let userdata=await userModel.findOne({uniqueName})
if(!userdata){
throw BadRequestEception({message:"user not found"})    
}else{
    return userdata
}}




export const getusermessage=async(user)=>{
let message=await messageModel.find({reciverId:user.id})
if(message.length==0){
    throw BadRequestEception({message:" no message  found"})
}
return message
}