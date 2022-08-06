const express = require("express");
const router = express.Router();
const { Like } = require("../../../models");
const { auth } = require("../../helpers/auth");

const likePost = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const { post_id } = req.params;

    const resGetLike = await Like.findOne({
      where: { post_id },
    });
    console.log(resGetLike);
    if (!resGetLike.dataValues.includes(user_id)) {
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

    // if (resGetLike) {
    //   resGetLike.destroy({
    //     where: { user_id, post_id },
    //   });

    //   res.send({
    //     status: "Success delete like",
    //   });
    //   return;
    // }

    // const resCreateNewPostLike = await Like.create({
    //   user_id,
    //   post_id,
    // });
    // console.log(resCreateNewPostLike);

    // res.send({
    //   status: "Success",
    //   message: "Success like a post",
    // });
  } catch (error) {
    next(error);
  }
};

router.post("/post_id", auth, likePost);

module.exports = router;
