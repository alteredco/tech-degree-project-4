/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const game = new Game();

document.querySelector("#btn__reset").addEventListener( "click", () => {
   game.startGame();
});

document.querySelector("#qwerty").addEventListener("click", game.handleInteraction);
document.addEventListener("keydown", game.handleInteraction);


