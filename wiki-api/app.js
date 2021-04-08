const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

////////Requests targeting all Articles////////

app
  .route("/articles") //articles route example

  .get((req, res) => {
    //rest api get
    Article.find({}, (err, result) => {
      if (!err) {
        console.log(result);
        res.send(result);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    //rest api post
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save((err) => {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete((req, res) => {
    //rest api delete
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

////////Requests targeting specific Article////////

app
  .route("/articles/:paramName")

  .put((req, res) => {
    //put replaces whole document even if there is a field missing, it will be missing
    Article.update(
      {
        title: req.params.paramName,
      },
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        overwrite: true,
      },
      (err, result) => {
        if (!err) {
          res.send("Successfully updated article.");
        }
      }
    );
  })

  .patch((req, res) => {
    Article.update(
      {
        title: req.params.paramName,
      },
      {
        $set: req.body, //req.body makes it dynamic
      },
      (err) => {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.log(err);
        }
      }
    );
  })

  .delete((req, res) => {
    Article.deleteOne(
      {
        title: req.params.paramName,
      },
      (err) => {
        if (!err) {
          res.send("Successfully deleted article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .get((req, res) => {
    Article.findOne(
      {
        title: req.params.paramName, //important search condition from param
      },
      (err, result) => {
        if (result) {
          console.log(result);
          res.send(result);
        } else {
          res.send("No articles matching that title was found");
        }
      }
    );
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
