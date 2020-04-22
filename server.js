const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

// Render  views index
app.get('/', (req, res) => {
  res.render('./index');
});

// Render books index
app.get('/books', (req, res) => {
  res.render('./books', {
    books: db.get('books').value()
  });
});

// Update title
app.get('/books/:id/update', (req, res) => {
  var id = req.params.id;
  res.render("./books/update-title", {
    id: id
  });
});

app.post("/books/update", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
});

//Delete
app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("back");
});

// Add new book
app.post("/books", (req, res) => {
  req.body.id = shortid.generate();

  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
