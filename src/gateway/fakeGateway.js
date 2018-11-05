const DomainGateway = require('./domainGateway');

module.exports = class FakeGateway extends DomainGateway {
    constructor() {
        super(null);
        this._hash = {};
        this._index = 0;
    }

    async connection() {
        return threadId;
    }

    async close() {
        return closeResult;
    }

    async insert(domainObj) {
        this._hash[this._index] = domainObj;
        domainObj.setId(this._index++);
        return domainObj;
    }

    async find(id) {
        return this._hash[id];
    }

    async update(domainObj) {
        this._hash[domainObj.id()] = domainObj;
        return 'ok';
    }

    async save(domainObj) {
        this._hash[domainObj.id()] = domainObj;
        return 'ok';
    }

    async delete(id) {
        delete this._hash[id];
        return 'delete';    
    }

    async clearAll() {
        this._hash = {};
        return 'ok';
    }
    
};