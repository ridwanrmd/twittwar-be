const express = require("express");
const router = express.Router();
const { Comment } = require("../../../models");
const { auth } = require("../../helpers/auth");

const createNewComment = async (req, res, next) => {
  try {
    const { post_id, content } = req.body;
    const { user_id } = req.user;
    console.log(req.body);

    const resCreateComment = await Comment.create({
      user_id,
      post_id,
      content,
    });
    console.log(resCreateComment);

    res.send({
      status: "Success",
      message: "Success create new comment",
    });
  } catch (error) {
    next(error);
  }
};

router.post("/", auth, createNewComment);

module.exports = router;
