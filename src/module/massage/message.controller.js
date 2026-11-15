import { Router } from "express";
import { getallmessage, geturl, getuserdata, getusermessage, sendMessage } from "./message.service.js";
import { successResponce } from "../../common/exciptions/success.responce.js";
import { auth } from "../../common/middleware/auth.meddleware.js";
import { cheakrole } from "../../common/middleware/cheak.role.js";
import { upload } from "../../common/middleware/multer.js";




 const router=Router()
 
 router.get("/get_all_massage", auth,cheakrole(["admin"]), async(req,res)=>{
    let data= await getallmessage()
    successResponce({res,data})
 })

 
 router.post("/send_message",upload().single('image'),async (req,res)=>{
   let data=await sendMessage(req.body,req.file)
   successResponce({res,message:"message sent",status:201,data})

 })


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












export default router