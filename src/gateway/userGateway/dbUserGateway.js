const DomainGateway = require('../domainGateway');

const User = require('../../model/user');
const bcrypt = require('bcrypt-nodejs');


module.exports = class DBUserGateway extends DomainGateway {
    constructor() {
        super();
    }


    createHashPromise(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, function(err, hash) {
                if (err)
                    reject(err);                
                resolve(hash);
            });    
        });
    }

    createComparePromise(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, res) {
                if (err)
                    reject(err);
                resolve(res);
            });    
        });
    }

    findSQL(id) {
        return `select * from user where email = ${id}`;
    }

    insertSQL(domainObj) {
        let hash = bcrypt.hashSync(domainObj.password());
        return `insert into user(id, email, password, create_at, update_at)  values(null, '${domainObj.email()}', '${hash}', null, null)`;
    }
  
    updateSQL(domainObj) {
        return `update user set email = '${domainObj.email()}' where id = ${domainObj.id()}`;
    }
  
    deleteSQL(id) {
        return `delete from user where id = ${id}`;
    }
  
    clearAllSQL() {
        return `delete from user`;
    }

    loadDomainObjWithRow(row) {
        let user = new User();
        user.setId(row.id);
        user.setEmail(row.email);
        user.setPassword(row.password);
        return user;
    }

    // async find(email, password) {
    //     let sql = `select * from user where email = '${email}'`;
    //     let row = await this.createPromise(sql);
    //     if (row.length == 0)
    //         return null;
        
    //     let user = this.loadDomainObjWithRow(row[0]);
    //     // let isMatch = await this.createComparePromise(password, user.password());
    //     // if (!isMatch)
    //     //     return null;
    //     return user;
    // }



    async insert(domainObj) {
        let user = await this.find(domainObj.email());
        if (user != null)
            throw Error('EMAIL CAN NOT DUPLICATE!');
        return super.insert(domainObj);
    }

    // async find(id) {
    //     throw Error ('method find with id can not invoked');
    // }

    // async loadTodoFor(card) {
    //     let sql = `select * from todo where cardFk = ${card.id()}`;
    //     let rows = await super.createPromise(sql);

    //     let todoList = [];
    //     for (let i = 0; i < rows.length; i++) {
    //         let todo = this.loadDomainObjWithRow(rows[i]);
    //         todoList.push(todo);
    //     }

    //     return todoList;
    // }
};