const express = require("express");
const router = express.Router();
const { isFieldEmpties, passwordValidator } = require("../../helpers");
const validator = require("email-validator");
const { hash, compare } = require("../../lib/bcrypt");
const { createToken } = require("../../lib/token");
const { sendMail } = require("../../lib/nodemailer");
const { User } = require("../../../models");
const { Op } = require("sequelize");

// register endpoint
const registerUserHandler = async (req, res, next) => {
  try {
    const { username, email, password, rePassword } = req.body; //dari user

    const emptyFields = isFieldEmpties({
      username,
      email,
      password,
      rePassword,
    });

    //check empty fields
    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields: ${emptyFields}`,
        data: { result: emptyFields },
      };
    }

    // checking email
    const emailValidator = validator.validate(email);

    if (!emailValidator) {
      throw {
        code: 400,
        message: "Wrong email format",
      };
    }

    // checking password
    const validatePassword = passwordValidator(password);
    if (validatePassword)
      throw {
        code: 400,
        message: validatePassword,
      };

    // Match password
    if (password !== rePassword)
      throw { code: 400, message: "Password didn't match" };

    // connect to database
    const resGetUser = await User.findOne({
      where: { [Op.or]: { username, email } },
    });

    //username and email already exist condition
    if (resGetUser) {
      const user = resGetUser.dataValues;

      if (user.username == username) {
        throw {
          code: 400,
          message: "Username is already exist",
        };
      } else {
        throw {
          code: 400,
          message: "Email is already use",
        };
      }
    }

    // hash password
    const encryptedPassword = hash(password);

    //post user
    const resCreateUser = await User.create({
      username,
      email,
      image: "/public/avatar/default-avatar.png",
      password: encryptedPassword,
    });

    const userId = resCreateUser.dataValues.user_id;

    //create token
    const token = createToken({ user_id: userId });

    const saveToken = await User.update(
      { token },
      { where: { user_id: userId } }
    );

    //sending email verification
    await sendMail({ email, token });

    res.send({
      status: "Success",
      message: "Succes create new user",
      data: {
        result: resCreateUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { emailUsername, password } = req.body;

    const resGetUser = await User.findOne({
      where: { [Op.or]: { username: emailUsername, email: emailUsername } },
    });

    // const { email, password } = req.body;

    // const resGetUser = await User.findOne({
    //   where: { email },
    // });

    if (!resGetUser) {
      throw {
        code: 400,
        message: `Can not find account`,
      };
    }

    const user = resGetUser.dataValues;

    // if (!user.isVerified) {
    //   throw {
    //     code: 403,
    //     message: `You need to verify first`,
    //   };
    // }

    const isPasswordMatch = compare(password, user.password);

    if (!isPasswordMatch) {
      throw {
        code: 401,
        message: `Password is incorrect`,
      };
    }

    // generate token
    // send response with token
    const token = createToken({
      user_id: user.user_id,
      username: user.username,
    });

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        result: {
          user_id: user.user_id,
          username: user.username,
          accessToken: token,
        },
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const resendEmailVerification = async (req, res, next) => {
  try {
    const { email, user_id } = req.body;

    const token = createToken({ user_id });

    const saveToken = await User.update(
      { token: token },
      { where: { user_id } }
    );

    //sending email verification
    await sendMail({ email, token });

    res.send({
      status: "Success",
      message: "Succes send new email verification",
      data: {
        result: saveToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/register", registerUserHandler);
router.post("/login", loginUserController);
router.post("/verify", resendEmailVerification);

module.exports = router;
