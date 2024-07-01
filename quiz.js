var questions = [
    {
        id: 1,
        question: "HTML stand for",
        options: {
            a: "Hyper text markup Language",
            b: "Hyper text programming Language",
            c: "Hyper text styling Language",
            d: "Hyper text scripting Language",

        },
        answer: "Hyper text markup Language"
    },
    {
        id: 2,
        question: "Which type of JavaScript Languages is",
        options: {
            a: "Object-Oriented ",
            b: "Object-Base",
            c: "Assembly Languages",
            d: "high Level",

        },
        answer: "Object-Base"
    },
    {
        id: 3,
        question: "The 'function' and  'var' are known as:",
        options: {
            a: "Keywords",
            b: "Data types",
            c: "Declaration statements",
            d: "Prototypes",

        },
        answer: "Declaration statements"
    },
    {
        id: 4,
        question: "who is the present president of pakistan",
        options: {
            a: "Arif Alvi",
            b: "Imran Khan",
            c: "Nawaz Sharif",
            d: "Zardari",

        },
        answer: "Arif Alvi"
    },
    {
        id: 5,
        question: "How many prayers in a day:",
        options: {
            a: "6",
            b: "5",
            c: "3",
            d: "none",

        },
        answer: "5"
    },
];

var htmlQues = document.getElementById("htmlQues");
var htmlOptions = document.getElementById("htmlOptions");
var currentQues = 0;
var correctAns = 0;
var wrongAns = 0;
var timerElement = document.getElementById("timer");
var totalSeconds = 0;
var timer;

function startQuiz() {
    var userName = document.getElementById("userName");
    var userEmail = document.getElementById("userEmail");

    userName.innerText = localStorage.getItem("name");
    userEmail.innerText = localStorage.getItem("email");

    renderQuestion();
    var totalCount = document.getElementById("totalCount");
    totalCount.innerText = questions.length;

    startTimer();
}

function renderQuestion() {
    var question = questions[currentQues];
    htmlQues.innerText = question.question;
    htmlOptions.innerHTML = "";

    for (var key in question.options) {
        var li = document.createElement("li");
        li.setAttribute("onclick", "checkAnswer(this)");
        li.innerText = question.options[key];
        htmlOptions.appendChild(li);
    }

    document.getElementById("currentCount").innerText = currentQues + 1;
}

function nextQues() {
    currentQues++;
    var nextQuesBtn = document.getElementById("nextQuesBtn");
    nextQuesBtn.classList.add("hide");
    if (questions.length === currentQues) {
        clearInterval(timer);
        showResult();
    } else {
        renderQuestion();
    }
}

function checkAnswer(selectedOption) {
    var question = questions[currentQues];
    var nextQuesBtn = document.getElementById("nextQuesBtn");

    if (selectedOption.innerText === question.answer) {
        selectedOption.classList.add("correctAns");
        correctAns++;
    } else {
        selectedOption.classList.add("wrongAns");
        wrongAns++;
    }

    var options = htmlOptions.getElementsByTagName("li");
    for (var i = 0; i < options.length; i++) {
        options[i].onclick = null;
    }
    nextQuesBtn.classList.remove("hide");
}

function showResult() {
    var quizContainer = document.getElementById("quizContainer");
    var resultContainer = document.querySelector(".resultContainer");

    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");

    var totalQuestions = questions.length;
    var percentage = (correctAns / totalQuestions) * 100;
    var resultStatus = percentage >= 50 ? "Pass" : "Fail";

    document.getElementById("correctAns").innerText = correctAns;
    document.getElementById("wrongAns").innerText = wrongAns;
    document.getElementById("percentage").innerText = percentage.toFixed(2);
    document.getElementById("resultStatus").innerText = resultStatus;
}

function startTimer() {
    timer = setInterval(function() {
        totalSeconds++;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        timerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}
