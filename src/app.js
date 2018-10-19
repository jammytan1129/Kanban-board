const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const config = require('./config/config');



const passportSetup = require('./config/passport-setup'); 
var passport = require('passport');
var session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({ 
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json());
require('./router/router')(app);

app.listen(config.port, function() {
    console.log(`Server started on port ${config.port}`);
})
