var assert = require('assert');

const UserGateway = require('../../gateway/user/userGateway');
const Database = require('../../db/database');
const User = require('../../mongoModel/user');

describe('BoardGateway', function() {
  let database;

  before(function(done) {
    database = new Database();
    database.connect()
        .then(connectResult => {
            console.log(connectResult);
            done();
        });
  });

  after(function(done) {
      done();
  });

  let userGateway;
  beforeEach(function(done) {
      userGateway = new UserGateway();
      User.collection.drop(function() {
        done();
      });
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#userGateway', () => {

    function createUserData() {
        return {
            name: 'name',
            email: 'eeee',
        };
    }

    it('test save user and find by user id', function(done) {
        let result = userGateway.saveUser(createUserData());
        result.then(user => {
            return userGateway.findUserById(user._id);
        })
        .then(user => {
            assert.equal(user.email, 'eeee');
            assert.equal(user.name, 'name');
            done();
        })
    });

    it('test save user and find by user email', function(done) {
        let result = userGateway.saveUser(createUserData());
        result.then(user => {
            return userGateway.findUserByEmail(user.email);
        })
        .then(user => {
            assert.equal(user.email, 'eeee');
            assert.equal(user.name, 'name');
            done();
        })
    });

    it('test update user info', function(done) {
        let result = userGateway.saveUser(createUserData());
        result.then(user => {
            user.email = 'gay88358@yahoo.com.tw';
            return userGateway.updateUser(user);
        })
        .then(updateResult => {
            return userGateway.findUserByEmail('gay88358@yahoo.com.tw');
        })
        .then(user => {
            assert.equal(user.email, 'gay88358@yahoo.com.tw');
            done();
        })
    });

    it('test add board id to user', function(done) {
        let result = userGateway.saveUser(createUserData());
        result.then(user => {
            return userGateway.addBoardIdToUser(user._id, 0);
        })
        .then(user => {
            return userGateway.findUserById(user._id);
        })
        .then(user => {
            assert.equal(user.board_list[0].boardFk,  0);
            done();
        })

    });
  })  
});