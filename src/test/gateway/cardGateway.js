var assert = require('assert');
const CardGateway = require('../../gateway/card/fakeCardGateway');
const BoardGateway = require('../../gateway/board/fakeBoardGateway');

describe('UserGateway', function() {
  let cardGateway;
  let boardGateway;
  beforeEach(function(done) {
      boardGateway = new BoardGateway();
      cardGateway = new CardGateway();
      cardGateway.setBoardGateway(boardGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#boardGateway', () => {
    it('test find card', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0
        };
        let result = cardGateway.findCard(data);
        result.then(card => {
            assert.equal(card.title, 'card');
            done();
        }); 
    }); 

    it('test update description', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0
        };

        let result = cardGateway.updateDescription(data, 'description');
        result.then(card => {
            return cardGateway.findCard(data);
        })
        .then(card => {
            assert.equal(card.description, 'description');
            done();
        });
    });

    it('test leave comment', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0
        };
        
        const commentData = {
            text: 'fuck you'
        };

        let result = cardGateway.leaveComment(data, commentData);
        result.then(card => {
            return cardGateway.findCard(data);
        })
        .then(card => {
            assert.equal(card.comments[card.comments.length - 1].text, 'fuck you');
            done();
        });

    });

    it('test moveCardPosition_sameStage_orderCorrect', function(done) {
        const cardLocation = {
            boardId: 0,
            stage_index: 0,
            cardId: 0
        };

        const start_position = {
            stage_index: 0,
            card_index: 0
        };

        const end_position = {
            stage_index: 0,
            card_index: 1
        }

        let movingCard;    
        const result = boardGateway.findBoardById(cardLocation.boardId);
        result.then(board => {
            movingCard = board.stage_list[start_position.stage_index].work_items[start_position.card_index];
            return cardGateway.moveCardPosition(cardLocation, start_position, end_position);
        })
        .then(res => {
            return boardGateway.findBoardById(cardLocation.boardId);
        })
        .then(board => {
            assert.equal(movingCard, board.stage_list[end_position.stage_index].work_items[end_position.card_index]);
            done();
        })
    })

    it('test moveCardPosition_differStage_orderCorrect', function(done) {
        const cardLocation = {
            boardId: 0,
            stage_index: 0,
            cardId: 0
        };

        const start_position = {
            stage_index: 0,
            card_index: 0
        };

        const end_position = {
            stage_index: 1,
            card_index: 1
        }

        let movingCard;    
        const result = boardGateway.findBoardById(cardLocation.boardId);
        result.then(board => {
            movingCard = board.stage_list[start_position.stage_index].work_items[start_position.card_index];
            return cardGateway.moveCardPosition(cardLocation, start_position, end_position);
        })
        .then(res => {
            return boardGateway.findBoardById(cardLocation.boardId);
        })
        .then(board => {
            assert.equal(movingCard, board.stage_list[end_position.stage_index].work_items[end_position.card_index]);
            done();
        })
    })
    
  })  
});
