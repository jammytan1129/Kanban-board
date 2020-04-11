var assert = require('assert');

const UserGateway = require('../../gateway/user/fakeUserGateway');


describe('UserGateway', function() {
  let userGateway;  
  beforeEach(function(done) {
      userGateway = new UserGateway();
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#userGateway', () => {

    function shouldUserInfoCorrect(user) {
        assert.equal(user.name, 'Z-Xuan Hong');
        assert.equal(user.email, 'gay88358@yahoo.com.tw');
        assert.equal(user.password, 'String');
        assert.equal(user.phone, '0988628781');
    }

    it('test UserGateway find by id', function(done) {
        const id = 0;
        let result = userGateway.findUserById(id);
        result.then(user => {
            shouldUserInfoCorrect(user);
            done();
        })
    });

    it('test UserGateway find by email', function(done) {
        const email = 'gay88358@yahoo.com.tw';
        let result = userGateway.findUserByEmail(email);
        result.then(user => {
            shouldUserInfoCorrect(user);
            done();
        })
    });

    it('test UserGateway save user', function(done) {
        let userInfo = {
            name: 'Z-Xuan Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };

        let result = userGateway.saveUser(userInfo);
        result.then(user => {
            return userGateway.findUserByEmail(user.email);
        })
        .then(user => {
            shouldUserInfoCorrect(user);
            done();
        })
    });

    it('test user update info', function(done) {
        let userInfo = {
            _id: 0,
            name: 'Z-Xuan Hong',
            email: 'gay88358@yahoo.com.tw',
            password: 'String',
            phone: '0988628781'
        };

        let result = userGateway.updateUser(userInfo);
        result.then(updateResult => {
            return userGateway.findUserById(0);
        })
        .then(user => {
            assert.equal(user.name, userInfo.name);
            assert.equal(user.email, userInfo.email);
            assert.equal(user.password, userInfo.password);
            assert.equal(user.phone, userInfo.phone);
            done();
        })

    });

    it('test add boardId into user', function(done) {
        let id = 0;
        let result = userGateway.findUserById(id);
        result.then(user => {
            let boardId = 20;
            return userGateway.addBoardIdToUser(id, boardId);
        })
        .then(user => {
            assert.equal(user.board_list.length, 1);
            assert.equal(user.board_list[0], 20);
            done();
        })
    });

    it('test findUsersByIdList', function(done) {
        const idList = [0, 1, 2];
        let result = userGateway.findUsersByIdList(idList);
        result.then(users => {
            assert.equal(users.length, 3);
            done();
        });
    });
    // mongoose test
    it('test removeBoardFromUser', function(done) {
        const id = 0;
        const boardId = 20;
        let result = userGateway.findUserById(id);
        result.then(user => {
            return userGateway.addBoardIdToUser(id, boardId);
        })
        .then(user => {
            return userGateway.removeBoardFromUser(id, boardId);
        })
        .then(res => {
            return userGateway.findUserById(id);
        })
        .then(user => {
            const board = user.board_list.filter(b => b._id == boardId);
            assert.equal(board.length, 0);
            done();
        })
    });
  })  
});
