'use strict'

var express = require('express')
var helpers = require('express-helpers')
var bodyParser = require('body-parser')
var searcher = require('./modules/searcher')
var fs = require('fs')
var SwaggerExpress = require('swagger-express-mw')

var app = express()

var config = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)
})

global.__base = __dirname + '/'

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

console.log('setting helpers')
helpers(app)

app.get('/', function (req, res) {
  var params = {}
  params.title = 'Whatsclose.io'

  searcher.getAllStyles()
    .then(function (data) {
      params.styles = data
      res.render('index', params)
    }, function (error) {
      console.log('error: %s', error)

      res.render('index', params)
    })
})

var router = require('./api/api.band.js')

app.use('/api', router)

app.get('/bandSearch', function (req, res) {
  searcher.search(req.query)
    .then(function (data) {
      res.send(data)
    }, function (err) {
      console.log(err)
      res.status(500).send(err)
    })
})

module.exports.startServer = function (port, isHttp, hostname) {
  if (hostname === undefined) {
    hostname = '0.0.0.0'
  }

  var server
  if (isHttp) {
    var transport = require('http')
    server = transport.createServer(app)
  } else {
    console.log('https')
    transport = require('https')
    var options = {
      key: fs.readFileSync('etc/ssl/whatsclose.key'),
      cert: fs.readFileSync('etc/ssl/whatsclose.crt')
    }
    server = transport.createServer(options, app)
  }

  server.listen(port, hostname, function () {
    console.log('listening on *: %s %s', hostname, port)
  })
}
