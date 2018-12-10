const config = require('../config/config');
const mongoose = require('mongoose');

module.exports = class Database {
    constructor() {

    }
    
    createConnectPromise() {
        return new Promise((resolve, reject) => {
            mongoose.connect(config.mongoose.url, { useNewUrlParser: true })
            mongoose.connection.once('open', function() {
                resolve('connect to mongooseDB successfully');
            }).on('error', function(err) {
                reject('error');
            });
        });
    }

    async connect() {
        const connectResult = await this.createConnectPromise();
        return connectResult;
    }
}