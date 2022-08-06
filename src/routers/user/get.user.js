const express = require("express");
const router = express.Router();
const { auth } = require("../../helpers/auth");
const { verifyToken } = require("../../lib/token");
const { User } = require("../../../models");

const getUserProfileController = async (req, res, next) => {
  try {
    const { user_id } = req.user;

    const resGetUser = await User.findOne({
      where: { user_id },
    });

    if (!resGetUser) throw { message: "User not found" };

    res.send({
      status: "Success",
      message: "User Profile",
      data: {
        result: resGetUser.dataValues,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserController = async (req, res, next) => {
  try {
    const { token } = req.params;

    const getUserToken = await User.findOne({
      where: { token: token },
    });

    if (!getUserToken)
      return res.send(
        "<h2>your code has expired, please use the new code</h2>"
      );

    const verifiedToken = verifyToken(token);

    const [resUpdateIsVerifiedStatus] = await User.update(
      { isVerified: true },
      {
        where: {
          user_id: verifiedToken.user_id,
        },
      }
    );

    if (!resUpdateIsVerifiedStatus)
      throw { message: "Failed verification user" };

    res.send("<h1>Verification success</h1>");
  } catch (error) {
    next(error);
  }
};

router.get("/profile", auth, getUserProfileController);
router.get("/verification/:token", verifyUserController);

module.exports = router;
