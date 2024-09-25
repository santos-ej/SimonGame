const buttonColours = ["red","blue","green","yellow"];
var gamePattern = []; 
var userClickedPattern = [];
var level = 0; 
var isPressed = false; 

function animatePress(name){
    $("#" + name).addClass("pressed");
    setTimeout(() => {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var soundColor = new Audio("./sounds/" + name + ".mp3" );
    soundColor.play();
} 

function nextSequence(){
    var randomSequence = Math.floor(Math.random() * 4);
    var randomChosenColour  = buttonColours[randomSequence];

    userClickedPattern = [];  
    level += 1; 
    $("h1").text("level " + level);     

    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    return randomChosenColour;
}

function checkAnswer(currentLevel){
    var isValid = false;

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("checkAnswer() - Correct");
        isValid = true;
    } else {
        isValid = false; 
    }

    if(isValid && (gamePattern.length === userClickedPattern.length)){
        setTimeout(() => {
            nextSequence();            
        }, 1000);

    }
    
    return isValid;

}

function startOver(){
        isPressed = false; 
        gamePattern = []; 
        userClickedPattern = [];
        level = 0; 
        isPressed = false; 

}

$(document).on("keydown", function(){
    if(!isPressed){  
        $("h1").text("Press A Key to Start");
        nextSequence();            
        isPressed = true; 
        
    }
});


$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    var lastIndexOfColor = userClickedPattern.length - 1;
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    var canContinue = checkAnswer(lastIndexOfColor); 

    if(!canContinue){

        var soundColor = new Audio("./sounds/wrong.mp3");
        soundColor.play();
        
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");    
        }, 200);
        
        startOver();

    }

});
