import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
  }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/', profileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
