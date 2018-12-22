var assert = require('assert');
const CardUseCase = require('../../usecase/cardManageUseCase');
const CardGateway = require('../../gateway/card/fakeCardGateway');
const BoardGateway = require('../../gateway/board/fakeBoardGateway');

describe('CardUseCase', function() {

  class CardManageUseCaseStub extends CardUseCase {
    convertSchemaModelToPlain(mongoseSchema) {
        return mongoseSchema;
    }

    async formatCardComment(comments) { 
        return comments;
    }
  };
  let cardUseCase;
  let cardGateway;
  let boardGateway;
  beforeEach(function(done) {
      boardGateway = new BoardGateway();
      cardGateway = new CardGateway();
      cardGateway.setBoardGateway(boardGateway);

      cardUseCase = new CardManageUseCaseStub();
      cardUseCase.setCardGateway(cardGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#CardUseCase', () => {
      it('test update description', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            description: 'fuck you'
        };

        let result = cardUseCase.updateDescription(data);
        result.then(description => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            assert.equal(card.description, 'fuck you');
            done();
        });
      });

      it('test leave comment', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            userFk: 0,
            text: 'fuck you asshole'
        };
        let result = cardUseCase.leaveComment(data);
        result.then(card => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            assert.equal(card.comments[card.comments.length - 1].text, data.text);
            done();
        });
      });
      
      function fetchCardFromBoard(board, position) {
          return board.stage_list[position.stage_index].work_items[position.card_index];
      }

      it('test endPosition format', function(done) {
        let start_position = {
            stage_index: 0,
            card_index: 0
        };

        let end_position = {
            stage_index: -1,
            card_index: 1
        }

        cardUseCase.processEndPositionFormat(start_position, end_position);
        assert.equal(start_position.stage_index, end_position.stage_index);

        start_position = {
            stage_index: 0,
            card_index: 0
        };

        end_position = {
            stage_index: 1,
            card_index: 1
        }

        cardUseCase.processEndPositionFormat(start_position, end_position);
        assert.notEqual(start_position.stage_index, end_position.stage_index);
        done();
      });

      it('test moveCardPosition_SameStage_OrderShouldCorrectly', function(done) {
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
            stage_index: -1,
            card_index: 1
        }

        let movingCard;
        
        const result = boardGateway.findBoardById(cardLocation.boardId);
        result.then(board => {
            movingCard = fetchCardFromBoard(board, start_position)
            return cardUseCase.moveCardPosition({cardLocation, start_position, end_position});
        })
        .then(res => {
            return boardGateway.findBoardById(cardLocation.boardId);
        })
        .then(board => {
            const movedCard = fetchCardFromBoard(board, end_position);
            assert.equal(movingCard,  movedCard);
            done();
        })
      });

      it('test moveCardPosition_DifferStage_OrderShouldCorrectly', function(done) {
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
            movingCard = fetchCardFromBoard(board, start_position)
            return cardUseCase.moveCardPosition({cardLocation, start_position, end_position});
        })
        .then(res => {
            return boardGateway.findBoardById(cardLocation.boardId);
        })
        .then(board => {
            const movedCard = fetchCardFromBoard(board, end_position);
            assert.equal(movingCard,  movedCard);
            done();
        })
      });

      it('test append label to card', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            color: '#9999',
            text: ''
        };

        const result = cardUseCase.appendTagToCard(data);
        result.then(res => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            assert.equal(card.tags[card.tags.length - 1].color, data.color);
            assert.equal(card.tags[card.tags.length - 1].text, data.text);
            done();
        })
      });

      it('test assign member to card', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            userId: 0,
        };

        const result = cardUseCase.assignMemberTocard(data);
        result.then(res => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            assert.equal(card.assign[card.assign.length - 1].userFk, data.userId);
            done();
        })
      });

      it('test remove label from card', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            labelId: 0,
        };

        const lagelData = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            color: '#9999',
            text: ''
        };

        const result = cardUseCase.appendTagToCard(lagelData);
        result.then(res => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            return cardUseCase.removeLabelFromCard(data);
        })
        .then(res => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            const tag = card.tags.filter(l => l._id == data.labelId);
            assert.equal(tag.length, 0);
            done();
        })
      });

      it('test remove member from card', function(done) {
        const data = {
            boardId: 0,
            stage_index: 0,
            cardId: 0,
            userId: 0,
        };
        const result = cardUseCase.assignMemberTocard(data);
        result.then(res => {
            return cardUseCase.removeAssignedMemberFromCard(data);
        })
        .then(res => {
            return cardUseCase.findCard(data);
        })
        .then(card => {
            const assign = card.assign.filter(a => a.userFk == userId);
            assert.equal(assign.length, 0);
            done();
        });
      });
  })  
});
