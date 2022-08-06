require("dotenv").config();
const nodemailer = require("nodemailer");

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "ridwan95rmd@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({ email, token }) => {
  console.log(email);
  const mail = {
    from: "Twittwar Developer <ridwan95rmd@gmail.com>",
    to: email,
    subject: "Account Verification",
    html: `<h1>Hello, click this <a href="http://localhost:6969/users/verification/${token}">link</a> to verify your account</h1>`,
  };
  try {
    await courier.sendMail(mail);
    console.log("Email berhasil dikirim");
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };
