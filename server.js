const express = require("express");

var app = express();
var db = require('./db.json');
var booksRoute = require('./routes/books.route');
var usersRoute = require('./routes/users.route');

app.set("view engine", "pug");
app.set("views", "./views");

// Render main page
app.get('/', (req, res) => {
  res.render('./index');
});

app.use('/books', booksRoute);
app.use('/users', usersRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
