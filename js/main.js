const startButton = document.getElementById('startButton');
const choices = document.getElementById('choices');
const questionsContainer = document.getElementById('questions-container');
const timerEl = document.getElementById('time-left');
const questionTitleEl = document.getElementById('question-title');
const choicesEl = document.getElementById('choices');
const finalScoreEl = document.getElementById('final-score');
const submitButton = document.getElementById('submit');
const initialsInput = document.getElementById('initials');

let time = questions.length * 15;
let timerId;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  const startScreen = document.getElementById('starting-screen');
  startScreen.classList.add('hidden');
  
  questionsContainer.classList.remove('hidden');
  
  timerId = setInterval(timeLeft, 1000);
  
  timerEl.textContent = time;
  
  // display score
  displayScore();
  
  displayQuestion();
}

function displayScore() {
  finalScoreEl.textContent = score;
}

function displayQuestion() {
  // Check if there are any more questions to display
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }
  
  // Get the current question object from the questions array
  const currentQuestion = questions[currentQuestionIndex];

  // Set the question title and choices elements to the current question's properties
  questionTitleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = currentQuestion.choices.map(choice => `<button class="btn btn-primary">${choice}</button>`).join('');

  // Add event listeners to the answer buttons
  const answerButtons = document.querySelectorAll("#choices button");
  answerButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Check if the answer is correct
      const selectedChoice = button.textContent;
      if (selectedChoice === currentQuestion.answer) {
        // Increase the score and display the next question
        score += 1
      } else {
        // Decrease the time
        time -= 15;
      }
      currentQuestionIndex++;
      displayScore();
      displayQuestion();
    });
  });
}

function endQuiz() {
  clearInterval(timerId);
  // Display the end screen with the final score
  let endScreenEl = document.getElementById('finished-screen');
  endScreenEl.classList.remove('hidden');
  
  questionsContainer.classList.add('hidden');
  displayScore();
}

submitButton.addEventListener('click', event => {
  event.preventDefault();
  let newScore = {
    time: timerEl.textContent,
    initials: initialsInput.value
  }
  localStorage.setItem('newScore', JSON.stringify(newScore));
  console.log(newScore);
});

function timeLeft() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}




startButton.onclick = startQuiz;
