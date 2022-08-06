const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { post } = require("../../../models");

const editPost = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

router.patch("/", auth, editPost);

module.exports = router;
