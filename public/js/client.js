var socket = io.connect('http://localhost:3001');

// Handle the event_received event.
socket.on('notification_received', function (notification) {
    var newListItem = document.createElement('li');

    var changeTypeText = '<b>Change type:</b> ' + notification.changeType;
    var resourceText = '<b>Resource:</b> ' + notification.resource;

    newListItem.innerHTML = changeTypeText + '<br />' + resourceText;
    document.getElementById('events').appendChild(newListItem);
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
