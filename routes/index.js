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

// This route gets called at the end of the authentication flow.
// It requests the subscription from Office 365, stores the subscription in a database
// and redirects the browser to the dashboard.html page.
router.get('/callback', function(req, res, next) {
    authHelper.getTokenFromCode(req.query.code, function (authenticationError, token) {
    if (token) {
        // Make the request to subscription service
        requestHelper.postData(
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

// This route signs out the users by performing these tasks
// Delete the subscription data from the database
// Redirect the browser to the logout endpoint 
router.get('/signout/:userId', function (req, res) {
  dbHelper.deleteSubscription(req.params.userId, null);
  var redirectUri = req.protocol + '://' + req.hostname + ':' + req.app.settings.port;
  res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
});

module.exports = router;
