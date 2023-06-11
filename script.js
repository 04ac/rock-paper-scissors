
const outcomes = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    //Random number between 0 (included) and 3 (excluded)
    return Math.floor(Math.random() * 3);
}

function playRound(playerChoice, computerChoice, round_no) {

    let message = "";

    switch(true) {
        case (playerChoice == computerChoice):
            message = "Tied!";
            break;
        case (playerChoice == 0 && computerChoice == 2):
            message = "Rock beats Scissors! You win!";
            playerScore++;
            break;
        case (playerChoice == 2 && computerChoice == 0):
            message = "Rock beats Scissors! Computer wins!";
            computerScore++;
            break;
        case (playerChoice > computerChoice):
            message = outcomes[playerChoice] + " beats " + outcomes[computerChoice] + "! You win!";
            playerScore++;
            break;
        case (computerChoice > playerChoice):
            message = outcomes[computerChoice] + " beats " + outcomes[playerChoice] + "! Computer wins!";
            computerScore++;
            break;
    }

    return "Round " + round_no + ": " + message;
}

function game() {
    
    console.log("There are 5 Rounds. You win if you win the most rounds.");
    //Each game has 5 Rounds
    for (let round_no = 1; round_no <= 5; round_no++) {
        playerChoice = prompt("Round " + round_no + ": Rock, Paper, or Scissors?").toLowerCase();

        switch(playerChoice) {
            case "rock":
                playerChoice = 0;
                console.log(playRound(playerChoice, getComputerChoice(), round_no));
                break;
            case "paper":
                playerChoice = 1;
                console.log(playRound(playerChoice, getComputerChoice(), round_no));
                break;
            case "scissors":
                playerChoice = 2;
                console.log(playRound(playerChoice, getComputerChoice(), round_no));
                break;
            default:
                console.log("Invalid option provided. Please try again.")
                round_no--;
        }
    }

    if (playerScore > computerScore) {
        console.log(`5 rounds over. Yay! You win ${playerScore}-${computerScore}.`);
    } else if(computerScore > playerScore) {
        console.log(`5 rounds over. Computer wins ${computerScore}-${playerScore}. Better luck next time.`);
    } else {
        console.log(`It's a tie ${playerScore}-${computerScore}!`);
    }
}

//Play the game.
game();