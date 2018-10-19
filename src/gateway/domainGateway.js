const connection = require('../db');

module.exports = class DomainGateway {
  constructor() {

  }
  // abstract method
  loadDomainObjWithRow(row) {

  }

  findSQL(id) {

  }

  insertSQL(domainObj) {

  }

  updateSQL(domainObj) {
        
  }

  deleteSQL(id) {

  }

  clearAllSQL() {

  }
  // 

  async insert(domainObj) {
    let sql = this.insertSQL(domainObj);
    let row = await this.createPromise(sql);
    domainObj.setId(row.insertId);
    return domainObj;
  }

  async find(id) {
    let sql = this.findSQL(id);

    let row = await this.createPromise(sql);
    if (row.length == 0)
        return null;

    let domainObj = this.loadDomainObjWithRow(row[0]);
    return domainObj;
  }

  async update(domainObj) {
    let sql = this.updateSQL(domainObj);
    let updateResult = await this.createPromise(sql);
    return updateResult;
  }

  async delete(id) {
    let sql = this.deleteSQL(id);
    let deleteResult = await this.createPromise(sql);
    return deleteResult;
  }

  async query(sql) {
    let result = await createPromise(sql);
    return result;
  }

  createPromise(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
                reject(err);
            resolve(result);
        });
    });
  }

  async clearAll() {
    let sql = this.clearAllSQL();
    let result = await this.createPromise(sql);
    return result
  }



};