var socket = io.connect('http://localhost:3001');

// Handle the event_received event.
socket.on('notification_received', function (notification) {
    var newListItem = document.createElement('li');

    var changeTypeText = '<b>Change type:</b> ' + notification.changeType;
    var subscriptionIdText = '<b>Subscription ID:</b> ' + notification.subscriptionId;
    var resourceText = '<b>Resource:</b> ' + notification.resource;

    newListItem.innerHTML = changeTypeText + '<br />' + subscriptionIdText  + '<br />' + resourceText;
    console.log('Notification received: ' + JSON.stringify(notification));
    document.getElementById('events').appendChild(newListItem);
});

socket.on('create_room', function (data) {
    console.log('Room created: ' + data);
});

function createSocketRoom (subscriptionId) {
  socket.emit('create_room', subscriptionId);
}