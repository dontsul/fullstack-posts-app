// index.js входной файл всего сервера

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comments.js';
import fileUpload from 'express-fileupload';

export const app = express(); //создание приложение в фреймворке express
dotenv.config();

//constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors()); // создаёт возможность отравлять запросы сразных ip адресов
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Router
// http://localhost:3002/
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.get('/', (req, res) => {
  res.send('Hello');
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uzqdmvy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
