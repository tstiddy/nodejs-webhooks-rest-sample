/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var socket = io.connect('http://localhost:3001');
var subscriptionId;
var userId;

// Socket `notification_received` event handler.
socket.on('notification_received', function (mailData) {
  var newListItem = document.createElement('li');

  var subject = '<b>Subject:</b> ' + mailData.subject;
  var sender = '<b>From:</b> ' + mailData.sender.emailAddress.address;

  newListItem.innerHTML = subject + '<br />' + sender;
  document.getElementById('events').appendChild(newListItem);
});

// When the page first loads, create the socket room
subscriptionId = getQueryStringParameter('subscriptionId');
socket.emit('create_room', subscriptionId);
document.getElementById('subscriptionId').innerHTML = subscriptionId;

// The page also needs to send the userId to properly
// sign out the user.
userId = getQueryStringParameter('userId');
document.getElementById('signOutLink').href += userId;

function getQueryStringParameter(paramToRetrieve) {
  var params = document.URL.split('?')[1].split('&');
  var i;
  var singleParam;

  for (i = 0; i < params.length; i = i + 1) {
    singleParam = params[i].split('=');
    if (singleParam[0] === paramToRetrieve) {
      return singleParam[1];
    }
  }
  return null;
}
