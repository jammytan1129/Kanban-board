var assert = require('assert');
const FakeCardGateway = require('../../gateway/cardGateway/inMemoryCardGateway');
const FakeTaskGateway = require('../../gateway/taskGateway/inMemoryTaskGateway');
const Task = require('../../model/task');
const Card = require('../../model/card');

describe('TodoGateway', function() {
  let taskGateway;
  let cardGateway;
  let card;
  beforeEach(function(done) {
    taskGateway = new FakeTaskGateway(null);
    cardGateway = new FakeCardGateway(null);
    card = new Card('my card');
    done();
  });
  
  afterEach(function(done) {
    done();
  });
  
  describe('#fakeGateway', () => {    
    it('insert', (done) => {
        let result = cardGateway.insert(card);
        result.then(insertedItem => {
            return cardGateway.find(insertedItem.id());
        })
        .then(targetCard => {
            assert.equal(targetCard.id(), card.id());
            assert.equal(targetCard.name(), card.name());
            assert.equal(targetCard.description(), card.description());
            done();
        })
    });

    it('find', (done) => {
        let result = cardGateway.find(-1);
        result.then(card => {
            assert.equal(card, null);
            done();
        });
    })

    async function createTaskGateway() {
        let task = new Task('done');
        task.addCard(new Card('123'));
        task.addCard(new Card('456'));
        return await taskGateway.insert(task);
    }

    it('test findPriority', (done) => {
        cardGateway.setTaskGateway(taskGateway);
        let result = createTaskGateway();
        result.then(task => {
            console.log(task);
            return cardGateway.loadPriorityWithTaskFk(task.id());
        })
        .then(priority => {
            assert.equal(priority, 2);
            done();
        });
    });

    it('update', (done) => {
        let result = cardGateway.insert(card);
        result.then(insertedCard => {
            insertedCard.setName('fuck');
            insertedCard.setDescription('ddddd');
            return cardGateway.update(insertedCard);
        })
        .then(targetCard => {
            return cardGateway.find(card.id());
        })
        .then(targetCard => {
            assert.equal(targetCard.name(), 'fuck');
            assert.equal(targetCard.description(), 'ddddd');
            done();
        })
    });
  })
});
