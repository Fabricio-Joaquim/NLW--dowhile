import 'dotenv/config';
import {router} from './routes'
import express from 'express';
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors';
const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp,{cors:{origin:'*'}});
app.use(cors())
io.on('connection', (socket)=>{
    console.log(`conectado no socket${socket.id}`)
})
app.use(express.json())

app.use(router)

app.get("/github", (req, res) => {
 res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback",(req,res)=>{
const {code} = req.query
return res.json(code)

})

export {serverHttp, io}