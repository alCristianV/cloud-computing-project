import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_DBNAME,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} from './config/config';
import router from './routes/postRoutes';

const postsRouter = router;

const app = express();
const port = process.env.PORT || 3001; // default port to listen

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

app.use('/api/v1/posts', postsRouter);

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
