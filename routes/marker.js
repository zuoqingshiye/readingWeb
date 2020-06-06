var express = require('express');
var router = express.Router();

/* GET marker listing. */
router.get('/', function (req, res, next) {
  res.render('marker/marker', { list: ['PC Games', 'PS4 Games', 'XBOX Games', 'Nintendo Games', 'VR Games'] });
});

router.get('/product/:id', function (req, res, next) {
  res.render('marker/product', { title: 'Express' });
});

module.exports = router;
