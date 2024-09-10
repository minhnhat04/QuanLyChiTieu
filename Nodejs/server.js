import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import AuthRouter from './routers/auth.js';
import ExpenRouter from './routers/expen.js';
import AdminRouter from './routers/admin.js'

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ReactJs')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.use('/User', AuthRouter);
app.use('/UserExpen', ExpenRouter);

app.use('/admin', AdminRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
