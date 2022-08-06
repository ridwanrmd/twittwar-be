const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { User, Like, Comment, Post } = require("../../../models");
const { uploadPost } = require("../../lib/multer");

const createNewPost = async (req, res, next) => {
  try {
    const { desc, post_image } = req.body;
    const { user_id } = req.user;

    const resCreatePost = await Post.create({
      user_id,
      caption: desc,
      post_image,
    });

    res.send({
      status: "Success",
      message: "Success create a new post",
      data: resCreatePost,
    });
  } catch (error) {
    next(error);
  }
};

//upload post image
const uploadPostImage = (req, res) => {
  try {
    return res.send({
      status: "Success",
      message: "Success upload post image",
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostDetail = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const { commentLimit, commentOffset } = req.body;

    const resGetPostDetail = await Post.findOne({
      attributes: ["post_id", "caption", "post_image"],
      where: { post_id },
      include: [
        {
          model: User,
          attributes: ["username", "first_name", "last_name", "image"],
        },
        {
          model: Like,
        },
        {
          model: Comment,
          attributes: ["comment_id", "content"],
          limit: commentLimit,
          offset: commentOffset,
          order: [["updatedAt", "DESC"]],
        },
      ],
    });

    res.send({
      status: "Success",
      message: "Success get post detail",
      data: resGetPostDetail,
    });
  } catch (error) {
    next(error);
  }
};

router.post("/upload", auth, uploadPost.single("post_image"), uploadPostImage);
router.post("/", auth, createNewPost);

module.exports = router;
