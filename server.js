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
const apiUsers = require("./api/routes/users.route");
const apiBooks = require("./api/routes/books.route");

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));


app.use('/', mainauthMiddleware.requireMainAuth, mainRoute);
app.use('/books', booksRoute);
app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);

app.use("/api/login", apiLogin);
app.use("/api/transactions", apiTransactions);
app.use("/api/users", apiUsers);
app.use("/api/books", apiBooks);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
