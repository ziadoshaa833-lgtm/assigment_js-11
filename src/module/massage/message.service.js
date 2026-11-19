import { messageModel } from "../../config/database/model/massage.model.js"
import {BadRequestException,ConflictException,NotFoundException} from"../../common/exciptions/error.exceptions.js"
import { userModel } from "../../config/database/model/user.model.js"
import { identityRequestModel } from "../../config/database/model/identity.req.model.js"
import { conversationModel } from "../../config/database/model/conversation.model.js"
import { chatMessageModel } from "../../config/database/model/chatMessage.Model.js"









export const getallmessage=async ()=>{
    let data=await messageModel.find()
    if(data.length==0){
    throw BadRequestException({message:"no massage found"})
    }
    return{message:"message found",data }
}


export const sendMessage=async(body,file,user)=>{
let{content,reciverId}=body
let image
let existUser=await userModel.findById(reciverId)
if(!existUser){
    throw BadRequestException({message:"user not found"})
}
if(senderId.toString()===reciverId.toString()){
    throw ConflictException({message:"you can not send message to yourself"})
}
if(file){
    image=file.path
}
const  addMessage=await messageModel.insertOne({content,reciverId,senderId:user.id,image})
if (!addMessage) {
    throw BadRequestException({message:"message not add"})
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
    throw BadRequestException({message:"user not found"})    
}else{
    return userdata
}}


export const getusermessage=async(user)=>{
let message=await messageModel.find({reciverId:user.id}).populate("senderId","firstName lastName ")
if(message.length==0){
    throw BadRequestException({message:" no message  found"})
}
return message.map((data)=>{
    const result={
        content:data.content,
        time:data.createdAt,
        msgId:data._id,
    }
    if(data.anonymous===false){
        result.senderId=data.senderId._id
    }
    return result
})
}

export const create_request=async(reciverId,messaageId)=>{
    const message= await messageModel.findOne({_id:messaageId,reciverId})
    if(!message){
        throw BadRequestException({message:"message not found"})
    }
    const reqexist=await identityRequestModel.findOne({messageId:messaageId,senderId:message.senderId})
    if(reqexist && reqexist.status==="pending"){
        return {message:"request still pending"}
    }
    if(!reqexist && message.anonymous){
        const newRequest=await identityRequestModel.create
        ({messageId:messaageId,
            requesterId:reciverId,
             senderId:message.senderId,
             status:"pending"
            })
            return 
}

}

export const myrequest=async(senderId)=>{
    const myrequest=await identityRequestModel.find({senderId}).populate("requesterId","content").populate("requesterId","firstName lastName")
    if(myrequest.length==0){
        throw notFoundException({message:"no request found"})
    }
    return myrequest
}

export const change_request_status=async(senderId,requestId,status,)=>{
    const request=await identityRequestModel.findOne({_id:requestId})
    if(!request){
        throw notFoundException({message:"request not found"})
    }
    if(status==="accepted"){
        await messageModel.findByIdAndUpdate(request.messageId,{anonymous:false})
        await identityRequestModel.findByIdAndUpdate(requestId)
        return {message:"request accepted"}
    }
    await identityRequestModel.findByIdAndUpdate(requestId)
    return{message:"request rejected"}
}

export const getconversation=async(userId)=>{
    let conversation=await conversationModel.find({participant1Id:userId}).populate("originalMessageId","content")
        if(conversation.length==0){
            throw NotFoundException({message:"no conversation found"})
        }
        return conversation
}

export const chat=async(body,user)=>{
    let {conversationId,content}=body
    let conversation=await conversationModel.findById(conversationId)
    if(!conversation){
        throw NotFoundException({message:"conversation not found"})
    }    
    let isParticipant = conversation.participant1Id.some(
    id => id.toString() === user.id
)
    if(!isParticipant){
        throw NotFoundException({message:"you are not a participant in this conversation"})
    }

    let chatMessage=await chatMessageModel.create({senderId:user.id,content,conversationId})

    
    return chatMessage
}
export const getConversationMessage=async(conversationId,user)=>{
let conversation=await conversationModel.findById(conversationId)
if(!conversation){
    throw NotFoundException({message:"conversation not found"})
}
let isParticipant = conversation.participant1Id.some(
        id => id.toString() === user.id
    )
    if (!isParticipant) {
        throw NotFoundException({message: "you are not a participant in this conversation" })
    }
    let messages = await chatMessageModel.find({
        conversationId
    }).sort({ createdAt: 1 })

    return messages
}

    


