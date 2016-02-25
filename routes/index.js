var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../helpers/authHelper.js');
var dbHelper = new (require('../helpers/dbHelper'))();
var requestHelper = require('../helpers/requestHelper.js')
var subscriptionConfiguration = require('../constants').subscriptionConfiguration;

/* Start authentication flow */
router.get('/', function(req, res) {
  res.redirect(authHelper.getAuthUrl());
});

router.get('/callback', function(req, res) {
    authHelper.getTokenFromCode('https://graph.microsoft.com/', req.query.code, function (token) {
    if (token !== null) {
        dbHelper.getSubscription(
            token.userId, 
            function checkForExistingSubscription(error, subscriptionData) {
                if (subscriptionData === undefined) {
                    // Make the request to subscription service
                    subscriptionConfiguration.clientState = req.sessionID;
                    requestHelper.postData(
                        'graph.microsoft.com',
                        '/beta/subscriptions',
                        token.accessToken,
                        JSON.stringify(subscriptionConfiguration),
                        function redirectToListen(subscriptionData){
                            subscriptionData.userId = token.userId;
                            dbHelper.saveSubscription(
                                subscriptionData,
                                function(error){
                                   res.render('listen', subscriptionData);
                                });
                        }
                    );
                } else {
                    // Redirect to listen/subscriptionID
                    res.render('listen', subscriptionData);
                }
                
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
  //check for token
  req.session.destroy();
  res.clearCookie('nodecookie');
  res.clearCookie(authHelper.TENANT_CACHE_KEY);
  res.clearCookie(authHelper.TOKEN_CACHE_KEY);
  res.status(200);
  var redirectUri = req.protocol + '://' + req.hostname + ':' + req.app.settings.port;
  console.log('Disconnect redirect uri: ' + redirectUri);
  res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
});

module.exports = router;
