const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.set('view engine', 'ejs'); //set not use

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public")); //makes express use static files for injects

app.post("/", (req, res) => {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  // res.render("list", {
  //   newListItem: item
  // });

});

app.get("/about", (req, res) => {
  res.render("about"); //renders the about page
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", (req, res) => {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.get("/", function(req, res) {

  // let day = date.getDay();
  const day = date.getDate();

  // if (today.getDay() === 6 || today.getDay() === 0) {
  //   day = "Weekend";
  //   res.render('list', { kindOfDay : day }); //looks in view
  //   // res.sendFile(__dirname + "/weekend.html");
  // } else {
  //   day = "Weekday";
  //   // res.sendFile(__dirname + "/weekday.html");
  //   // res.write("Write is like a message.")
  //   // res.write("Send is like an immediate email")
  //   // res.send();
  // }

  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //       break;
  //   default:
  //     console.log(currentDay);
  //     break;
  // }

  res.render('list', {
    listTitle: day,
    newListItems: items
  }); //looks in view
});

// body

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
