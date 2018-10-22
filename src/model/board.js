module.exports = class Board {
    constructor(boardName) {
        this._id;
        this._boardName = boardName;
        this._taskList = [];
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