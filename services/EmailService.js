/** @format */

var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
   },
});

const SendMail = async ({to, subject, text, from = process.env.EMAIL}) => {
   const mailOptions = {
      to,
      subject,
      html: `<div>
      <h3>${text}</h3>
      <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"></img>
    </div>`,
      from,
   };
   console.log('from', from);

   await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });
};
const EmailService = {
   SendMail,
};
module.exports = EmailService;
