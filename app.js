var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks')

var app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure(path.resolve(__dirname, './templates'), {
  autoescape: true,
  express: app,
  noCache: true,
})

app.set('view engine', 'html')

var index = require('./routes/index');
var marker = require('./routes/marker');
var myAccount = require('./routes/myAccount');

app.use('/', index);
app.use('/marker', marker);
app.use('/myAccount', myAccount);

const run = (port = 3000, host = '') => {

  const server = app.listen(port, host, () => {

    const address = server.address()
    host = address.address
    port = address.port
    console.log(`listening server at http://${host}:${port}`)
  })
}

if (require.main === module) {
  const port = 3000

  const host = '0.0.0.0'
  run(port, host)
}
