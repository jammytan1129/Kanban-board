const BoardController = require('../controllers/BoardController');
const path = require('path');

module.exports = (app) => {
  /*
  {
    id(mongodb 的Id)
  }
  */
  app.post('/findBoard',
    BoardController.findBoardById);
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
  app.get('/userBoards',
    BoardController.renderUserBoards
  );
};