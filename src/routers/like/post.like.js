const express = require("express");
const router = express.Router();
const { Like } = require("../../../models");
const { auth } = require("../../helpers/auth");

const likePost = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { post_id } = req.params;

    const resGetLike = await Like.findOne({
      where: { post_id },
    });
    if (!resGetLike) {
      await Like.create({ post_id, user_id });
      res.send({
        status: "Success",
        message: "The post has been liked",
      });
    } else {
      await Like.destroy({ where: { post_id, user_id } });
      res.send({
        status: "Success",
        message: "The post has been disliked",
      });
    }
  } catch (error) {
    next(error);
  }
};

router.post("/:post_id", auth, likePost);

module.exports = router;
