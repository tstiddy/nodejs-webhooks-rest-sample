exports.msalConfiguration = {
  //authority: 'https://login.microsoftonline.com/common',
  clientID: '48c67627-f261-458a-bf10-b356b290ae23',
  clientSecret: 'kquohJDJW297|]exQCL91=+',
  tenantID: 'e0f02755-8e4c-4128-8816-a48b19e2577b',
  //redirectUri: 'https://oauth.pstmn.io/v1/browser-callback'
};

exports.subscriptionConfiguration = {
  changeType: 'created',
  notificationUrl: 'https://teams-api-test.azurewebsites.net/',
  resource: 'communications/callRecords',
  clientState: 'secrectClientState',
  includeResourceData: false
};

exports.certificateConfiguration = {
  certificateId: 'myCertificateId',
  relativeCertPath: './certificate.pem',
  relativeKeyPath: './key.pem',
  password: 'Password123',
}; // the certificate will be generated during the first subscription creation, production solutions should rely on a certificate store
