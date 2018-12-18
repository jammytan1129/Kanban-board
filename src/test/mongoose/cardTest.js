var assert = require('assert');

const CardGateway = require('../../gateway/card/cardGateway');
const BoardGateway = require('../../gateway/board/boardGateway');
const Database = require('../../db/database');

describe('UserGateway', function() {
  let cardGateway;
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

  beforeEach(function(done) {
      cardGateway = new CardGateway();
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#cardGateway', () => {
    // it('test find card', function(done) {
    //   const inputData = {
    //     boardId: '5c13695a622e8af9116837ec',
    //     stage_index: 0,
    //     cardId: '5c13709d0f6956fbbb896446'
    //   };

    //   const result = cardGateway.findCard(inputData);
    //   result.then(card => {
    //     done();
    //   })
    // });

    // it('test updateDescription', function(done) {
    //   const inputData = {
    //     boardId: '5c13695a622e8af9116837ec',
    //     stage_index: 0,
    //     cardId: '5c13709d0f6956fbbb896446'
    //   };
    //   const updateDescription = 'i am fucked up';
    //   const result = cardGateway.findCard(inputData);
    //   result.then(card => {
    //     previousDescription = card.description;
    //     return cardGateway.updateDescription(inputData, updateDescription);        
    //   })
    //   .then(card => {
    //     return cardGateway.findCard(inputData);
    //   })
    //   .then(card => {
    //     assert.equal(card.description, updateDescription);
    //     done();
    //   })
      
    // });
    it('test leave comment', function(done) {
      const inputData = {
        boardId: '5c13695a622e8af9116837ec',
        stage_index: 0,
        cardId: '5c13709d0f6956fbbb896446'
      };

      const commentData = {
        userFk: '0',
        text: 'fuck you i am'
      };

      const result = cardGateway.leaveComment(inputData, commentData);
      result.then(res => {
        return cardGateway.findCard(inputData);
      })
      .then(card => {
        console.log(card.comments.length);
        console.log(card.comments[card.comments.length - 1]);
        done();
      })
    });
    
  })  
});
