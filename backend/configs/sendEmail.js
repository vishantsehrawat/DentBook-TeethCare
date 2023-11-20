var nodemailer = require("nodemailer");

const sendEmailForVerification = (userid, email, token) => {
  // console.log(
  // "🚀 ~ file: user.controller.js:114 ~ sendEmailForVerification ~ userid:",
  // userid
  // );

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.EMAIL_FOR_NODE_MAILER,
      pass: process.env.EMAIL_API_KEY_NODE_MAILER,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_FOR_NODE_MAILER, // * email will be sent from this email
    to: email, //* email will be sent to this user email
    subject: " DENTBOOK otp verification",
    html: `<p>Hi ${email} <br> Welcome to DentBook <br/> your Otp is ${token}</p>`,
  };
  {
    /* <a href="${BaseUrl_Backend}/user/confirm-email/${accessToken}">verify</a>   */
  }

  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("While Email Send error: ", err);
        reject(false);
      } else {
        console.log(`Mail sent successfully!`);
        console.log(info);
        resolve(true);
      }
    });
  });
};

module.exports = { sendEmailForVerification };
