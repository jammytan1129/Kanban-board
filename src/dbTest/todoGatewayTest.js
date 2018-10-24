var assert = require('assert');

const DBTodoGateway = require('../gateway/todoGateway/dbTodoGateway');
const Database = require('../db/db');

const Todo = require('../model/todo');

describe('TodoGateway', function() {
  
  let todoGateway;
  let todo;  

  function createTodo() {
    let todo = new Todo('this is my test todo');
    todo.setCardFk(null);
    return todo;
  }
  beforeEach(function(done) {
    todo = createTodo();

    todoGateway = new DBTodoGateway(new Database);
    
    let result = todoGateway.connection();
    result.then(threadId => {
      console.log(threadId);
      done();
    })
  });
  
  afterEach(function(done) {
    let result = todoGateway.close();
    result.then(closeResult => {
      console.log(closeResult);
      done();
    })
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

    // it('test loadTodoForCard', function(done) {
    //     let result = todoGateway.insert(todo);
    //     result
    //     .then(insertedTodo1 => {
    //       return todoGateway.insert(todo);
    //     })
    //     .then(insertedTodo2 => {
    //       return todoGateway.loadTodoFor(card);
    //     })
    //     .then(todoList => {
    //       console.log(todoList);
    //       assert.equal(todoList.length, 2);
    //       for (let i = 0; i < todoList.length; i++) {
    //         assert.equal(todoList[i].title(), todo.title());            
    //       }
    //       done();
    //     });
    // });
    
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
