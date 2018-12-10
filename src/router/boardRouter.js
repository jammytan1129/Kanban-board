const BoardController = require('../controllers/BoardController');
const path = require('path');

module.exports = (app) => {
  /*
  {
    id(mongodb 的Id)
  }
  */
  app.post('/fetchBoardDataById',
    BoardController.fetchBoardDataById);
  
  app.post('/fetchUserBoards', BoardController.fetchUserBoards);

  /*
  {
      boardId:....
      title:.....
  }
  */
  app.post('/insertNewStage',
    BoardController.insertNewStage);
  /* 
  {
      stageId,
      title
  }
  */
  app.post('/insertNewCard',
    BoardController.insertNewCardToStage);
  /* 
  {
      boardId,
      userId
  }
  */
  app.post('/addNewMember', BoardController.addNewMember);

  app.get('/board',
    BoardController.renderBoard
  );

  let authMiddleware = function (req, res, next) {
    if (req.user)
      next();
    else
      res.redirect('/login'); 
  };

  app.get('/userBoards',
    authMiddleware,
    BoardController.renderUserBoards
  );

  app.get('/board/:boardFk',
    BoardController.renderBoard);

  app.post('/createBoard', BoardController.createBoard);

  app.post('/addNewCard', BoardController.addNewCard);

  app.post('/addNewStage', BoardController.addNewStage);

  app.post('/removeStage', BoardController.removeStage);

  app.post('/removeCard', BoardController.removeCard);
};