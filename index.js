const express = require('express');
require('dotenv').config();
const makeCallBack = require('./express-callback');
const controller = require('./controllers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/add-post', makeCallBack(controller.post.addPost));
app.get('/like-post', makeCallBack(controller.post.likePost));
app.get('/get-post', makeCallBack(controller.post.getPost));
app.get('/get-posts', makeCallBack(controller.post.getPosts));

app.post('/add-user', makeCallBack(controller.user.addUser));

app.listen(process.env.API_PORT, () => {
  console.log(`Listening internally at ${process.env.INTERNAL_API_HOST}:${process.env.API_PORT}`);
  console.log(`Listening on network at ${process.env.EXTERNAL_API_HOST}:${process.env.API_PORT}`);
});