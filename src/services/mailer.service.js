const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailforapphillel@gmail.com',
      pass: '07072002q*' // naturally, replace both with your real credentials or an application-specific password
    }
  });

const mailer = message =>{
    transporter.sendMail(message, (err,info) =>{
        if(err) return console.log(err);
        console.log('Email sent:',info);
    });
}

module.exports = mailer;