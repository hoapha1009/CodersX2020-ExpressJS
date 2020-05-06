var User = require('../models/user.model')
var Session = require('../models/session.model');

module.exports =async (req, res, next)=>{
  res.locals.isLogin = false;
  if(req.signedCookies.userId ){
    var user =await User.findById(req.signedCookies.userId)
    if (user) {
      res.locals.user = user;
      res.locals.isLogin = true;
    }
  }
  if(!req.signedCookies.sessionId ){
    var newSession= await Session.create({})
    res.cookie('sessionId',newSession.id ,{
      signed: true
    })
  }

  var sessionId =  req.signedCookies.sessionId;
  var session = await Session.findById(sessionId)
  if(session){
    if(!session.cart){
      res.locals.cartLength = 0
    }else{
      res.locals.cartLength = session.cart.length
    }
  }
  next();
}