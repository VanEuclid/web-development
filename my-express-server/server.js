const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("<h1>hello world</h1>");
});

app.get("/contact", function(req, res) {
  res.send("contact me at vaneuclid");
});

app.get("/about", function(req, res) {
  res.send("i'm van and i'm trying so hard to find a job in cs");
});

app.get("/hi", function(req, res) {
  res.send("hi hi hi");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
