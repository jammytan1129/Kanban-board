const AuthController = require('../controllers/AuthController');
let passport = require('passport')

module.exports = (app) => {
  /*
  {
    id{userId}
  }
  */
  app.post('/register',
    AuthController.register);

  app.get('/register',
    AuthController.renderRegisterPage)

  app.get('/logout',
    AuthController.logout);

  app.get('/login',
   AuthController.renderLoginPage);

  app.post('/login',
    passport.authenticate('local'),
    AuthController.login);

  app.post('/findUserBoards', 
    AuthController.findUserBoards);  
  
  app.get('/testUserLogin',
    AuthController.testUserLogin);
  
  app.post('/addNewBoard',
    AuthController.createNewBoard);
  
  app.get('/userProfile',
    AuthController.renderUserProfilePage);
  
};