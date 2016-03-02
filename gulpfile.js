/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber');

gulp.task('develop', function () {
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  });
});

gulp.task('default', [
  'develop'
]);
