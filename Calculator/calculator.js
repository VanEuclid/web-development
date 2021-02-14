const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

/* INDEX HANDLE FOR GET AND POST */

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html"); //SETUP LINKING TO INDEX
});

app.post("/", function(req, res) {

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var calc = num1 + num2;

  res.send("Answer to your calculate: " + calc);
});

/* INDEX HANDLE FOR GET AND POST */

/* BMI CALCULATOR FOR GET AND POST */

app.get("/bmiCalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html"); //SETUP LINKING TO bmi calculator
});

app.post("/bmiCalculator", function(req, res) {

  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = 703 * (weight / Math.pow(height, 2));

  res.send("Your BMI is: " + bmi);
});

/* BMI CALCULATOR FOR GET AND POST */

app.listen(3000, function() {
  console.log("listening on 3000");
});
