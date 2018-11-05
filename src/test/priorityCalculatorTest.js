var assert = require('assert');

const PriorityCalculator = require('../model/priorityCalculator');

const Task = require('../model/task');


describe('Card', function() {
  let priorityCalculator;
  let taskList;
  function createTask(state, priority) {
    let task = new Task(state);
    task.setPriority(priority);
    task.setId(priority);
    return task;
  }

  function createTaskList() {
    let taskList = [];
    taskList.push(createTask('done', 0));
    taskList.push(createTask('don', 1));
    taskList.push(createTask('do', 2));
    taskList.push(createTask('d', 3));
    return taskList;
  } 

  beforeEach(function() {
    taskList = createTaskList();
    priorityCalculator = new PriorityCalculator(taskList);
    console.log('global setup');
  });
  
  afterEach(function() {
    console.log('global teardown');
  });
  
  describe('#calculator', () => {
    it('test find element', function() {
        let target = priorityCalculator.findElementById(0);
        assert.equal(target, taskList[0]);
        target = priorityCalculator.findElementById(3);
        assert.equal(target, taskList[3]);
        target = priorityCalculator.findElementById(1);
        assert.equal(target, taskList[1]);
        target = priorityCalculator.findElementById(2);
        assert.equal(target, taskList[2]);
    }); 

    it('test remove element', () => {
        priorityCalculator.removeElement(taskList[0]);
        let target = priorityCalculator.findElementById(0);
        assert.equal(target, undefined);

        priorityCalculator.removeElement(taskList[2]);
        target = priorityCalculator.findElementById(2);
        assert.equal(target, undefined);

        priorityCalculator.removeElement(taskList[1]);
        target = priorityCalculator.findElementById(1);
        assert.equal(target, undefined);

    });

    it('test getElementByIndex', function() {
        let index = 0;
        assert.equal(taskList[index], priorityCalculator.getElementByIndex(index));
    })

    it('test insert element with priority', function() {
        let insertedTask = new Task('fuck');
        let priority = 2;
        priorityCalculator.insertElementWithPriority(insertedTask, priority);
        assert.equal(insertedTask, priorityCalculator.getElementByIndex(2));
    })

    it('test changeElementPriority', function() {
        let elementId = 2;
        let priority = 0;
        priorityCalculator.changeElementPriority(elementId, priority);
        
        let list = priorityCalculator.getElementList();

        let result = [2, 0, 1, 3];
        for (let i = 0; i < list.length; i++) {
            assert.equal(list[i].id(), result[i]);
        }
    });
  });
});
