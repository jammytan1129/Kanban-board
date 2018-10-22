var assert = require('assert');

const DBCardGateway = require('../gateway/cardGateway/dbCardGateway');

const Card = require('../model/card');
const Task = require('../model/task');

describe('TodoGateway', function() {
  
  let cardGateway;
  let card;  
  
  beforeEach(function(done) {
    card = new Card('this is a card');
    card.setDescription('this is my desc');
    card.setTaskFk(101);

    cardGateway = new DBCardGateway();
    let result = cardGateway.clearAll();
    result
    .then(value => {
        done();
    })
    .catch(err => {
        console.log(err);
    })

  });
  
  afterEach(function(done) {
      done();
  });
  
  describe('#CardGateway', () => {    
    it('test insert and find card', (done) => {
        let result = cardGateway.insert(card);
        result
        .then(insertedCard => {
            return cardGateway.find(insertedCard.id());
        })
        .then(finalCard => {
            assert.equal(finalCard.name(), card.name());
            assert.equal(finalCard.getTodoListSize(), 0);
            assert.equal(finalCard.description(), card.description());
            done();
        });
    });
    
    it('test find no card', function(done){
      const result = cardGateway.find(-100);
      result.then(card => {
        assert.equal(card, null);
        done();
      });
    });

    it('test update card', (done) => {
      const result = cardGateway.insert(card);
      result
      .then(insertedCard => {
        insertedCard.setName('this is a setname');
        insertedCard.setDescription('no desc');
        return cardGateway.update(insertedCard);
      })
      .then(updateResult => {
        return cardGateway.find(card.id());
      })
      .then(finalCard => {
        assert.equal(finalCard.name(), 'this is a setname');  
        assert.equal(finalCard.description(), 'no desc'); 
        done(); 
      });
    });

    it('test delete card', (done) => {
        const result = cardGateway.insert(card);
        result
        .then(insertedCard => {
          return cardGateway.delete(insertedCard.id());
        })
        .then(deleteResult => {
          return cardGateway.find(card.id());
        })
        .then(finalCard => {
            assert.equal(finalCard, null);
            done();
        });
    });

    it('test loadCardFor task', (done) => {
        let result = cardGateway.insert(card);
        result
        .then(insertedCard => {
          let task = new Task('asd');
          task.setId(insertedCard.taskFk());
          return cardGateway.loadCardFor(task);
        })
        .then(cardList => {
          console.log(cardList);
          assert.equal(cardList.length, 1);
          done();
        });
    });
  })
});
