var question = document.querySelector("#questions");
var answers = document.querySelector("#answers");
var score = document.querySelector(".win");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var currentQuestion = [0];
var newScore = [0];
var isScore = false;
var timer;
var timerCount;

// Questions that user will be asked and possible answers

var allQuestions = [{
  q: "Which of these characters is used to call on an element with a class selector?",
  a: [{ text: ".", isCorrect: true },
  { text: "#", isCorrect: false },
  { text: "*", isCorrect: false },
  { text: "$", isCorrect: false },
  ]
},
{
  q: "Which of these data types defines 'a series of characters surrounded by quotes'?",
  a: [{ text: "boolean", isCorrect: false },
  { text: "string", isCorrect: true },
  { text: "array", isCorrect: false },
  { text: "undefined", isCorrect: false },
  ]
},
{
  q: "CSS is used to: ",
  a: [{ text: "structure a webpage", isCorrect: false },
  { text: "create interactive effects on a webpage", isCorrect: false },
  { text: "reset the styling of HTML elements to a consistent baseline", isCorrect: false },
  { text: "style the HTML elements of a webpage", isCorrect: true },
  ]
},
{
  q: "What number is used to tell a for loop how many times to execute over an array?",
  a: [{ text: "The letter 'i'", isCorrect: false },
  { text: "The number of variables", isCorrect: false },
  { text: "The length of the array", isCorrect: true },
  { text: "The number of objects", isCorrect: false },
  ]
},
{
  q: "Which of these words is not an Element on the DOM Tree?",
  a: [{ text: "html", isCorrect: true },
  { text: "body", isCorrect: false },
  { text: "h1", isCorrect: false },
  { text: "a", isCorrect: false },
  ]
}]
console.log(allQuestions[currentQuestion].q)
console.log(allQuestions[currentQuestion].a)


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

// The endQuiz function is called when the end condition is met
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
  timer = setInterval(function () {
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
function countdown() {
  var timeLeft = 360;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    //
    // YOUR CODE HERE
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + " seconds remaining.";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " seconds remaining.";
      timeLeft--;
    } else {
      timerEl.textContent = " ";
      displayMessage();
      clearInterval(timeInterval);
    }

  }, 1000);
}

// Picks a question
function loadQuestion() {
  var questionArea = question.querySelector("<h1>");
  answers.innerHTML = "";
  var answersArea = answers.createElement("input");
  var answersLabel = answers.createElement("label");
  answersArea.type = "radio";
  answersArea.name = "answer";
  answersArea.value = [];

  for (var i = 0; i < allQuestions.length; i++) {
    currentQuestion = [i];

    questionArea.append(allQuestions[currentQuestion].q[i]);

    answersLabel.textContent = allQuestions[currentQuestion].a[i];
    answersArea.append(answersLabel);
    answers.appendChild(answersArea);

    console.log(answers);
    console.log(questionArea);
  }
}


document.addEventListener("click", checkAnswer())
// Tests if guessed answer is correct
function checkAnswer() {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Test if click is the correct answer
  if (timerCount !== 0) {

    var selectedAnswer = parseInt(document.querySelector('input[name="answer"]'));

    if (allQuestions[currentQuestion].a[selectedAnswer].isCorrect) {
      newScore++;
      console.log("Correct");
      setScore();
      nextQuestion();
    } else {
      // -- I answer a question incorrectly, time is subtracted from the clock
      timerCount - 5;
      nextQuestion();
    }
  }
};

// -- I answer a question; I am presented with another question
function nextQuestion() {
  if (currentQuestion < allQuestions.length - 1) {
    //currentQuestion++;
    loadQuestion();
  } else {
    document.querySelector("answers").remove()
    document.querySelector("question").remove()
    document.querySelector("btn").remove()
    loadScore();
  }
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
    storedScores = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    displayScore = storedScores;
  }
  //Render win count to page
  score.textContent = storedScores;
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz());

var resetButton = document.querySelector(".reset-button");

function resetScores() {
  // Resets win and loss counts
  winCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetScores(winCounter));


init();