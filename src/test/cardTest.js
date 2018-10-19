var assert = require('assert');
//Each task shall have attributes, 
// such as ID, name, type 
// (e.g., feature, doc, bug, support, ..., etc), 
// description, version, priority, status (i.e., state), 
// handlers, estimated effort (i.e., story point), 
// actual effort, timestamp for each state change (or start/due time), 
// tag, attachment file, etc.
const Card = require('../model/card');
const Todo = require('../model/todo');
const Item = require('../model/item');


describe('Card', function() {
  let card;
  let cardName = 'name';
  let todoList = [];

  beforeEach(function() {
    initializeTodoList();
    card = new Card(cardName);
    console.log('global setup');
  });
  
  function initializeTodoList() {
      for (let i = 0; i < 3; i++) {
        let todo = createTodo();
        todoList.push(todo);
      }
  }

  function createTodo() {
      let todo = new Todo('123');
      for (let i = 0; i < 3; i++) {
          let item = createItem();
          todo.addItem(item);
      }
      return todo;
  }

  function createItem() {
      let item = new Item('123');
      return item;
  }


  afterEach(function() {
    todoList = [];
    console.log('global teardown');
  });
  
  describe('#card', () => {
    // 測試算出來的平均是不是 2.5
    it('test card constructor', function() {
      //var cardName = 'name';
      //var card = new Card(cardName);
      assert.equal(card.name(), cardName);
    });
  
    it('test set description of the card', function() {
      assert.equal(card.description(), '');
      var description = 'this is a test';
      card.setDescription(description);
      assert.equal(card.description(), description);
    });

    it('test to do list of the card', function() {
      assert.equal(card.getTodoListSize(), 0);
      let todo = new Todo('Todo List');
      card.addTodo(todo);
      assert.equal(card.getTodoListSize(), 1);
    });


    it('test card calculate complete task', () => {
      card.addTodoList(todoList);
      assert.equal(card.taskSize(), 9);
      assert.equal(card.completeTaskSize(), 0);
      todoList[0].markItemDoneByIndex(0);
      todoList[0].markItemDoneByIndex(1);
      todoList[0].markItemDoneByIndex(2);
      assert.equal(card.completeTaskSize(), 3);
      todoList[1].markItemDoneByIndex(0);
      todoList[1].markItemDoneByIndex(1);
      todoList[1].markItemDoneByIndex(2);
      assert.equal(card.completeTaskSize(), 6);
      todoList[2].markItemDoneByIndex(0);
      todoList[2].markItemDoneByIndex(1);
      todoList[2].markItemDoneByIndex(2);
      assert.equal(card.completeTaskSize(), 9);

    });


  })  
});
