var assert = require('assert');

const UserGateway = require('../../gateway/user/fakeUserGateway');
const RegisterUseCase = require('../../usecase/registerUseCase');

describe('UserGateway', function() {
  let userGateway;  
  let registerUseCase;
  beforeEach(function(done) {
      userGateway = new UserGateway();
      registerUseCase = new RegisterUseCase();
      registerUseCase.setUserGateway(userGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#registerUseCase', () => {

    function shouldUserInfoCorrect(user) {
        assert.equal(user.name, 'Z-Xuan Hong');
        assert.equal(user.email, 'gay88358@yahoo.com.tw');
        assert.equal(user.password, 'String');
        assert.equal(user.phone, '0988628781');
    }

    it('test find user by id', function(done) {
        const id = 0;
        const result = registerUseCase.findUserById(id);
        result.then(user => {
            shouldUserInfoCorrect(user);
            done();
        });
    });


    it('test find user by email', function(done) {
        const email = 'gay88358@yahoo.com.tw';
        const result = registerUseCase.findUserByEmail(email);
        result.then(user => {
            shouldUserInfoCorrect(user);
            done();
        });
    });

    it('test save user', function(done) {
        let userInfo = {
            name: 'Z-Xuan Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };

        let result = registerUseCase.saveUser(userInfo);
        result.then(user => {
            return registerUseCase.findUserByEmail(user.email);
        })
        .then(user => {
            shouldUserInfoCorrect(user);
            done();
        })
    });

    it('test register user', function(done) {
        let userInfo = {
            name: 'Z-Xuan Hong',
            email: 'gay123@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };
        let result = registerUseCase.registerUser(userInfo);
        result.then(user => {
            assert.equal(user.name, 'Z-Xuan Hong');
            assert.equal(user.email, 'gay123@yahoo.com.tw');
            assert.equal(user.password, 'String');
            assert.equal(user.phone, '0988628781');
            done();
        })
    });

    it('test register user duplicate', function(done) {
        let userInfo = {
            name: 'Z-Xuan Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };
        let result = registerUseCase.registerUser(userInfo);
        result
        .catch(err => {
            const expectedErrorMessage = 'Email Can Not Duplicate';
            assert.equal(err.message, expectedErrorMessage);
            done();
        })
    });
  })  
});
