var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../authHelper.js');
var dbHelper = new (require('../db/dbHelper'))();
var requestUtil = require('../requestUtil.js')
var subscriptionConfiguration = require('../constants').subscriptionConfiguration;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

/* Start authentication flow */
router.get('/connect', function (req, res, next) {
    res.redirect(authHelper.getAuthUrl());
});

router.get('/callback', function(req, res) {
    authHelper.getTokenFromCode('https://graph.microsoft.com/', req.query.code, function (token) {
    if (token !== null) {
        //cache the refresh token in a cookie and go back to index
        //res.cookie(authHelper.TOKEN_CACHE_KEY, token.refreshToken);
        //res.cookie(authHelper.TENANT_CACHE_KEY, token.tenantId);
        
        dbHelper.getSubscription(
            token.userId, 
            function checkForExistingSubscription(error, subscriptionData) {
                if (subscriptionData === undefined) {
                    // Make the request to subscription service
                    subscriptionConfiguration.clientState = req.sessionID;
                    requestUtil.postData(
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
                    // Then redirect to listen/subscriptionID
                } else {
                    // Redirect to listen/subscriptionID
                    res.render('listen', subscriptionData);
                }
                
            }
        );
    }
    else {
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
