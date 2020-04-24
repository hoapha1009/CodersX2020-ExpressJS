const express = require("express");
const cookieParser = require('cookie-parser');

var db = require('./db.json');
var mainRoute = require('./routes/main.route');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');
var transactionsRoute = require('./routes/transactions.route.js');

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser());
// app.use(function (req, res, next) {
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined)
//   {
//     var randomNumber = Math.random().toString();
//     randomNumber = randomNumber.substring(2, 4);
//     res.cookie('count', randomNumber);
//     console.log('cookie created successfully');
//   } 
//   else{
//     var count = parseInt(req.cookies.count); 
//     count++;
//     res.cookie('count', count);
//     next();
//   }
//   next(); 
// });

app.use(express.static('public'));


app.use('/', mainRoute);
app.use('/books', booksRoute);
app.use('/users', usersRoute);
app.use('/transactions', transactionsRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
