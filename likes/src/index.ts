import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} from '../comments/config/config';

const app = express();
const port = process.env.PORT || 3000; // default port to listen

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => console.log('succesfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// define a route handler for the default home page
app.get('/', (req, res) => {
  // render the index template
  res.send('<h1>hello2</h1>');
});

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
