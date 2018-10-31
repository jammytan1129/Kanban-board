const DomainGateway = require('../domainGateway');
const Task = require('../../model/task');

module.exports = class InMemoryTaskGateway extends DomainGateway {
    constructor() {
        super();
        this._hash = {};
        this._index = 0;
    }

    // isEmailDuplicate(task) {
    //     let hash = this._hash;
    //     let isDuplicate = false;


    //     Object.keys(hash).forEach(function (key) { 
    //         let eachUser = hash[key];
    //         console.log(eachUser);
    //         console.log(user);
    //         if (eachUser.email() === user.email()) 
    //             isDuplicate = true;
    //     });

    //     return isDuplicate;
    // }

    async insert(task) {
        //if (this.isEmailDuplicate(user))
        //    throw Error('EMAIL CAN NOT DUPLICATE!');
        task.setId(this._index);
        this._hash[this._index++] = task;
        return task;
    }

    async save(task) {
        this._hash[task.id()] = task;
        return 'save';
    }

    async find(id) {
        return this._hash[id];
    }

    async update(task) {
        this._hash[task.id()] = task;
        return 'update';
    }

    async delete(id) {
        delete this._hash[id];
        return 'delete';
    }

    clearAll() {
        this._hash = {};
    }

    
    loadDomainObjWithRow(row) {
        let task = new Task(row.state);
        task.setId(row.id);
        return task;
    }

    
    // async insert(domainObj) {

    // }

    // async find(id) {
    // }

    // async update(domainObj) {
    // }

    // async delete(id) {
    // }

};