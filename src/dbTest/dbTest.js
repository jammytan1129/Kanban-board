var assert = require('assert');
const DBConnection = require('../db/db');

describe('TodoGateway', function() {
  
  let database;
  
  beforeEach(function(done) {
      database = new DBConnection();
      let result = database.connection();
      result.then(threadId => {
        done();
      })
  });
  
  afterEach(function(done) {
    let result = database.close();
    result.then(closeResult => {
        done();
    });
  });
  
  describe('#Database', () => {    
    it('test connection and close', (done) => {
        done();
    });
    
    it('test database query', (done) => {
        let sql = 'select * from item';
        let result = database.query(sql);
        result.then(rows => {
            console.log(rows);
            done();
        })
    })
  })
});
