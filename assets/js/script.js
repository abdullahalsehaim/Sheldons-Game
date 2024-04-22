/**
 * Adding DOM Constants
 */
const buttons = document.getElementsByClassName("btn");
const score = document.getElementById("score");
const attempts = document.getElementById("attempts");
const userImage = document.getElementById("user-image");
const computerImage = document.getElementById("computer-image");
const outcomeSpan = document.getElementById("outcome");
const choices = ["rock", "paper", "scissors", "spock", "lizard"];
const resetButtons = document.getElementById("reset");
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

/**
 * Adding a listener event for all game related buttons
 */
for (let button of buttons) {
    button.addEventListener("click", function (){
        let userChoice = this.getAttribute("data-choice");
        playGame(userChoice);
    })
}

/**
 * The function that starts the game, function takes effect whenever user makes a choice of button
 */

function playGame(userChoice) {

    userImage.src = `assets/images/${choices[userChoice]}.png`;
    userImage.alt = choices[userChoice];

    let computerChoice = Math.floor(Math.random() * 5);

    computerImage.src = `assets/images/${choices[computerChoice]}.png`;
    computerImage.alt = choices[computerChoice];
    
    determineWinner(userChoice, computerChoice);
    updateAttempts();
    evaluateEvents();
}

/**
 * Function to determine which player has won
 */

function determineWinner (userChoice, computerChoice) {

    if (choices[userChoice] === choices[computerChoice]) {
        outcome = "It's a tie!"
    } else if (
        (choices[userChoice] === "rock" && (choices[computerChoice] === "scissors" || choices[computerChoice] === "lizard")) ||
        (choices[userChoice] === "paper" && (choices[computerChoice] === "rock" || choices[computerChoice] === "spock")) ||
        (choices[userChoice] === "scissors" && (choices[computerChoice] === "paper" || choices[computerChoice] === "lizard")) ||
        (choices[userChoice] === "spock" && (choices[computerChoice] === "scissors" || choices[computerChoice] === "rock")) ||
        (choices[userChoice] === "lizard" && (choices[computerChoice] === "spock" || choices[computerChoice] === "paper"))) {
        outcome = "You win!";
    } else {
        outcome = "You lose!";
    }

    outcomeSpan.textContent = outcome;

    evaluateScore(outcome);
}


/**
 * Determine whether to increase or decrease the score based on previous game outcome
 */
function evaluateScore (outcome) {

    if (outcome === "You win!") {
        increaseScore();
    } else if (outcome === "You lose!") {
        decreaseScore();
    } else {
        //do nothing
    }
}


/**
 * Increase the score when user beats the computer
 */
function increaseScore () {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}


/**
 * Decreases the score when the user loses to the computer
 */
function decreaseScore () {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = --oldScore;
}


/**
 * Decreases the attempt number as the user plays the game 
 */
function updateAttempts () {
    let startingRound = document.getElementById("attempts").innerText;
    document.getElementById("attempts").innerText = --startingRound;
}


/**
 * Produces an alert based on the score after the user has played all attempts
*/ 
function evaluateEvents () {
    let remainingAttempts = parseInt(document.getElementById("attempts").innerText);
    let currentScore = parseInt(document.getElementById("score").innerText);


    if (remainingAttempts === 0 && currentScore === 0) {
        alert("After 10 rounds the dust has settled.... User and Computer are evenly matched!");
        resetGame();
    } else if (remainingAttempts === 0 && currentScore > 0) {
        alert("Epic win for the user, computer has been defeated!");
        resetGame();
    } else if (remainingAttempts === 0 && currentScore < 0) {
        alert("Computer is triumphant, user loses this time!")
        resetGame();
    } else {
        //Do nothing, game continues until attempt number is 0
    }

}


/**
 * Returns the game to the starting point
*/ 
function resetGame () {
    userImage.src = "assets/images/rpsls.webp";
    userImage.alt = "Full game selection for user";

    computerImage.src = "assets/images/rpsls.webp";
    computerImage.alt = "Full game selection for computer";

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = 0;

    let startingRound = parseInt(document.getElementById("attempts").innerText);
    document.getElementById("attempts").innerText = 10;

    outcomeSpan.textContent = 'Pick an element below to start the game'
}


/**
 * Below function opens the modal when it is clicked
 */
btn.onclick = function() {
  modal.style.display = "block";
}

/**
 * When the user clicks on the x on the modal, it closes
 */
span.onclick = function() {
  modal.style.display = "none";
}

/**
 * Below function closes the modal when clicking anywhere outside the modal 
 */
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}