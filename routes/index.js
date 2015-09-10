var express = require('express');
var router = express.Router();

/* GET random data. */
router.get('/data', function(req, res, next) {
  res.json([{ foo: 'bar' }]);
});

module.exports = router;
