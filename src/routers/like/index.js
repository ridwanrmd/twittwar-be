const express = require("express");
const router = express.Router();

const postLikeRouter = require("./post.like");

router.use(postLikeRouter);

module.exports = router;
