
var score = document.querySelector(".win");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var currentQuestion = "";
var newScore = 0;
var isScore = false;
var timer;
var timerCount;


// Questions that user will be asked
var questions = [{
  q: "",
  a: [{ text: "", isCorrect: false },
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  ]
},
{
  q: "",
  a: [{ text: "", isCorrect: false },
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  ]
},
{
  q: "",
  a: [{ text: "", isCorrect: false },
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  ]
},
{
  q: "",
  a: [{ text: "", isCorrect: false },
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  ]
},
{
  q: "",
  a: [{ text: "", isCorrect: false },
  { text: "", isCorrect: true },
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
  ]
}]

// The init function is called when the page loads 
function init() {
  getScores();
  
}

// The startQuiz function is called when the start button is clicked
// -- I am taking a code quiz; I click the start button
function startQuiz() {
  isScore = false;
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  loadQuestion()
  startTimer()
}

// The winGame function is called when the win condition is met
function endQuiz() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  newScore++
  startButton.disabled = false;
  setScore()
}

// The setTimer function starts and stops the timer and triggers endQuiz()
// -- a timer starts and I am presented with a question
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isScore && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        endQuiz();
      }
    }
     // -- all questions are answered or the timer reaches 0, the game is over
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// Picks a random question
function loadQuestion() {
  var question = document.querySelector("#question");
  var options = document.querySelector("#options");
  
  question.textContent = questions[currentQuestion].q;
  
  chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
  lettersInChosenWord = chosenQuestion.split("");
  numBlanks = lettersInChosenWord.length;
  
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  // Converts blankLetters array into a string and renders it on the screen
  wordBlank.textContent = blanksLetters.join(" ")
}

// Updates win count on screen and sets win count to client storage
// -- the game is over; I can save my initials and my score -- through line was 136
function setScore() {
  score.textContent = newScore;
  localStorage.setItem("newScore", newScore);
}


// These functions are used by init
function getScores() {
  // Get stored value from client storage, if it exists
  var storedScores = localStorage.getItem("newScore");
  // If stored value doesn't exist, set counter to 0
  if (storedScores === null) {
    displayScore = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    displayScore = storedScores;
  }
  //Render win count to page
  score.textContent = displayScore;
}

function checkAnswer() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isScore = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  // -- I answer a question incorrectly, time is subtracted from the clock
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  } // -- I answer a question; I am presented with another question
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
 r
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkAnswer();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

var resetButton = document.querySelector(".reset-button");

function resetScores() {
  // Resets win and loss counts
  winCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins() 
}
// Attaches event listener to button
resetButton.addEventListener("click", resetScores);





