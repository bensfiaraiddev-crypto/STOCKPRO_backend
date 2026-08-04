import express from 'express'

const app = express()
const PORT = 5147

app.get("/",(req,res)=>{
    res.send({"status":200,"detail":"server is working"})
    

})










app.listen(PORT,()=>{console.log(`server is on listning on http://localhost:${PORT}`)})