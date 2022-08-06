const express = require("express");
const app = express();
const port = 6969;
const bearerToken = require("express-bearer-token");
const cors = require("cors");

// Routers
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const likeRouter = require("./routers/like");
const commentRouter = require("./routers/comment");

// Config
app.use(cors());
app.use(bearerToken());
app.use("/public", express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is active");
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  console.log({ error });

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({ err: error.message });
  console.log(`API berhasil running di port ${port}`);
});
