let score = 0;
let currentQuestion = 0;

const questions = [
    {
        question: "O que é programação?",
        options: [
            "Escrever códigos para o computador executar tarefas",
            "Criar imagens e animações para sites",
            "Organizar arquivos no computador",
            "Instalar programas no sistema operacional"
        ],
        correct: "Escrever códigos para o computador executar tarefas"
    },
    {
        question: "Qual é a principal vantagem de aprender Python?",
        options: [
            "Funciona apenas em sistemas operacionais Windows",
            "É usada para criar sites, jogos e sistemas",
            "Serve principalmente para redes sociais",
            "É ideal apenas para programar sistemas de segurança"
        ],
        correct: "É usada para criar sites, jogos e sistemas"
    },
    {
        question: "O que é um algoritmo?",
        options: [
            "São passos para resolver um problema",
            "É uma sequência de comandos para manipular dados",
            "É um programa de computador para edição de texto",
            "É um conjunto de comandos que causam erro no código"
        ],
        correct: "São passos para resolver um problema"
    },
    {
        question: "O que é necessário para começar a programar em Python?",
        options: [
            "Ter Python instalado no computador",
            "Ser bom em matemática e inglês",
            "Utilizar um celular para rodar os códigos",
            "Ter experiência com linguagens de programação avançadas"
        ],
        correct: "Ter Python instalado no computador"
    },
    {
        question: "O que é um 'loop' em programação?",
        options: [
            "É um comando que repete uma ação",
            "É um tipo de comando para rodar o código",
            "É uma estrutura para armazenar dados temporários",
            "É um tipo de erro no código que trava o programa"
        ],
        correct: "É um comando que repete uma ação"
    },
    {
        question: "O que é um 'sistema operacional'?",
        options: [
            "É o software que controla o computador",
            "É um programa para criar e editar textos",
            "É a plataforma para criar aplicativos móveis",
            "É um programa que ajuda a criar gráficos e imagens"
        ],
        correct: "É o software que controla o computador"
    },
    {
        question: "O que faz o comando 'print' em Python?",
        options: [
            "Exibe informações na tela do computador",
            "Cria arquivos de texto automaticamente",
            "Armazena dados no computador",
            "Executa o código em uma janela separada"
        ],
        correct: "Exibe informações na tela do computador"
    }
];

function loadQuestion() {
    const questionData = questions[currentQuestion];
    const options = shuffle([...questionData.options]); // Randomiza a ordem das opções

    document.getElementById("question-text").textContent = questionData.question;

    document.getElementById("optionA").textContent = "1. " + options[0];
    document.getElementById("optionB").textContent = "2. " + options[1];
    document.getElementById("optionC").textContent = "3. " + options[2];
    document.getElementById("optionD").textContent = "4. " + options[3];

    // Atualiza os IDs temporários com os textos das opções para comparação
    document.getElementById("optionA").dataset.value = options[0];
    document.getElementById("optionB").dataset.value = options[1];
    document.getElementById("optionC").dataset.value = options[2];
    document.getElementById("optionD").dataset.value = options[3];

    document.getElementById("feedback").textContent = "";
    resetButtons();
}

function checkAnswer(selectedOption) {
    const questionData = questions[currentQuestion];
    const selectedText = document.getElementById(selectedOption).dataset.value; // Obtém o texto da opção selecionada
    const feedback = document.getElementById("feedback");
    const progressBar = document.getElementById("progress-bar");

    // Verifica a resposta
    if (selectedText === questionData.correct) {
        score += 100; // Pontuação de 100 por cada pergunta correta
        updateScore();
        document.getElementById(selectedOption).classList.add("correct");
        feedback.textContent = "Correto! " + questionData.correct;
        feedback.style.color = "green";
    } else {
        document.getElementById(selectedOption).classList.add("incorrect");
        document.querySelectorAll('.option').forEach(button => {
            if (button.dataset.value === questionData.correct) {
                button.classList.add("correct");
            }
        });
        feedback.textContent = "Errado! A resposta correta era: " + questionData.correct;
        feedback.style.color = "red";
    }

    // Desabilitar todas as opções após a resposta
    document.querySelectorAll('.option').forEach(button => button.disabled = true);
    progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + "%"; // Atualiza a barra de progresso
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showFinalScreen(); // Exibe a tela final quando o quiz terminar
    }
}

function updateScore() {
    document.getElementById("score").textContent = "Pontuação: " + score;
}

function showFinalScreen() {
    document.getElementById("quiz-section").style.display = "none"; // Esconde a seção do quiz
    const finalMessage = document.createElement("div");
    finalMessage.classList.add("final-message");
    finalMessage.innerHTML = `
        <h2>Parabéns!</h2>
        <p>Você completou o quiz!</p>
        <p><strong>Pontuação Final: ${score} pontos</strong></p>
        <button onclick="restartQuiz()" class="restart-btn">Reiniciar Quiz</button>
    `;
    document.body.appendChild(finalMessage); // Exibe a tela final
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    document.querySelector(".final-message").remove(); // Remove a tela final
    loadQuestion(); // Carrega a primeira pergunta novamente
    document.getElementById("quiz-section").style.display = "block"; // Exibe o quiz novamente
    updateScore(); // Reseta a pontuação
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function resetButtons() {
    document.querySelectorAll('.option').forEach(button => {
        button.classList.remove('incorrect', 'correct');
        button.disabled = false;
    });
}

loadQuestion();
