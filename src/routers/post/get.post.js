const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { User, Like, Comment, Post } = require("../../../models");

const getPostList = async (req, res, next) => {
  try {
    let { page, pageSize } = req.query;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * pageSize;
    const post2 = await Post.findAll();
    const resGetPostList = await Post.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      subQuery: false,
      include: [
        {
          model: User,
        },
        {
          model: Like,
        },
        {
          model: Comment,
        },
      ],
    });
    // if (!resGetPostList.length) throw { message: "Post not found" };
    const post = resGetPostList[0].dataValues;
    const users = post.User.dataValues;
    const like = post.Like;
    const comment = post.Comment;
    console.log(post);

    res.send({
      status: "Success",
      message: "Success get post list",
      data: resGetPostList,
      length: post2.length,
    });
  } catch (error) {
    next(error);
  }
};

const getPostDetail = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const resGetPostDetail = await Post.findOne({
      where: { user_id },
      include: [
        {
          model: User,
          attributes: ["username", "first_name", "last_name", "image"],
        },
        {
          model: Like,
          attributes: ["like_id", "post_id"],
        },
        {
          model: Comment,
          attributes: ["comment_id", "content"],
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

router.get("/", getPostList);
router.get("/:user_id", auth, getPostDetail);

module.exports = router;
