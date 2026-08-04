import express from 'express'
import  cors from 'cors'
const app = express()
const PORT = process.env.PORT 


const allowedorigins = ['http//localhost:5173']

app.use(cors({
    origin: function origin(origin,callback){
        if(!origin) callback(null,true)
        if(allowedorigins.indexOf(origin) !== -1){
            callback(null,true)

        }else callback(new Error("cors block"))
    }

}))

app.get("/",(req,res)=>{
    res.sendStatus(200).send({"detail":"it works"})
    

})





app.get("/ping",(req,res)=>{
    res.sendStatus(200).send("pinged")
    console.log("ping arrived")

})




app.listen(PORT,()=>{console.log(`server is on listning on http://localhost:${PORT}`)})