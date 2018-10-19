var assert = require('assert');

const RegisterUseCase = require('../usecase/registerUseCase');
const UserDataGateway = require('../gateway/userGateway/inMemoryUserGateway');

describe('Card', function() {
  let registerUseCase;
  let userGateway;
  let registerUserStructure;
  beforeEach(function(done) {
    registerUserStructure = {
        email: 'xxx@yahoo.com.tw',
        password: '1234'
    };
    userGateway = new UserDataGateway();
    registerUseCase = new RegisterUseCase(userGateway);
    console.log('global setup');
    done();
  });
  
  afterEach(function(done) {
    console.log('global teardown');
    userGateway.clearAll();
    done();
  });
  
  describe('#registerUseCase', () => {
    it('test inmemory isEmailDuplicate', function(done) {
        let user = registerUseCase.createUser(registerUserStructure);
        let result = userGateway.insert(user);
        result.then(insertedUser => {
            assert.equal(true, userGateway.isEmailDuplicate(insertedUser));
            done();
        })
    });

    it('test inmemory DataGateway', function(done) {
        let user = registerUseCase.createUser(registerUserStructure);
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            return userGateway.find(insertedUser.id());
        })
        .then(findedUser => {
            assert.equal(findedUser.email(), 'xxx@yahoo.com.tw');
            assert.equal(findedUser.password(), '1234');
            done();
        });
    });

    it('test inmemory update', function(done) {
        let user = registerUseCase.createUser(registerUserStructure);
        let result = userGateway.insert(user);
        result
        .then(insertedUser => {
            insertedUser.setEmail('1234');
            return userGateway.update(insertedUser);
        })
        .then(updateResult => {
            return userGateway.find(user.id());
        })
        .then(finalUser => {
            assert.equal(finalUser.email(), '1234');
            assert.equal(finalUser.password(), '1234');
            done();
        })
    });

    it('test User constructor', function() {
        let user = registerUseCase.createUser(registerUserStructure);
        assert.equal(user.email(), 'xxx@yahoo.com.tw');
        assert.equal(user.password(), '1234');
    });

    it('test invalid register', function(done) {
        let registeredUser = registerUseCase.registerUser(registerUserStructure);
        registeredUser
        .then(insertedUser => {
            console.log(insertedUser);
            return registerUseCase.registerUser(registerUserStructure)
        })
        .catch(err => {
            console.log(err.message);
            done();
        })
    });


    it('test register user', function(done) {
        let registeredUser = registerUseCase.registerUser(registerUserStructure);
        registeredUser.then(user => {
            return userGateway.find(user.id());
        })
        .then(finalUser => {
            assert.equal(finalUser.id(), 0);
            assert.equal(finalUser.email(), registerUserStructure.email);
            assert.equal(finalUser.password(), registerUserStructure.password);
            done();
        })
    });
  })

  // describe('#item state', ()=> {
  //   it('set isDone', function() {
  //     assert.equal(item.isDone(), false);
  //     item.markDone();
  //     assert.equal(item.isDone(), true);
  //   });
  
  // })
  
});
