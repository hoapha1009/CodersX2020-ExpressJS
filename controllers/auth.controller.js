const shortid = require("shortid");
const db = require('../db');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var User = require("../models/user.model");

module.exports.login = (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  // var user = db.get('users').find({ email: email }).value();
  var user = await User.findOne({ email: email });
  var errors = [];
  
  if (!user) {
    errors.push('Sai User!');
    return res.render('auth/login', {
      errors: errors,
      values: req.body,
    });
  }
  
  bcrypt.compare(password, user.password, async (err, result) => {
    if(!result) {
        var wrongLoginCount = user.wrongLoginCount;
        wrongLoginCount++;
        user.wrongLoginCount = wrongLoginCount;
        user.save();
        if(wrongLoginCount >=4 ) {
          res.send('<h1>Bạn đã nhập sai quá nhiều!<br>Vui lòng quay lại sau 10 phút!</h1>');
          const msg = {
            from: 'hoapha1009@gmail.com',
            to: 'mrhoanguyen2018@gmail.com',
            subject: 'Tried to login your username so much!',
            text: 'Someone tried to log in to your account multiple times!',
            html: '<strong>Someone tried to log in to your account multiple times!</strong>',
          };
          sgMail.send(msg)
                .then(() => {}, error => {
                  console.error(error);

                  if (error.response) {
                    console.error(error.response.body)
                  }
                });
          return;
        }
        errors.push('Sai Password!');
        res.render('auth/login', {
          errors: errors,
          values: req.body,
        });
        return;
    }
    else {
        res.cookie('userId', user.id, {
          signed: true
        });
        user.wrongLoginCount = 0;
        user.save();
        res.redirect('/books');
    }
  })
  
};