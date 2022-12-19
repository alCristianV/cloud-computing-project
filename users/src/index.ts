import express from 'express';
import mongoose from 'mongoose';
import {
  MONGO_DBNAME,
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  SESSION_SECRET,
} from './config/config';
import router from './routes/userRoutes';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const userRouter = router;

const app = express();
const port = process.env.PORT || 3000; // default port to listen

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log('succesfully connected to DB');
    })
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(
  session({
    secret: SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: false,
      secure: false,
      httpOnly: true,
      maxAge: 30000000,
    },
  })
);

app.use(express.json());

app.use('/api/v1/users', userRouter);

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
