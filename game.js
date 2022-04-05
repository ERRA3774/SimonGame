var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

if (screen && screen.width < 900) {
  $(document).on("touchend", start);
  $("#level-title").text("Tap Anywhere to Start");
} else {
  $(document).on("keypress", start);
}

function start() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

$(".btn").on("click", function() {
  if (level != 0) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Correct");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");

    playSound("wrong");
    if (screen && screen.width < 900) {
      $("#level-title").text("Game Over, Tap Anywhere to Restart.")
    } else {
      $("#level-title").text("Game Over, Press Any Key to Restart.");
    }

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 150);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
