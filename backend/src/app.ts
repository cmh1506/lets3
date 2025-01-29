import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import { WebSocketServer } from "ws";
import { users } from './activeUsers';
import url from 'url'

const port = 3000;

dotenv.config()

const app = express();

mongoose.connect(process.env.ATLAS_URI || "")
mongoose.Promise = Promise

app.use(cors())

app.use(bodyParser.json())

app.use('/users', userRoutes.router)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000, () => {
  return console.log(`Express is listening at http://localhost:${process.env.PORT || 3000}`);
});

const ws_port = 3001

const wss = new WebSocketServer({ port: ws_port }, () => {
  console.log("WebSocket server listening on port", ws_port);
});

wss.on("error", console.error);

wss.on("connection", (ws , req) => {
  console.log("Socket opened by client");

  //const parameters = url.parse(socket.url, true);

  console.log(`req.url ${req.url}`)

  const parameters = url.parse(req.url || "", true);

  const userId = parameters.query.userId as string
  
  if (userId && userId !== 'undefined') {
    users.set(userId, ws as unknown as WebSocket)
  }

  ws.on("error", console.error);

  ws.on("close", () => console.log("Socket closed by client"));

  ws.on("message", (data, binary) => {
      var object = JSON.parse(data.toString());
      object = JSON.parse(object)
      const n = object["msg"]
      console.log(n)
      // socket.send(data, { binary });
      //wss.clients.forEach(c => c !== ws && c.send(data, { binary }));
      console.log(users)
      const c = users.get(object["id"]) as WebSocket
      if (c) {
        c.send(n)
      }
      
  });

  ws.send("Welcome from the WebSockets server!");
});