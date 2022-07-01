import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv'


const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => console.log(`|App Server Started & Listening on PORT: ${port}|`));

config({ path: '.env' });
mongoose
  .connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/CIAMT-BE')
  .then(() => console.log('|******Database connected successful!!!******|'));


 

