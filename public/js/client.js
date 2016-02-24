var socket = io.connect('http://localhost:3001');

// Handle the event_received event.
socket.on('notification_received', function (data) {
    var newListItem = document.createElement('li');
    newListItem.appendChild(document.createTextNode(data));
    console.log('Notification received: ' + data);
    document.getElementById('events').appendChild(newListItem);
});

socket.on('create_room', function (data) {
    console.log('Room created: ' + data);
});

function createSocketRoom (subscriptionId) {
  socket.emit('create_room', subscriptionId);
}