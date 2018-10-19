var assert = require('assert');


const DBTaskGateway = require('../gateway/taskGateway/dbTaskGateway');

const Task = require('../model/task');

describe('TodoGateway', function() {
  let taskGateway;
  let task;

  beforeEach(function(done) {
    task = new Task('in-progress');
    taskGateway = new DBTaskGateway();
    let result = taskGateway.clearAll();
    result
    .then(value => {
        done();
    })
    .catch(err => console.log(err));

  });
  
  afterEach(function(done) {
    done();
  });
  
  describe('#TaskGateway', () => { 
    it ('insert', function(done) {
        let result = taskGateway.insert(task);
        result.then(insertedTask => {
            assert.equal(insertedTask.state(), task.state());
            assert.equal(insertedTask.id(), task.id());
            done();
        });
    });
    
    it('test find task', function(done) {
        let result = taskGateway.insert(task);
        result
        .then(insertedTask => {
            return taskGateway.find(insertedTask.id());
        })
        .then(finalTask => {
            assert.equal(finalTask.id(), task.id());
            assert.equal(finalTask.state(), task.state());
            done();
        });
    });  

    it('update task', function(done) {
        let result = taskGateway.insert(task);

        result
        .then(insertedTask => {
            insertedTask.setState('in-progress-state');
            return taskGateway.update(insertedTask);
        })
        .then(updateResult => {
            return taskGateway.find(task.id());
        })
        .then(finalTask => {
            assert.equal(finalTask.id(), task.id());
            assert.equal(finalTask.state(), 'in-progress-state'); 
            done();           
        });
    });

    it('find null task', function(done) {
        let result = taskGateway.find(-100);
        result.then(task => {
            assert.equal(task, null)
            done();
        });
    });

    it('test delete task by id', function(done) {
        let result = taskGateway.insert(task);
        result
        .then(insertedTask => {
            return taskGateway.delete(insertedTask.id());
        })
        .then(deletedResult => {
            console.log(deletedResult);
            return taskGateway.find(task.id());
        })
        .then(finalTask => {
            assert.equal(finalTask, null);
            done();
        });
    });


    it('load all task', function(done) {
        let result = taskGateway.insert(task);
        result
        .then(insertedTask => {
            return taskGateway.insert(task);
        })
        .then(insertedTask => {
            return taskGateway.loadAllTask();
        })
        .then(todoList => {
            console.log(todoList);
            done();
        })
        .catch(err => console.log(err));
    });
  })
  
});
