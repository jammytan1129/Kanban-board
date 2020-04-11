const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const config = require('./config/config');
var path = require('path');
const passportSetup = require('./config/passport-setup'); 
var passport = require('passport');
var session = require('express-session');
var socket = require('socket.io');

var mongoose = require('./db/mongoose');

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public' ));

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

var server = app.listen(config.port, "127.0.0.1", function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started at http://%s:%s', host, port);
    // console.log(`Server started on port ${config.port}`);
});
// socket io setUp
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection');
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
});





