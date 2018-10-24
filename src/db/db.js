const mysql = require('mysql');
const config = require('../config/config');



module.exports = class Database {
  constructor() {
      this._connection = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
      });
  }

  connectionPromise() {
    let connection = this._connection;
    return new Promise((resolve, reject) => {
        connection.connect(function(err) {
          if (err) {
            reject(err.stack);
          }
          resolve(connection.threadId)
        });
    });
  }

  async connection() {
    let threadId = await this.connectionPromise();
    return threadId;
  }

  queryPromise(sql) {
    let connection = this._connection;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
              reject(err);
            resolve(result);
        });
    });  
  }

  async query(sql) {
    let result = this.queryPromise(sql);
    return result;
  }

  closePromise() {
    let connection = this._connection;
    return new Promise((resolve, reject) => {
        connection.end(err => {
            if (err)
              reject(err);
            resolve('close');
        });
    });
  }

  async close() {
    let closeResult = await this.closePromise();
    return closeResult;
  }
};
