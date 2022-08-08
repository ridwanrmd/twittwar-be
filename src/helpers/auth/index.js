const { verifyToken } = require("../../lib/token");
const { User } = require("../../../models");

const auth = async (req, res, next) => {
  try {
    // get token
    console.log(req.body);
    const token = req.token;
    // verify token
    const verifiedToken = verifyToken(token);

    const resGetUser = await User.findOne({
      where: {
        user_id: verifiedToken.user_id,
      },
    });

    if (!resGetUser) throw { message: "User not found" };

    req.user = resGetUser.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
