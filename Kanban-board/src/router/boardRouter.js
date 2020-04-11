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

  app.get('/home',
    authMiddleware,
    BoardController.renderHome
  );

  app.post('/fetchUserBoards', 
    authMiddleware, 
    BoardController.fetchUserBoards);

  app.get('/', (req, res) => {
    res.redirect('/login');
  })

  app.get('/board/:boardFk',
    authMiddleware,
    BoardController.renderBoard);

  app.post('/inviteMember', BoardController.inviteUserToExistBoard);

  app.post('/createBoard', BoardController.createBoard);

  app.post('/addNewCard', BoardController.addNewCard);

  app.post('/addNewStage', BoardController.addNewStage);

  app.post('/removeStage', BoardController.removeStage);

  app.post('/removeCard', BoardController.removeCard);

  app.post('/moveStage', BoardController.moveStage);

  app.post('/editStage', BoardController.editStage);

  app.post('/removeBoardMember', BoardController.removeBoardMember);
};