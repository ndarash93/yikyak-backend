const express = require("express");
require("dotenv").config();
const makeCallBack = require("./express-callback");
const controller = require("./controllers");
const { protectRoute } = require("./middleware");
const bodyParser = require("body-parser");
const cors = require('cors');

const io = require('socket.io')();

const app = express();
app.use(bodyParser.json());
app.use(cors({allowHeaders: '*'}));

app.options('*', cors());

app.post("/add-post", protectRoute, makeCallBack(controller.post.addPost));
app.post("/like-post", protectRoute, makeCallBack(controller.post.likePost));
app.post(
  "/dislike-post",
  protectRoute,
  makeCallBack(controller.post.dislikePost)
);
app.get("/get-post", makeCallBack(controller.post.getPost));
app.get("/get-posts", makeCallBack(controller.post.getPosts));

app.post("/add-user", makeCallBack(controller.user.addUser));
app.post("/refresh-tokens", makeCallBack(controller.user.refreshTokens));

app.get('/', cors(), (req, res) => res.json({}));

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    console.log(`Message: `);
  });
});

app.listen(process.env.API_PORT || process.env.HOST_PORT, () => {
  console.log(
    `Listening internally at ${process.env.INTERNAL_API_HOST}:${process.env
      .API_PORT || process.env.HOST_PORT}`
  );
  console.log(
    `Listening on network at ${process.env.EXTERNAL_API_HOST}:${process.env
      .API_PORT || process.env.HOST_PORT}`
  );
});
