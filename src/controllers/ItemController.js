//const connection = require('../db');
const TodoGateway = require('../gateway/todoGateway/dbTodoGateway');
const ItemGateway = require('../gateway/itemGateway/dbItemGateway');

module.exports = {
  async addItem(req, res) {
    var gateway = new TodoGateway();
    const result = await gateway.find(1);
    res.send(result);
  },
  async loadAllItem(req, res) {
    res.send('loadAllItem');
  },
  async updateItem(req, res) {
    let gateway = new ItemGateway();
    let item = await gateway.find(req.params.itemId);
    item.setContent(req.body.content);
    item.setIsDone(req.body.isDone);
    let result = await gateway.update(item);
    res.send(result);
  },
  async removeItem(req, res) {
    res.send('removeItem');
  }
}