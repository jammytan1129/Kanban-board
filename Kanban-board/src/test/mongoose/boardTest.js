var assert = require('assert');

const BoardGateway = require('../../gateway/board/boardGateway');
const Database = require('../../db/database');
const Board = require('../../mongoModel/board');
const User = require('../../mongoModel/user');
const config = require('../../config/config');
describe('BoardGateway', function() {
  let database;
  
  before(function(done) {
    database = new Database();
    database.setUrl(config.testMongoose.url);

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

   

    it('test remove stage', function(done) {
        let boardId;
        let stageId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            stageId = board.stage_list[0]._id
            return boardGateway.removeStage(boardId, board.stage_list[0]._id);
        })
        .then(removedStageIndex => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            const filterStage = board.stage_list.filter((stage) => stage._id == stageId);
            assert.equal(filterStage.length, 0);
            done();
        })
    });

    it('test remove card', function(done) {
        let boardId;
        let stage_index = 0;
        let cardId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            return boardGateway.addNewCard(boardId, stage_index, "bitch");
        })
        .then(card => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            cardId = board.stage_list[stage_index].work_items[0]._id;
            return boardGateway.removeCard(boardId, stage_index, cardId);
        })
        .then(res => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            const cardFilter = board.stage_list[stage_index].work_items.filter((item) => cardId == item._id);
            assert.equal(cardFilter.length, 0);
            done();
        })
    });

    it('test movingstage', function(done) {
        let boardId;
        let stageId;
        let movingStage;
        const position = {
            start_stage_index: 0,
            end_stage_index: 2
        }

        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board._id;
            stageId = board.stage_list[position.start_stage_index]._id;

            movingStage = board.stage_list[position.start_stage_index];
            return boardGateway.moveStage({ boardId, stageId }, position);
        })
        .then(res => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            const stage = board.stage_list[position.end_stage_index];
            assert.equal(stage._id.toString(), movingStage._id.toString());
            done();
        })        
    });

    it('test editStage', function(done) {
        const data = {
            boardId: 0,
            stageId: 0,
            WIP_limit: 0,
            title: 1,
            border_color: '#9999'
        };

        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            data.boardId = board._id;
            data.stageId = board.stage_list[0]._id;
            return boardGateway.editStage(data);
        })
        .then(res => {
            return boardGateway.findBoardById(data.boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[0].WIP_limit, data.WIP_limit);
            assert.equal(board.stage_list[0].title, data.title);
            assert.equal(board.stage_list[0].border_color, data.border_color);
            done();
        })
    });

    it('test remove member from board', function(done) {
        let boardId;
        let userId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            userId = board.members[0].userFk
            boardId = board._id;
            return boardGateway.removeMemberFromBoard(boardId, userId);
        })
        .then(res => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            console.log(board);
            assert.equal(board.members.length, 0);
            done();
        })    
    });

    
  })  
});
