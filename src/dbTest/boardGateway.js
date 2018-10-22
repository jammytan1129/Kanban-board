var assert = require('assert');

const DBBoardGateway = require('../gateway/boardGateway/dbBoardGateway');
const Board = require('../model/board');

describe('BoardGateway', function() {
   
  let boardGateway;
  let board;
  beforeEach(function(done) {
    board = new Board('trello');
    boardGateway = new DBBoardGateway();
    done();
  });
  
  afterEach(function(done) {
    done();
  });
  
  describe('#BoardGateway', () => {    
    it('test find no board', function(done){
        let result = boardGateway.find(-100);
        result.then(board => {
            assert.equal(board, null);
            done();
        })
    });

    it('test insert and find', function(done) {
        let result = boardGateway.insert(board);
        result
        .then(insertedBoard => {
            assert.equal(insertedBoard.boardName(), board.boardName());
            assert.equal(insertedBoard.id(), board.id());
            return boardGateway.find(insertedBoard.id());
        })
        .then(findedBoard => {
            console.log(findedBoard);
            assert.equal(findedBoard.boardName(), board.boardName());
            assert.equal(findedBoard.id(), board.id());
            done();
        });
    });

    it('delete board', function(done) {
        let result = boardGateway.insert(board);
        result
        .then(insertedBoard => {
            return boardGateway.delete(insertedBoard.id());
        })
        .then(deletedResult => {
            assert.equal(deletedResult.affectedRows, 1);
            done();
        })
    });

    it('update board', function(done) {
        let result = boardGateway.insert(board);
        result
        .then(insertedBoard => {
            insertedBoard.setBoardName('this is set board name');
            return boardGateway.update(board);
        })
        .then(updateResult => {
            return boardGateway.find(board.id());
        })
        .then(finalBoard => {
            assert.equal(finalBoard.boardName(), 'this is set board name');
            done();
        })
    });
  })
});
