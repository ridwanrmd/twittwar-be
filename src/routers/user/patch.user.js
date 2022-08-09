const express = require("express");
const router = express.Router();
const { isFieldEmpties } = require("../../helpers");
const { auth } = require("../../helpers/auth");
const { uploadAvatar } = require("../../lib/multer");
const { Op, where } = require("sequelize");
const { User } = require("../../../models");

const updateUserController = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { username, first_name, last_name, bio } = req.body;

    const emptyFields = isFieldEmpties({
      username,
      first_name,
      last_name,
      bio,
    });

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields :  ${emptyFields}`,
        data: { result: emptyFields },
      };
    }

    const resGetUser = await User.findOne({
      where: { username },
    });
    if (resGetUser) {
      throw {
        code: 400,
        message: "Username is already exist",
      };
    }
    // const resGetPhone = await User.findOne({
    //   attributes: ["phone"],
    //   where: { [Op.and]: { phone, user_id } },
    // });

    // if (resGetPhone)
    //   throw { code: 401, message: "Phone number is already used" };

    const resUpdateUser = await User.update(
      { username, first_name, last_name, bio },
      { where: { user_id } }
    );

    if (!resUpdateUser) throw { message: "Failed to update user" };

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatarController = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { filename } = req.file;

    const finalFileName = `/public/avatar/${filename}`;

    const resUpdateAvatar = await User.update(
      { image: finalFileName },
      { where: { user_id } }
    );

    //  affectedRows adalah jumlah baris yang terupdate
    if (!resUpdateAvatar) throw { message: "Failed to update avatar" };

    res.send({
      status: "Success",
      message: "Success update avatar",
    });
  } catch (error) {
    next(error);
  }
};

router.patch("/", auth, updateUserController);
router.patch(
  "/avatar",
  auth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController
);

module.exports = router;
