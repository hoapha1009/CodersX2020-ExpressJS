const express = require("express");
const cookieParser = require('cookie-parser');

var db = require('./db.json');
var mainRoute = require('./routes/main.route');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');
var transactionsRoute = require('./routes/transactions.route.js');
var authRoute = require('./routes/auth.route.js');
const authMiddleware = require("./middlewares/auth.middleware");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser());

app.use(express.static('public'));


app.use('/', authMiddleware.requireAuth, mainRoute);
app.use('/books', authMiddleware.requireAuth, booksRoute);
app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/auth', authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
