let score = 0;

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.trim();
    const feedback = document.getElementById('feedback');
    
    if (userInput === "print('Hello, World!')") {
        feedback.textContent = "Correct! Well done!";
        score += 10;
        updateScore();
        updateProgress();
    } else {
        feedback.textContent = "Try again!";
    }
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateProgress() {
    const progress = Math.min(score / 100 * 100, 100);
    document.getElementById('progress-bar').textContent = progress + "%";
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input').value.trim();
    const messages = document.getElementById('messages');
    
    if (chatInput) {
        const userMessage = document.createElement('div');
        userMessage.textContent = "You: " + chatInput;
        messages.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.textContent = "Bot: I'm still learning, but I'll try to help!";
        messages.appendChild(botMessage);

        document.getElementById('chat-input').value = "";
        messages.scrollTop = messages.scrollHeight;
    }
}
