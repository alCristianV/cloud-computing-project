import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_DBNAME,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} from './config/config';
import commentRoutes from './routes/commentRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3003; // default port to listen

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log('succesfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(cors({ credentials: true }));

app.use(express.json());

app.use('/api/v1/comments', commentRoutes);

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
