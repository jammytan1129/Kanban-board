const BoardRouter = require('./boardRouter');
const UserRouter = require('./userRouter');

module.exports = (app) => {
  
  BoardRouter(app);
  
  UserRouter(app);
};