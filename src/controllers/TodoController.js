const GatewayFactory = require('../gateway/gatewayFactory');

module.exports = {
  async findAllTodo(req, res) {
    let gateway = GatewayFactory.createTodoGateway();
    let allTodo = await gateway.loadAll();
    res.send(allTodo);
  },
  async findCertainTodo(req, res) {
    let todoId = req.params.todoId;
    let gateway = GatewayFactory.createTodoGateway();
    let todo = await gateway.find(todoId);
    res.send(todo);
  }
}