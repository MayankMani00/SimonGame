var state = false;

var sequence = [];
var userSequence = [];

var buttonColors = ["green", "red", "yellow", "blue"];

level = 1;


$(document).keypress(function() {
    if (!state) {
        $("#level-title").text("Level " + level);
        nextSequence();
        state = true;
    }
});


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userSequence.push(userChosenColour);

    animation(userChosenColour);
    playSound(userChosenColour);
    checkSequence(userSequence.length-1);
});

function checkSequence(level) {

    if (sequence[level] === userSequence[level]) {
      if (userSequence.length === sequence.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {
    userSequence = [];

    $("#level-title").text("Level " + level);

    var randomColor = buttonColors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);

    level++;

    $("#" + sequence[sequence.length - 1]).fadeOut(70).fadeIn(70);
    playSound(randomColor);
}


function playSound(name) {
    var file = new Audio("sounds/" + name + ".mp3");
    file.play();
}

function animation(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}
function startOver(){
    sequence = [];
    level = 1;
    state = false;
}
