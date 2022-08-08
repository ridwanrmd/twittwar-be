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

const getUserPostList = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    let { page, pageSize } = req.query;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * pageSize;
    const post2 = await Post.findAll({
      where: { user_id },
    });
    const resGetPostList = await Post.findAll({
      where: { user_id },
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
    if (!resGetPostList) throw { message: "Post not found" };

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
    const { post_id } = req.params;

    const resGetPostDetail = await Post.findOne({
      where: { post_id },
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
router.get("/:post_id", auth, getPostDetail);
router.get("/userpost/:user_id", auth, getUserPostList);

module.exports = router;
