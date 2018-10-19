const TodoGateway = require('./todoGateway');
module.exports = class InMemoryGateway extends TodoGateway {
    constructor() {
        super();
        this._hash = {};
        this._index = 0;
    }

    insert(todo) {
        todo.setId(this._index);
        this._hash[this._index++] = todo;
    }

    find(id) {
        return this._hash[id];
    }

    update(todo) {
        
    }

    loadAllTodo() {
        var myHash = this._hash;
        var todoList = [];
        //var findedTodo = this.find(todo.id());
        Object.keys(myHash).forEach(function(key) {
            todoList.push(myHash[key]);
        });
        return todoList;
    }
};