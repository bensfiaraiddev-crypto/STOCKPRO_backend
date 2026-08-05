import express from 'express'
import cors from 'cors'

const app = express()
// Render automatically handles PORT, but keep 5147 as a fallback for local testing
const PORT = process.env.PORT || 5147; 

// 1. FIXED: Added the missing colon to the URL
const allowedorigins = ['http://localhost:5173']

app.set("trust proxy", 1)

app.use(cors({
    origin: function origin(origin, callback){
        const normalizedOrigin = String(origin).trim().toLowerCase();
        
        // 2. FIXED: Added 'return' keywords to stop execution loops
        if(!origin || normalizedOrigin === 'undefined' || normalizedOrigin === 'null') {
            return callback(null, true);
        }
        
        if(allowedorigins.indexOf(origin) !== -1){
            return callback(null, true);
        } else {
            return callback(new Error(`cors error:origin ${origin}`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('/*splat', cors());

// 3. FIXED: Changed .sendStatus(200).send() to standard .status(200).json()
app.get("/", (req, res) => {
    return res.status(200).json({"detail": "it works"});
})

// 4. FIXED: Changed .sendStatus(200).send() to standard .status(200).send()
app.get("/ping", (req, res) => {
    console.log("ping arrived");
    return res.status(200).send("pinged");
})

app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('CORS')) {
    return res.status(403).json({ error: err.message });
  }
  console.error("System Error caught:", err.message || err);
  return res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})
