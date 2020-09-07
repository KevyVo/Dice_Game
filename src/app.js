// initalize variables
var scores, roundScore, activePlayer, gamePlaying;

init();

// btn roll logic
document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying) {
        // 1. Reset the penalty status
        document.querySelector("#label-0").textContent = "";
        document.querySelector("#label-1").textContent = "";
        // 2. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //3. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'https://dicegame.s3-us-west-2.amazonaws.com/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'https://dicegame.s3-us-west-2.amazonaws.com/dice-' + dice2 + '.png';
        //4. Skip turn but add the current point if only double 1 are rolled
        if (dice1 == 1 && dice2 == 1){
            document.querySelector("#label-" + activePlayer).textContent = "You have rolled double 1`s, your turn will be skipped but your current point will be added to the total points!";
            roundScore += dice1 + dice2;
            calulateTotal();
        // 5. Skip turn if only 1 is roll from either dices
        } else if (dice1 == 3 && dice2 == 3){
            document.querySelector("#label-" + activePlayer).textContent = "You have rolled double 3`s, your turn will be skipped!";
            nextPlayer();
        }else {
            // 6. Check if the numbers are not double 6, will reset all total points
            if (dice1 === 6 && dice2 === 6){
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                document.querySelector("#label-" + activePlayer).textContent = "You have rolled double 6`s, your total points will be reset!";
            }else{
            // .7 No penalty are found then the player will reroll.
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        }
    }
    
});

// Binds the hold function to calulateTotal
document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        calulateTotal();
    }  
});

// Skip to the next player and reset some points scoring
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
}

function calulateTotal(){
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

// Sleep function
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

// When the new game button is press, it will call the init function
document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    // This function is used to setup all start variables
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //Used to reset penatly from 
    document.querySelector("#label-0").textContent = "";
    document.querySelector("#label-1").textContent = "";
    //Reset the dice images
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    //Reset Scores
    document.getElementById("score-0").textContent ="0";
    document.getElementById("score-1").textContent ="0";
    document.getElementById("current-0").textContent ="0";
    document.getElementById("current-1").textContent ="0";
    // Player Labels
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    //Used to reset states of the players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};