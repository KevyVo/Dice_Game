/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// initalize variables
var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display thr result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'https://dicegame.s3-us-west-2.amazonaws.com/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'https://dicegame.s3-us-west-2.amazonaws.com/dice-' + dice2 + '.png';
        //document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
        //3. Update the round scorce IF the rolled number was NOT a 1
        if (dice1 !==1 && dice2 !==1){
            // Check if the numbers are not double 6, will reset all total points
            if (dice1 === 6 && dice2 === 6){
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }else{
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
        } else {
            nextPlayer();
        }
    }
    
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        
        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        //Check if player won the game
        if (scores[activePlayer] >= winningScore){
            document.querySelector("#name-" + activePlayer).textContent = "winner!";
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector(".player-" +activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" +activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //Next Player
            nextPlayer();
        }
    }
    
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer =1 : activePlayer = 0;
        roundScore = 0;
        //This is expanded version
        /* if(activePlayer ===0){
                    activePlayer = 1;
                } else {
                    activePlayer = 0;
                } */
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";
        
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        //document.getElementById('dice-1').style.display = 'none';
        //document.getElementById('dice-2').style.display = 'none';
}

// When the new game button is press, it will call the init function
document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    // This function is used to setup all start variables
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById("score-0").textContent ="0";
    document.getElementById("score-1").textContent ="0";
    document.getElementById("current-0").textContent ="0";
    document.getElementById("current-1").textContent ="0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    //Used to reset states of the players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};