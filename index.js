const express = require('express');
const makeCallBack = require('./express-callback');
const controller = require('./controllers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 27817;

app.post('/add-post', makeCallBack(controller.post.addPost));
app.get('/like-post', makeCallBack(controller.post.likePost));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})