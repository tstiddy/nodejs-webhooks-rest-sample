import express from 'express';

import { getSubscription, saveSubscription, deleteSubscription } from '../helpers/dbHelper';
import { getAuthUrl, getTokenFromCode } from '../helpers/authHelper';
import { SubscriptionManagementService } from '../helpers/requestHelper';
import { subscriptionConfiguration, certificateConfiguration } from '../constants';
import { getSerializedCertificate, createSelfSignedCertificateIfNotExists } from '../helpers/certificateHelper';

export const authRouter = express.Router();

// Redirect to start page
authRouter.get('/', (req, res) => {
  res.redirect('/index.html');
});

// Start authentication flow
authRouter.get('/signin', (req, res) => {
  res.redirect(getAuthUrl());
});

// This route gets called at the end of the authentication flow.
// It requests the subscription from Office 365, stores the subscription in a database,
// and redirects the browser to the home page.
authRouter.get('/callback', (req, res, next) => {
  getTokenFromCode(req.query.code, async (authenticationError, token) => {
    if (token) {
      // Request this subscription to expire one hour from now.
      // Note: 1 hour = 3600000 milliseconds
      subscriptionConfiguration.expirationDateTime = new Date(Date.now() + 3600000).toISOString();

      try {
        const subscriptionService = new SubscriptionManagementService(token.accessToken);
        if (subscriptionConfiguration.includeResourceData) {
          // we're registering a subscription for notifications with resource data and must attach certificate information to get the data
          await createSelfSignedCertificateIfNotExists(certificateConfiguration.relativeCertPath, certificateConfiguration.relativeKeyPath, certificateConfiguration.password);
          subscriptionConfiguration.encryptionCertificate = getSerializedCertificate(certificateConfiguration.relativeCertPath);
          subscriptionConfiguration.encryptionCertificateId = certificateConfiguration.certificateId;
        }
        const subscriptionData = await subscriptionService.createSubscription(subscriptionConfiguration);

        subscriptionData.userId = token.userId;
        subscriptionData.accessToken = token.accessToken;
        saveSubscription(subscriptionData, null);
        // The name of the property coming from the service might change from
        // subscriptionId to id in the near future.
        res.redirect(
          '/home.html?subscriptionId=' + subscriptionData.id
          + '&userId=' + subscriptionData.userId
        );
      } catch (requestError) {
        res.status(500);
        next(requestError);
      }
    } else if (authenticationError) {
      res.status(500);
      next(authenticationError);
    }
  });
});

// This route signs out the users by performing these tasks
// Delete the subscription data from the database
// Redirect the browser to the logout endpoint.
authRouter.get('/signout/:subscriptionId', (req, res) => {
  const redirectUri = `${req.protocol}://${req.hostname}:${req.app.settings.port}`;

  // Delete the subscription from Microsoft Graph
  getSubscription(req.params.subscriptionId, async (dbError, subscriptionData, next) => {
    try {
      const subscriptionService = new SubscriptionManagementService(subscriptionData.accessToken);
      await subscriptionService.deleteSubscription(req.params.subscriptionId);

      deleteSubscription(req.params.subscriptionId, null);
      res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
    } catch (requestError) {
      res.status(500);
      next(requestError);
    }
  });
});
