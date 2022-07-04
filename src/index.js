import mongoose from 'mongoose';
import app from './app';

import "dotenv/config";

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`|App Server Started & Listening on PORT: ${port}|`)});


mongoose
  .connect('mongodb+srv://root:root@cluster0.fdacs.mongodb.net/CIAMT-BE')
  .then(() => console.log('|******Database connected successful!!!******|'));



 

