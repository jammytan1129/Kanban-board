var assert = require('assert');

const BoardGateway = require('../../gateway/board/boardGateway');
const Database = require('../../db/database');
const Board = require('../../mongoModel/board');

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

  let boardGateway;
  beforeEach(function(done) {
      boardGateway = new BoardGateway();
      Board.collection.drop(function() {
        done();
      });
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#boardGateway', () => {

    function createBoardData() {
        return {
            boardName: 'my board',
            userId: 0
        };
    }
    it('test save board', function(done) {
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            return boardGateway.findBoardById(board._id);
        })
        .then(board => {
            assert.equal(board.name, 'my board');
            assert.equal(board.members[0].userFk, 0);
            done();
        })
    });

    it('test find boards by boardIdList', function(done) {
        let boardIdList = [];
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardIdList.push(board._id);
            return boardGateway.createBoard(createBoardData());
        })
        .then(board => {
            boardIdList.push(board._id);
            return boardGateway.findBoardsByBoardIdList(boardIdList);
        })
        .then(boards => {
            assert.equal(boards.length, 2);
            done();
        })
    });
  })  
});
