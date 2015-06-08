var express    = require('express');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var deserts    = require('./routes/desserts');
var mongodb    = process.env.MONGOLAB_URI || 'mongodb://localhost/nutrition';
var app        = express();

mongoose.connection.on('connected', function () {
  console.log('database connection successful');
});

mongoose.connection.on('error', function () {
  console.log('database connection failed');
});

mongoose.connect(mongodb);

app.set('port', (process.env.PORT || 3000));

if(process.env.NODE_ENV === 'development') {
  // allow CORS
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
} else if(process.env.NODE_ENV === 'production') {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://danielnagy.me');
    next();
  });
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/nutriton/desserts', deserts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(app.get('port'), function () {
  console.log('listening on port', app.get('port'));
});