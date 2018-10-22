var assert = require('assert');

const Board = require('../model/board');
const Task = require('../model/task');

describe('Card', function() {
  let board;  
  beforeEach(function() {
    board = new Board('trello board');
    console.log('global setup');
  });
  
  afterEach(function() {
    console.log('global teardown');
  });
  
  describe('#board', () => {
    it('test board constructor', function() {
      assert.equal(board.boardName(), 'trello board');
      board.setBoardName('trello');
      assert.equal(board.boardName(), 'trello');
    });
    
    it('taskList', function() {
      let taskList = board.taskList();
      assert.equal(taskList.length, 0);
      let list = [new Task('in-progress'), new Task('done')];
      board.setTaskList(list);

      taskList = board.taskList();
      assert.equal(taskList.length, 2);
      let result = ['in-progress', 'done'];
      for (let i = 0; i < taskList.length; i++) {
          assert.equal(taskList[i].state(), result[i]);
      }
    });


  })  
});
