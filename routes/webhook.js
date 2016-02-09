var express = require('express');
var router = express.Router();

/* Listen to Office 365 events. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
