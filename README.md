# Rule-Based Chatbot

This is a simple rule-based chatbot built using plain HTML, CSS, and JavaScript. It uses basic pattern matching techniques to understand user inputs and respond with predefined answers fetched dynamically from an `intents.json` file.

## Features

- Rule-based conversation using pattern matching.
- Loads response data from `intents.json` to handle multiple intents.
- Lightweight and easy to extend with new patterns and responses.
- Simple and clean user interface with HTML & CSS.
- No backend required — runs completely in the browser.

## How It Works

1. The chatbot listens for user input in the chat interface.
2. It matches the input against patterns defined in the `intents.json`.
3. When a match is found, the chatbot responds with the corresponding predefined answer.
4. If no patterns match, it replies with a default fallback response.

## File Structure

- `index.html` - The main webpage for the chatbot UI.
- `style.css` - Styling for the chatbot interface.
- `script.js` - Core JavaScript logic handling input processing and pattern matching.
- `intents.json` - Contains intents with patterns and corresponding responses.

## How to Use

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Type your messages in the input box and interact with the chatbot.
4. Modify `intents.json` to add or update chatbot conversation patterns and responses.

## Example Intent (in `intents.json`)

{
"intents": [
{
"tag": "greeting",
"patterns": ["Hi", "Hello", "Is anyone there?"],
"responses": ["Hello! How can I help you?", "Hi there! What can I do for you today?"]
}
]
}



## Future Enhancements

- Add more sophisticated natural language processing.
- Support for context-aware conversations.
- Integrate backend API for dynamic responses.

## License

This project is open source and available under the MIT License.
