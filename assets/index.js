// Variables for page elements
// time and score
let timeEl = document.querySelector('p.time');
let secondsLeft = 10;
let scoreEl = document.querySelector('#score');

// sections
// intro section
const introEl = document.querySelector('#intro');


// questions section
const questionsEl = document.querySelector('#questions');

// questions container
let questionEl = document.querySelector('#question');

// questions answered count
let questionCount = 0;

// results div
const yaynayEl = document.querySelector('#yaynay');


// finals section
const finalEl = document.querySelector('#final');

// user initials
const initialsInput = document.querySelector('#initials');


// highscore section
const highscoresEl = document.querySelector('#highscores');

// scores list
const scoresListEl = document.querySelector('#scores-list');

// array of scores
const scoreList = [];


// buttons
const startBtn = document.querySelector('#start');

const ansBtn = document.querySelectorAll('button.ansBtn')

const ansBtn1 = document.querySelector('#answer1');

const ansBtn2 = document.querySelector('#answer2');

const ansBtn3 = document.querySelector('#answer3');

const ansBtn4 = document.querySelector('#answer4');

const submitScrBtn = document.querySelector('#submit-score');

const backBtn = document.querySelector('#back');

const resetBtn = document.querySelector('#reset');

const viewScrBtn = document.querySelector('#view-scores');

// questions
const questions = [
    {
        // index 0
        question: 'A question?',
        answers: ['1. yes', '2. No?'],
        correctAnswer: '1'
    },
    {
        // index 0
        question: 'A question!',
        answers: ['1. yes', '2. No?'],
        correctAnswer: '2'
    },
    {
        // index 0
        question: 'duh???',
        answers: ['1. yes', '2. No?'],
        correctAnswer: '1'
    },
];


// Functions

// timer
function setTime() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = `Time: ${secondsLeft}s`

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval)
            questionsEl.style.display = 'none';
            finalEl.style.display = 'block';
            scoreEl.style.display = 'secondsLeft;'
        }
    }, 1000)
}

// start quiz with timer and set up questions
function startQuiz() {
    introEl.style.display = 'none';
    questionsEl.style.display = 'block';
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
};

// function to set question; takes in a count and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question
        ansBtn1.textContent = questions[id].answers[0];
        ansBtn2.textContent = questions[id].answers[1];
        ansBtn3.textContent = questions[id].answers[2];
        ansBtn4.textContent = questions[id].answers[3];
    }
}

// function to check answer and move to next question
function checkAnswer(event) {
    event.preventDefault();

    // show section for yaynay and append message
    yaynayEl.style.display = 'block';
    let p = document.createElement('p');
    yaynayEl.appendChild(p);

    // time out after 1 second
    setTimeout(function() {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = 'Correct!'
    }
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 1;
        p.textContent = 'Incorrect!'
    }

    // increment so the questions index increases
    if (questionCount < questions.length) {
        questionCount++;
    }

    // call setquestion to get next question when ansBtn is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = 'none';
    highscoresEl.style.display = 'block';

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // sort scores
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score){
            return 1;
        } else {
            return -1;
        }
    });

    scoresListEl.innerHTML = '';
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement('li');
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoresListEl.append(li);
    }
}

function storeScores() {
    localStorage.setItem('scoreList', JSON.stringify(scoreList));
}

function displayScores() {
    // get scores from localstorage
    // parse the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem('scoreList'));

    // if scores were retrieved from localstorage, update the scores array to it
    if (storedScoreList !== null) {
        scoreList = storedScoreList
    }
}

function clearScores() {
    localStorage.clear();
    scoresListEl.innerHTML = '';
}


// Event listeners

// start timer and display first question when click start quiz
startBtn.addEventListener('click', startQuiz);

// check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// add score
submitScrBtn.addEventListener('click', addScore);

// back button
backBtn.addEventListener('click', function() {
    highscoresEl.style.display = 'none';
    introEl.style.display = 'block';
    secondsLeft = 10;
    timeEl.textContent = `Time: ${secondsLeft}s`;
});

// clear scores
resetBtn.addEventListener('click', clearScores);

// view/hide highscore button
viewScrBtn.addEventListener('click', function(){
    if (highscoresEl.style.display === 'none') {
        highscoresEl.style.display = 'block';
    } else if (highscoresEl.style.display === 'block') {
        highscoresEl.style.display = 'none';
    } else {
        return alert('no scores to show.');
    }
});