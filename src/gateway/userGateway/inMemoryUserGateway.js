const DomainGateway = require('../domainGateway');
const User = require('../../model/user');

module.exports = class InMemoryUserGateway extends DomainGateway {
    constructor() {
        super();
        this._hash = {};
        this._index = 0;
    }

    isEmailDuplicate(user) {
        let hash = this._hash;
        let isDuplicate = false;


        Object.keys(hash).forEach(function (key) { 
            let eachUser = hash[key];
            console.log(eachUser);
            console.log(user);
            if (eachUser.email() === user.email()) 
                isDuplicate = true;
        });

        return isDuplicate;
    }

    async insert(user) {
        if (this.isEmailDuplicate(user))
            throw Error('EMAIL CAN NOT DUPLICATE!');

        user.setId(this._index);
        this._hash[this._index++] = user;
        return user;
    }

    async find(id) {
        console.log(this._hash[id]);
        return this._hash[id];
    }

    async update(user) {
        this._hash[user.id()] = user;
    }

    clearAll() {
        this._hash = {};
    }

    loadDomainObjWithRow(domainObj) {
        let user = new User();
        user.setEmail(domainObj.email);
        user.setPassword(domainObj.password);
        return user;
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