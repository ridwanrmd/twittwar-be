const jsonToken = require("jsonwebtoken");
const secretWord = "Sonic_Master";

const createToken = (payload) => jsonToken.sign(payload, secretWord);
const verifyToken = (token) => jsonToken.verify(token, secretWord);

module.exports = { createToken, verifyToken };
