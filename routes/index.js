var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index/index', { title: 'Express' });
});


/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('index/login', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function (req, res, next) {
  res.render('index/register', { title: 'Express' });
});

module.exports = router;
