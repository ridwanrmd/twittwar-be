const express = require("express");
const router = express.Router();

const getPostRouter = require("./get.post");
const postPostRouter = require("./post.post");
const deletePostRouter = require("./delete.post");
const patchPostRouter = require("./patch.post");

router.use(getPostRouter);
router.use(postPostRouter);
router.use(deletePostRouter);
router.use(patchPostRouter);

module.exports = router;
