exports.adalConfiguration={
  authority: 'https://login.microsoftonline.com/common',
  clientID: '7af953ad-6954-4460-b50b-fcb5af180ad5',
  clientSecret: 'iVTIcy+XQDlBlKcUX/qdC3GW6DX8CnuukdMwKid1rkM=',
  redirectUri: 'http://localhost:3000/callback'
};

exports.subscriptionConfiguration = {
  changeType: 'Created',
  notificationUrl: 'https://1fc2e786.ngrok.io/listen',
  resource: 'me/messages',
  clientState: 'cLIENTsTATEfORvALIDATION'
};
