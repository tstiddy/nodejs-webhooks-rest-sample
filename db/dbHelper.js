/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var dbFile = './db/database.sqlite3';

function dbHelper() { }

/**
 * Create SQLite3 table Subscription
 */
dbHelper.prototype.createDatabase = function createDatabase() {
  var dbExists = fs.existsSync(dbFile);
  var db = new sqlite3.Database(dbFile);
  var createSubscriptionStatement =
        'CREATE TABLE Subscription (' +
            'UserId TEXT NOT NULL, ' +
            'SubscriptionId TEXT NOT NULL, ' +
            'Resource TEXT NOT NULL, ' +
            'ChangeType TEXT NOT NULL, ' +
            'ClientState TEXT NOT NULL, ' +
            'NotificationUrl TEXT NOT NULL, ' +
            'SubscriptionExpirationDateTime TEXT NOT NULL' +
        ')';

  db.serialize(function createTable() {
    if (!dbExists) {
      db.run(
        createSubscriptionStatement,
        [],
        function callback(error) {
            if (error !== null) {
            throw error;
            }
        }
      );
    }
  });
  db.close();
};

dbHelper.prototype.getSubscription = function getSubscription(userId, callback) {
  var db = new sqlite3.Database(dbFile);
  var getUserDataStatement =
        'SELECT ' +
            'UserId as userId, ' +
            'SubscriptionId as subscriptionId, ' +
            'Resource as resource, ' +
            'ChangeType as changeType, ' +
            'ClientState as clientState, ' +
            'NotificationUrl as notificationUrl, ' +
            'SubscriptionExpirationDateTime as subscriptionExpirationDateTime ' +
        'FROM Subscription ' +
        'WHERE UserId = $userId ' + 
        'AND SubscriptionExpirationDateTime > datetime(\'now\')';

  db.serialize(function executeSelect() {
    db.get(
      getUserDataStatement,
      {
        $userId: userId
      },
      function queryExecuted(error, subscriptionData) {
        callback(error, subscriptionData);
      }
    );
  });
};

dbHelper.prototype.saveSubscription =
    function saveSubscription(subscriptionData, callback) {
      var db = new sqlite3.Database(dbFile);
      var insertStatement = 'INSERT INTO Subscription ' +
                            '(UserId, SubscriptionId, Resource, ChangeType, ClientState, NotificationUrl, SubscriptionExpirationDateTime) ' +
                            'VALUES ($userId, $subscriptionId, $resource, $changeType, $clientState, $notificationUrl, $subscriptionExpirationDateTime)';

      db.serialize(function executeInsert() {
        db.run(
            insertStatement,
          {
            $userId: subscriptionData.userId,
            $subscriptionId: subscriptionData.subscriptionId,
            $resource: subscriptionData.resource,
            $clientState: subscriptionData.clientState,
            $changeType: subscriptionData.changeType,
            $notificationUrl: subscriptionData.notificationUrl,
            $subscriptionExpirationDateTime: subscriptionData.subscriptionExpirationDateTime
          },
            callback
        );
      });
    };

dbHelper.prototype.deleteSubscription =
    function deleteSubscription(userID, callback) {
      var db = new sqlite3.Database(dbFile);
      var deleteStatement = 'DELETE FROM Subscription WHERE ' +
                          'UserID = $userID';

      db.serialize(function executeDelete() {
        db.run(
            deleteStatement,
          {
            $userID: userID
          },
            callback
        );
      });
    };

module.exports = dbHelper;
