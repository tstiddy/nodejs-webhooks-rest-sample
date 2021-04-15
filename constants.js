exports.msalConfiguration = {
  authority: 'https://login.microsoftonline.com/common',
  clientID: 'c1f79ce2-1eae-4816-8fa8-387924c66c22',
  clientSecret: 'B-q7HwblM4mPPDLXP9_VGM~Qij526uU~8K',
  tenantID: 'e0f02755-8e4c-4128-8816-a48b19e2577b',
  redirectUri: 'http://localhost:3000/callback'
};

exports.subscriptionConfiguration = {
  changeType: 'Created',
  notificationUrl: 'https://NGROK_ID.ngrok.io/listen',
  resource: 'me/mailFolders(\'Inbox\')/messages',
  clientState: 'cLIENTsTATEfORvALIDATION',
  includeResourceData: false
};

exports.certificateConfiguration = {
  certificateId: 'myCertificateId',
  relativeCertPath: './certificate.pem',
  relativeKeyPath: './key.pem',
  password: 'Password123',
}; // the certificate will be generated during the first subscription creation, production solutions should rely on a certificate store
