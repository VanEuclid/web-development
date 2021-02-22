// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert'); //testing

const mongoose = require('mongoose');

//connection to new database

// Connection URL
const url = 'mongodb://localhost:27017/fruitsDB'; //creates if doesn't exist
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   // insertDocuments(db, function() {
//   //   client.close();
//   // });
//
//   findDocuments(db, function() {
//     client.close();
//   });
// });

const fruitSchema = new mongoose.Schema({ //need to make objects in database
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  // rating: Number,
  rating: {
    type: Number,
    min: 1, //validator
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema); //auto plurals

const fruit = new Fruit({
  name: "Apple",
  rating: 32,
  review: "Pretty solid fruit"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Van",
  age: 32
});

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "Best fruit ever!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 10,
//   review: "Best fruit ever!"
// });
//
// const pineapple = new Fruit({
//   name: "Pineapple",
//   score: 10,
//   review: "Best fruit ever!"
// });

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
});

// Fruit.insertMany([kiwi, orange, pineapple], (err) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log("Successfully saved all he fruits to fruitsDB");
//   }
// });

// Fruit.updateOne({_id: "60332d2daa74b653c350b381"}, {name: "Peaches"}, (err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

// Fruit.deleteOne({_id: "60332d2daa74b653c350b381"}, {name: "Peaches"}, (err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// });

// Person.deleteMany({}, (err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Deleted many things");
//   }
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([{
//       name: "Apple", //each one is single document or record
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange", //each one is single document or record
//       score: 6,
//       review: "Kinda sour"
//     },
//     {
//       name: "Banana", //each one is single document or record
//       score: 9,
//       review: "Great stuff!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) { //important change right param
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// }
