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
            'UserID TEXT NOT NULL, ' +
            'SubscriptionID TEXT NOT NULL, ' +
            'ClientState TEXT  NOT NULL, ' +
            'PRIMARY KEY (UserID)' +
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

dbHelper.prototype.getSubscription = function getSubscription(userID, callback) {
  var db = new sqlite3.Database(dbFile);
  var getUserDataStatement =
        'SELECT ' +
        '    SubscriptionID as subscriptionID, ' +
        '    ClientState as clientState ' +
        'FROM Subscription ' +
        'WHERE UserID = $userID';

  db.serialize(function executeSelect() {
    db.get(
      getUserDataStatement,
      {
        $userID: userID
      },
      function queryExecuted(error, subscriptionData) {
        callback(error, subscriptionData);
      }
    );
  });
};

dbHelper.prototype.saveSubscription =
    function saveSubscription(userID, subscriptionID, clientState, callback) {
      var db = new sqlite3.Database(dbFile);
      var insertStatement = 'INSERT INTO Subscription ' +
                            '(UserID, SubscriptionID, ClientState) ' +
                            'VALUES ($userID, $subscriptionID, $clientState)';

      db.serialize(function executeInsert() {
        db.run(
            insertStatement,
          {
            $userID: userID,
            subscriptionID: subscriptionID,
            $clientState: clientState
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
