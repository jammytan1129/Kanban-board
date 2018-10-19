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

  connection() {
      let connection = this._connection;
      return new Promise((resolve, reject) => {
          connection.connect(function(err) {
            if (err) {
              reject(err.stack);
            }
            console.log('connected as id ' + connection.threadId);
            resolve(connection.threadId)
          });
      });
  }

  query(sql) {
      let connection = this._connection;
      return new Promise((resolve, reject) => {
          connection.query(sql, (err, result) => {
              if (err)
                reject(err);
              resolve(result);
          });
      });  
  }

  close() {
      let connection = this._connection;
      return new Promise((resolve, reject) => {
          connection.end(err => {
              if (err)
                reject(err);
              resolve('close');
          });
      });
  }
};
