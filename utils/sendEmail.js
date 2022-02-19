const nodemailer = require("nodemailer");
const htmlToText = require('nodemailer-html-to-text').htmlToText;

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(recipients, subject = '', htmlBody = '') {
  let dotenv = require("dotenv").config();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: `${process.env.GMAIL_USER}`, // generated ethereal user
      pass: `${process.env.GMAIL_PASS}`, // generated ethereal password
    },
  });
  transporter.use('compile', htmlToText());
  let mailOptions = {
    from: `Pro Event Planner 🌦" <${process.env.GMAIL_USER}>'`, // sender address
    to: `${recipients}`, // list of receivers
    subject: `${subject}`, // Subject line
    html: `${htmlBody || body}`, // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log("Message sent: %s", info.messageId);
  });
}

module.exports = {sendEmail};
