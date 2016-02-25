var express = require('express');
var router = express.Router();

// Socket.io setup
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

/* Default webhooks route. */
router.get('/', function(req, res) {
    res.render('listen');
});

/* Default webhooks route. */
router.post('/', function(req, res) {
    if(req.query && req.query.validationToken) {
        res.send(req.query.validationToken);
    } else {
        //send message to socket(s)
        // We could possibly optimize this, let's see if the subscriptionId is the same
        for(var i = 0; i < req.body.value.length; i++) {
            io.to(req.body.value[i].subscriptionId).emit('notification_received', req.body.value[i].resource);
        }
        
        var status = 202;
        var http = require('http');
        res.status(status).end(http.STATUS_CODES[status]);
    }
});

module.exports = router;
