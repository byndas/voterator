'use strict';

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// configuration ===============================================================
mongoose.connect(process.env.MONGO_URI || "mongodb://" + process.env.IP + ":27017/imgsearch"); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: false
})); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views',path.join(__dirname, 'views'));

// required for passport
app.use(session({secret: 'myownsecret',
 				resave:false,
    			saveUninitialized:false
	})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'bower_components')));

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
var port     = process.env.PORT || 8080;
app.listen(port);
console.log('The magic happens on port ' + port);