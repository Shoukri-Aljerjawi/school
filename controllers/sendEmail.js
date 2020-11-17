const mailer = require('nodemailer');

require('dotenv').config();

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

exports.sendEmail = (req, res) => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  req.body.map((message) => {
    transporter.sendMail(message, (err, result) => {
      if (err) {
        console.log(err);
        console.log(process.env.USER_EMAIL);
        return false;
      }
      console.log(result);
      console.log('email sent');
    });
  });
};
