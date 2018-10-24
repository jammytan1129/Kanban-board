var assert = require('assert');

const DBUserGateway = require('../gateway/userGateway/dbUserGateway');
const User = require('../model/user');
const Database = require('../db/db');

describe('TodoGateway', function() {
  
  let userGateway;
  let user;  

  class FakeUserGateway extends DBUserGateway {
    constructor(database) {
        super(database);
    }

    hashingPassword(password) {
        return password;
    }
  };

  function createUser() {
    let user = new User('my card');
    user.setEmail('gay88358@yahoo.com.tw');
    user.setPassword('1234');
    return user;
  }

  beforeEach(function(done) {
    user = createUser();

    userGateway = new FakeUserGateway(new Database);


    let result = userGateway.connection();
    result.then(threadId => {
        return userGateway.clearAll();
    })
    .then(result => {
        done();
    })
  });
  
  afterEach(function(done) {
    let result = userGateway.close();
    result.then(closeResult => {
        done();
    })
  });
  
  describe('#UserGateway', () => { 

    it('insert a user', (done) => {
        let result = userGateway.insert(user);
        result.then(insertedUser => {
            assert.equal(insertedUser.email(), user.email());
            assert.equal(insertedUser.password(), user.password());
            done();
        });
    });

    it('find user with password and email', (done) => {
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            return userGateway.find(insertedUser.email());
        })
        .then(targetUser => {
            console.log(targetUser);
            assert.equal(targetUser.email(), user.email());
            assert.equal(targetUser.password(), user.password());
            done();
        })
    });

    it('insert duplicate user', function(done) {
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            return userGateway.insert(user);
        })
        .catch(err => {
            assert.equal(err.message, 'EMAIL CAN NOT DUPLICATE!');
            done();
        })
    });

    it('find null user', function(done) {
        let result = userGateway.find('-12123');
        result.then(user => {
            assert.equal(user, null);
            done();
        });
    });

    it('update user', function(done) {
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            insertedUser.setEmail('1234');
            return userGateway.update(insertedUser);
        })
        .then(updateResult => {
            assert.equal(updateResult.affectedRows, 1);
            done();
        })
    });

  })
  
});
