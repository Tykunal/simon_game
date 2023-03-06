var buttonColours=['red','blue','green','yellow'];
var userClickedPattern=[];
var gamePattern=[];
var level1=0;
var press=false;
$("html").keypress(function(event){
    if(!press){ 
        $("h1").text("Level "+level1);         
       //press==false;
        nextSequence();
        press=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    check(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level1++;
    $("h1").text("Level "+level1); 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}
function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
        
}

function check(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence(),1000});
        // console.log("success");
        }
    }
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
    level1=0;
    press=false;
    gamePattern=[];
}



