const db = require('../db');

module.exports.render = (req, res) => {
  var user_id = req.signedCookies.userId;
  var user = db.get('users')
               .find({ user_id: user_id })
               .value();
  res.render('./index', {
    user: user
  });
};

