const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const homeVista = document.getElementById('home-vista');
const takeTheQuizBtn = document.getElementById('take-the-Quiz');
const noteContainer= document.querySelector('.note-container')
const punctuation=document.getElementById('note-punctuation')

let questions = [];
let currentQuestionIndex = 0;
let note = 0

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
    setNextQuestion();
}

const showQuestion = (question) => {

    questionElement.innerText = question.question;

    Object.keys(question.answers).forEach((key) => {

        const answerText = question.answers[key];
        if (answerText && answerText.trim() !== "") {
            const button = document.createElement("button");
            button.innerText = answerText;

            Object.keys(question.correct_answers).forEach(answerValue => {

                if (question.correct_answers[answerValue] === 'true') {
                    question.correct_answer = answerValue.substring(0, 8)
                }
            })
            
            isCorrect = key === question.correct_answer;

            
            button.addEventListener("click", () => {selectAnswer(isCorrect)
            if ( isCorrect = key === question.correct_answer) {
                note ++
            }
            console.log(note);
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


const selectAnswer = (isCorrect) => {
    const buttons = answerButtonsElement.querySelectorAll("button");
    
    buttons.forEach((button) => {
        const key = getKeyByValue(questions[currentQuestionIndex].answers, button.innerText);

        if (isCorrect && key === questions[currentQuestionIndex].correct_answer) {
            setStatusClass(button, true);
            

        } else if (!isCorrect && key === questions[currentQuestionIndex].correct_answer) {
            setStatusClass(button, true);
        } else {
            setStatusClass(button, false);
        }
    });
    
    if (questions.length > currentQuestionIndex + 1) {
        showNextButton();
    } else {
        showNote()
    }
}