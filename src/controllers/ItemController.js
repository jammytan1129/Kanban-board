//const connection = require('../db');
const TodoGateway = require('../gateway/todoGateway/dbTodoGateway');
const ItemGateway = require('../gateway/itemGateway/dbItemGateway');

const GatewayFactory = require('../gateway/gatewayFactory');
 
module.exports = {
  async addItem(req, res) {
    let gateway = GatewayFactory.createTodoGateway();
    const result = await gateway.find(1);
    res.send(result);
  },
  async loadAllItem(req, res) {
    res.send('loadAllItem');
  },
  async updateItem(req, res) {
    let gateway = GatewayFactory.createItemGateway();
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