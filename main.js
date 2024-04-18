const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const homeVista = document.getElementById('home-vista');
const takeTheQuizBtn = document.getElementById('take-the-Quiz');
const noteContainer = document.querySelector('.note-container');
const punctuation = document.getElementById('note-punctuation');
const puntuacionTabla = document.getElementById('contenedor');

let questions = [];
const punctuations = JSON.parse(localStorage.getItem("punctuation")) || [];

let currentQuestionIndex = 0;
let note = 0;
let notePunctuation = localStorage.getItem("punctuation");

axios.get("https://quizapi.io/api/v1/questions?apiKey=mbXOtx4KgoWNLReBCDYkMsgsCQKC52TY77512IAf&limit=10")
    .then((res) => {
        questions = res.data;
        console.log(questions);
    })
    .catch((err) => console.log(err));

// Función de inicio del juego
const startGame = () => {
    homeVista.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    currentQuestionIndex = 0;
    puntuacionTabla.classList.add("hide");
    setNextQuestion();
}

// Muestra una pregunta y sus opciones de respuesta
const showQuestion = (question) => {
    questionElement.innerText = question.question;
    Object.keys(question.answers).forEach((key) => {
        const answerText = question.answers[key];
        if (answerText && answerText.trim() !== "") {
            const button = document.createElement("button");
            button.innerText = answerText;

            Object.keys(question.correct_answers).forEach(answerValue => {
                if (question.correct_answers[answerValue] === 'true') {
                    question.correct_answer = answerValue.substring(0, 8);
                }
            });

            const isCorrect = key === question.correct_answer;

            button.addEventListener("click", () => {
                selectAnswer(isCorrect);
                if (isCorrect) {
                    note++;
                }
            });

            answerButtonsElement.appendChild(button);
        }
    });
}

const resetState = () => {
    nextButton.classList.add("hide");
    restartButton.classList.add("hide");
    answerButtonsElement.innerHTML = "";
}

const setNextQuestion = () => {
    resetState();
    removeAnswerColors();
    showQuestion(questions[currentQuestionIndex]);
}

const setStatusClass = (element, isCorrect) => {
    element.classList.remove("correct", "wrong");
    if (isCorrect) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// Maneja la selección de una respuesta
const selectAnswer = (isCorrect) => {
    const buttons = answerButtonsElement.querySelectorAll("button");
    buttons.forEach((button) => {
        const key = getKeyByValue(questions[currentQuestionIndex].answers, button.innerText);
        setStatusClass(button, key === questions[currentQuestionIndex].correct_answer);
    });

    if (questions.length > currentQuestionIndex + 1) {
        showNextButton();
    } else {
        showNote();
    }
}

const removeAnswerColors = () => {
    const buttons = answerButtonsElement.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove("correct", "wrong");
    });
}

const showNextButton = () => {
    nextButton.classList.remove("hide");
}

const hideNextButton = () => {
    nextButton.classList.add("hide");
}

const showNote = () => {
    punctuation.innerHTML = `<h3> ${note}/10 </h3>`;
    noteContainer.classList.remove('hide');
    questionContainerElement.classList.add("hide");
    punctuations.push(note);
    localStorage.setItem("punctuation", JSON.stringify(punctuations));
    showRestartButton();
}

const showRestartButton = () => {
    restartButton.classList.remove("hide");
}

const hideRestartButton = () => {
    restartButton.classList.add("hide");
}

// Función de utilidad
const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
}

// Manejo de eventos
takeTheQuizBtn.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
    questionContainerElement.classList.add("hide");
    homeVista.classList.remove("hide");
    puntuacionTabla.classList.remove("hide");
    hideRestartButton();
    removeAnswerColors();
    noteContainer.classList.add('hide');
    count = 0;
});
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});
