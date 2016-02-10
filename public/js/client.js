var socket = io.connect('http://localhost:3001');
// The token will only live in our database for 2 minutes
var tokenLifetime = 120000;

// Handle the event_fired event.
socket.on('event_received', function (data) {
    var newListItem = document.createElement('li');
    newListItem.innerText = 'Event id: ' + data;
	document.getElementById('events').appendChild(newListItem);
});