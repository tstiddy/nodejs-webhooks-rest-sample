/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/authHelper.js');
var dbHelper = new (require('../helpers/dbHelper'))();
var requestHelper = require('../helpers/requestHelper.js');
var subscriptionConfiguration = require('../constants').subscriptionConfiguration;

/* Redirect to start page */
router.get('/', function(req, res) {
  res.redirect('/index.html');
});

/* Start authentication flow */
router.get('/signin', function(req, res) {
  res.redirect(authHelper.getAuthUrl());
});

router.get('/callback', function(req, res, next) {
    authHelper.getTokenFromCode('https://graph.microsoft.com/', req.query.code, function (authenticationError, token) {
    if (token) {
        // Make the request to subscription service
        requestHelper.postData(
            'graph.microsoft.com',
            '/beta/subscriptions',
            token.accessToken,
            JSON.stringify(subscriptionConfiguration),
            function redirectToListen(requestError, subscriptionData){
                if(subscriptionData) {
                    subscriptionData.userId = token.userId;
                    subscriptionData.accessToken = token.accessToken;
                    dbHelper.saveSubscription(subscriptionData, null);
                    res.redirect('/dashboard.html?subscriptionId=' + subscriptionData.subscriptionId + '&userId=' + subscriptionData.userId);
                } else if (requestError) {
                    res.status(500);
                    next(requestError);
                }
            }
        );
    } else if (authenticationError) {
        res.status(500);
        next(authenticationError);
    }
    });
});

router.get('/signout/:userId', function (req, res, next) {
  dbHelper.deleteSubscription(req.params.userId, null);
  var redirectUri = req.protocol + '://' + req.hostname + ':' + req.app.settings.port;
  res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
});

module.exports = router;
