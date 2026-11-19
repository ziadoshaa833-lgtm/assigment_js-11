import z from "zod"
import { BadRequestException } from "../exciptions/error.exceptions.js";




export const validtion=(Schema)=>{
    return(req,res,next)=>{
        let {success,error}=Schema.safeParse(req.body)
        console.log({success,error});
        if(!success){
            throw  BadRequestException({message:"invalid data",extra:error.issues})
        }
        next()
    }
}