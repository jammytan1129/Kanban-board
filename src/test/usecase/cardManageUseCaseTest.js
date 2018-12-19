var assert = require('assert');
const CardUseCase = require('../../usecase/cardManageUseCase');
const CardGateway = require('../../gateway/card/fakeCardGateway');

describe('CardUseCase', function() {
  let cardUseCase;

  beforeEach(function(done) {
      cardUseCase = new CardUseCase();
      cardUseCase.setCardGateway(new CardGateway);
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

      
  })  
});
