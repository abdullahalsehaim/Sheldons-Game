/**
 * Adding DOM Constants
 */
const buttons = document.getElementsByClassName("btn");
const score = document.getElementById("score");
const userImage = document.getElementById("user-image");
const computerImage = document.getElementById("computer-image");
const outcomeSpan = document.getElementById("outcome");
const choices = ["rock", "paper", "scissors", "spock", "lizard"];


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
    //determineWinner(userChoice, computerChoice);

    //let outcome = '';

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

    //console.log(outcome)
    outcomeSpan.textContent = outcome;

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
