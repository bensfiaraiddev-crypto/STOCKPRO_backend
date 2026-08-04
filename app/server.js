import express from 'express'

const app = express()
const PORT = process.env.PORT || 5142

app.get("/",(req,res)=>{
    res.sendStatus(200).send({"detail":"it works"})
    

})





app.get("/ping",(req,res)=>{
    res.sendStatus(200).send("pinged")
    console.log("ping arrived")

})




app.listen(PORT,()=>{console.log(`server is on listning on http://localhost:${PORT}`)})