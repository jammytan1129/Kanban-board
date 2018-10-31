const DomainGateway = require('../domainGateway');
const Card = require('../../model/card');

module.exports = class InMemoryCardGateway extends DomainGateway {
    constructor(database) {
        super(database);
        this._hash = {};
        this._index = 0;
    }

    setTaskGateway(taskGateway) {
        this._taskGateway = taskGateway;
    }

    async loadPriorityWithTaskFk(taskFk) {
        let task = await this._taskGateway.find(taskFk);
        return task.getCardListSize();
    }

    async insert(domainObj) {
        this._hash[this._index] = domainObj;
        domainObj.setId(this._index++);
        return domainObj;
    }

    async find(id) {
        return this._hash[id];
    }


    // need to change....
    async update(domainObj) {        
        this._hash[domainObj.id()] = domainObj;
        let task = await this._taskGateway.find(domainObj.taskFk());
        task.addCard(domainObj);        
        await this._taskGateway.update(task);

        task = await this._taskGateway.find(domainObj.pre_taskFK);
        task.removeCard(domainObj);
        await this._taskGateway.update(task);

        return 'update';
    }

    async delete(id) {
        delete this._hash[id];
        return 'delete';
    }

    async clearAll() {
        this._hash = {};
    }
};