const ItemController = require('../controllers/ItemController');
const TodoController = require('../controllers/TodoController');
const AuthController = require('../controllers/AuthController');
const TaskController = require('../controllers/TaskController');
const BoardController = require('../controllers/BoardController');

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
  
  app.get('/board',
    TaskController.board
  );
  
  app.get('/login',
  AuthController.renderLoginPage);

  app.post('/login',
    passport.authenticate('local'),
    AuthController.login);


  app.get('/allItem',
    ItemController.loadAllItem);

  app.post('/update/:itemId',
    ItemController.updateItem);

  app.post('/remove/:itemId',
    ItemController.removeItem);
    
  app.get('/Todo/loadAll',
    TodoController.findAllTodo);

  app.get('/Todo/:todoId',
    TodoController.findCertainTodo)

  app.post('/register',
    AuthController.register);

  app.get('/register',
    AuthController.renderRegisterPage)
  
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

  app.post('/priority',
    TaskController.changePriority);
  
  app.post('/changeBoardAndPriority',
    TaskController.changeTaskOfCardAndCardPriority);

  app.post('/changeTaskPriority',
    BoardController.changeTaskPriority);
};