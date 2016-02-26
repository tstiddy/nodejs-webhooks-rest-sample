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

var subscriptionId = getQueryStringParameter('subscriptionId');
socket.emit('create_room', subscriptionId);
document.getElementById('subscriptionId').innerHTML = subscriptionId;

function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
