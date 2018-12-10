var assert = require('assert');

const BoardGateway = require('../../gateway/board/fakeBoardGateway');
const UserGateway = require('../../gateway/user/fakeUserGateway');
const BoardUseCase = require('../../usecase/boardCRUDUseCase');

describe('BoardUseCase', function() {
  let boardGateway;  
  let boardUseCase;
  let userGateway;
  
  class StubBoardUseCase extends BoardUseCase {
    convertSchemaModelToPlain(board) {
        return board;
    }
  }
  

  beforeEach(function(done) {
      userGateway = new UserGateway();
      boardGateway = new BoardGateway();
      boardUseCase = new StubBoardUseCase();
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
    
    it('test add new stage', function(done) {
        const data = {
            stageTitle: 'stage',
            boardId: 0
        };

        let result = boardUseCase.addNewStage(data);
        result.then(stage => {
            assert.equal(stage.title, data.stageTitle);
            done();       
        })
    });

    it('test removeStage', function(done) {
        const boardId = 0;
        const stage_index = 0;
        let stage_num;
        let result = boardUseCase.findBoardById(boardId);
        result.then(board => {
            stage_num = board.stage_list.length - 1;
            return boardUseCase.removeStage({boardId, stage_index});
        })
        .then(index => {
            return boardUseCase.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list.length, stage_num);
            done();
        })
    });

    it('test add new card', function(done) {
        const boardId = 0;
        const stage_index = 0;
        const cardTitle = 'new card';
        let cardSize;
        let result = boardUseCase.findBoardById(boardId);
        result.then(board => {
            cardSize = board.stage_list[stage_index].work_items.length;
            return boardUseCase.addNewCard({boardId, stage_index, cardTitle});
        })
        .then(card => {
            return boardUseCase.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[stage_index].work_items.length, cardSize + 1);
            done();
        })
    });

    it('test remove card', function(done) {
        const boardId = 0;
        const stage_index = 0;
        const card_index = 0;

        let cardSize;
        let result = boardUseCase.findBoardById(boardId);
        result.then(board => {
            cardSize = board.stage_list[stage_index].work_items.length;
            return boardUseCase.removeCard({boardId, stage_index, card_index});
        })
        .then(card_index => {
            return boardUseCase.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[stage_index].work_items.length, cardSize  -1);
            done();
        })
    });
  })  
});
