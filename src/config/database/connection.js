import mongoose from "mongoose"
import { DATABASE_URI } from "../env.service.js"


export const databaseConnection=()=>{
    //console.log(DATABASE_URI)
    mongoose.connect(DATABASE_URI).then(()=>{
        console.log("DATABASE CONNECTED");
    }).catch((err)=>{
        console.log(err);
        
    })
}