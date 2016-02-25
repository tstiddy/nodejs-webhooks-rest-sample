var express = require('express');
var router = express.Router();
var io = require('../helpers/socketHelper.js');
var http = require('http');

/* Default webhooks route. */
router.get('/', function(req, res) {
    res.render('listen');
});

/* Default webhooks route. */
router.post('/', function(req, res) {
    var status;
    // If there's a validationToken parameter in the query string,
    // then this is the request that Office 365 sends to check
    // that this is a valid endpoint.
    // Just send the validationToken back.
    if(req.query && req.query.validationToken) {
        res.send(req.query.validationToken);
        // Send a status of 'Ok'
        status = 200;
    } else {
        var clientStateValid = true;
        
        // First, validate all the clientState values in array
        for(var i = 0; i < req.body.value.length; i++) {
            if(req.body.value[i].clientState !== 'cLIENTsTATEfORvALIDATION') {
                // If just one clientState is invalid, we discard the whole batch
                clientStateValid = false;
                break;
            }
        }
        
        // If all the clientStates are valid, then wen notify the socket(s)
        if (clientStateValid) {
            for(var i = 0; i < req.body.value.length; i++) {
                io.to(req.body.value[i].subscriptionId).emit('notification_received', req.body.value[i].resource);
            }
            // Send a status of 'Accepted'
            status = 202;
        } else {
            // Send a status of 'Bad request'
            status = 400;
        }
    }
    res.status(status).end(http.STATUS_CODES[status]);
});

module.exports = router;
