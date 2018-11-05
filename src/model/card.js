module.exports = class Card {
  constructor(name) {
    this._name = name;
    this._description = '';
    this._todoList = [];
    this._id;
    this._taskFk;
    this._priority;
  }

  priority() {
    return this._priority;
  }

  setPriority(priority) {
    this._priority = priority;
  }

  taskFk() {
    return this._taskFk;
  }

  setTaskFk(taskFk) {
    this._taskFk = taskFk;
  }
  
  setId(id) {
    this._id = id;
  }

  setTodoList(todoList) {
    this._todoList = todoList;
  }

  addTodoList(todoList) {
    this._todoList = todoList;
  }

  id() {
    return this._id;
  }

  setName(name) {
    this._name = name;
  }
  
  taskSize() {
    let count = 0;
    for (let i = 0; i < this._todoList.length; i++) {
        count += this._todoList[i].itemSize();
    }
    return count;
  }

  completeTaskSize() {
    let count = 0;
    for (let i = 0; i < this._todoList.length; i++) {
        count += this._todoList[i].getCompleteItemCount();
    }
    return count;
  }

  name() {
    return this._name;
  }

  description() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  addTodo(todo) {
    this._todoList.push(todo);
  }

  getTodoListSize() {
    return this._todoList.length;
  }
};