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
    // it('test board constructor', function() {
    //   assert.equal(board.boardName(), 'trello board');
    //   board.setBoardName('trello');
    //   assert.equal(board.boardName(), 'trello');
    // });
    
    // it('taskList', function() {
    //   let taskList = board.taskList();
    //   assert.equal(taskList.length, 0);
    //   let list = [new Task('in-progress'), new Task('done')];
    //   board.setTaskList(list);

    //   taskList = board.taskList();
    //   assert.equal(taskList.length, 2);
    //   let result = ['in-progress', 'done'];
    //   for (let i = 0; i < taskList.length; i++) {
    //       assert.equal(taskList[i].state(), result[i]);
    //   }
    // });

    it('add task', function() {
      let taskList = board.taskList();
      assert.equal(taskList.length, 0);
      let task = new Task('done');
      board.addTask(task);
      taskList = board.taskList();
      assert.equal(taskList.length, 1);
    });

    function createTask(state, priority) {
      let task = new Task(state);
      task.setPriority(priority);
      task.setId(priority);
      return task;
    }

    function insertTaskListIntoBoard() {
      board.addTask(createTask('done', 0));
      board.addTask(createTask('don', 1));
      board.addTask(createTask('do', 2));
      board.addTask(createTask('d', 3));
    }

    it('change taskList priority', function() {
      insertTaskListIntoBoard();
      // id, priority
      let taskId = 2;
      let priority = 0;
      board.changeTaskPriority(taskId, priority);
      
      let result = [2, 0, 1, 3];

      let taskList = board.taskList();
      for (let i = 0; i < taskList.length; i++) {
        assert.equal(taskList[i].id(), result[i]);
      }
    });




  })  
});
