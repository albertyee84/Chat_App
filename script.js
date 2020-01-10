//client and server is completely separated since they are on separate ports
const socket = io('http://localhost:3000');
//this determines where our server is being hosted

const messageForm = document.getElementById('send-container');
//grabs the html for our send-container in the html

const messageInput = document.getElementById('message-input');
//grabs the html for our message element in the html

const messageContainer = document.getElementById('message-container');

const name = prompt("what is your name");
appendMessage('You joined');
socket.emit('new-user', name);


socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});
//Event listener 'chat-message' is derived from the server.js where we socket.emit the event listener

socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});
socket.on("user-disconnected", name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', e=> {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    //emits message to the event listener 'send-chat-message
    messageInput.value = '';
});
//whenever we submit our form, we stop our form from submitting with e.preventDefault and stops from refreshing.
//sets message to the inputted message info from the form input box
//uses socket to emit the message to the send-chat-message event listener
// then resets the messageInput text box to blank after sent

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}