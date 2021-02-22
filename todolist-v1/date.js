exports.getDate = function() {

  const today = new Date();
  // var currentDay = today.getDay();
  // var day = "";

  const options = { //options object
    weekday: "long",
    day: "numeric",
    month: "long"
  };

   return today.toLocaleDateString("en-US", options);
};

module.exports.getDay = getDay;

function getDay() {

  const today = new Date();
  // var currentDay = today.getDay();
  // var day = "";

  const options = { //options object
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", options);
}

console.log(exports);
