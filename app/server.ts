import express,{type Request,type Response} from 'express'
import cors from 'cors'


const app = express()
const PORT= process.env.PORT || 3000

const allowedorigins : Array<string| undefined> = ["http://localhost:1573"]

app.set("trust proxy",1)

app.use(cors({
    origin: function origin(origin,callback){
        if(!origin || origin === 'undefined' || origin === 'null') return callback(null,true)
        if(allowedorigins.indexOf(origin) !== -1 ){
            callback(null,true)
        }else{
            callback(new Error(`not allowed origin ${origin}`))
        }

    },
    credentials :true,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({message : 'proxy connected',
        ip:req.ip,
        safe:req.secure
    })
})

app.get('/ping',(req:Request,res:Response)=>{
    console.log(`i was pinged by ${req.ip}`)
    res.status(200).send({'message':"thanks for ping"})
    
})

app.use(express.json)
app.listen(PORT,()=>console.log(`port is http://localhost:${PORT}`)
)