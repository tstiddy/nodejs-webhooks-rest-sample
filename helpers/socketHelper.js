var express = require('express');
var socketServer = require('http').createServer(express);

socketServer.listen(3001);
var io = require('socket.io')(socketServer);

// Socket event 
io.on('connection', function (socket) {
    socket.on('create_room', function(subscriptionId) {
        socket.join(subscriptionId);
        io.to(subscriptionId).emit('create_room', subscriptionId);
    });
});

module.exports = io;