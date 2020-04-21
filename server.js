// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ todosList: [] })
  .write();

//Use pug template engine
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todosList = [
  { name: "Đi chợ" },
  { name: "Nấu cơm" },
  { name: "Rửa bát" },
  { name: "Học code tại CodersX" }
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

//Render route todos with pug
app.get("/todos", (req, res) =>
  res.render("todos/index", { todosList: db.get('todosList').value() })
);

//Search in route todos by query para
app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedTodos = db.get('todosList').value().filter(function(todo) {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("todos/index", { todosList: matchedTodos, inputValue: q });
});

//Create new todo act by Post method
app.get('/todos/create', (req, res) => {
  res.render('todos/create'); 
});

app.post('/todos/create', (req, res) => {
  db.get('todosList').value().push(req.body);
  res.redirect('back');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
