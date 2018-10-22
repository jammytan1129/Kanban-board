const TodoGateway = require('../gateway/todoGateway/dbTodoGateway');

module.exports = {
  async init(req, res) {
    res.send('init');
  },
  async findAllTodo(req, res) {
    let gateway = new TodoGateway();
    res.json(await gateway.loadAllTodo());
  },
  async findCertainTodo(req, res) {
    let todoId = req.params.todoId;
    let gateway = new TodoGateway();
    let todo = await gateway.find(todoId);
    res.send(todo);
  },
  async addItemToTodo(req, res) {
    res.send('...');
  }
}