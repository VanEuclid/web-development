const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //NEEDED FOR BODY PARSER

app.get("/", function(req, res) { //application level get
  res.sendFile(__dirname + "/index.html"); //send file to whoever is getting from our backend
});

app.post("/", function(req, res) {

  //console.log(req.body.cityName); //IMPORTANT, GRAB POST FROM FORM IN OUR VIEW
  //make sure to add https://
  const city = req.body.cityName;
  const apiKey = "9cece7e3d33780de43b1e78d637f5307";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) { //get on https get url, https level get

    console.log(response.statusCode); //check status code for 200

    response.on("data", function(data) { //response on data  for json parts
      const weatherData = JSON.parse(data); //parse json object from api

      const temp = weatherData.main.temp;
      console.log(temp);

      const desc = weatherData.weather[0].description
      console.log(desc);

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently " + desc + "</p>"); //you can have multiple res.writes
      res.write("<h1>Temperature in " + city + " is " + temp + "</h1>"); //you can only have one res.send
      res.write("<img src=" + imageURL + ">")
      res.send();

      // const object = { //makes an object
      //   name: "Van",
      //   food: "Pho"
      // }
      // console.log(JSON.stringify(object)); //turn JSON into a string

      //console.log(weatherData);
    });
  });

  //res.send("Server is up and running");
});

app.listen(3000, function() {
  console.log("Server running: 3000");
});
