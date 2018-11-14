const AuthController = require('../controllers/AuthController');

module.exports = (app) => {
  /*
  {
    id{userId}
  }
  */
  app.post('/findUserBoards', 
    AuthController.findUserBoards);  
  /*
  {
    
  } 
  */
  app.post('/addNewBoard',
    AuthController.createNewBoard);
};