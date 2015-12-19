var express = require('express');

var path = require('path');

var logger = require('morgan');

var bodyParser = require('body-parser');

var contents = require('./routes/contents');

var thumbnails = require('./routes/thumbnails');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/contents', contents);

app.use('/thumbnails', thumbnails);

// catch 404 and forward to errorhandler 

app.use(function (req, res, next) {

    var err = new Error('Not Found');

    err.status = 404;

    next(err);

});

// errorhandlers

if (app.get('env') === 'development') {

    app.use(function (err, req, res, next) {

        res.status(err.status || 500);

        res.render('error', {message: err.message, error: err });

    });

}

app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    res.render('error', { message: err.message, error: {} });

});

module.exports = app;