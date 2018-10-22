const DomainGateway = require('../domainGateway');
const ItemGateway = require('../itemGateway/dbItemGateway');

//const connection = require('../../db');
const Todo = require('../../model/todo');
const Item = require('../../model/item');

module.exports = class DBTodoGateway extends DomainGateway {
    constructor() {
        super();
        this._itemGateway = new ItemGateway();
    }

    loadDomainObjWithRow(row) {
        let todo = new Todo(row.title);
        todo.setId(row.id);
        todo.setCardFk(row.cardFk);
        return todo;
    }
  
    findSQL(id) {
        return `select * from todo where id = ${id}`;
    }
  
    insertSQL(domainObj) {
        return `insert into todo(id, title, create_at, update_at, cardFk)  values(null, '${domainObj.title()}', null, null, ${domainObj.cardFk()})`;
    }
  
    updateSQL(domainObj) {
        return `update todo set title = '${domainObj.title()}' where id = ${domainObj.id()}`;
    }
  
    deleteSQL(id) {
        return `delete from todo where id = ${id}`;
    }
  
    clearAllSQL() {
        return `delete from todo`;
    }

    async find(id) {
        let todo = await super.find(id);  
        if (todo == null)
            return null;

        let itemGateway = new ItemGateway();
        let itemList = await itemGateway.loadItemFor(todo);
        todo.setItemList(itemList);
        return todo;
    }

    async loadTodoFor(card) {
        let sql = `select * from todo where cardFk = ${card.id()}`;
        let rows = await super.createPromise(sql);

        let todoList = [];
        for (let i = 0; i < rows.length; i++) {
            let todo = this.loadDomainObjWithRow(rows[i]);
            let itemList = await this._itemGateway.loadItemFor(todo);
            todo.setItemList(itemList);
            todoList.push(todo);
        }

        return todoList;
    }
};