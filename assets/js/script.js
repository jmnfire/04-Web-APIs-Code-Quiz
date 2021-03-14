var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var submitForm = document.getElementById('submit-score')
var isDone = false

var time = document.getElementById("timer");
var yourScore = document.querySelector(".high-score");
var submitButton = document.getElementById("buttonInitials");
var inputLine = document.getElementById("inlineFormInput");

var secondsLeft = 30;

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  console.log('start')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion();
  setTime();
  console.log("game start");

}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  if(!correct){
    secondsLeft = secondsLeft - 5;
    time.textContent = "Time: " + secondsLeft;
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    document.getElementById("score-view").textContent = "Your score is: " + secondsLeft;
    questionContainerElement.classList.add('hide')
    submitForm.classList.remove('hide')
    isDone = true
  }

}

/**
 * 
 * @param {Object} element One of the options
 * @param {Boolean} correct Boolean checking if button has a dataset correct
 * This function adds a class to change the look of the button after the user clicked on it
 * representing if they got it wrong or right
 */
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

/**
 * Variable holding the array of question objects
 */
var questions = [{
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [{
        text: 'Script',
        correct: true
      },
      {
        text: 'div',
        correct: false
      },
      {
        text: 'section',
        correct: false
      },
      {
        text: 'scripting',
        correct: false
      }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [{
        text: 'The Body section',
        correct: false
      },
      {
        text: 'The Head section',
        correct: true
      },
      {
        text: 'The div section',
        correct: false
      },
      {
        text: 'Both the Head and the Body section?',
        correct: false
      }
    ]
  },
  {
    question: 'What does CSS stand for?',
    answers: [{
        text: 'Colorful Style Sheets',
        correct: false
      },
      {
        text: 'Computer Style Sheets',
        correct: false
      },
      {
        text: 'Creative Style Sheets',
        correct: false
      },
      {
        text: 'Cascading Style Sheets',
        correct: true
      }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [{
        text: 'Hyper Text Markup Language',
        correct: true
      },
      {
        text: 'Hurry Type My Language',
        correct: false
      },
      {
        text: 'Heres The Markup Language',
        correct: false
      },
      {
        text: 'Home Tool Markup Language',
        correct: false
      }
    ]
  },
  {
    question: 'Which HTML attribute is used to define inline styles?',
    answers: [{
        text: 'font',
        correct: false
      },
      {
        text: 'style',
        correct: true
      },
      {
        text: 'styles',
        correct: false
      },
      {
        text: 'class',
        correct: false
      }
    ]
  },
]

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    console.log(secondsLeft);
    time.textContent = "Time: " + secondsLeft;
    console.log(currentQuestionIndex, ' = current index')
    if (secondsLeft <= 0 || isDone) {
      clearInterval(timerInterval);
      console.log(secondsLeft);
      document.getElementById("score-view").textContent = "Your score is: " + secondsLeft;
      questionContainerElement.classList.add('hide')
      submitForm.classList.remove('hide')
    }

  }, 1000);
}

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

submitButton.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("click");
  var initials = inputLine.value;
  var finalScore = {
    initials,
    secondsLeft
  };

  console.log("Final Score: " + finalScore);
  console.log(initials + " your score is: " + secondsLeft);


  highscores.push(finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
});