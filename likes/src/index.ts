import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  MONGO_DBNAME,
} from './config/config';
import likeRoutes from './routes/likeRoutes';

const app = express();
const port = process.env.PORT || 3002; // default port to listen

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

app.use(express.json());

app.use('/api/v1/likes', likeRoutes);

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
