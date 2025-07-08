var questionsArr = [
    {
        question: 'What does the fox say?',
        answer: 'Joff-tchoff-tchoffo-tchoffo-tchoff',
        options: [
            'Ring-ding-ding-ding-dingeringeding',
            'Gering-ding-ding-ding-dingeringeding',
            'Wa-pa-pa-pa-pa-pa-pow',
            'Joff-tchoff-tchoffo-tchoffo-tchoff',
        ],
    },
    {
        question: 'Is a hot dog a sandwich?',
        answer: 'Technically yes',
        options: [
            'Technically yes',
            'Literally no',
            'Idk',
            'Um',
        ],
    },
    {
        question: 'Which of these is not a condiment?',
        answer: 'Ravioli',
        options: [
            'Gravy',
            'Frosting',
            'Ravioli',
            'Marinara',
        ],
    },
    {
        question: 'How do you pronounce GIF?',
        answer: 'Giff',
        options: [
            'Jiff',
            'Giff',
            'Idk',
            'Um',
        ],
    },
    {
        question: 'Pudgy phrase?',
        answer: 'Owa Owa',
        options: [
            'Mara Nara',
            'Owa Owa',
            'AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
            'bark',
        ],
    },
];

var quizDiv = document.getElementById('quiz');
var questionIndex = 0;
var score = 0;
var timer;
var timeLeft;

function showStartButton() {
    quizDiv.innerHTML = '';
    let previousScore = localStorage.getItem('previous-score');
    if (previousScore !== null) {
        let scoreDisplay = document.createElement('p');
        scoreDisplay.textContent = `Previous Score: ${previousScore}%`;
        quizDiv.appendChild(scoreDisplay);
    }

    let startBtn = document.createElement('button');
    startBtn.id = 'start-quiz';
    startBtn.textContent = 'Start Quiz!';
    startBtn.addEventListener('click', startQuiz);
    quizDiv.appendChild(startBtn);
}

function startQuiz() {
    questionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (questionIndex >= questionsArr.length) {
        endQuiz();
        return;
    } 

    quizDiv.innerHTML = '';
    const q = questionsArr[questionIndex];

    const questionEl = document.createElement('p');
    questionEl.textContent = q.question;
    quizDiv.appendChild(questionEl);

    const optionsContainer = document.createElement('div');
    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.addEventListener('click', () => {
            clearInterval(timer);
            if (option === q.answer) {
                score ++;
            }
            questionIndex++;
            showQuestion();
        });
        optionsContainer.appendChild(btn);
    });
    quizDiv.appendChild(optionsContainer);

    const timerEl = document.createElement('p');
    timerEl.id = 'timer';
    quizDiv.appendChild(timerEl);

    timeLeft = 30;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            questionIndex++;
            showQuestion();
        }
    }, 1000);
}

function endQuiz() {
    const finalScore = Math.round ((score / questionsArr.length) * 100);
    localStorage.setItem('previous-score', finalScore);
    quizDiv.innerHTML = '';

    const scoreDisplay = document.createElement('p');
    scoreDisplay.textContent = `Score: ${finalScore}%`;
    quizDiv.appendChild(scoreDisplay);

    const restartBtn = document.createElement('button');
    restartBtn.id = 'start-quiz';
    restartBtn.addEventListener('click', startQuiz);
    quizDiv.appendChild(restartBtn);
}

showStartButton();