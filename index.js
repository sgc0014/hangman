const input = document.getElementsByClassName("input");
const message = document.getElementById("message");
const wrong = document.getElementById("wrong");
const figurepart = document.getElementsByClassName("figurepart");
const correctGuess = [];
const wrongGuess = [];
let wrongAttempt = 0;
const words = ["computer", "keyboard", "mouse"];
const sports = ['basketball','barcelona','football','tennis'];
const movies = ['titanic','rio','shrek','coco']

const selectedWords = words[Math.floor(Math.random() * words.length)];
console.log(selectedWords);


//display user correct input

function displayWords() {
  input[0].innerHTML = `${selectedWords
    .split("")
    .map(
      letter =>
        `<span class='letter'>${
          correctGuess.includes(letter) ? letter : "_"
        }</span>`
    )
    .join("")}`;

  endGame();
}

//reload hangman

function playAgain(){
  location.reload();
}

//game ending situation

function endGame() {

  
  wrong.innerHTML = `
  ${wrongGuess.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongGuess.map(
    letter =>
      `<span>${letter}</span>
    `
  )}`;

  if (wrongAttempt === 6) {
    message.innerHTML = `<p>You lose</p>
    <button onClick='playAgain()'>Play Again</button>`;
    message.style.display = "flex";
  }
else{
  let innerWord = input[0].innerText.replace(/\n/g, "");
  if (innerWord === selectedWords) {
    message.innerHTML =`<p>Congrats! You won and saved Ken from hanging but he sadly died due to corona</p>
    <button onClick='playAgain()'>Play Again</button>`;
     
    message.style.display = "flex";
  }}
}

//handle wrong answer

function handleWrong(letter) {
  wrongGuess.push(letter);
  const l = wrongGuess.length - 1;
  figurepart[l].style.display = "block";
  wrongAttempt++;
  console.log(wrongAttempt);
}

//Handle user keyboard click

window.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (correctGuess.includes(letter) || wrongGuess.includes(letter)) {
      alert("You already typed that letter");
    } else {
      selectedWords.includes(letter)
        ? correctGuess.push(letter)
        : handleWrong(letter);
      displayWords();
      console.log(wrongGuess);
    }
  }
});

displayWords();
