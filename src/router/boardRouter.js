const BoardController = require('../controllers/BoardController');

module.exports = (app) => {
  /*
  {
    name,
    description,
    taskFk
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

  app.post('/changeTaskPriority',
    BoardController.changeTaskPriority);

};