import express from "express"
import mongoose from "mongoose"
import bp from "body-parser"
import albumRouter from "./routers/albumRouter.js"
import cors from "cors"
import artistRouter from "./routers/artistRouter.js"




const app = express()
const PORT = 5000



app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ extended: true }))


var db = "mongodb://kecske:backendpw@localhost:27017/webesproject";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})

conSuccess.on('error', err => {
  console.error('connection error:', err)
})

app.use(cors({origin: 'http://localhost'}));

app.use('/api/album',albumRouter)

app.use('/api/artist',artistRouter)

app.listen(PORT,()=>{
    console.log("The server has been created! Port: "+PORT);
})

