const router = require("express").Router();
const { Post, Comment, User, Like } = require("../../../models");
const { auth } = require("../../helpers/auth");

// get a comment
router.get("/:post_id", auth, async (req, res, next) => {
  try {
    const { post_id } = req.params;
    let { page, pageSize } = req.query;
    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * pageSize;
    const getCommentLength = await Comment.findAll({ where: { post_id } });
    const getComments = await Comment.findAll({
      where: { post_id },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
      subQuery: false,
      include: [{ model: User }],
    });
    res.send({
      status: "Success",
      message: "Success get a comment",
      data: getComments,
      length: getCommentLength,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
