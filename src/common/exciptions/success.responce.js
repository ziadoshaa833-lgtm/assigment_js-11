
export const successResponce=({res,message="done",status=200,data})=>{
    res.status(status).json({message,data})


}