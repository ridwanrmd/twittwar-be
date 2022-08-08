const express = require("express");
const router = express.Router();

const postCommentRouter = require("./post.comment");
const getCommentRouter = require("./get.comment");

router.use(postCommentRouter);
router.use(getCommentRouter);

module.exports = router;
