const CardRouter = require('./cardRouter');
const TaskRouter = require('./taskRouter');
const BoardRouter = require('./boardRouter');
const UserRouter = require('./userRouter');

module.exports = (app) => {
  CardRouter(app);

  TaskRouter(app);
  
  BoardRouter(app);
  
  UserRouter(app);
};