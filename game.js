let gamepattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let flag = 0;
let level = 0;


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
function animatePress(currentColor) {
    setTimeout(() => {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  
    $("#" + currentColor).addClass(" pressed");
    $("#" + currentColor)
      .fadeIn(100)
      .fadeOut(150)
      .fadeIn(150);
  }

function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  level++;
  $("h1").html(`Level ${level}`);
  gamepattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

$(document).on("keypress", (e) => {
  if (flag === 0) {
    nextSequence();
    flag = 1;
  } else {
    console.log("game is on");
  }
});


$(".btn").on("click", (e) => {
  if (flag == 1) {
    userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAns(userClickedPattern.length - 1);
  }
});

function startOver(){
    flag = 0;
    gamepattern = [];
    userClickedPattern = [];
    level = 0;
}



function checkAns(currentLevel) {
  if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucess");
    if (gamepattern.length - 1 == currentLevel) {
      console.log("in inf");
      userClickedPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } 
  
  else {
    startOver()
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Wrong Move");
    setTimeout(() => {
      $("body").removeClass("game-over");
      $("h1").html("Press A Key to Start");
    }, 1000);
  }
}
