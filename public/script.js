var socket = io('http://localhost:3000');

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var roomFrom = document.getElementById('roomForm');
var roomName = document.getElementById('inputRoom');
var username = document.getElementById('username');

roomFrom.addEventListener('submit', function (e) {
  e.preventDefault();
  if (roomName.value) {
    socket.emit('joinRoom', { room: roomName.value, username: username.value });
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('msgToServer', {
      room: roomName.value,
      userName: username.value,
      message: input.value,
    });
    input.value = '';
  }
});

socket.on('msgToClient', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function getListRoom() {
  var apiUrl = 'http://localhost:3000/api/rooms/';
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      console.log(data);
    })
    .catch((err) => {
      // Do something for an error here
    });
}
