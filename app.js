var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/addLookUp')
    .get(function(req, res) {

        var rawAddress = req.query.address,
            address = encodeURIComponent(rawAddress),
            method = 'GET',
            key1 = 'AIzaSyABzqPqDUJ_teyqNMgY1oVxyUESsvcn_so',
            key2 = 'c833fc6b098b4c2d9fbcaf1087f1ff29',
            url1 = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key1

        request(url1, function(error, response, geoData) {
            var gotGeoData = JSON.parse(geoData),
                lat = gotGeoData.results[0].geometry.location.lat,
                long = gotGeoData.results[0].geometry.location.lng,
                url2 = 'http://openstates.org/api/v1/legislators/geo/?lat=' + lat + '&long=' + long,
                options = {
                    url: url2,
                    qs: {
                        apikey: key2
                    }
                }

            request(options, function(error, response, repData) {
                var gotRepData = JSON.parse(repData);
                res.send(gotRepData)
            });
        });
    });

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


var server = app.listen(3000, function() {
    console.log(server.address().port + ' is where the magic happens');
});

module.exports = app;
