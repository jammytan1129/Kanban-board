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
    task.setLimited(5);
  });
  
  afterEach(function() {
    console.log('global teardown');
  });
  
  describe('#column', () => {
    function createCard(priority) {
      let card = new Card('this is my card');
      card.setPriority(priority);
      card.setId(priority);
      return card;
    }

    function createCardList() {
      let cardList = [];
      cardList.push(createCard(0));
      cardList.push(createCard(1));
      cardList.push(createCard(2));
      cardList.push(createCard(3));
      return cardList;
    }
    
    it('change card priority', function() {
        let cardList = createCardList();
        task.setCardList(cardList);
        let id = 3
        let changePriority = 1
        task.changeCardPriority(id, changePriority);
        id = 1;
        changePriority = 0;
        task.changeCardPriority(id, changePriority);

        cardList = task.cardList();
        let result = [1, 0, 3, 2];
        for (let i = 0; i < cardList.length; i++) {
          assert.equal(cardList[i].id(), result[i]);
        }
    });

    it('removeCard', () => {
      let cardList = createCardList();
      task.setCardList(cardList);
      assert.equal(task.cardList().length, 4);
      task.removeCard(cardList[2]);
      assert.equal(task.cardList().length, 3);
    });

    it('resetPriority', () => {
      let cardList = createCardList();
      task.setCardList(cardList);
      task.removeCard(cardList[2]);
      task.resetPriority();
      cardList = task.cardList();
      let result = [0, 1, 2];
      for (let i = 0; i < cardList.length; i++)
        assert.equal(cardList[i].priority(), result[i]);
    });

    it('task set priority', () => {
      task.setPriority(10);
      let priority = task.priority();
      assert.equal(priority, 10);
      task.setLimited(3);
      assert.equal(task.limited(), 3);
    });


    it('test column constructor', function() {
        assert.equal(task.state(), 'in-progress');
    });

    it('test hasExceedLimit', function() {
      assert.equal(task.hasExceedLimit(), false);
      task.setCardList([new Card('2'), new Card('2'), new Card('2'), new Card('2')]);
      assert.equal(task.hasExceedLimit(), false);
      task.setCardList([new Card('2'), new Card('2'), new Card('2'), new Card('2'), new Card('2')]);
      assert.equal(task.hasExceedLimit(), true);
    });

    it('test isLessThanOldLimited', function() {
      task.setCardList([new Card('2'), new Card('2')]);
      assert.equal(task.isLessThanOldLimited(6), false);
      task.setCardList([new Card('2'), new Card('2'),new Card('2'), new Card('2')]);
      assert.equal(task.isLessThanOldLimited(3), true);
      assert.equal(task.isLessThanOldLimited(4), false);
    });

    // it('test add card', () => {
    //     task.addCard(new Card('good'));
    //     task.addCard(new Card('great'));
    //     assert.equal(task.getCardListSize(), 2);        
    // });
    
    // it('test set cardList', () => {
    //     assert.equal(task.getCardListSize(), 0);
    //     let cardList = [new Card('111'), new Card('222')];
    //     task.setCardList(cardList);
    //     assert.equal(task.getCardListSize(), 2);
    // })
  })  
});
