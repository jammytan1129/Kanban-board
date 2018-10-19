var assert = require('assert');

const DBTodoGateway = require('../gateway/todoGateway/dbTodoGateway');
const DBCardGateway = require('../gateway/cardGateway/dbCardGateway');

const Card = require('../model/card');
const Todo = require('../model/todo');

describe('TodoGateway', function() {
  
  let todoGateway;
  let cardGateway;
  let todo;  
  let card;
  beforeEach(function(done) {
    card = new Card('my card');
    todo = new Todo('this is my test');
    todoGateway = new DBTodoGateway();
    cardGateway = new DBCardGateway();

    let result = cardGateway.insert(card);
    result
    .then(insertedCard => {
      todo.setCardFk(insertedCard.id());
      return todoGateway.clearAll();
    })
    .then(value =>{
      done();
    })
    .catch(err => {
      console.log(err);
    });

  });
  
  afterEach(function(done) {
    let result = cardGateway.clearAll();
    result
    .then(value => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
  });
  
  describe('#TodoGateway', () => {    
    it('update todo', function(done) {
      let result = todoGateway.insert(todo);
      result
      .then(insertedTodo => {
        insertedTodo.setTitle('update todo title');
        return todoGateway.update(insertedTodo);
      })
      .then(result => {
        return todoGateway.find(todo.id());
      })
      .then(finalItem => {
        assert.equal(finalItem.title(), todo.title());
        done();
      });
    });
    
    it('test TodoGateway insert and find', function(done) {
        const result = todoGateway.insert(todo);
        result
        .then(insertedTodo => {
          return todoGateway.find(insertedTodo.id());
        })
        .then(findedTodo => {
          assert.equal(findedTodo.title(), todo.title());
          done();
        });
    });
  
    it('test find null item', function(done) {
        const result = todoGateway.find(-100);
        result.then(todo => {
          assert.equal(todo, null);
          done();
        });
    });

    it('delete todo', function(done) {
      let result = todoGateway.insert(todo);

      result
        .then(insertedTodo => {
          return todoGateway.delete(insertedTodo.id());
        })
        .then(state => {
          return todoGateway.find(todo.id());
        })
        .then(todo => {
          assert.equal(todo, null);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });

    it('test loadTodoForCard', function(done) {
        let result = todoGateway.insert(todo);
        result
        .then(insertedTodo1 => {
          return todoGateway.insert(todo);
        })
        .then(insertedTodo2 => {
          return todoGateway.loadTodoFor(card);
        })
        .then(todoList => {
          console.log(todoList);
          assert.equal(todoList.length, 2);
          for (let i = 0; i < todoList.length; i++) {
            assert.equal(todoList[i].title(), todo.title());            
          }
          done();
        });
    });
    // it('test load all todo', function(done) {
    //     let result = todoGateway.insert(todo);
    //     result
    //     .then(insertedTodo => {
    //       return todoGateway.insert(todo);
    //     })
    //     .then(insertedTodo => {
    //       return todoGateway.loadAllTodo();
    //     })
    //     .then(todoList => {
    //       assert.equal(todoList.length, 2);
    //       done();
    //     });
    // });

    
  })
  
});
