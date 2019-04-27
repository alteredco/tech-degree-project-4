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
        new Phrase("Milk was a bad choice."),
        new Phrase("I am in a glass case of emotion."),
        new Phrase("I love lamp."),
        new Phrase("I am kind of a big deal.")
    ];
    this.activePhrase = null;
   }

   /* Starts the game by hiding screen overlay, resetting the header class for animation, calling the getRandomPhrase() method and returning the phrase the activePhrase property
    */
   startGame() {
     $('#overlay').hide();
     const header = document.querySelector(".header");
     header.className ="";
     header.className += "header animate-pop-in";
     this.activePhrase = new Phrase(this.getRandomPhrase());
     return this.activePhrase.addPhraseToDisplay();
   }

    /*Randomly retrieves one of the phrases stored in the phrases array and returns it
    */
   getRandomPhrase() {
     let randomIndex= Math.floor(Math.random()*(this.phrases.length));
     return this.phrases[randomIndex].phrase; 
   }

    /*Handles user interaction with the game. Mouse clicks as well as keypresses (FOR EXCEEDS) disable targeted keyboard button and uses the checkLetter() method to check guess. If guess incorrect, 'wrong' class added to the keyboard button and removeLife() method called. If guess correct, 'chosen' class added to keyboard button, showMatchedLetter() method called and checkForWin() method called. If the player has won the game, returns the gameOver() method.
     * @param {object} event  - event listener object
    */
   handleInteraction(event) {
     if(event.target.className === "key") {
      const keyButton = event.target;
      keyButton.setAttribute("disabled", true);
      if(game.activePhrase.checkLetter(keyButton.textContent) === false) {
        keyButton.className += " wrong";
        return game.removeLife();
      } else {
        keyButton.className += " chosen";
        game.activePhrase.showMatchedLetter(keyButton.textContent);
        if(game.checkForWin() === true){
          return game.gameOver()
        };
      }
    } else {
      const pressedKey = (event.key);
      const keyboard = document.querySelectorAll( "#qwerty button");
      keyboard.forEach(key => {
        if(key.innerHTML === pressedKey) {
          key.setAttribute("disabled", true);
          if(game.activePhrase.checkLetter(pressedKey) === false) {
            key.className += " wrong";
            return game.removeLife();
          } else {
            key.className += " chosen";
            game.activePhrase.showMatchedLetter(pressedKey);
            if(game.checkForWin() === true) {
              return game.gameOver();
            }
          }
        }
      })
    }
   };

    /**
     * Removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image, tracks number of missed guesses and when five is reached the gameOver() method is returned.
    */
   removeLife() {
    const lifeHearts = document.querySelectorAll(".tries img");
    lifeHearts[this.missed].src = "images/lostHeart.png";

   this.missed += 1;
    if(this.missed === 5) {
      return game.gameOver();
    }
   }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase.
    */
   checkForWin() {
     let hiddenLis = document.querySelectorAll(".hide");
     if(hiddenLis.length === 0){
       return true
     }
   }

   /**
     * Ends the game. Displays a screen overlay with either 'win' or 'lost' CSS styling and message as well as the hidden phrase. CSS Animation is added to the header and button (FOR EXCEEDS). Resets the game elements for playing again.
    */
   gameOver() {
    const gameOverMsg = document.querySelector('#game-over-message');
    const overlay = document.querySelector('#overlay');
    const gameBtn = document.querySelector('#btn__reset');
    const header = document.querySelector(".header");
    header.className = "";
    header.className += "header animate-pop-out";
  
    if(this.missed === 5) {
      gameOverMsg.textContent = `You lost. '${this.activePhrase.phrase.toUpperCase()}'...`;
      overlay.className = "lose animate-pop-in";
    } else {
      gameOverMsg.textContent = `Winner! '${this.activePhrase.phrase.toUpperCase()}'...`;
      overlay.className = "win animate-pop-in";
    }
    gameBtn.textContent = "Play Again";
    $('#overlay').fadeIn();

    this.missed = 0;
    this.activePhrase = null;
    const phraseUl = document.querySelector("ul");
    phraseUl.innerHTML = "";
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
      key.className = "key";
      key.removeAttribute("disabled");
    })
    const lifeHearts = document.querySelectorAll(".tries img");
    lifeHearts.forEach(lifeHeart => {
      lifeHeart.src = "images/liveHeart.png";
    })
   }
 }