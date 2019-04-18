/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
 class Phrase {
   constructor(phrase) {
    //convert phrase to lowercase
    this.phrase = phrase.toLowerCase().replace(/[^\w\s]/g, "");
   }

   addPhraseToDisplay() {
     const phraseLetters = [...this.phrase];
     console.log(phraseLetters);
     const phraseDiv = document.querySelector('#phrase');
     const phraseUl = phraseDiv.querySelector('ul');
     //adds letter placeholders for phrase
     phraseLetters.forEach(phraseLetter => {
      const phraseLi = document.createElement('li');
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

   //checks if input letter matches phrase;
   checkLetter(inputLetter) {
    if(this.phrase.includes(inputLetter)) {
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

   //display matched letter
    //if check letter returns match remove hidden class of letter
   showMatchedLetter(inputLetter) {
     const phraseLis= document.querySelectorAll("#phrase li");
      phraseLis.forEach(li => {
        if(li.textContent === inputLetter) {
         li.className -= "hide";
         li.className += " show";
        }
      })
    }
   

 }