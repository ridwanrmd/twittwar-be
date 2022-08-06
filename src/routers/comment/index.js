const express = require("express");
const router = express.Router();

const postCommentRouter = require("./post.comment");

router.use(postCommentRouter);

module.exports = router;
