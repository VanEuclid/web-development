var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var buttonsClicked = 0;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];

$(document).keypress(function() {

  if (gameStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (buttonsClicked === level) {
      setTimeout(function() {
        buttonsClicked = 0;
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }, 200);
    startOver();
  }
}

function startOver() {

  gameStarted = false;
  buttonsClicked = 0;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}

$(".btn").click(function() {

  buttonsClicked++;

  // var userChosenColour = $(this).attr("id");
  var userChosenColour = this.getAttribute("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
});

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 200);
}

function playSound(name) {

  switch (name) {
    case "blue":
      $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "red":
      $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "green":
      $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log(gamePattern);
  }
}

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  switch (randomChosenColour) {
    case "blue":
      $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      playSound("blue");
      break;
    case "red":
      $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var red = new Audio("sounds/red.mp3");
      red.play();
      playSound("red");
      break;
    case "green":
      $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var green = new Audio("sounds/green.mp3");
      green.play();
      playSound("green");
      break;
    case "yellow":
      $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      playSound("yellow");
      break;
    default:
      console.log(gamePattern);
  }
}
