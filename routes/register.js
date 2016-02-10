var express = require('express');
var router = express.Router();

/* GET page to register webhook endpoint. */

router.get('/', function(req, res) {
  res.render('register', { title: 'Register Webhooks Endpoint' });
});

module.exports = router;
