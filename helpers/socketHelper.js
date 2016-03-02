/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var express = require('express');
var socketServer = require('http').createServer(express);

socketServer.listen(3001);
var io = require('socket.io')(socketServer);

// Socket event 
io.on('connection', function (socket) {
    socket.on('create_room', function(subscriptionId) {
        socket.join(subscriptionId);
    });
});

module.exports = io;
