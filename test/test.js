var app = require('../app')
var express = require('express');
var request = require('supertest');
var should = require('should');
var bodyParser = require('body-parser');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function shouldIncludeStackWithThisFile(err) {
  err.stack.should.match(/test\/test.js:/);
  err.stack.should.startWith(err.name + ':');
}

describe('server request(url)', function () {
    it('should be supported', function (done) {
      app = express();
      let s;
  
      app.get('/', function (req, res) {
        res.send('hello');
      });
  
      s = app.listen(function () {
        const url = 'http://localhost:' + s.address().port;
        request(url)
          .get('/')
          .expect('hello', done);
      });
    });

    describe('.end(cb)', function () {
      it('should set `this` to the test object when calling cb', function (done) {
        const app = express();
        let s;
  
        app.get('/', function (req, res) {
          res.send('hello');
        });
  
        s = app.listen(function () {
          const url = 'http://localhost:' + s.address().port;
          const test = request(url).get('/');
          test.end(function (err, res) {
            this.should.eql(test);
            done();
          });
        });
      });
    });
  });

  describe('server request(app)', function () {
    it('should work with an active server', function (done) {
      const app = express();
      let server;
  
      app.get('/', function (req, res) {
        res.send('hey');
      });
  
      server = app.listen(4000, function () {
        request(server)
          .get('/')
          .end(function (err, res) {
            res.status.should.equal(200);
            res.text.should.equal('hey');
            done();
          });
      });
    });
    it('should work with remote server', function (done) {
      const app = express();
  
      app.get('/', function (req, res) {
        res.send('hey');
      });
  
      app.listen(2333, function () {
        request('http://localhost:2333')
          .get('/')
          .end(function (err, res) {
            res.status.should.equal(200);
            res.text.should.equal('hey');
            done();
          });
      });
    });
    it('should work with .send() etc', function (done) {
      const app = express();
  
      app.use(bodyParser.json());
  
      app.post('/', function (req, res) {
        res.send(req.body.name);
      });
  
      request(app)
        .post('/')
        .send({ name: 'john' })
        .expect('john', done);
    });
    it('should default redirects to 0', function (done) {
      const app = express();
  
      app.get('/', function (req, res) {
        res.redirect('/login');
      });
  
      request(app)
        .get('/')
        .expect(302, done);
    });
    it('should handle redirects', function (done) {
      const app = express();
  
      app.get('/login', function (req, res) {
        res.end('Login');
      });
  
      app.get('/', function (req, res) {
        res.redirect('/login');
      });
  
      request(app)
        .get('/')
        .redirects(1)
        .end(function (err, res) {
          should.exist(res);
          res.status.should.be.equal(200);
          res.text.should.be.equal('Login');
          done();
        });
    });
    it('should handle socket errors', function (done) {
      const app = express();
  
      app.get('/', function (req, res) {
        res.destroy();
      });
  
      request(app)
        .get('/')
        .end(function (err) {
          should.exist(err);
          done();
        });
    });
    it('should support nested requests', function (done) {
      const app = express();
      const test = request(app);

      app.get('/', function (req, res) {
        res.send('supertest FTW!');
      });

      test
        .get('/')
        .end(function () {
          test
            .get('/')
            .end(function (err, res) {
              (err === null).should.be.true;
              res.status.should.equal(200);
              res.text.should.equal('supertest FTW!');
              done();
            });
        });
      });
      it('should include the response in the error callback', function (done) {
        const app = express();
  
        app.get('/', function (req, res) {
          res.send('whatever');
        });
  
        request(app)
          .get('/')
          .expect(function () {
            throw new Error('Some error');
          })
          .end(function (err, res) {
            should.exist(err);
            should.exist(res);
            // Duck-typing response, just in case.
            res.status.should.equal(200);
            done();
          });
      });
      it('should handle error returned when server goes down', function (done) {
        const app = express();
        let server;
  
        app.get('/', function (req, res) {
          res.end();
        });
  
        server = app.listen(function () {
          const url = 'http://localhost:' + server.address().port;
          server.close();
          request(url)
            .get('/')
            .expect(200, function (err) {
              err.should.be.an.instanceof(Error);
              return done();
            });
        });
      });  
  });