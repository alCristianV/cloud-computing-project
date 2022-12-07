import express from 'express';
const app = express();
const port = process.env.PORT || 3000; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  // render the index template
  res.send('<h1>hello2</h1>');
});

// start the express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
