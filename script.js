class Game {

    constructor() {
        this.outcomes = ["Rock", "Paper", "Scissors"];
        this.playerScore = 0;
        this.computerScore = 0;
        this.round_no = 1;
        this.playerChoice = "";
    
        this.para = document.getElementById("text");
        this.conclusionPara = document.getElementById("conclusion");
        this.scoreboard = document.getElementById("score");

        // So that text shifts to a new line on \r\n
        this.para.setAttribute("style", "white-space: pre;");
        
        this.para.className = "text";
    }

    getScoreBoard() {
        return this.playerScore + " - " + this.computerScore;
    }

    resetGame() {
        this.outcomes = ["Rock", "Paper", "Scissors"];
        this.playerScore = 0;
        this.computerScore = 0;
        this.playerChoice = "";
        this.round_no = 1;
        this.scoreboard.textContent = "Score: " + this.getScoreBoard();

        const playerImages = document.querySelectorAll(".player");
        // Removes event listeners from images
        playerImages.forEach(element => {

            if (element.classList.contains("clicked-image")) {
                element.classList.remove("clicked-image");
            }
            // Cloning nodes to remove event listeners
            element.replaceWith(element.cloneNode(true));
        });

        const computerChoiceImages = document.querySelectorAll(".computer");

        computerChoiceImages.forEach(element => {
            
            if (element.classList.contains("clicked-image")) {
                element.classList.remove("clicked-image");
            }

            element.replaceWith(element.cloneNode(true));
        });
    }

    getComputerChoice() {
        //Random number between 0 (included) and 3 (excluded)
        let computerChoice =  Math.floor(Math.random() * 3);
        return computerChoice;
    }

    playRound(playerChoice, computerChoice, round_no) {

        let message = "";

        switch(true) {
            case (playerChoice == computerChoice):
                message = "Tied!";
                break;
            case (playerChoice == 0 && computerChoice == 2):
                message = "Rock beats Scissors! You win!";
                this.playerScore++;
                break;
            case (playerChoice == 2 && computerChoice == 0):
                message = "Rock beats Scissors! Computer wins!";
                this.computerScore++;
                break;
            case (playerChoice > computerChoice):
                message = this.outcomes[playerChoice] + " beats " + this.outcomes[computerChoice] + "! You win!";
                this.playerScore++;
                break;
            case (computerChoice > playerChoice):
                message = this.outcomes[computerChoice] + " beats " + this.outcomes[playerChoice] + "! Computer wins!";
                this.computerScore++;
                break;
        }

        this.scoreboard.textContent = "Score: " + this.getScoreBoard();
        return "Round " + round_no + ": " + message;
    }

    continueRound(playerChoice) {

        const computerChoice = this.getComputerChoice();

        // Gets the text of the computer's choice
        const computerChoiceText = this.outcomes[computerChoice].toLowerCase();

        //animate computer choices
        const computerChoiceImages = document.querySelectorAll(".computer");

        computerChoiceImages.forEach(element => {
            
            if (element.alt.toLowerCase() == computerChoiceText) {
                element.classList.add("clicked-image");
            }

            element.addEventListener('transitionend', (e) => {
                if (e.propertyName !== "transform") return;
                e.target.classList.remove("clicked-image");
            });
        });
        
        switch(playerChoice) {
            case "rock":
                playerChoice = 0;
                this.para.textContent = (this.playRound(playerChoice, computerChoice, this.round_no) + "\r\n") + this.para.textContent;
                this.round_no++;
                break;
            case "paper":
                playerChoice = 1;
                this.para.textContent = (this.playRound(playerChoice, computerChoice, this.round_no) + "\r\n") + this.para.textContent;
                this.round_no++;
                break;
            case "scissors":
                playerChoice = 2;
                this.para.textContent = (this.playRound(playerChoice, computerChoice, this.round_no) + "\r\n") + this.para.textContent;
                this.round_no++;
                break;
            default:
                console.log("Invalid option provided. Please try again.")
        }
    }

    onFinish() {

        const playerImages = document.querySelectorAll(".player");
        // Removes event listeners from images
        playerImages.forEach(element => {
            element.className = "image player";
            // Cloning nodes to remove event listeners
            element.replaceWith(element.cloneNode(true));
        });

        const computerChoiceImages = document.querySelectorAll(".computer");

        computerChoiceImages.forEach(element => {
            element.replaceWith(element.cloneNode(true));
        });

        // Create and insert instructions to restart
        const instructionToRestart = document.createElement("h2");
        instructionToRestart.id = "restart-instruction";
        const restartText = document.createTextNode("The Game is Finished! Press Restart Game to restart.");
        instructionToRestart.appendChild(restartText);
        const btn = document.getElementById("start-game");

        document.body.insertBefore(instructionToRestart, btn);
    }

    playGame() {

        this.playerChoice = "";
        this.para.textContent = "Round " + this.round_no + ": Choose any one. Rock, Paper, or Scissors?\r\n";
        this.conclusionPara.textContent = "";

        // if document contains restart instructions, remove them
        if (document.contains(document.getElementById("restart-instruction"))){
            document.getElementById("restart-instruction").remove();
        }

        const btn = document.getElementById("start-game");
        btn.textContent = "Restart Game!";

        const playerImages = document.querySelectorAll(".player");

        playerImages.forEach(element => {
            element.addEventListener("click", () => {

                element.classList.add("clicked-image");

                this.playerChoice = element.alt.toLowerCase();
                
                this.continueRound(this.playerChoice);

                if (this.computerScore >= 5 || this.playerScore >= 5) {

                    if (this.playerScore > this.computerScore) {
                        this.conclusionPara.textContent += (`Yay! You win ${this.playerScore}-${this.computerScore}.\r\n`);
                    } else if(this.computerScore > this.playerScore) {
                        this.conclusionPara.textContent += (`Computer wins ${this.computerScore}-${this.playerScore}. Better luck next time.\r\n`);
                    } else {
                        this.conclusionPara.textContent += (`It's a tie ${this.playerScore}-${this.computerScore}!\r\n`);
                    }
                    
                    this.para.classList.toggle("text");
                    this.para.classList.toggle("finish");
                    this.conclusionPara.textContent += "Press Restart Game to restart.";
                    this.onFinish();
                } else {
                    this.para.textContent = ("Round " + this.round_no + ": Choose any one. Rock, Paper, or Scissors?\r\n") + this.para.textContent;
                }

            });

            // transitionend listener
            element.addEventListener('transitionend', (e) => {
                if (e.propertyName !== "transform") return;
                e.target.classList.remove("clicked-image");
            });
        });
    }
}

// Create and insert h2 dynamically
const newDescription = document.createElement("h2");
const newText = document.createTextNode("The first to score 5 points wins!");
newDescription.appendChild(newText);
const containerDiv = Array.from(document.body.getElementsByClassName("container"))[0];
document.body.insertBefore(newDescription, containerDiv);

let game;

//Play the game.
const btn = document.getElementById("start-game");
btn.addEventListener("click", () => {
    game = new Game();
    game.resetGame();
    game.playGame();
});