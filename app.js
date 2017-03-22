var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    mongoose = require('mongoose'),
    User = require('./models/user-model'),
    Env = require('./env/env'),
    site = require('./routes/site'),
    middleware = require('./middleware/middleware'),
    app = express();

var dbConnStr = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/pinterest';
var port = process.env.PORT || 8000;
// Connect mongoose to db
mongoose.connect(dbConnStr, function(err) {
    if (err) throw err;
    console.log('Connected to mongodb');
});

// Length of cache for static files
var oneDay = 86400000;

// static files
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
// parse body for POST sent by user
app.use(bodyParser.urlencoded({ extended: true }));
// views
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
// helmet for security
app.use(helmet());
// Parsing and session middleware
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'Super Sekret Password',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay
    }
}));
app.use(middleware.getLoginSession);

var twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY || Env.env.twitterConsumerKey,
    twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET || Env.env.twitterConsumerSecret,
    twitterCallbackURL = process.env.TWITTER_CB_URL || "http://localhost:8000/auth/twitter/callback";

passport.use(new TwitterStrategy({
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callbackURL: twitterCallbackURL
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({ twitterId: profile.id, username: profile.username }, function(err, user) {
            if (err) { return done(err) };
            done(null, user);
        });
    }
));

// Configure passport authenticated session persistence
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Initialize passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Home page
app.get('/', site.index);

// Login with twitter
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter redirects user here after approval
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                        failureRedirect: '/' }));

// start the server
var server = app.listen(port, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
