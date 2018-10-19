const TaskCRUDUseCase = require('../usecase/taskCRUDUseCase');
const TaskGateway = require('../gateway/taskGateway/dbTaskGateway');

module.exports = {
  async insertTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(new TaskGateway());
    let task = await taskCRUDUseCase.insertNewTaskToColumn(req.body);
    res.send(task);
  },
  async deleteTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(new TaskGateway());
    let deletedResult = await taskCRUDUseCase.deleteTask(req.body.id);
    res.send(deletedResult);
  },
  async findTask(req, res) {
    let taskCRUDUseCase = new TaskCRUDUseCase(new TaskGateway());
    let task = await taskCRUDUseCase.findTask(req.body.id);
    res.send(task);
  },
  async updateTask(req, res) {
    console.log(req.body);
    let taskCRUDUseCase = new TaskCRUDUseCase(new TaskGateway());
    let updateResult = await taskCRUDUseCase.updateTask(req.body);
    res.send(updateResult);
  },
  async loadAllTask(req, res) {
    res.send('all');
  },
  async test(req, res) {
    res.send('123');
  }
}