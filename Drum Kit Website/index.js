var drumButtons = document.querySelectorAll(".drum").length;
for(var i = 0; i < drumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    alert("I got clicked!");
  });
}
