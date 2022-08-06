const express = require("express");
const router = express.Router();

// const getPostRouter = require("./get.post");
const postLikeRouter = require("./post.like");

router.use(postLikeRouter);
// router.use(postPostRouter);

module.exports = router;
