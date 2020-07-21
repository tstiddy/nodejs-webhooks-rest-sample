import { ConfidentialClientApplication } from '@azure/msal-node';

import { msalConfiguration } from '../constants';

const resource = 'https://graph.microsoft.com/';

/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentication can be completed.
 */
export function getAuthUrl() {
  return msalConfiguration.authority + '/oauth2/authorize'
    + '?client_id=' + msalConfiguration.clientID
    + '&response_type=code'
    + '&redirect_uri=' + msalConfiguration.redirectUri;
}

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {AcquireTokenCallback} callback The callback function.
 */
export function getTokenFromCode(code) {
  const authContext = new ConfidentialClientApplication(msalConfiguration.authority);
  return new Promise((resolve, reject) => {
    authContext.acquireTokenWithAuthorizationCode(
      code,
      msalConfiguration.redirectUri,
      resource,
      msalConfiguration.clientID,
      msalConfiguration.clientSecret,
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function getAppOnlyToken() {
  const authContext = new AuthenticationContext(msalConfiguration.authority.replace('common', msalConfiguration.tenantID));
  return new Promise((resolve, reject) => {
    authContext.acquireTokenWithClientCredentials(resource, msalConfiguration.clientID, msalConfiguration.clientSecret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}
