var assert = require('assert');

const User = require('../model/user');

describe('User', function() {
  let user;
  beforeEach(function() {
    user = new User();
  });


  
  afterEach(function() {
  });
  
  describe('#user', () => {
    it('test user constructor', function() {
      user.setId(100);
      assert.equal(user.id(), 100);
    });
    
    it('test user email setter and getter', () => {
      user.setEmail('xxx');
      assert.equal(user.email(), 'xxx');
    });

    it('test user password getter ans setter', () => {
      user.setPassword('123');
      assert.equal(user.password(), '123');
    });
  })
  
});
