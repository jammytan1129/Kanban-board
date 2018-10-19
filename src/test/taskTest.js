var assert = require('assert');
//Each task shall have attributes, 
// such as ID, name, type 
// (e.g., feature, doc, bug, support, ..., etc), 
// description, version, priority, status (i.e., state), 
// handlers, estimated effort (i.e., story point), 
// actual effort, timestamp for each state change (or start/due time), 
// tag, attachment file, etc.
const Task = require('../model/task');
const Card = require('../model/card');

describe('Card', function() {
  let task;
  beforeEach(function() {
    task = new Task('in-progress');
  });
  
  afterEach(function() {
    console.log('global teardown');
  });
  
  describe('#column', () => {
    it('test column constructor', function() {
        assert.equal(task.state(), 'in-progress');
    });

    it('test add card', () => {
        task.addCard(new Card('good'));
        task.addCard(new Card('great'));
        assert.equal(task.getCardListSize(), 2);        
    });
    
    it('test set cardList', () => {
        assert.equal(task.getCardListSize(), 0);
        let cardList = [new Card('111'), new Card('222')];
        task.setCardList(cardList);
        assert.equal(task.getCardListSize(), 2);
    })
  })  
});
