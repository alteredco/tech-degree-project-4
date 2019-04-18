/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
 class Game {
   constructor() {
    this.missed = 0;
    this.phrases = [
        new Phrase("Did you throw a trident?"),
        new Phrase("You stay classy, San Diego."),
        new Phrase("Son of a bee sting!"),
        new Phrase("Sweet Lincoln's mullet!"),
        new Phrase("By the beard of Zeus!"),
        new Phrase("I immediately regret this decision."),
        new Phrase("My apartment smells of rich mahogany."),
        new Phrase("The human torch was denied a bank loan."),
        new Phrase("Milk was a bad choice.")
    ];
    this.activePhrase = null;
   }

   startGame() {
     //hide screen overlay
     $('#overlay').hide();
     //calls the getRandomPhrase() method and sets the activePhrase property with the chosen phrase
     this.activePhrase = new Phrase(this.getRandomPhrase());
     console.log(this.activePhrase);
     this.activePhrase.addPhraseToDisplay();
   }

    //randomly retrieves one of the phrases stored in the phrases array and returns it
   getRandomPhrase() {
     let randomIndex= Math.floor(Math.random()*(this.phrases.length));
     return this.phrases[randomIndex].phrase; 
   }

   handleInteraction(event) {
    const keyButton = event.target;
    //Disable the selected letter’s onscreen keyboard button.
    keyButton.setAttribute("disabled", true);
    //If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
    //If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
    if(game.activePhrase.checkLetter(keyButton.textContent) === false) {
      keyButton.className += " wrong";
      game.removeLife();
    } else {
      keyButton.className += " chosen";
      game.activePhrase.showMatchedLetter(keyButton.textContent);
      if(game.checkForWin() === true){
        console.log("WINNER!!");
        game.gameOver()
      };
    }
   };

   removeLife() {
    //removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) . 
    const lifeHearts = document.querySelectorAll(".tries img");
    lifeHearts[this.missed].src = "images/lostHeart.png";
    //increments the missed property
   this.missed += 1;
    //If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
    if(this.missed === 5) {
      game.gameOver();
    }
   }

    // checks to see if the player has revealed all of the letters in the active phrase.
   checkForWin() {
     let hiddenLis = document.querySelectorAll(".hide");
     if(hiddenLis.length === 0){
       return true
     }
   }

    //displays the original start screen overlay
    //updates the overlay h1 element with a friendly win or loss message
    //replaces the overlay’s start CSS class with either the win or lose CSS class.
   gameOver() {
    const gameOverMsg = document.querySelector('#game-over-message');
    const overlay = document.querySelector('#overlay');
    const gameBtn = document.querySelector('#btn__reset');

    if(this.missed === 5) {
      gameOverMsg.textContent = "You lost. GAME OVER...";
      overlay.className = "lose";
    } else {
      gameOverMsg.textContent = "YOU ARE A WINNER!";
      overlay.className = "win";
    }
    gameBtn.textContent = "Play Again";
    $('#overlay').fadeIn();
    
    this.missed = 0;
    this.activePhrase = null;
   
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
      key.className = "key";
      key.setAttribute("disabled", false);
    })
    const lifeHearts = document.querySelectorAll(".tries img");
    lifeHearts.forEach(lifeHeart => {
      lifeHeart.src = "images/liveHeart.png";
    })
   }

 }