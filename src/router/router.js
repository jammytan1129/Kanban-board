const ItemController = require('../controllers/ItemController');
const TodoController = require('../controllers/TodoController');
const AuthController = require('../controllers/AuthController');
const TaskController = require('../controllers/TaskController');

let passport = require('passport')


var parser = require('body-parser');
var urlencodedParser = parser.urlencoded({extended : false});

module.exports = (app) => {

  function isAuthenticated(req, res, next) {
    if (req.user)
        return next();
    res.redirect('/login');
  }
  
  app.post('/', 
    ItemController.addItem);
  
  app.get('/allItem',
    ItemController.loadAllItem);

  app.post('/update/:itemId',
    ItemController.updateItem);

  app.post('/remove/:itemId',
    ItemController.removeItem);

  app.get('/init',
    TodoController.init);

  app.get('/Todo/loadAll',
    TodoController.findAllTodo);

  app.get('/Todo/:todoId',
    TodoController.findCertainTodo)

  app.get('/test',
    TodoController.addItemToTodo);

  app.post('/register',
    AuthController.register);

  app.get('/register',
    AuthController.renderRegisterPage)
  
  app.get('/login',
    AuthController.renderLoginPage);

  app.post('/login',
    passport.authenticate('local'),
    AuthController.login);
  
  app.get('/logout',
    AuthController.logout);

  app.get('/index',
    AuthController.index);

  app.post('/insertTask',
    TaskController.insertTask);

  app.post('/deleteTask',
    TaskController.deleteTask);
  
  app.post('/findTask',
    TaskController.findTask);
  
  app.post('/updateTask',
    TaskController.updateTask);

  app.get('/allTask',
    TaskController.loadAllTask);

  app.get('/test123',
    isAuthenticated,
    TaskController.test);

  app.post('/findBoard',
    TaskController.findBoard);
};