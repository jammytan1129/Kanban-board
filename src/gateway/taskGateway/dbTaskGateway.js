const Task = require('../../model/task');
const DomainGateway = require('../domainGateway');

const CardGateway = require('../cardGateway/dbCardGateway');

module.exports = class DBTaskGateway extends DomainGateway {
    constructor(database) {
        super(database);
        this._cardGateway = new CardGateway(database);
    }

    loadDomainObjWithRow(row) {
        let task = new Task(row.state);
        task.setId(row.id);
        return task;
    }
  
    findSQL(id) {
      return `select * from task where id = ${id}`;
    }
  
    insertSQL(domainObj) {
      return `INSERT INTO task (id, state, create_at, update_at) VALUES (NULL, '${domainObj.state()}', null, null)`;
    }
  
    updateSQL(domainObj) {
        return `update task set state = '${domainObj.state()}' where id = ${domainObj.id()};`;
    }
  
    deleteSQL(id) {
        return `delete from task where id = ${id}`;
    }
  
    clearAllSQL() {
        return `delete from task`;
    }

    loadDomainForSQL(key) {
        return `select * from task where boardFk = ${key}`;
    }

    async find(id) {
        let task = await super.find(id);
        if (task == null)
            return null;
        
        let cardList = await this._cardGateway.loadDomainWithForeignKey(task.id());
        task.setCardList(cardList);
        return task;
    }

    async loadAllTask() {
        let sql = 'select id from task';
        let rows = await this._database.query(sql);

        let promises = [];
        for (let i = 0; i < rows.length; i++) {
           promises.push(this.find(rows[i].id));
        }

        let todoList = await Promise.all(promises);
        return todoList;
    }

    // // need to unit test ....
    // async loadTaskFor(board) {
    //     let sql = `select * from task where boardFk = ${board.id()}`;
    //     let rows = await super.createPromise(sql);

    //     let taskList = [];

    //     for (let i = 0; i < rows.length; i++) {
    //         let task = this.loadDomainObjWithRow(rows[i]);

    //         let cardList = await this._cardGateway.loadCardFor(task);
    //         task.setCardList(cardList);
    //         taskList.push(task);
    //     }

    //     return taskList;
    // }
    // async insert(task) {
    //     let sql = `INSERT INTO task (id, state, create_at, update_at) VALUES (NULL, '${task.state()}', null, null)`;
    //     let row = await super.createPromise(sql);
    //     task.setId(row.insertId);
    //     return task;
    // }

    // loadTaskWithRow(row) {
    //     let task = new Task(row.state);
    //     task.setId(row.id);
    //     return task;
    // }

    // async update(task) {
    //     let sql = `update task set state = '${task.state()}' where id = ${task.id()};`;
    //     let result = await this.createPromise(sql);
    //     return result;
    // }

    // async delete(id) {
    //     let sql = `delete from task where id = ${id}`;
    //     let result = await this.createPromise(sql);
    //     return result;
    // }

    // async clearAll() {
    //     let sql = `delete from task`;
    //     const result = await super.createPromise(sql);
    //     return result;
    // }
};
