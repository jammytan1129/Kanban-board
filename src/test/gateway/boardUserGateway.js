var assert = require('assert');

const BoardGateway = require('../../gateway/board/fakeBoardGateway');
const UserGateway = require('../../gateway/user/fakeUserGateway');


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

    it('test add new stage', function(done) {
        const boardId = 0;
        let tempStage = null;
        const stageTitle = 'new stage';
        const result = boardGateway.addNewStage(boardId, stageTitle);
        result.then(stage => {
            tempStage = stage;
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {

            assert.equal(tempStage.title, board.stage_list[board.stage_list.length - 1].title);
            done();
        })
    })

    it('test add new card', function(done) {
        const boardId = 0;
        const stage_index = 0;
        const cardTitle = 'new card';
        const result = boardGateway.findBoardById(boardId);
        let cardLength;
        result.then(board => {
            cardLength = board.stage_list[stage_index].work_items.length;
            return boardGateway.addNewCard(boardId, stage_index, cardTitle);
        })
        .then(card => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(cardLength + 1, board.stage_list[stage_index].work_items.length);
            done();
        })
    })
    
    it('test remove stage', function(done) {
        const boardId = 0;
        const stageId = 0;
        let result = boardGateway.findBoardById(boardId);
        result.then(board => {
            return boardGateway.removeStage(boardId, stageId);
        })
        .then(res => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            const stageFilter = board.stage_list.filter(stage => stage._id == stageId);
            assert.equal(stageFilter.length, 0);
            done();
        })
    });

    it('test remove card', function(done) {
        const boardId = 0;
        const stage_index = 0;
        const cardId = 1;

        let result = boardGateway.findBoardById(boardId);
        result.then(board => {
            return boardGateway.removeCard(boardId, stage_index, cardId);
        })
        .then(cardId => {
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            const cardFilter = board.stage_list[stage_index].work_items.filter(item => item._id == cardId);
            assert.equal(cardFilter.length, 0);
            done();
        })
    });

    it('test addNewMember', function(done) {
        const boardId = 0;
        const userId = 0;

        let result = boardGateway.addNewMember(boardId, userId);
        result.then(member => {            
            return boardGateway.findBoardById(boardId);
        })
        .then(board => {
            assert.equal(board.members[board.members.length - 1].userFk, userId);
            done();
        })
    });

    it('test move stage', function(done) {
        const key = {
            boardId: 0,
            stageId: 0
        };

        const position = {
            start_stage_index: 0,
            end_stage_index: 1
        }

        let movingStage;
        const result = boardGateway.findBoardById(key.boardId);
        result.then(board => {
            movingStage = board.stage_list[position.start_stage_index];
            return boardGateway.moveStage(key, position);
        })
        .then(res => {
            return boardGateway.findBoardById(key.boardId);
        })
        .then(board => {
            assert.equal(movingStage, board.stage_list[position.end_stage_index]);
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
        const result = boardGateway.findBoardById(data.boardId);
        result.then(board => {
            return boardGateway.editStage(data);
        })
        .then(stage => {
            editStage = stage;
            return boardGateway.findBoardById(data.boardId);
        })
        .then(board => {
            assert.equal(board.stage_list[0], editStage);
            done();
        })
    });
    // mongoose test
    it('test remove member', function(done) {
        const data = {
            boardId: 0,
            email: 'gay88358@yahoo.com.tw',
            userId: 0
        }

        const result = boardGateway.removeMemberFromBoard(data.boardId, data.userId);
        result.then(res => {
            return boardGateway.findBoardById(data.boardId);
        })
        .then(board => {
            const user = board.members.filter(m => m._id == data.userId);
            assert.equal(user.length, 0);
            done();
        })
    });
  })  
});
