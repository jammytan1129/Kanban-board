var assert = require('assert');

const BoardCRUDUseCase = require('../../usecase/boardCRUDUseCase');
const FakeGateway = require('../../gateway/fakeGateway');

const Board = require('../../model/board');
const Task = require('../../model/task');

describe('TaskUseCase', function() {
    let boardCRUDUseCase;
    let boardGateway;
    let board;

    function createTask(state, priority) {
        let task = new Task(state);
        task.setPriority(priority);
        task.setId(priority);
        return task
    }

    function createTaskList() {
        let taskList = [];
        taskList.push(createTask('initial', 0));
        taskList.push(createTask('in-progress', 1));
        taskList.push(createTask('done', 2));
        taskList.push(createTask('give up', 3));
        return taskList;
    }

    function createBoard(name) {
        board = new Board(name);
        board.setId(0);
        board.setTaskList(createTaskList());
    }

    beforeEach(function(done) {
        createBoard('test board');
        boardGateway = new FakeGateway();
        let result = boardGateway.insert(board);
        result.then(insertedBoard => {
            boardCRUDUseCase = new BoardCRUDUseCase(boardGateway);
            done();    
        });
    });
  
    afterEach(function(done) {
        done();
    });
  
  describe('#boardUseCase', () => {
    it('test changeTaskPriority', function(done) {
        let inputData = {
            boardFk: 0,
            taskId: 0,
            priority: 3
        };

        let result = boardCRUDUseCase.changeTaskPriority(inputData);
        result.then(board => {
          let order = [1, 2, 3, 0];
          let taskList = board.taskList(); 
          for (let i = 0; i < taskList.length; i++) {
              assert.equal(taskList[i].id(), order[i]);
          }   
          done();
        });
    });
  })  
});
