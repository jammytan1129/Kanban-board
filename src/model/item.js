
module.exports = class Item {
  constructor(content) {
    this._content = content;
    this._isDone = false;
    this._id;
    this._createAt;
    this._updateAt;
    this._todoFk;
  }

  id() {
    return this._id;
  } 
   
  setId(id) {
    this._id = id;
  }

  setTodoFk(fk) {
    this._todoFk = fk;
  } 

  todoFk() {
    return this._todoFk;
  }
  
  markDone() {
    this._isDone = true;
  }

  content() {
    return this._content;
  }

  setContent(content) {
    this._content = content;
  }

  isDone() {
    return this._isDone;
  }

  cancelDone() {
    this._isDone = false;
  }

  setIsDone(isDone) {
    this._isDone = isDone;
  }
};