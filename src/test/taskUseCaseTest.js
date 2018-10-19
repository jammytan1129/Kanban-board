var assert = require('assert');

const TaskCRUDUseCase = require('../usecase/taskCRUDUseCase');
const TaskGateway = require('../gateway/taskGateway/inMemoryTaskGateway');

describe('TaskUseCase', function() {
    let taskCRUDUseCase;
    let taskGayeway;
    let taskStructure;

    beforeEach(function(done) {
        taskStructure = {
            state: 'in-progress'
        };
        taskGateway = new TaskGateway();
        taskCRUDUseCase = new TaskCRUDUseCase(taskGateway);
        done();
    });
  
    afterEach(function(done) {
        console.log('global teardown');
        done();
    });
  
  describe('#column', () => {
    it('insert new task', function(done) {
        let result = taskCRUDUseCase.insertNewTaskToColumn(taskStructure);
        result.then(insertedTask => {
            console.log(insertedTask);
            assert.equal(insertedTask.state(), 'in-progress');
            done();
        });
    });

    it('insert and find task', function(done) {
        let result = taskCRUDUseCase.insertNewTaskToColumn(taskStructure);
        let tempTask;
        result
        .then(insertedTask => {
           tempTask = insertedTask;
           return taskCRUDUseCase.findTask(insertedTask.id());
        })
        .then(targetTask => {
            assert.equal(targetTask.state(), tempTask.state());
            assert.equal(targetTask.id(), tempTask.id());
            done();
        }); 
    });

    it('delete task by id', function(done) {
        let result = taskCRUDUseCase.insertNewTaskToColumn(taskStructure);
        result
        .then(insertedTask => {
            return taskCRUDUseCase.deleteTask(insertedTask.id());
        })
        .then(deletedResult => {
            console.log(deletedResult);
            done();
        });
    });

  })  
});
