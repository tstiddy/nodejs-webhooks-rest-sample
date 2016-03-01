var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../helpers/authHelper.js');
var requestHelper = require('../helpers/requestHelper.js')
var subscriptionConfiguration = require('../constants').subscriptionConfiguration;

/* Start authentication flow */
router.get('/', function(req, res) {
  res.redirect(authHelper.getAuthUrl());
});

router.get('/callback', function(req, res) {
    authHelper.getTokenFromCode('https://graph.microsoft.com/', req.query.code, function (token) {
    if (token !== null) {
        // Make the request to subscription service
        requestHelper.postData(
            'graph.microsoft.com',
            '/beta/subscriptions',
            token.accessToken,
            JSON.stringify(subscriptionConfiguration),
            function redirectToListen(subscriptionData){
                res.redirect('/dashboard.html?subscriptionId=' + subscriptionData.subscriptionId);
            }
        );
    } else {
        console.log("AuthHelper failed to acquire token");
        res.status(500);
        res.send();
    }
    });
});

router.get('/disconnect', function (req, res, next) {
  var redirectUri = req.protocol + '://' + req.hostname + ':' + req.app.settings.port;
  console.log('Disconnect redirect uri: ' + redirectUri);
  res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
});

module.exports = router;
