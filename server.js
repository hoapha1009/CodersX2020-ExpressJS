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

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

var todosList = [
  { name: "Đi chợ" },
  { name: "Nấu cơm" },
  { name: "Rửa bát" },
  { name: "Học code tại CodersX" }
];

app.get("/", (request, response) => {
  response.render('index');
});

app.get("/todos", (req, res) =>
  res.render("todos/index", { todosList: db.get('todosList').value() })
);

app.get("/todos/search", (req, res) => {
  var q = req.query.q;
  var matchedTodos = db.get('todosList').value().filter(function(todo) {
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("todos/index", { todosList: matchedTodos, inputValue: q });
});

app.get('/todos/create', (req, res) => {
  res.render('todos/create'); 
});

app.get('/todos/:id/delete', (req, res) => {
  var id = parseInt(req.params.id);
  
  db.get('todosList').remove({ id: id }).write();
  
  res.redirect('back');
});

app.post('/todos/create', (req, res) => {
  db.get('todosList').push(req.body).write();
  res.redirect('back');
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
