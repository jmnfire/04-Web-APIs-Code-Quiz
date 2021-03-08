var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById ('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

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
  setNextQuestion()
  
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
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  
}

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



var questions = [
  {
    question: 'What is 2+2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '13', correct: false},
      { text: '15', correct: false}
    ]
  },
  {
    question: 'Who is jovan',
    answers: [
      { text: 'ejhsfdjfhdsjh', correct: false },
      { text: 'kjfklajkfjj', correct: false },
      { text: 'fjdfjfdfjdfd', correct: true },
      { text: 'fsdfhskfsdfjkds', correct: false }
    ]
  },
  {
    question: 'What is 5?',
    answers: [
      {text: '4', correct: false },
      {text: '22', correct: false },
      { text: '13', correct: false },
      { text: '15', correct: true }
    ]
  },
  {
    question: 'What is 10?',
    answers: [
      {text: '4', correct: true },
      {text: '22', correct: false },
      { text: '13', correct: false },
      { text: '15', correct: false }
    ]
  },
  {
    question: 'What is 100?',
    answers: [
      {text: '4', correct: false },
      {text: '22', correct: true },
      { text: '13', correct: false },
      { text: '15', correct: false }
    ]
  },
]


// var gameTimer = document.querySelector('#timer');
// var timerInterval = 1000;
// var timerCount = 75;
// var counter;



// function gameStart() {
  
//   // Add event listener for when the game starts
//   gameStartBtn.addEventListener('click', function() {

//     timerCount = 75;

//     updateTimer();

//     // start a set interval to countdown to zero from the timerCount
//     counter = setInterval(function() {
    
//       timerCount--;
//       // If the timer count is zero, stop the counter
//       if(timerCount === 0) {
//         clearInterval(counter);
//         alert('Times up!')
//       }
//       // Update the time shown remaining on the page
//       updateTimer();
//     }, timerInterval)
//   })
// }

// function updateTimer() {
//   gameTimer.textContent = timerCount;
// }

// function init() {
//   gameStart();
//   updateTimer();
// }

// init();