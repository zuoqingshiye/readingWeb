var express = require('express');
var router = express.Router();

/* GET marker listing. */
router.get('/', function (req, res, next) {
  res.render('myAccount/myAccount', { list: ['My Order', 'My Product'] });
});

module.exports = router;
