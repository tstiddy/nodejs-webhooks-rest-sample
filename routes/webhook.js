var express = require('express');
var router = express.Router();

// Socket.io setup
var socketServer = require('http').createServer(express);
socketServer.listen(3001);
var io = require('socket.io')(socketServer);

// Socket event 
io.on('connection', function (socket) {
    socket.join('123');
});

/* Event received route. */
router.get('/123', function(req, res) {
    io.to('123').emit('event_received', 'A message');
    
    var status = 202;
    var http = require('http');
    res.status(status).end(http.STATUS_CODES[status]);
});

/* Default webhooks route. */
router.get('/', function(req, res) {
    res.render('webhook', { title: 'Webhook sample' });
});

module.exports = router;
