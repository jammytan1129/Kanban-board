var assert = require('assert');
//const Database = require('../db/db');

const DBItemGateway = require('../gateway/itemGateway/dbItemGateway');
//const DBTodoGateway = require('../gateway/todoGateway/dbTodoGateway');
//const DBCardGateway = require('../gateway/cardGateway/dbCardGateway');

const Database = require('../db/db');

const Item = require('../model/item');
//const Todo = require('../model/todo');

describe('TodoGateway', function() {
  let itemGateway;
  let item;

  function createItem() {
    let myItem = new Item('contact with client');
    myItem.setTodoFk(null);
    return myItem;
  }

  beforeEach(function(done) {
    item = createItem();

    itemGateway = new DBItemGateway(new Database);

    let result = itemGateway.connection();
    result
    .then(threadId => {
      console.log('connect to the database');
      done();
    })
    .catch(err => {
      console.log(err);
    });

  });
  
  afterEach(function(done) {
    let result = itemGateway.close();
    result.then(closeResult => {
      console.log(closeResult);
      done();
    })
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

    // it('load item for todo', function(done) {
    //   let result = itemGateway.insert(item);
    //   result
    //   .then(insertedItem1 => {
    //     return itemGateway.insert(item);
    //   })
    //   .then(insertedItem2 => {
    //     return itemGateway.loadDomainWithForeignKey(318);
    //   })
    //   .then(itemList => {
    //     console.log(itemList);
    //     assert.equal(itemList.length, 2);
    //     for (let i = 0; i < itemList.length; i++) {
    //       assert.equal(itemList[i].content(), item.content());
    //       assert.equal(itemList[i].isDone(), item.isDone());
    //     }
    //     done();
    //   });
    // });
  })
  
});
