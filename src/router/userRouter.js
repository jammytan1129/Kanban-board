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
  
  
  let authMiddleware = function (req, res, next) {
    if (req.user)
      next();
    else
      res.redirect('/login'); 
  };
    
  app.get('/userProfile',
    authMiddleware,
    AuthController.renderUserProfilePage);
  
  
  app.get('/userInfo', AuthController.getUserInfo); 
  
  app.post('/saveUserInfo', AuthController.saveUserInfo);
};