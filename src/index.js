const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
global.mongoose = require("mongoose");
const mongo = require('./database');

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

const MongoStore = require('connect-mongo');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        // sameSite: true,
        // maxAge: 3600000,
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
}));


const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
app.set('view engine', 'ejs');
app.get('/error', (req, res) => res.send("error logging in"));
app.use(require('./routes'));

const { isAuthenticated } = require('./utils');
app.get('/', isAuthenticated,
    function (req, res) {
        res.redirect('link_form');
    });

app.get('/login', function (req, res) {
    res.render('pages/auth');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
