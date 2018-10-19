var assert = require('assert');
//Each task shall have attributes, 
// such as ID, name, type 
// (e.g., feature, doc, bug, support, ..., etc), 
// description, version, priority, status (i.e., state), 
// handlers, estimated effort (i.e., story point), 
// actual effort, timestamp for each state change (or start/due time), 
// tag, attachment file, etc.
const TodoGateway = require('../gateway/todoGateway/todoGateway');
const InMemoryGateway = require('../gateway/todoGateway/inMemoryGateway');
const Todo = require('../model/todo');

describe('TodoGateway', function() {
  
  var todoGateway;
  var todo;  
  beforeEach(function() {
    todo = new Todo('this is my test');
    todoGateway = new InMemoryGateway();
  });
  
  afterEach(function() {
  });
  
  describe('#TodoGateway', () => {
    // 測試算出來的平均是不是 2.5
    it('test TodoGateway insert and find', function() {
      todoGateway.insert(todo);
      assert.equal(todoGateway.find(0), todo);
      assert.equal(todo.id(), 0);
    });
    
    it('test find todo', function() {
      todoGateway.insert(todo);
      var findedTodo = todoGateway.find(todo.id());
      assert.equal(findedTodo, todo);
    });

    function addTodosToGateway() {
        todoGateway.insert(todo);
        todoGateway.insert(new Todo('fuck'));
        todoGateway.insert(new Todo('you'));
        todoGateway.insert(new Todo('mother'));
    }

    it('test load all todo', function() {
        addTodosToGateway();
        var todoList = todoGateway.loadAllTodo();
        var result = ['fuck', 'you', 'mother'];
        for (var i = 0; i < todoList.size; i++)
            assert.equal(todoList[i], result[i]);
    });
    // it('test update todo', function() {
    //   todoGateway.insert(todo);
    //   todo.setTitle('tttddd');
    //   todoGateway.update(todo);
    //   var findedTodo = todoGateway.find(todo.id());
    //   assert.equal(findedTodo.title(), 'tttddd');
    // });
  })
  
});
