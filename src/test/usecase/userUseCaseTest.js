var assert = require('assert');

const UserGateway = require('../../gateway/user/fakeUserGateway');
const UserUseCase = require('../../usecase/userUseCase');

describe('UserUseCase', function() {
  let userGateway;  
  let userUseCase;
  beforeEach(function(done) {
      userGateway = new UserGateway();
      userUseCase = new UserUseCase();
      userUseCase.setUserGateway(userGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#userUseCase', () => {

    it('test update user info', function(done) {
        let userInfo = {
            _id: 0,
            name: 'Z-Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };

        let result = userUseCase.updateUser(userInfo);
        result.then(updateResult => {
            return userGateway.findUserById(0);
        })
        .then(user => {
            assert.equal(user.email, userInfo.email);
            assert.equal(user.name, userInfo.name);
            assert.equal(user.password, userInfo.password);
            assert.equal(user.phone, userInfo.phone);
            done();
        })
    });
    

  })  
});
