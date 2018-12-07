var assert = require('assert');

const BoardGateway = require('../../gateway/board/fakeBoardGateway');


describe('UserGateway', function() {
  let boardGateway;  
  beforeEach(function(done) {
      boardGateway = new BoardGateway();
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#boardGateway', () => {

    function shouldBoardInfoCorrect(board) {
        assert.equal(board.name, 'title');
        assert.equal(board.background_url, 'https://google.com.tw');
    }

    it('test find by id', function(done) {
        let id = 0;
        let result = boardGateway.findBoardById(id);
        result.then(board => {
            shouldBoardInfoCorrect(board);
            done();
        })
    });

    it('test find boards by boardId_list', function(done) {
        let boardId_list = [0, 1, 2, 3];
        let result = boardGateway.findBoardsByBoardIdList(boardId_list);
        result.then(boards => {
            assert.equal(boards.length, 4);
            done();
        })
    });

    it('test create board', function(done) {
        let inputData = {
            boardName: 'myBoard',
            userId: 0
        }

        let result = boardGateway.createBoard(inputData);
        result.then(board => {
            assert.equal(board.name, 'myBoard');
            assert.equal(board.members.length, 1);
            done();
        })
    });
    

  })  
});
