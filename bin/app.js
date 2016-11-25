// Load Setting
var configApp = require('../config/app');

// Load Modules
var express = require('express');
var debug = require('debug')(`${configApp.name}:server`);
var http = require('http');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');

// Init App Express
var app = express();

// View Engine Setup
app.engine("hbs", hbs.express4({
  partialsDir: path.join(__dirname, "../views/partials"),
  layoutsDir: path.join(__dirname, "../views/layouts")
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use('/src', express.static('public'));
app.use('/module', express.static('node_modules'));

// Favicon
app.use(favicon(path.join(__dirname, '../public', 'favicon/favicon.png')));

// Logger
app.use(logger('dev'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Cookie Parser
app.use(cookieParser());

// Setup Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Create Modules Loader
var module = {
  app: app,
  path: path,
  fs: fs,
  hbs: hbs
}

// Helper
var helper = require('./helper');
helper.init(module);

// Middleware
var middleware = require('./middleware');
middleware.init(module);

// Controller
var controller = require('./controller');
controller.init(module);

// Error Handler 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('error/404', {
    error: err
  });
});

// Development Error Handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production Error Handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/500', {
    message: err.message,
    error: {}
  });
});

// Set Port
app.set('port', configApp.port);

// Create HTTP Server
var server = http.createServer(app);

// Listen on Provided Port
server.listen(configApp.port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "Error"
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event Listener for HTTP Server "Listening"
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`Aplication : ${configApp.fullname}`);
  console.log(`Versi : ${configApp.versi}`);
  console.log(`Listening on : localhost:${configApp.port}`);
}