const config = require('../config/config');

const mongoose = require('mongoose');

mongoose.connect(config.mongoose.url, { useNewUrlParser: true })

mongoose.connection.once('open', function() {
  console.log('connect to mongooseDB successfully');
}).on('error', function(err) {
  console.log(err.message);
});

module.exports = mongoose;
    



