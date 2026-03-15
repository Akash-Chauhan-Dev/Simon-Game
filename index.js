var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "green", "blue", "yellow"];
var level = 0;
var once = false;
var gameOver = false;

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  once = true;
  gameOver = false;
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(key) {
  switch (key) {
    case "red":
      var redSound = new Audio("./sounds/red.mp3");
      redSound.play();
      break;
    case "green":
      var greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "blue":
      var blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      break;

    case "wrong":
      var wrongSound = new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      break;

    default:
      "No Sound";
  }
}

function gameStart(currentButtonColour) {
  if (
    gamePattern[currentButtonColour] === userClickedPattern[currentButtonColour]
  ) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(function(){
        nextSequence();
      }, 1000);
      
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over! " + "Your Score : " + level);
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    gameOver = true;
    startOver();
  }
}

$(document).keydown(function (event) {
  if (event.key === "Enter") {
    if (!once) {
      nextSequence();
      once = true;
    }
  }
});

$(".btn").click(function () {
  if (once) {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (!gameOver) {
      gameStart(userClickedPattern.length - 1);
    }
  }
});
