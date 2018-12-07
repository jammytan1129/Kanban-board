var assert = require('assert');


const Database = require('../db/database');

const User = require('../mongoModel/user');

describe('User', function() {
  let database;
  before(function(done) {
    database = new Database();
    database.connect()
        .then(connectResult => {
            console.log(connectResult);
            done();
        })  
  })

  after(function(done) {
    done();
  })

  beforeEach(function(done) {
    User.collection.drop(function() {
        console.log('drop user collections');
        done();
    });
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#User schema', () => {
    it('insert user and find user', function(done) {
        const user = new User({
            name: 'name',
            email: 'eeee',
        });
        user.save()
          .then(user => {
              return User.findOne({'email': user.email});  
          })
          .then(user => {
              assert.equal(user.name, 'name');
              assert.equal(user.email, 'eeee');
              done();
          })
    });


  })  
});
