/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var socket = io.connect('http://localhost:3001');

// Handle the event_received event.
socket.on('notification_received', function (mailData) {
    var newListItem = document.createElement('li');

    var subject = '<b>Subject:</b> ' + mailData.subject;
    var sender = '<b>From:</b> ' + mailData.sender.emailAddress.address;

    newListItem.innerHTML = subject + '<br />' + sender;
    document.getElementById('events').appendChild(newListItem);
});

var subscriptionId = getQueryStringParameter('subscriptionId');
socket.emit('create_room', subscriptionId);
document.getElementById('subscriptionId').innerHTML = subscriptionId;

var userId = getQueryStringParameter('userId');
document.getElementById('signOutLink').href += userId;

function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
