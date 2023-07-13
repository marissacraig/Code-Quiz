
var score = document.querySelector(".win");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var currentQuestion = 0;
var newScore = 0;
var isScore = false;
var timer;
var timerCount;


// Questions that user will be asked and possible answers
// The correct answer is located at the index number listed after answers
var allQuestions = [{
  q: "",
  a: ["","","","",0],
},
{
  q: "",
  a: ["","","","",1]
},
{
  q: "",
  a: ["","","","",3]
},
{
  q: "",
  a: ["","","","",2]
},
{
  q: "",
  a: ["","","","",0]
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
  wordBlank.textContent = "Your score 🏆 ";
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
function loadQuestion(currentQuestion) {
  var question = document.querySelector("#question");
  var answers = document.querySelector("#answers");
  
  question.textContent = allQuestions[currentQuestion].q;
  answers.textContent = allQuestions[currentQuestion].a;
}

// Attach event listener to document to listen for key event
document.addEventListener("click", checkAnswer(i, answers)) 


// Tests if guessed answer is correct
function checkAnswer(i, arr) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Test if click is the correct answer
  if (timerCount !== 0) {
  
  // -- I answer a question incorrectly, time is subtracted from the clock
  var chosenAnswer = i;
  var correctAnswer = arr[arr.length -1];
  for (var i = 0; i < answers.length -1; i += 1) {
    if (chosenAnswer[i] === correctAnswer) {
      chosenAnswer = true;
    }
  }

   // -- I answer a question; I am presented with another question

   return 
  }
};


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

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);

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





