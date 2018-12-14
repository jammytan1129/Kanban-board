const BoardRouter = require('./boardRouter');
const UserRouter = require('./userRouter');
const CardRouter = require('./cardRouter');

module.exports = (app) => { 
  BoardRouter(app);
  
  UserRouter(app);
  
  CardRouter(app);
};