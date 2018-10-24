
module.exports = class DomainGateway {
  constructor(database) {
    this._database = database;
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
  async connection() {
    let threadId = await this._database.connection();
    return threadId;
  }

  async close() {
    let closeResult = await this._database.close();
    return closeResult;
  }

  async insert(domainObj) {
    let sql = this.insertSQL(domainObj);    
    let row = await this._database.query(sql);
    domainObj.setId(row.insertId);
    return domainObj;
  }

  async find(id) {
    let sql = this.findSQL(id);
    let row = await this._database.query(sql);
    if (row.length == 0)
        return null;
    let domainObj = this.loadDomainObjWithRow(row[0]);
    return domainObj;
  }

  async update(domainObj) {
    let sql = this.updateSQL(domainObj);
    let updateResult = await this._database.query(sql);
    return updateResult;
  }

  async delete(id) {
    let sql = this.deleteSQL(id);
    let deleteResult = await this._database.query(sql);
    return deleteResult;
  }

  async clearAll() {
    let sql = this.clearAllSQL();
    let result = await this._database.query(sql);
    return result
  }

  loadDomainForSQL(key) {

  }

  async loadDomainWithForeignKey(key) {
    let sql = this.loadDomainForSQL(key);
    let rows = await this._database.query(sql);
    let domainList = [];
    for (let i = 0; i < rows.length; i++) {
        let domain = this.loadDomainObjWithRow(rows[i]);
        domainList.push(domain);
    }
    return domainList;
  }
};