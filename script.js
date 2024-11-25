let score = 0;
let currentQuestion = 0;

const questions = [
    {
        question: "O que é programação?",
        options: [
            "A) Um tipo de dança",
            "B) Uma maneira de dar instruções ao computador",
            "C) Um esporte",
            "D) Uma forma de criar jogos"
        ],
        correct: "B"
    },
    {
        question: "Por que usar Python para programar?",
        options: [
            "A) É uma linguagem antiga",
            "B) É simples e fácil de entender",
            "C) É difícil de aprender",
            "D) É apenas para especialistas"
        ],
        correct: "B"
    },
    {
        question: "Onde o Python é usado?",
        options: [
            "A) Apenas para criar jogos",
            "B) Somente em ciência de dados",
            "C) Em sites, jogos, ciência de dados e IA",
            "D) Apenas na criação de filmes"
        ],
        correct: "C"
    },
    {
        question: "O que são 'instruções' em programação?",
        options: [
            "A) As ordens que damos ao computador",
            "B) O hardware do computador",
            "C) Um software específico",
            "D) Linguagens de programação"
        ],
        correct: "A"
    },
    {
        question: "Como o Python ajuda a resolver problemas?",
        options: [
            "A) Tornando tarefas automáticas",
            "B) Apagando arquivos desnecessários",
            "C) Aprendendo com IA",
            "D) Imprimindo relatórios"
        ],
        correct: "A"
    }
];

function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById("question-text").textContent = questionData.question;
    document.getElementById("optionA").textContent = questionData.options[0];
    document.getElementById("optionB").textContent = questionData.options[1];
    document.getElementById("optionC").textContent = questionData.options[2];
    document.getElementById("optionD").textContent = questionData.options[3];
    document.getElementById("feedback").textContent = "";
}

function checkAnswer(selectedOption) {
    const questionData = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    
    if (selectedOption === questionData.correct) {
        feedback.textContent = "Correto! Muito bem!";
        score += 10;
        updateScore();
        updateProgress();
    } else {
        feedback.textContent = "Incorreto! Tente novamente!";
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateProgress() {
    const progress = Math.min(score / (questions.length * 10) * 100, 100);
    document.getElementById('progress-bar').textContent = progress + "%";
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        document.getElementById("question-text").textContent = "Quiz concluído! Parabéns!";
        document.getElementById("feedback").textContent = "";
        document.querySelector(".options").style.display = "none";
    }
}

loadQuestion();
