require('dotenv').config();

const express = require("express");
const cookieParser = require('cookie-parser');

var db = require('./db.json');
var mainRoute = require('./routes/main.route');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');
var transactionsRoute = require('./routes/transactions.route.js');
var cartRoute = require('./routes/cart.route.js');

var authRoute = require('./routes/auth.route.js');
const authMiddleware = require("./middlewares/auth.middleware");
const mainauthMiddleware = require("./middlewares/authmain.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");
const countMiddleware = require("./middlewares/count-cookie.middleware");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));
app.use(sessionMiddleware);
app.use(countMiddleware);


app.use('/', mainauthMiddleware.requireMainAuth, mainRoute);
app.use('/books', booksRoute);
app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
