const myQuestions = [
    {
        question: "What is DDoS short for?",
        answers: {
            a: "Direction Deficient operator Standard",
            b: "Down Date over Shoot",
            c: "Driving Down orange Streets",
            d: "Distributed Denial of Service",
        },
        correctAnswer: "d"
    },
    {
        question: "Which distribution of Linux is Kali Linux derived from?",
        answers: {
            a: "Debian",
            b: "Ubuntu",
            c: "Arch",
            d: "Fedora",
        },
        correctAnswer: "a"
    },
    {
        question: "Which is one of the largest European hacking groups?",
        answers: {
            a: "Lizard Squad",
            b: "LulzSec",
            c: "Chaos Computer Club",
            d: "globalHell",
        },
        correctAnswer: "c"
    },
    {
        question: "What is DG short for?",
        answers: {
            a: "Digital Gangster",
            b: "Dark Grey",
            c: "Drowning Ghost",
            d: "Days Gone",
        },
        correctAnswer: "a"
    },
    {
        question: "What was the first internet worm to gain significant media attention?",
        answers: {
            a: "The Jobs Worm",
            b: "The Morris Worm",
            c: "The Wozniak Worm",
            d: "The Zuck Worm",
        },
        correctAnswer: "b"
    },
    {
        question: "Who hacked Sony in 2011?",
        answers: {
            a: "Chaos Computer Club",
            b: "globalHell",
            c: "Lizard Squad",
            d: "LulzSec",
        },
        correctAnswer: "d"
    },
    {
        question: "Who claimed responsibility for the cyber attacks on Malaysia Airlines which resulted in website visitors being redirected to a page which read '404 – plane not found'?",
        answers: {
            a: "TeaMp0isoN",
            b: "LulzSec",
            c: "Lizard Squad",
            d: "Anonymous",
        },
        correctAnswer: "c"
    },
    {
        question: "-blank- is a decentralized open online creation group known most for its hacking and Guy Fawkes masks.",
        answers: {
            a: "globalHell",
            b: "Anonymous",
            c: "Chaos Computer Club",
            d: "Level Seven Crew",
        },
        correctAnswer: "b"
    },
];

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 31;
var intervalId;

const headerContainer = $("#header");
const quizContainer = $("#quiz");
const resultsContainer = $("#results");
const timeContainer = $("#time");
const timerContainer = $("#timer");
const submitButton = $("#submit");
const startButton = $("#start");
const restartButton = $("#restart");

submitButton.hide();
restartButton.hide();
function resetCounters() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
}

function run() {
    startButton.toggle();
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    time--;
    timeContainer.text(time);
    if (time === 0) {
        stop();
        quizContainer.empty();
        showResults();
        submitButton.toggle();
    };
};

function stop() {
    clearInterval(intervalId);
}

function buildQuiz() {
    submitButton.show();
    resetCounters();
    timerContainer.show();
    time = 31
    quizContainer.empty();
    run();
    for (var i = 0; i < myQuestions.length; i++) {
        var questionHTML = buildQuestionHTML(myQuestions[i], i + 1);
        //append question html to DOM
        quizContainer.append(questionHTML);
    }
}

function buildQuestionHTML(currentQuestion, questionNumber) {
    var questionHTML = $("<div>");
    //use jquery to build html from question parameter
    var questionText = $("<p>");
    questionText.text(currentQuestion.question);
    questionHTML.append(questionText);
    //use jquery build div,
    var choicesDiv = $("<div class='choices'>")
    //loop through answers
    for (answer in currentQuestion.answers) {
        console.log(currentQuestion.answers[answer]);
        //radio button groups inside 
        choicesDiv.append(
            `
            <label>
                <input type="radio" name="question${questionNumber}" value="${answer}">
                ${currentQuestion.answers[answer]}
            </label>
            `
        )

    }
    questionHTML.append(choicesDiv);
    return questionHTML;

}
;
function showResults() {
    restartButton.show();
    stop();
    const answerContainers = document.querySelectorAll('.choices');
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (document.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            correct++;
            answerContainers[questionNumber].style.color = "green";
        }
        /*
        ------------------------------------------------------------------------------
        I couldn't get the radio buttons to register as checked or not,
        so my logic doesn't work. Working on it late saturday,
        ill fix it as soon as i can talk to a TA
        ------------------------------------------------------------------------------
        if userAnswer != currentQuestion.correct answer
            incorrect++
            style to red
        else
            unanswered++

        append score counters to DOM
        */

    })
};

timerContainer.hide();
startButton.on("click", buildQuiz);
submitButton.on("click", showResults);
restartButton.on("click", buildQuiz);