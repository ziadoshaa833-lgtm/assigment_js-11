import { Router } from "express";
import { getallmessage, geturl, getuserdata, getusermessage , sendMessage ,create_request,myrequest,change_request_status,getconversation, chat, getConversationMessage} from "./message.service.js";
import { successResponce } from "../../common/exciptions/success.responce.js";
import { auth } from "../../common/middleware/auth.meddleware.js";
import { cheakrole } from "../../common/middleware/cheak.role.js";
import { upload } from "../../common/middleware/multer.js";





 const router=Router()
 
 router.get("/get_all_massage", auth,cheakrole(["admin"]), async(req,res)=>{
    let data= await getallmessage()
    successResponce({res,data})
 })

 
 router.post("/send_message", auth, upload().single('image'), async (req, res) => {
   let data = await sendMessage(req.body, req.file, req.user);
   successResponce({ res, message: "message sent", status: 201, data });
 });


 router.get("/user_url",auth ,async (req,res)=>{
   let data=await geturl(req.user)
   successResponce({res,data:url})
 })


 router.get("/users",async(req,res)=>{
  let data =await getuserdata(req.body)
  successResponce({res,data})
 })


 router.get("/user_user_message",auth, async(req,res)=>{
  let userMessage=await getusermessage(req.user)
  successResponce({res,message:"message found",data:userMessage})

 })

 router.post("/create_request",auth,async(req,res)=>{
  let data =await create_request(req.body.reciverId,req.body.messageId)
  successResponce({res,message:"request created",data})

 })

 router.get("/my_request",auth,async(req,res)=>{
  let data=await myrequest(req.user.id)
  successResponce({res,message:"request found",data})
 })

 router.patch("/update_request/:requestId",auth,async(req,res)=>{
  let data=await change_request_status(req.user.id,req.params.requestId,req.body.status)
  successResponce({res,message:"request updated",data})
 })

 router.get("/get_conversation/:userId",auth,async(req,res)=>{
  let data=await getconversation(req.params.userId)
  successResponce({res,message:"conversation found",data})
 })

 router.post("/chat_message",auth,async(req,res)=>{
  let data=await chat(req.body,req.user)
  successResponce({res,message:"chat done",data})

 })

 router.get("/get_conversation_message",auth,async(req,res)=>{
  let data=await getConversationMessage(req.user)
  successResponce({res,message:"messages fetched successfully",data})

 })










 












export default router