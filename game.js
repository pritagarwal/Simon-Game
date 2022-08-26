let gamepattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let flag = 0;
let level = 0;
let touchEvent = 0;

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

$("#start").on("click touchend",()=>{
  if (flag === 0) {
    nextSequence();
    flag = 1;
  } 
  console.log("In keyPress");

});

$(".btn").on("click", (e) => {
  if (flag == 1 && touchEvent!=1) {
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
    if (gamepattern.length - 1 == currentLevel) {
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
      $("h1").html("Press 👇👇 to Start");
    }, 1000);
  }
}



//Touch event Listener

$("btn").on("touchend",(e)=>{
  touchEvent = 1;
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length - 1);
});