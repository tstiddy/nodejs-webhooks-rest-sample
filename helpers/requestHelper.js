/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var https = require('https');

/**
 * Generates a POST request (of Content-type ```application/json```)
 * @param {string} host the host to whom this request will be sent
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the authorization token with which the request should be signed
 * @param {string} postData the data which will be 'POST'ed
 * @param {callback} callback
 */
function postData(host, path, token, postData, callback) {
  var outHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
    'Content-Length': postData.length
  };
  var options = {
    host: host,
    path: path,
    method: 'POST',
    headers: outHeaders
  };
  
  // Set up the request
  var post = https.request(options, function (res) {
    res.on('data', function (subscriptionData) {
      callback(null, JSON.parse(subscriptionData));
    });
  });
  
  // write the outbound data to it
  post.write(postData);
  // we're done!
  post.end();

  post.on('error', function (error) {
    callback(error, null);
  });
}

function getData (host, path, token, callback) {
  var outHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=false',
    'Authorization': 'Bearer ' + token
  };
  var options = {
    host: host,
    path: path,
    method: 'GET',
    headers: outHeaders
  };
  
  // Set up the request
  var get = https.request(options, function (res) {
    res.on('data', function (endpointData) {
      callback(null, JSON.parse(endpointData));
    });
  });
  
  // we're done!
  get.end();

  get.on('error', function (error) {
    callback(error, null);
  });
    
}

exports.postData = postData;
exports.getData = getData;
