const express = require("express");

var app = express();
var db = require('./db.json');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');
var transactionsRoute = require('./routes/transactions.route.js');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static('public'));

// Render main page
app.get('/', (req, res) => {
  res.render('./index');
});

app.use('/books', booksRoute);
app.use('/users', usersRoute);
app.use('/transactions', transactionsRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
