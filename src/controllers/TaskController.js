const path = require('path');
const TaskCRUDUseCase = require('../usecase/taskCRUDUseCase');
const GatewayFactory = require('../gateway/gatewayFactory');

module.exports = {
  async insertTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(GatewayFactory.createTaskGateway());
    let task = await taskCRUDUseCase.insertNewTaskToColumn(req.body);
    res.send(task);
  },
  async deleteTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(GatewayFactory.createTaskGateway());
    let deletedResult = await taskCRUDUseCase.deleteTask(req.body.id);
    res.send(deletedResult);
  },
  async findTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(GatewayFactory.createTaskGateway());
    let task = await taskCRUDUseCase.findTask(req.body.id);
    res.send(task);
  },
  async updateTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(GatewayFactory.createTaskGateway());
    let updateResult = await taskCRUDUseCase.updateTask(req.body);
    res.send(updateResult);
  },
  async loadAllTask(req, res) {
    res.send('all');
  },
  async test(req, res) {
    res.send('123');
  },
  async findBoard(req, res) {
    let boardGateway = GatewayFactory.createBoardGateway();
    let board = await boardGateway.find(req.body.id);
    res.send(board);
  },
  async board(req, res){
    let pagePath = path.join(__dirname, '../views/pages/board');
    res.render(pagePath);
  }
}