var userClickedPattern = [];

var gamePattern = [];

var buttonColours =["red", "blue", "green", "yellow"];

var randomNumber;

var randomChosenColour;

var count = 0;
var level = 0;

$(document).on("keydown",function(){
  if(count === 0){
    $("#level-title").text("Level "  + level);
    nextSequence();
    count = 1;
  }
});

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function nextSequence(){
  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
  }





$("div.btn").on("click",function(){
  if(count > 0){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    }
});



function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");
  setTimeout(function(){
            $('#'+currentColour).removeClass('pressed');
    }, 100);

}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
if(userClickedPattern.length === gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);

}}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  startOver();
}
}

function startOver(){
  level = 0;
  gamePattern = [];
  count = 0;
}
