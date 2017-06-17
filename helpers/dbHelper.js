/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import fs from 'fs';
import sql from 'sqlite3';

const dbFile = './helpers/database.sqlite3';
const sqlite3 = sql.verbose();

/**
 * Create SQLite3 table Subscription.
 */
export function createDatabase() {
  const dbExists = fs.existsSync(dbFile);
  const db = new sqlite3.Database(dbFile);
  const createSubscriptionStatement =
    'CREATE TABLE Subscription (' +
    'UserId TEXT NOT NULL, ' +
    'SubscriptionId TEXT NOT NULL, ' +
    'AccessToken TEXT NOT NULL, ' +
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
}

export function getSubscription(subscriptionId, callback) {
  const db = new sqlite3.Database(dbFile);
  const getUserDataStatement =
    'SELECT ' +
    'UserId as userId, ' +
    'SubscriptionId as subscriptionId, ' +
    'AccessToken as accessToken, ' +
    'Resource as resource, ' +
    'ChangeType as changeType, ' +
    'ClientState as clientState, ' +
    'NotificationUrl as notificationUrl, ' +
    'SubscriptionExpirationDateTime as subscriptionExpirationDateTime ' +
    'FROM Subscription ' +
    'WHERE SubscriptionId = $subscriptionId ' +
    'AND SubscriptionExpirationDateTime > datetime(\'now\')';

  db.serialize(function executeSelect() {
    db.get(
      getUserDataStatement,
      {
        $subscriptionId: subscriptionId
      },
      callback
    );
  });
}

export function saveSubscription(subscriptionData, callback) {
  const db = new sqlite3.Database(dbFile);
  const insertStatement =
    'INSERT INTO Subscription ' +
    '(UserId, SubscriptionId, AccessToken, Resource, ChangeType, ' +
    'ClientState, NotificationUrl, SubscriptionExpirationDateTime) ' +
    'VALUES ($userId, $subscriptionId, $accessToken, $resource, $changeType, ' +
    '$clientState, $notificationUrl, $subscriptionExpirationDateTime)';

  db.serialize(function executeInsert() {
    db.run(
      insertStatement,
      {
        $userId: subscriptionData.userId,
        $subscriptionId: subscriptionData.id,
        $accessToken: subscriptionData.accessToken,
        $resource: subscriptionData.resource,
        $clientState: subscriptionData.clientState,
        $changeType: subscriptionData.changeType,
        $notificationUrl: subscriptionData.notificationUrl,
        $subscriptionExpirationDateTime: subscriptionData.expirationDateTime
      },
      callback
    );
  });
}

export function deleteSubscription(subscriptionId, callback) {
  const db = new sqlite3.Database(dbFile);
  const deleteStatement =
    'DELETE FROM Subscription WHERE ' +
    'SubscriptionId = $subscriptionId';

  db.serialize(function executeDelete() {
    db.run(
      deleteStatement,
      {
        $subscriptionId: subscriptionId
      },
      callback
    );
  });
}
