import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

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