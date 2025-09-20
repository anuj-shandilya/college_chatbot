let intents = [];

function loadIntents() {
    fetch('intents.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                intents = data;
                console.log("Loaded intents:", intents);
                setTimeout(() => {
                    displayMessage("Hello! I'm the CMRIT Chatbot. How can I help you today?", 'bot');
                }, 500);
            } else {
                console.error('intents.json is not an array:', data);
                displayMessage("I'm having trouble loading my knowledge base. Please try again later.", 'bot');
            }
        })
        .catch(error => {
            console.error('Error loading intents:', error);
            displayMessage("I couldn't connect to my knowledge base. Please check if intents.json exists and is properly formatted.", 'bot');
        });
}

function preprocess(input) {
    const cleaned = input
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter(token => token.length > 0);
    console.log("User tokens:", cleaned);
    return cleaned;
}

function isExactMatch(token, keyword) {
    return token === keyword;
}

function findIntent(userTokens) {
    let matchedIntent = null;

    for (const intent of intents) {
        let hasAllKeywords = true;

        for (const keyword of intent.keywords) {
            if (!userTokens.some(token => isExactMatch(token, keyword))) {
                hasAllKeywords = false;
                break;
            }
        }

        if (hasAllKeywords && intent.keywords.length > 0) {
            console.log(`Found exact match for intent: ${intent.tag}`);
            return intent;
        }
    }

    let bestIntent = null;
    let maxMatches = 0;

    for (const intent of intents) {
        let matches = 0;

        for (const token of userTokens) {
            for (const keyword of intent.keywords) {
                if (isExactMatch(token, keyword)) {
                    matches++;
                }
            }
        }

        if (matches > maxMatches) {
            maxMatches = matches;
            bestIntent = intent;
        }
    }

    return maxMatches > 0 ? bestIntent : null;
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle user message
function sendMessage() {
    const userInputElem = document.getElementById('user-input');
    const userInput = userInputElem.value.trim();
    if (!userInput) return;

    displayMessage(userInput, 'user');

    if (intents.length === 0) {
        displayMessage("I'm still loading my knowledge base. Please try again in a moment.", 'bot');
        userInputElem.value = '';
        userInputElem.focus();
        return;
    }

    const tokens = preprocess(userInput);
    const intent = findIntent(tokens);

    let response = "I'm sorry, I didn't understand that. Could you please rephrase?";
    if (intent) {
        response = intent.response;
    }

    setTimeout(() => {
        displayMessage(response, 'bot');
    }, 500);

    userInputElem.value = '';
    userInputElem.focus();
}

window.onload = function () {
    loadIntents();

    const sendButton = document.querySelector('button');
    const userInputElem = document.getElementById('user-input');

    sendButton.addEventListener('click', sendMessage);

    userInputElem.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    displayMessage("Loading chatbot knowledge base...", 'bot');
};