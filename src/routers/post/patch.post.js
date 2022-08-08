const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { Post } = require("../../../models");

const editPost = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const getPost = await Post.findOne({
      where: { post_id },
    });
    if (getPost.dataValues.user_id === req.user.user_id) {
      const data = await Post.update(
        { caption: req.body.caption },
        { where: { post_id } }
      );
      if (!data) throw { message: "failed to update" };
      res.send({
        status: "Success",
        message: "Success update post",
      });
    } else {
      throw {
        code: 401,
        message: "Unauthorized",
      };
    }
  } catch (error) {
    next(error);
  }
};

router.patch("/:post_id", auth, editPost);

module.exports = router;
