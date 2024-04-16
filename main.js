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
