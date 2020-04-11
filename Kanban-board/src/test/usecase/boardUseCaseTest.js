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
        const stageId = 0;
        let result = boardUseCase.findBoardById(boardId);
        result.then(board => {
            return boardUseCase.removeStage({boardId, stageId});
        })
        .then(index => {
            return boardUseCase.findBoardById(boardId);
        })
        .then(board => {
            const stageFilter = board.stage_list.filter(stage => stage._id == stageId);
            assert.equal(stageFilter.length, 0);
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
        const cardId = 0;
        let result = boardUseCase.findBoardById(boardId);
        result.then(board => {
            return boardUseCase.removeCard({boardId, stage_index, cardId});
        })
        .then(cardId => {
            return boardUseCase.findBoardById(boardId);
        })
        .then(board => {
            const cardFilter = board.stage_list[stage_index].work_items.filter(item => item._id == cardId);
            assert.equal(cardFilter.length, 0);
            done();
        })
    });

    

    it('test moveStage_diffStage_orderShouldCorrectly', function(done) {
        const data = {
            boardId: 0,
            stageId: 0,
            start_stage_index: 0,
            end_stage_index: 1
        };

        let movingStage;
        const result = boardUseCase.findBoardById(data.boardId);
        result.then(board => {
            movingStage = board.stage_list[data.start_stage_index];
            return boardUseCase.moveStage(data);
        })
        .then(res => {
            return boardUseCase.findBoardById(data.boardId);
        })
        .then(board => {
            assert.equal(movingStage, board.stage_list[data.end_stage_index]);
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
        
        let editStage;
        const result = boardUseCase.findBoardById(0);
        result.then(board => {
            return boardUseCase.editStage(data);
        })
        .then(stage => {
            editStage = stage;
            return boardUseCase.findBoardById(data.boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[0], editStage);
            done();
        })
    });

    it('test remove member', function(done) {
        const data = {
            boardId: 0,
            userId: 0
        }

        let removedUser;
        const result = boardUseCase.findBoardById(data.boardId);
        result.then(board => {
            return boardUseCase.removeMemberFromBoard(data);
        })
        .then(member => {
            return boardUseCase.findBoardById(data.boardId);
        })
        .then(board => {
            const user = board.members.filter(m => m._id == data.userId);
            assert.equal(user.length, 0);
            return userGateway.findUserById(data.userId);
        })
        .then(user => {
            const board = user.board_list.filter(b => b._id == data.boardId);
            assert.equal(board.length, 0);
            done();
        })
    });

    it('test  invite user to exist board', function(done) {
        const data = {
            boardId: 0,
            userId: 0
        };

        const result = boardUseCase.removeMemberFromBoard(data);
        result.then(res => {
            return boardUseCase.inviteUserToExistBoard(data);
        })
        .then(res => {
            return boardUseCase.findBoardById(data.boardId);
        })
        .then(board => {
            const member = board.members.filter(m => m._id == data.userId);
            assert.equal(member.length, 1);
            done();
        })
    });
  })  
});
