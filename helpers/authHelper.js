/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { AuthenticationContext } from 'adal-node';
import { adalConfiguration } from '../constants';

const resource = 'https://graph.microsoft.com/';

/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentication can be completed.
 */
export function getAuthUrl() {
  return adalConfiguration.authority + '/oauth2/authorize' +
    '?client_id=' + adalConfiguration.clientID +
    '&response_type=code' +
    '&redirect_uri=' + adalConfiguration.redirectUri;
}

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {string} res A URI that identifies the resource for which the token is valid.
 * @param {AcquireTokenCallback} callback The callback function.
 */
export function getTokenFromCode(code, callback) {
  const authContext = new AuthenticationContext(adalConfiguration.authority);
  authContext.acquireTokenWithAuthorizationCode(
    code,
    adalConfiguration.redirectUri,
    resource,
    adalConfiguration.clientID,
    adalConfiguration.clientSecret,
    (error, token) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, token);
      }
    }
  );
}
