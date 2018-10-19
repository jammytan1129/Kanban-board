var assert = require('assert');
//const Database = require('../db/db');

const DBItemGateway = require('../gateway/itemGateway/dbItemGateway');
const DBTodoGateway = require('../gateway/todoGateway/dbTodoGateway');
const DBCardGateway = require('../gateway/cardGateway/dbCardGateway');

const Card = require('../model/card');
const Item = require('../model/item');
const Todo = require('../model/todo');

describe('TodoGateway', function() {
  let itemGateway;
  let item;

  let todoGateway;
  let todo;

  let cardGateway;
  let card;
  
  function initializeGateway() {
    cardGateway = new DBCardGateway();
    todoGateway = new DBTodoGateway();
    itemGateway = new DBItemGateway();
  }
  // still has some problem
  // must create the card and todo and then item qq
  beforeEach(function(done) {
    initializeGateway();

    card = new Card('card');
    let result = cardGateway.insert(card);

    result
    .then(insertedCard => {
      todo = new Todo('todo');
      todo.setCardFk(insertedCard.id());
      return todoGateway.insert(todo);
    })
    .then(insertedTodo => {
      item = new Item('this is content');
      item.setTodoFk(insertedTodo.id());  
      return itemGateway.clearAll();
    })
    .then(cleanResult => {
      console.log('steUp');
      done();
    })
    .catch(err => {
      console.log(err);
    });
  });
  
  afterEach(function(done) {
    let result = cardGateway.clearAll();
    result
    .then(cleanResult1 => {
      return todoGateway.clearAll();
    })
    .then(cleanResult2 => {
      done();
    });

    // let result = todoGateway.clearAll();
    // result.then(cleanResult => {
    //   console.log('end');
      
    //   done();
    // })
  });
  
  describe('#TodoGateway', () => { 
    it ('insert new item into DB', function(done) {
        let result = itemGateway.insert(item);
        result
          .then(insertedItem => {
              return itemGateway.find(insertedItem.id());
          })
          .then(targetItem => {
              assert.equal(targetItem.id(), item.id());
              assert.equal(targetItem.content(), item.content());
              assert.equal(targetItem.isDone(), item.isDone());
              assert.equal(targetItem.todoFk(), item.todoFk()); 
              done();  
          });
    });
    
    it('find empty item', (done) => {
        let emptyId = -1;
        let result = itemGateway.find(emptyId);
        result.then(item => {
            assert.equal(item, null);
            done();
        });
    });


    it('update item', (done) => {
      let result = itemGateway.insert(item);

      result
      .then(insertedItem => {
        insertedItem.setContent('update');
        insertedItem.setIsDone(1);
        return itemGateway.update(insertedItem);
      })
      .then(result => {
        return itemGateway.find(item.id());
      })
      .then(finalItem => {
        assert.equal(finalItem.content(), 'update');
        assert.equal(finalItem.isDone(), 1);
        done();
      });
    });

    it('delete item from the database', (done) => {
        let result = itemGateway.insert(item);
        result
          .then(insertedItem => {
            return itemGateway.delete(insertedItem.id());
          })
          .then(state => {
            return itemGateway.find(item.id());
          })
          .then(item => {
            assert.equal(item, null);
            done();
          })
          .catch(err => {
            console.log(err);
          });
    });

    it('load item for todo', function(done) {
      let result = itemGateway.insert(item);
      result
      .then(insertedItem1 => {
        return itemGateway.insert(item);
      })
      .then(insertedItem2 => {
        return itemGateway.loadItemFor(todo);
      })
      .then(itemList => {
        console.log(itemList);
        assert.equal(itemList.length, 2);
        for (let i = 0; i < itemList.length; i++) {
          assert.equal(itemList[i].content(), item.content());
          assert.equal(itemList[i].isDone(), item.isDone());
        }
        done();
      });
    });
  })
  
});
