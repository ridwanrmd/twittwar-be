const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { Post } = require("../../../models");

const deletePostController = async (req, res, next) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findOne({ where: { post_id } });
    if (!post) throw { message: "Cannot find a post" };

    const resDeletePost = await post.destroy({ where: { post_id } });

    res.send({
      status: "Success",
      message: "Success delete post",
      detail: {
        post_id,
        resDeletePost,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.delete("/:post_id", deletePostController);

module.exports = router;
