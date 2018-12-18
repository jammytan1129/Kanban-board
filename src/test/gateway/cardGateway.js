var assert = require('assert');
const CardGateway = require('../../gateway/card/fakeCardGateway');

describe('UserGateway', function() {
  let cardGateway;
  beforeEach(function(done) {
      cardGateway = new CardGateway();
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

    
  })  
});
