require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.URI,{ useUnifiedTopology: true ,useNewUrlParser: true} );

const authRoute = require('./routes/auth.route.js');
const authMiddleware = require("./middlewares/auth.middleware");
const mainauthMiddleware = require("./middlewares/authmain.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");
const countMiddleware = require("./middlewares/count-cookie.middleware");

var mainRoute = require('./routes/main.route');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');
var transactionsRoute = require('./routes/transactions.route.js');
var cartRoute = require('./routes/cart.route.js');



var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiLogin = require("./api/routes/auth.route");
const apiTransactions = require("./api/routes/transactions.route");

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));
// app.use(countMiddleware);


app.use('/', mainauthMiddleware.requireMainAuth, mainRoute);
app.use('/books', booksRoute);
app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);

app.use("/api/login", apiLogin);
app.use("/api/transactions", apiTransactions);

//test error
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.use((req,res,next)=>{
  res.status(404).render('errors', {errors: "404 Error"})
})

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ errors: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler (err, req, res, next) {
  res.status(500).render('errors', {errors: "500 Error"})
}


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
