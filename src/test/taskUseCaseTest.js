var assert = require('assert');

const TaskCRUDUseCase = require('../usecase/taskCRUDUseCase');
const TaskGateway = require('../gateway/taskGateway/inMemoryTaskGateway');
const CardGateway = require('../gateway/cardGateway/inMemoryCardGateway');
const Task = require('../model/task');
const Card = require('../model/card');

describe('TaskUseCase', function() {
    let taskCRUDUseCase;
    let taskGateway;
    let cardGateway;
    let taskStructure;
    let cardIndex;
    beforeEach(function(done) {
        cardIndex = 0;
        taskStructure = {
            state: 'in-progress'
        };
        taskGateway = new TaskGateway(null);
        cardGateway = new CardGateway(null);
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

    function createCard(priority) {
        let card = new Card('this is my card');
        card.setPriority(priority % 4);
        card.setId(priority);
        return card;
    }
    
    function createCardList() {
        let cardList = [];
        cardList.push(createCard(cardIndex++));
        cardList.push(createCard(cardIndex++));
        cardList.push(createCard(cardIndex++));
        cardList.push(createCard(cardIndex++));
        return cardList;
    }

    async function insertTaskToDB() {
        let task = new Task('123');
        let cardList = createCardList();
        task.setCardList(cardList);
        let result = await taskGateway.insert(task);
        for (let i = 0; i < cardList.length; i++) {
            cardList[i].setTaskFk(task.id());
            await cardGateway.insert(cardList[i]);
        }
        return result;
    }

    // it('change priority', function(done) {
    //     let cardStructure = {
    //         id: 0,
    //         priority: 2,
    //         taskFk: 0
    //     };
    //     let result = insertTaskToDB();
    //     result.then(insertedTask => {
    //         return taskCRUDUseCase.changeCardPriority(cardStructure);
    //     })
    //     .then(task => {
    //         let cardList = task.cardList();
    //         let order = [1, 2, 0, 3];
    //         for (let i = 0; i < cardList.length; i++) {
    //             assert.equal(cardList[i].id(), order[i]);
    //         }
    //         done();
    //     });
    // });

    class FakeTaskUseCase extends TaskCRUDUseCase {
        constructor(taskGateway) {
            super(taskGateway);
            this._cardGateway;
        }

        setCardGateway(cardGateway) {
            this._cardGateway = cardGateway;
        }

        createCardGateway() {
            return this._cardGateway;
        }

        async updateCardToNewTask(strcture) {
            let cardGateway = this.createCardGateway();
            let card = await cardGateway.find(strcture.id);
            card.setTaskFk(strcture.targetTaskFk);
            let priority = await cardGateway.loadPriorityWithTaskFk(strcture.targetTaskFk);
            card.setPriority(priority);
            card['pre_taskFK'] = strcture.taskFk;
            await cardGateway.update(card);
        }
    };

    it('changeTaskOfCardAndCardPriority', (done) => {
        let fakeTaskUseCase = new FakeTaskUseCase(taskGateway);
        fakeTaskUseCase.setCardGateway(cardGateway);
        cardGateway.setTaskGateway(taskGateway);
        let cardStructure = {
            id: 0,
            priority: 2,
            taskFk: 0,
            targetTaskFk: 1
        };

        let result = insertTaskToDB();
        result
        .then(insertedTask => {
            return insertTaskToDB();
        })
        .then(insertedTask => {
            return fakeTaskUseCase.changeTaskOfCardAndCardPriority(cardStructure);
        }) 
        .then(task => {
            let cardList = task.cardList();
            let order = [4, 5, 0, 6, 7];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            return taskGateway.find(cardStructure.taskFk);
        })
        .then(finalTask => {
            let cardList = finalTask.cardList();
            let order = [1, 2, 3];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            done();
        })
    });


    it('changeTaskOfCardAndCardPriority2', (done) => {

        let fakeTaskUseCase = new FakeTaskUseCase(taskGateway);
        fakeTaskUseCase.setCardGateway(cardGateway);
        cardGateway.setTaskGateway(taskGateway);

        let cardStructure = {
            id: 5,
            priority: 2,
            taskFk: 1,
            targetTaskFk: 0
        };
        
        let result = insertTaskToDB();
        result
        .then(insertedTask => {
            return insertTaskToDB();
        })
        .then(insertedTask => {
            return fakeTaskUseCase.changeTaskOfCardAndCardPriority(cardStructure);
        }) 
        .then(task => {
            let cardList = task.cardList();
            let order = [0, 1, 5, 2, 3];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            return taskGateway.find(cardStructure.taskFk);
        })
        .then(finalTask => {
            let cardList = finalTask.cardList();
            let order = [4, 6, 7];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            done();
        })
    });

    it('changeTaskOfCardAndCardPriority3', (done) => {

        let fakeTaskUseCase = new FakeTaskUseCase(taskGateway);
        fakeTaskUseCase.setCardGateway(cardGateway);
        cardGateway.setTaskGateway(taskGateway);

        let cardStructure = {
            id: 3,
            priority: 4,
            taskFk: 0,
            targetTaskFk: 1
        };
        
        let result = insertTaskToDB();
        result
        .then(insertedTask => {
            return insertTaskToDB();
        })
        .then(insertedTask => {
            return fakeTaskUseCase.changeTaskOfCardAndCardPriority(cardStructure);
        }) 
        .then(task => {
            let cardList = task.cardList();
            let order = [4, 5, 6, 7, 3];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            return taskGateway.find(cardStructure.taskFk);
        })
        .then(finalTask => {
            let cardList = finalTask.cardList();
            let order = [0, 1, 2];
            for (let i = 0; i < cardList.length; i++) {
                assert.equal(cardList[i].id(), order[i]);
            }
            done();
        })
    });
  })  
});
