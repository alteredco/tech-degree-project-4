/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 class Phrase {
   constructor(phrase) {
    //convert phrase to lowercase
    this.phrase = phrase.toLowerCase().replace(/[^\w\s]/g, "");
   }

    /*Adds letter placeholders for phrase to the display
    */
   addPhraseToDisplay() {
     const phraseLetters = [...this.phrase];
     const phraseDiv = document.querySelector('#phrase');
     const phraseUl = phraseDiv.querySelector('ul');

     phraseLetters.forEach(phraseLetter => {
      const phraseLi = document.createElement('li');
      phraseLetter = phraseLetter.toUpperCase();
      phraseLi.innerHTML = phraseLetter;
      if(phraseLi.innerHTML != ' ') {
        phraseLi.className += "hide";
        phraseLi.className += " letter ";
        phraseLi.className += phraseLetter;
      } else {
        phraseLi.className += "space";
      }
      phraseUl.appendChild(phraseLi);
    })
   }

  /*Adds letter placeholders for phrase to the display
  @params {string} char - character input by user
    */
   checkLetter(inputLetter) {
    if(this.phrase.includes(inputLetter)) {
      return true;
    } else {
      return false;
    }
  }

   /*Displays matched letter if check letter returns match remove hidden class of letter
  @params {string} char - character input by user
    */
   showMatchedLetter(inputLetter) {
     const phraseLis= document.querySelectorAll("#phrase li");
      phraseLis.forEach(li => {
        if(li.textContent === inputLetter.toUpperCase()) {
         li.className -= "hide";
         li.className += " show";
        }
      })
    }
   

 }