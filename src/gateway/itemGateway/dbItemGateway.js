// const connection = require('../../db');
const Item = require('../../model/item');
const DomainGateway = require('../domainGateway');

module.exports = class DBItemGateway extends DomainGateway {
    constructor(database) {
        super(database);
    }


    findSQL(id) {
        return `select * from item where id = ${id}`;
    }

    insertSQL(domainObj) {
        return `insert into item(id, content, isDone, create_at, update_at, todoFk) values(null, '${domainObj.content()}', 0, null, null, ${domainObj.todoFk()});`
    }

    updateSQL(domainObj) {
        return `update item set content = '${domainObj.content()}', isDone = ${domainObj.isDone()} where id = ${domainObj.id()};`;
    }

    deleteSQL(id) {
        return `delete from item where id = ${id}`;
    }

    clearAllSQL() {
        return `delete from task`;
    }

    loadDomainObjWithRow(row) {
        let item = new Item(row.content);
        item.setId(row.id);
        item.setIsDone(row.isDone);
        item.setTodoFk(row.todoFk);
        return item;
    }

    // async loadItemFor(todo) {
    //     let sql = `select * from item where todoFk = ${todo.id()}`;
    //     let rows = await super.createPromise(sql);

    //     let items = [];
    //     for (let i = 0; i < rows.length; i++) {
    //         let item = this.loadDomainObjWithRow(rows[i]);
    //         items.push(item);
    //     }
    //     return items;
    // }
    loadDomainForSQL(key) {
        return `select * from item where todoFk = ${key}`;
    }
  

};