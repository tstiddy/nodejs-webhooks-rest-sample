var assert = require('assert');
var conf = require('../constants');

describe('ADAL', function () { // eslint-disable-line no-undef
  it( // eslint-disable-line no-undef
    'Checking clientID and clientSecret in constants.js',
    function () {
      assert(
        isADALConfigured(conf.adalConfiguration),
        '\nRegister client ID and client secret in file constants.js.\n' +
        'You don\'t have them? Get them by using the Office 365 app registration tool\n' +
        'http://dev.office.com/app-registration'
      );
    }
  );
});

describe('NotificationURL', function () { // eslint-disable-line no-undef
  it('Checking notificationUrl in constants.js', function () { // eslint-disable-line no-undef
    assert(
      isSubscriptionConfigured(conf.subscriptionConfiguration),
      '\nConfigure the notification URL in file constants.js.\n' +
      'Install ngrok from https://ngrok.com/download and run\n' +
      '\tngrok http 3000\n' +
      'Use the https public URL in the notificationUrl property.'
    );
  });
});

function isADALConfigured(configuration) {
  var clientIDConfigured =
    typeof(configuration.clientID) !== 'undefined' &&
    configuration.clientID !== null &&
    configuration.clientID !== '' &&
    configuration.clientID !== 'ENTER_YOUR_CLIENT_ID';
  var clientSecretConfigured =
    typeof(configuration.clientSecret) !== 'undefined' &&
    configuration.clientSecret !== null &&
    configuration.clientSecret !== '' &&
    configuration.clientSecret !== 'ENTER_YOUR_SECRET';

  return clientIDConfigured && clientSecretConfigured;
}

function isSubscriptionConfigured(configuration) {
  var notificationURLConfigured =
    typeof(configuration.notificationUrl) !== 'undefined' &&
    configuration.notificationUrl !== null &&
    configuration.notificationUrl !== '' &&
    configuration.notificationUrl !== 'ENTER_YOUR_NOTIFICATION_URL';

  return notificationURLConfigured;
}
