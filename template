const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs'); //ejs

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.send("Hello world");
});

// body

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
