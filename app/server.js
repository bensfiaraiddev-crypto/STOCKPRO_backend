import express from 'express'
import  cors from 'cors'
const app = express()
const PORT = process.env.PORT 


const allowedorigins = ['http//localhost:5173']

app.use(cors({
    origin: function origin(origin,callback){
        const normalizedOrigin = String(origin).trim().toLowerCase();
        if(!origin|| normalizedOrigin === 'undefined' || normalizedOrigin === 'null') callback(null,true)
        if(allowedorigins.indexOf(origin) !== -1){
            callback(null,true)

        }else callback(new Error(`cors error:origin ${origin}`))
    }

}))


app.get("/",(req,res)=>{
    res.sendStatus(200).send({"detail":"it works"})
    

})





app.get("/ping",(req,res)=>{
    res.sendStatus(200).send("pinged")
    console.log("ping arrived")

})



app.use((err,req,res,next)=>{
    if(err.message.includes("cors")){
        res.status(403).json({"err":err.message})
    }
    return res.status(500).json({ error: 'Internal Server Error' });

})


app.listen(PORT,()=>{console.log(`server is on listning on http://localhost:${PORT}`)})