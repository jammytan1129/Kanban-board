var assert = require('assert');

const CardGateway = require('../../gateway/card/cardGateway');
const BoardGateway = require('../../gateway/board/boardGateway');
const Database = require('../../db/database');
const config = require('../../config/config');

describe('UserGateway', function() {
  let cardGateway;
  let database;
  let boardGateway;

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

  beforeEach(function(done) {
      boardGateway = new BoardGateway();
      cardGateway = new CardGateway();
      cardGateway.setBoardGateway(boardGateway);
      done();
  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#cardGateway', () => {

    function createBoardData() {
        return {
            boardName: 'my board',
            userId: 0
        };
    }

    it('test find card', function(done) {
      let boardId;
      let stage_index = 0;
      let targetCard;
      const result = boardGateway.createBoard(createBoardData());
      result.then(board => {
        boardId = board._id;
        return boardGateway.addNewCard(board._id, 0, 'fuck');
      })
      .then(card => {
          targetCard = card;
          return cardGateway.findCard({boardId, cardId: card._id, stage_index});
      })
      .then(card => {
          assert.equal(card._id.toString(), targetCard._id.toString());
          done();  
       });
    });

    it('test updateDescription', function(done) {
      const updateDescription = 'i am fucked up';
      let boardId;
      let stage_index = 0;
      let cardId;

      const result = boardGateway.createBoard(createBoardData());
      result.then(board => {
          boardId = board._id;
          return boardGateway.addNewCard(board._id, 0, 'fuck');
      })
      .then(card => {
          cardId = card._id;    
          return cardGateway.updateDescription({boardId, stage_index, cardId}, updateDescription);        
      })
      .then(res => {
          return cardGateway.findCard({boardId, cardId, stage_index});
      })
      .then(card => {
          assert.equal(card.description, updateDescription);
          done();
      });
    });

    it('test leave comment', function(done) {
      const commentData = {
        userFk: '0',
        text: 'fuck you i am'
      };

      let boardId;
      let stage_index = 0;
      let cardId;

      const result = boardGateway.createBoard(createBoardData());
      result.then(board => {
          boardId = board._id;
          return boardGateway.addNewCard(board._id, 0, 'fuck');
      })
      .then(card => {
          cardId = card._id;    
          return cardGateway.leaveComment({boardId, stage_index, cardId}, commentData);        
      })
      .then(res => {
          return cardGateway.findCard({boardId, cardId, stage_index});
      })
      .then(card => {
          assert.equal(card.comments[card.comments.length - 1].text, commentData.text);
          done();
      });
    });
    it('test remove label from card', function(done) {
        let boardId;
        let stage_index = 0;
        let cardId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            board.stage_list[0].work_items.push({
                title: 'card',
                tags: [{
                    text: 'fucked up',
                    color: '#9999'
                }]
            })
            return board.save();
        })
        .then(board => {
            boardId = board._id;
            cardId = board.stage_list[0].work_items[0]._id;
            const labelId = board.stage_list[0].work_items[0].tags[0]._id;
            return cardGateway.removeLabelFromCard({boardId, stage_index, cardId, labelId});
        })
        .then(res => {
            return cardGateway.findCard({boardId, stage_index, cardId});
        })
        .then(card => {
            assert.equal(card.tags.length, 0);
            done();
        })
    });


    it('test appendTagToCard', function(done) {
        let boardId;
        let stage_index = 0;
        let cardId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            boardId = board.id;
            return boardGateway.addNewCard(board.id, stage_index, 'fuck');
        })
        .then(card => {
            cardId = card._id;
            return cardGateway.appendTagToCard({ boardId, stage_index, cardId, text: 'fuck', color: '#9999' });
        })
        .then(res => {
            return cardGateway.findCard({boardId, stage_index, cardId});
        })
        .then(card => {
            assert.equal(card.tags[card.tags.length - 1].text, 'fuck');
            assert.equal(card.tags[card.tags.length - 1].color, '#9999');
            done();
        })
    });

    it('test remove member from card', function(done) {
        let boardId;
        let stage_index = 0;
        let cardId;
        let userId;
        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            board.stage_list[0].work_items.push({
                title: 'card',
                assign: [{
                    userFk: 0
                }]
            })
            return board.save();
        })
        .then(board => {
            boardId = board._id;
            cardId = board.stage_list[0].work_items[0]._id;
            userId = board.stage_list[0].work_items[0].assign[0].userFk;
            return cardGateway.removeAssignedMemberFromCard({boardId, stage_index, cardId, userId});
        })
        .then(res => {
            return cardGateway.findCard({boardId, stage_index, cardId});
        })
        .then(card => {
            const assign = card.assign.filter(a => a.userFk == userId);
            assert.equal(assign.length, 0);
            done();
        })
    });

    it('test assign member to board', function(done) {
        let boardId;
        let stage_index = 0;
        let cardId;
        let userId = 0;

        const result = boardGateway.createBoard(createBoardData());
        result.then(board => {
            board.stage_list[0].work_items.push({
                title: 'card',

            })
            return board.save();
        })
        .then(board => {
            boardId = board._id;
            cardId = board.stage_list[0].work_items[0]._id;
            return cardGateway.assignMemberTocard({boardId, stage_index, cardId, userId});
        })
        .then(member => {
            return cardGateway.findCard({boardId, stage_index, cardId});
        })
        .then(card => {
            const assign = card.assign.filter(a => a.userFk == userId);
            assert.equal(assign.length, 1);
            done();
        })
    })

    // it('test moveCardPosition_sameStage_orderCorrect', function(done) {
    //   const cardLocation = {
    //       boardId:  '5c18b77e16fd4a5795c6cfc5',
    //       stage_index: 0,
    //       cardId: '5c18b85730bebd585b4b2539'
    //   };

    //   const start_position = {
    //       stage_index: 0,
    //       card_index: 1
    //   };

    //   const end_position = {
    //       stage_index: 0,
    //       card_index: 0
    //   }

    //   let movingCard;    
    //   const result = boardGateway.findBoardById(cardLocation.boardId);
    //   result.then(board => {
    //       movingCard = board.stage_list[start_position.stage_index].work_items[start_position.card_index];
    //       return cardGateway.moveCardPosition(cardLocation, start_position, end_position);
    //   })
    //   .then(res => {
    //       return boardGateway.findBoardById(cardLocation.boardId);
    //   })
    //   .then(board => {
    //       assert.equal(movingCard, board.stage_list[end_position.stage_index].work_items[end_position.card_index]);
    //       done();
    //   })
    // })

    // it('test moveCardPosition_differStage_orderCorrect', function(done) {
    //     const cardLocation = {
    //         boardId: 0,
    //         stage_index: 0,
    //         cardId: 0
    //     };

    //     const start_position = {
    //         stage_index: 0,
    //         card_index: 0
    //     };

    //     const end_position = {
    //         stage_index: 1,
    //         card_index: 1
    //     }

    //     let movingCard;    
    //     const result = boardGateway.findBoardById(cardLocation.boardId);
    //     result.then(board => {
    //         movingCard = board.stage_list[start_position.stage_index].work_items[start_position.card_index];
    //         return cardGateway.moveCardPosition(cardLocation, start_position, end_position);
    //     })
    //     .then(res => {
    //         return boardGateway.findBoardById(cardLocation.boardId);
    //     })
    //     .then(board => {
    //         assert.equal(movingCard, board.stage_list[end_position.stage_index].work_items[end_position.card_index]);
    //         done();
    //     })
    // })
  })  
});
