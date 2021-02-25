var randomNumber1 = Math.floor(Math.random()*6) + 1;
var dice1 = "dice" + randomNumber1 + ".png";
var finalImage1 = "images/" + dice1;
document.querySelectorAll("img")[0].setAttribute("src", finalImage1)

var randomNumber2 = Math.floor(Math.random()*6) + 1;
var dice2 = "dice" + randomNumber2 + ".png";
var finalImage2 = "images/" + dice2;
document.querySelectorAll("img")[1].setAttribute("src", finalImage2)

if(randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 1 won!";
}
else if (randomNumber2 > randomNumber1) {
  document.querySelector("h1").innerHTML = "Player 2 won!";
}
else {
  document.querySelector("h1").innerHTML = "Draw!";
}
