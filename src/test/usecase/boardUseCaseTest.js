var assert = require('assert');

const BoardGateway = require('../../gateway/board/fakeBoardGateway');
const UserGateway = require('../../gateway/user/fakeUserGateway');
const BoardUseCase = require('../../usecase/boardCRUDUseCase');

describe('BoardUseCase', function() {
  let boardGateway;  
  let boardUseCase;
  let userGateway;
  beforeEach(function(done) {
      userGateway = new UserGateway();
      boardGateway = new BoardGateway();
      boardUseCase = new BoardUseCase();
      boardUseCase.setBoardGateway(boardGateway);
      boardUseCase.setUserGateway(userGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#boardUseCase', () => {
    it('test find board by id', function(done) {
        let id = 0;
        let result = boardUseCase.findBoardById(id);
        result.then(board => {
            assert.equal(board.name, 'title');
            assert.equal(board.background_url, 'https://google.com.tw');
            done();
        })
    });

    it('test find boards by boardIdList', function(done) {
        let id = [0, 1, 2];
        let result = boardUseCase.findBoardsByIdList(id);
        result.then(boards => {
            assert.equal(boards.length, 3);
            done();
        })
    });

    it('test createBoard', function(done) {
        let inputData = {
            boardName: 'myBoard',
            userId: 0
        };
        let tempBoard;
        let result = boardUseCase.createBoard(inputData);
        result.then(board => {
            tempBoard = board;
            assert.equal(board.members[0], 0);
            return userGateway.findUserById(board.members[0]);
        })
        .then(user => {
            assert.equal(user.board_list[0], tempBoard._id);
            done();
        })
    });

  })  
});
