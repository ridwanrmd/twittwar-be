const express = require("express");
const router = express.Router();
const { Comment } = require("../../../models");

const createNewComment = async (req, res, next) => {
  try {
    const { user_id, post_id, content } = req.body;
    console.log(content);

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

router.post("/", createNewComment);

module.exports = router;
