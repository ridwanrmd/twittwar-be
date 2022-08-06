const express = require("express");
const router = express.Router();

// user routers
const getUserRouter = require("./get.user");
const postUserRouter = require("./post.User");
const patchUserRouter = require("./patch.User");

router.use(getUserRouter);
router.use(postUserRouter);
router.use(patchUserRouter);

module.exports = router;
