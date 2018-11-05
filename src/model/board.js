const PriorityCalculator = require('./priorityCalculator');

module.exports = class Board {
    constructor(boardName) {
        this._id;
        this._boardName = boardName;
        this._taskList = [];
    }

    // findTaskById(id) {
    //     let task;
    //     for (let i = 0; i < this._taskList.length; i++) 
    //         if (this._taskList[i].id() == id)
    //             task = this._taskList[i];
    //     return task;
    // }

    // removeTask(task) {
    //     this._taskList = this._taskList.filter(function(e) { return e !== task });
    // }

    // resetPriority() {
    //     for (let i = 0; i < this._taskList.length; i++) 
    //         this._taskList[i].setPriority(i);
    // }

    // insertTaskWithPriority(task, priority) {
    //     this._taskList.splice(priority, 0, task);
    // }

    changeTaskPriority(id, changePriority) {
        let calculator = new PriorityCalculator(this._taskList);
        calculator.changeElementPriority(id, changePriority);
        this.setTaskList(calculator.getElementList());
    }

    addTask(task) {
        this._taskList.push(task);
    }

    taskList() {
        return this._taskList;
    }

    setTaskList(taskList) {
        this._taskList = taskList;
    }

    boardName() {
        return this._boardName;
    }

    setBoardName(boardName) {
        this._boardName = boardName;
    }

    id() {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }
}