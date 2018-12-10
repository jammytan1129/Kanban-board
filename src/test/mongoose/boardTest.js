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

    it('test add new stage', function(done) {
        let boardId = '';
        let tempStage;
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            const stageName = 'new stage';
            boardId = board._id;
            return boardGateway.addNewStage(board._id, stageName);
        })
        .then(stage => {
            tempStage = stage;
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(tempStage.title, board.stage_list[board.stage_list.length - 1].title);
            done();
        })
    })

    it('test remove stage', function(done) {
        let boardId;
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            assert.equal(board.stage_list.length, 3);
            return boardGateway.removeStage(board._id, 0);
        })
        .then(stage_index => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list.length, 2);
            done();
        })
    });

    it('test add new card', function(done) {
        const stage_index = 0;
        let boardId;
        const cardTitle = 'new card';
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            return boardGateway.addNewCard(board._id, stage_index, cardTitle);
        })
        .then(card => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[stage_index].work_items.length, 1);
            done();
        })
    });

    it('test remove card', function(done) {
        let boardId = 0;
        const stage_index = 0;
        const card_index = 0;
        let result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            return boardGateway.addNewCard(board._id, stage_index, 'new card');
        })
        .then(card => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[stage_index].work_items.length, 1);
            return boardGateway.removeCard(boardId, stage_index, card_index);
        })
        .then(card_index => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[stage_index].work_items.length, 0);
            done();
        })

    });
  })  
});
