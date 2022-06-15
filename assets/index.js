// Variables for page elements
// time and score
const timeEl = document.querySelector('p.time');
const secondsLeft = 5;
const scoreEl = document.querySelector('#score');

// sections
// intro section
const introEl = document.querySelector('#intro');


// questions section
const questionsEl = document.querySelector('#questions');

// questions container
const questionEl = document.querySelector('#question');

// questions answered count
const questionCount = 0;

// results div
const yaynayEl = document.querySelector('#yaynay');


// finals section
const finalEl = document.querySelector('#final');

// user initials
const initialsInput = document.querySelector('#initials');


// highscore section
const highscoresEl = document.querySelector('#highscores');

// scores list
const scoresListEl = document/querySelector('#scores-list');

// array of scores
const scoreList = [];


// buttons
const startBtn = document.querySelector('#start');

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
            clearInterval.style.display = 'none';
            finalEl.style.display = 'block';
            scoreEl.style.display = 'secondsLeft;'
        }
    }, 1000)
}

// Event listeners
