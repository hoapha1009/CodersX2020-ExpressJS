// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

//Use pug template engine
app.set("views", "./views");
app.set("view engine", "pug");

var todosList = [
  {name: "Đi chợ"}, 
  {name: "Nấu cơm"}, 
  {name: "Rửa bát"}, 
  {name: "Học code tại CodersX"}, 
];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

//Render route todos with pug
app.get("/todos", (req, res) => res.render("todos/index", { todosList: todosList }));

//Search in route todos by query para
app.get('/todos/search', (req, res) => {
  var q = req.query.q;
  var matchedTodos = todosList.filter( function(todo){ return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; });
  
  res.render('todos/index', { todosList: matchedTodos, inputValue: q });
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
