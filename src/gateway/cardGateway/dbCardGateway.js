const DomainGateway = require('../domainGateway');

const TodoGateway = require('../todoGateway/dbTodoGateway');

const connection = require('../../db');
const Card = require('../../model/card');

module.exports = class DBCardGateway extends DomainGateway {
    constructor() {
        super();
        this._todoGateway = new TodoGateway();
    }

    findSQL(id) {
        return `select * from card where id = ${id}`;
    }

    insertSQL(domainObj) {
        return `INSERT INTO Card (id, name, description, taskFK) VALUES (NULL, '${domainObj.name()}', '${domainObj.description()}', ${domainObj.taskFk()})`;
    }

    updateSQL(domainObj) {
        return `update card set name = '${domainObj.name()}', description = '${domainObj.description()}' where id = ${domainObj.id()};`;
    }

    deleteSQL(id) {
        return `delete from card where id = ${id}`;
    }

    clearAllSQL() {
        return `delete from card`;
    }

    async find(id) {
        let card = await super.find(id);
        if (card == null)
            return null;

        let todoGateway = new TodoGateway();
        let todoList = await todoGateway.loadTodoFor(card);
        card.setTodoList(todoList);
        return card;
    }

    loadDomainObjWithRow(row) {
        let card = new Card(row.name);
        card.setDescription(row.description);
        card.setId(row.id);
        return card;
    }

    async loadCardFor(task) {
        let sql = `select * from card where taskFk = ${task.id()}`;
        let rows = await super.createPromise(sql);
        let cardList = [];
        for (let i = 0; i < rows.length; i++) {
            let card = this.loadDomainObjWithRow(rows[i]);
            
            let todoList = await this._todoGateway.loadTodoFor(card);
            card.addTodoList(todoList);

            cardList.push(card);
        }
        return cardList;
    }
};