var gameStartBtn = document.querySelector('#startGame');
var gameTimer = document.querySelector('#timer');
var timerInterval = 1000;
var timerCount = 75;
var counter;
var randomQuestion = '';
var dictionary = [];



function gameStart() {
  
  // Add event listener for when the game starts
  gameStartBtn.addEventListener('click', function() {

    timerCount = 75;

    updateTimer();
    
    var randomIndex = Math.floor(Math.random() * dictionary.length);
    randomQuestion = dictionary[randomIndex];
    console.log(randomQuestion);

    // start a set interval to countdown to zero from the timerCount
    counter = setInterval(function() {
    
      timerCount--;
      // If the timer count is zero, stop the counter
      if(timerCount === 0) {
        clearInterval(counter);
        alert('Times up!')
      }
      // Update the time shown remaining on the page
      updateTimer();
    }, timerInterval)
  })
}

function updateTimer() {
  gameTimer.textContent = timerCount;
}

function init() {
  gameStart();
  updateTimer();
}

init();